import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useTheme } from "../context/ThemeContext";
import type { MealSectionColors } from "../styles/PlanMyMeals.styles";

type SavedFood = {
  name: string;
  quantity?: string;
  serving?: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
};

type SavedMeal = {
  id: string;
  userid: string;
  date: string;
  meal_type: string;
  foodName?: string;
  meals?: { meal_type?: string; foods?: SavedFood[] }[];
  totals?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  } | null;
};

const SAVED_MEALS_KEY = "savedMeals";

export default function TodaysPlans() {
  const router = useRouter();
  const { colors } = useTheme() as { colors: MealSectionColors };
  const styles = createStyles(colors);
  const [plans, setPlans] = useState<SavedMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openingPlanId, setOpeningPlanId] = useState<string | null>(null);

  const loadTodaysPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [savedValue, userId] = await Promise.all([
        AsyncStorage.getItem(SAVED_MEALS_KEY),
        AsyncStorage.getItem("userid"),
      ]);
      const parsed: unknown = savedValue ? JSON.parse(savedValue) : [];
      const today = getLocalDateKey(new Date());
      const allPlans: SavedMeal[] = Array.isArray(parsed) ? parsed : [];
      setPlans(
        allPlans.filter(
          (plan) => plan?.date === today && (!userId || plan.userid === userId),
        ),
      );
    } catch (loadError) {
      console.error("[TodaysPlans] Could not load saved meals", loadError);
      setError("Could not load today’s plans. Please try again.");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodaysPlans();
    }, [loadTodaysPlans]),
  );

  const addToTodaysLog = (plan: SavedMeal) => {
    const foods = (plan.meals ?? []).flatMap((meal) => meal.foods ?? []);
    if (foods.length === 0) {
      setError("This saved plan has no foods to add to your log.");
      return;
    }

    const mealType = formatMealType(plan.meal_type);
    const foodResult = {
      success: true,
      userid: plan.userid,
      result: {
        foods: foods.map((food) => ({
          ...food,
          serving: food.serving ?? food.quantity ?? "1 serving",
        })),
      },
    };

    setOpeningPlanId(plan.id);
    router.push({
      pathname: "/foodresult",
      params: {
        result: JSON.stringify(foodResult),
        meal_type: mealType,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Today’s Plans</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateLabel}>{formatReadableDate(new Date())}</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        ) : error ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>{error}</Text>
            <Pressable onPress={loadTodaysPlans} style={styles.retryButton}>
              <Text style={styles.buttonText}>Try again</Text>
            </Pressable>
          </View>
        ) : plans.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No plans saved for today</Text>
            <Text style={styles.emptyText}>
              Save a meal plan and it will appear here.
            </Text>
          </View>
        ) : (
          plans.map((plan) => {
            const foods = (plan.meals ?? []).flatMap(
              (meal) => meal.foods ?? [],
            );
            return (
              <View key={plan.id} style={styles.planCard}>
                <View style={styles.planHeading}>
                  <View style={styles.mealIcon}>
                    <Text style={styles.mealIconText}>🍽</Text>
                  </View>
                  <View style={styles.planTitleWrap}>
                    <Text style={styles.mealType}>
                      {formatMealType(plan.meal_type)}
                    </Text>
                    <Text style={styles.foodSummary} numberOfLines={2}>
                      {foods.map((food) => food.name).join(" · ") ||
                        plan.foodName ||
                        "Meal plan"}
                    </Text>
                  </View>
                </View>

                {plan.totals && (
                  <Text style={styles.calories}>
                    {plan.totals.calories} kcal · P {plan.totals.protein}g · C{" "}
                    {plan.totals.carbs}g · F {plan.totals.fat}g
                  </Text>
                )}

                <Pressable
                  accessibilityRole="button"
                  onPress={() => addToTodaysLog(plan)}
                  disabled={openingPlanId === plan.id}
                  style={({ pressed }) => [
                    styles.addButton,
                    pressed && styles.pressed,
                  ]}
                >
                  {openingPlanId === plan.id ? (
                    <ActivityIndicator color={colors.card} />
                  ) : (
                    <Text style={styles.buttonText}>Add to today’s log</Text>
                  )}
                </Pressable>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

function getLocalDateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatReadableDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatMealType(value: string) {
  return value
    .replace(/[&_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

const createStyles = (colors: MealSectionColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    header: {
      minHeight: 58,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 42,
      height: 42,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    backIcon: {
      color: colors.text,
      fontSize: 38,
      lineHeight: 42,
      fontWeight: "300",
    },
    title: { color: colors.text, fontSize: 20, fontWeight: "700" },
    spacer: { width: 42 },
    content: { padding: 18, paddingBottom: 32 },
    dateLabel: { color: colors.secondaryText, fontSize: 14, marginBottom: 16 },
    loader: { marginTop: 40 },
    emptyCard: {
      padding: 22,
      borderRadius: 18,
      backgroundColor: colors.card,
      alignItems: "center",
    },
    emptyTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "700",
      textAlign: "center",
    },
    emptyText: {
      color: colors.secondaryText,
      fontSize: 14,
      textAlign: "center",
      marginTop: 8,
    },
    retryButton: {
      marginTop: 14,
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 12,
    },
    planCard: {
      padding: 16,
      borderRadius: 18,
      backgroundColor: colors.card,
      marginBottom: 14,
    },
    planHeading: { flexDirection: "row", alignItems: "center" },
    mealIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    mealIconText: { fontSize: 20 },
    planTitleWrap: { flex: 1 },
    mealType: { color: colors.text, fontSize: 16, fontWeight: "700" },
    foodSummary: { color: colors.secondaryText, fontSize: 13, marginTop: 4 },
    calories: { color: colors.secondaryText, fontSize: 13, marginTop: 14 },
    addButton: {
      minHeight: 46,
      borderRadius: 13,
      marginTop: 15,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    pressed: { opacity: 0.75 },
    buttonText: { color: colors.card, fontSize: 14, fontWeight: "700" },
  });
