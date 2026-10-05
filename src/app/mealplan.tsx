import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BASE_URL from "@/storage/ipAdress";
import { useTheme } from "../context/ThemeContext";
import type { MealSectionColors } from "../styles/PlanMyMeals.styles";

type MealFood = {
  name: string;
  quantity: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
};

type MealPlanResponse = {
  success: boolean;
  result?: {
    meals?: { meal_type: string; foods: MealFood[] }[];
    totals?: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      sugar: number;
      fiber: number;
    };
  };
  userid?: string;
  message?: string;
};

const API_ENDPOINT = "/plan-my-meal";

export default function MealPlanRoute() {
  const router = useRouter();
  const { sectionCode: routeSectionCode } = useLocalSearchParams<{
    sectionCode?: string | string[];
  }>();
  const sectionCode = Array.isArray(routeSectionCode)
    ? routeSectionCode[0]
    : routeSectionCode;
  const mealType = sectionCode ?? "";
  const { colors } = useTheme() as { colors: MealSectionColors };
  const styles = createStyles(colors);

  const [userId, setUserId] = useState<string | null>(null);
  const [foodName, setFoodName] = useState("");
  const [mealPlan, setMealPlan] = useState<MealPlanResponse["result"] | null>(
    null,
  );
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [savingMeal, setSavingMeal] = useState(false);
  const [mealSaved, setMealSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userid");
        if (!cancelled) {
          setUserId(storedUserId);
          if (!storedUserId)
            setError("User ID was not found. Please sign in again.");
        }
      } catch (loadError) {
        console.error(
          "[MealPlan] Could not read userid from storage",
          loadError,
        );
        if (!cancelled)
          setError("Could not load your account. Please try again.");
      } finally {
        if (!cancelled) setLoadingUser(false);
      }
    };

    loadUserId();
    return () => {
      cancelled = true;
    };
  }, []);

  const requestMealPlan = async () => {
    const trimmedFoodName = foodName.trim();
    if (!trimmedFoodName) {
      setError("Enter a food or meal to get a plan.");
      return;
    }
    if (!userId) {
      setError("User ID was not found. Please sign in again.");
      return;
    }
    if (!mealType) {
      setError("Meal type is missing from the route.");
      return;
    }

    setLoadingPlan(true);
    setError(null);
    setMealPlan(null);
    setMealSaved(false);
    setSaveMessage(null);

    try {
      const query = [
        `foodName=${encodeURIComponent(trimmedFoodName)}`,
        `userid=${encodeURIComponent(userId)}`,
        `meal_type=${encodeURIComponent(mealType)}`,
      ].join("&");
      const baseUrl = String(BASE_URL).replace(/\/$/, "");
      const response = await fetch(`${baseUrl}${API_ENDPOINT}?${query}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const body = (await response.json()) as MealPlanResponse;

      console.log("[MealPlan] API response", {
        status: response.status,
        success: body.success,
        mealType,
        foodCount:
          body.result?.meals?.reduce(
            (total, meal) => total + (meal.foods?.length ?? 0),
            0,
          ) ?? 0,
      });

      if (!response.ok || !body.success) {
        throw new Error(
          body.message || `Meal plan request failed (${response.status}).`,
        );
      }
      setMealPlan(body.result ?? { meals: [], totals: undefined });
    } catch (requestError) {
      console.error("[MealPlan] Request failed", requestError);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not load a meal plan. Please try again.",
      );
    } finally {
      setLoadingPlan(false);
    }
  };

  const saveMeal = async () => {
    if (!mealPlan || !userId || !mealType || mealSaved) return;

    setSavingMeal(true);
    setSaveMessage(null);
    try {
      const savedMealsKey = "savedMeals";
      const savedValue = await AsyncStorage.getItem(savedMealsKey);
      let savedMeals: unknown = savedValue ? JSON.parse(savedValue) : [];
      if (!Array.isArray(savedMeals)) savedMeals = [];

      const now = new Date();
      const date = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      const savedMeal = {
        id: `${userId}-${now.getTime()}`,
        userid: userId,
        date,
        savedAt: now.toISOString(),
        meal_type: mealType,
        foodName: foodName.trim(),
        meals: mealPlan.meals ?? [],
        totals: mealPlan.totals ?? null,
      };

      await AsyncStorage.setItem(
        savedMealsKey,
        JSON.stringify([...savedMeals, savedMeal]),
      );
      setMealSaved(true);
      setSaveMessage("Meal saved successfully.");
    } catch (saveError) {
      console.error("[MealPlan] Could not save meal", saveError);
      setSaveMessage("Could not save the meal. Please try again.");
    } finally {
      setSavingMeal(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Meal Plan</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mealType}>{formatMealType(mealType)}</Text>
        <Text style={styles.description}>
          What food would you like included?
        </Text>

        <TextInput
          accessibilityLabel="Food or meal"
          value={foodName}
          onChangeText={setFoodName}
          placeholder="e.g. rajma, rice, and roti"
          placeholderTextColor={colors.secondaryText}
          returnKeyType="search"
          onSubmitEditing={requestMealPlan}
          style={styles.input}
          editable={!loadingPlan && !loadingUser}
        />

        <Pressable
          accessibilityRole="button"
          onPress={requestMealPlan}
          disabled={loadingPlan || loadingUser}
          style={({ pressed }) => [
            styles.submitButton,
            (pressed || loadingPlan || loadingUser) && styles.submitButtonMuted,
          ]}
        >
          {loadingPlan || loadingUser ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <Text style={styles.submitText}>Get meal plan</Text>
          )}
        </Pressable>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {mealPlan && (
          <View style={styles.results}>
            {mealPlan.totals && (
              <View style={styles.totalsCard}>
                <Text style={styles.cardTitle}>Nutrition totals</Text>
                <View style={styles.totalsGrid}>
                  <Total
                    label="Calories"
                    value={mealPlan.totals.calories}
                    unit="kcal"
                    styles={styles}
                  />
                  <Total
                    label="Protein"
                    value={mealPlan.totals.protein}
                    unit="g"
                    styles={styles}
                  />
                  <Total
                    label="Carbs"
                    value={mealPlan.totals.carbs}
                    unit="g"
                    styles={styles}
                  />
                  <Total
                    label="Fat"
                    value={mealPlan.totals.fat}
                    unit="g"
                    styles={styles}
                  />
                  <Total
                    label="Fiber"
                    value={mealPlan.totals.fiber}
                    unit="g"
                    styles={styles}
                  />
                  <Total
                    label="Sugar"
                    value={mealPlan.totals.sugar}
                    unit="g"
                    styles={styles}
                  />
                </View>
              </View>
            )}

            {(mealPlan.meals ?? []).map((meal, mealIndex) => (
              <View
                key={`${meal.meal_type}-${mealIndex}`}
                style={styles.mealCard}
              >
                <Text style={styles.cardTitle}>{meal.meal_type}</Text>
                {(meal.foods ?? []).map((food, foodIndex) => (
                  <View
                    key={`${food.name}-${foodIndex}`}
                    style={styles.foodRow}
                  >
                    <View style={styles.foodHeading}>
                      <Text style={styles.foodName}>{food.name}</Text>
                      <Text style={styles.foodQuantity}>{food.quantity}</Text>
                    </View>
                    <Text style={styles.foodMacros}>
                      {food.kcal} kcal · P {food.protein}g · C {food.carbs}g · F{" "}
                      {food.fat}g
                    </Text>
                  </View>
                ))}
              </View>
            ))}

            <Pressable
              accessibilityRole="button"
              onPress={saveMeal}
              disabled={savingMeal || mealSaved}
              style={({ pressed }) => [
                styles.saveButton,
                (pressed || savingMeal || mealSaved) &&
                  styles.submitButtonMuted,
              ]}
            >
              {savingMeal ? (
                <ActivityIndicator color={colors.card} />
              ) : (
                <Text style={styles.submitText}>
                  {mealSaved ? "Meal saved" : "Save meal"}
                </Text>
              )}
            </Pressable>
            {saveMessage ? (
              <Text style={mealSaved ? styles.savedText : styles.errorText}>
                {saveMessage}
              </Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Total({
  label,
  value,
  unit,
  styles,
}: {
  label: string;
  value: number;
  unit: string;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.totalItem}>
      <Text style={styles.totalValue}>
        {value}
        {unit === "kcal" ? "" : ` ${unit}`}
      </Text>
      <Text style={styles.totalLabel}>{label}</Text>
    </View>
  );
}

function formatMealType(value: string) {
  if (!value) return "Meal";
  return value
    .replace(/[&_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

const createStyles = (colors: MealSectionColors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
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
    content: { padding: 20, paddingBottom: 36 },
    mealType: {
      color: colors.text,
      fontSize: 25,
      fontWeight: "700",
      marginBottom: 5,
    },
    description: {
      color: colors.secondaryText,
      fontSize: 14,
      marginBottom: 16,
    },
    input: {
      minHeight: 52,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      paddingHorizontal: 15,
      color: colors.text,
      backgroundColor: colors.card,
      fontSize: 16,
    },
    submitButton: {
      minHeight: 50,
      borderRadius: 14,
      marginTop: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    submitButtonMuted: { opacity: 0.72 },
    saveButton: {
      minHeight: 50,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      marginTop: 2,
    },
    savedText: {
      color: colors.primary,
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center",
    },
    submitText: { color: colors.card, fontSize: 16, fontWeight: "700" },
    errorText: { color: "#C63D3D", fontSize: 13, marginTop: 12 },
    results: { marginTop: 20, gap: 14 },
    totalsCard: { padding: 16, borderRadius: 16, backgroundColor: colors.card },
    mealCard: { padding: 16, borderRadius: 16, backgroundColor: colors.card },
    cardTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 12,
    },
    totalsGrid: { flexDirection: "row", flexWrap: "wrap", rowGap: 14 },
    totalItem: { width: "33.333%" },
    totalValue: { color: colors.text, fontSize: 15, fontWeight: "700" },
    totalLabel: { color: colors.secondaryText, fontSize: 12, marginTop: 3 },
    foodRow: {
      paddingVertical: 11,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    foodHeading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    foodName: { flex: 1, color: colors.text, fontSize: 15, fontWeight: "600" },
    foodQuantity: { color: colors.secondaryText, fontSize: 13, marginLeft: 12 },
    foodMacros: { color: colors.secondaryText, fontSize: 12, marginTop: 5 },
  });
