import { useTheme } from "@/context/ThemeContext";
import BASE_URL from "@/storage/ipAdress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createStyles } from "../styles/resultStyles";

type Food = {
  name: string;
  serving: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
};

type EditableFood = Food & {
  quantity: number;
  unit: string;
  originalQuantity: number;
  originalNutrition: {
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
};

export default function FoodResult() {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  const { image, result } = useLocalSearchParams();

  const API_URL = BASE_URL;

  const [logging, setLogging] = useState(false);
  const [mealType, setMealType] = useState("");
  const [missingFood, setMissingFood] = useState("");
  const [addingFood, setAddingFood] = useState(false);
  const response = result ? JSON.parse(result as string) : null;

  const initialFoods: EditableFood[] = useMemo(() => {
    if (!response?.result?.foods) return [];

    return response.result.foods.map((food: Food) => {
      const match = food.serving.match(/^([\d.]+)\s*(.*)$/);

      const quantity = Number(match?.[1] ?? 1);
      const unit = match?.[2] ?? "";

      return {
        ...food,
        quantity,
        unit,
        originalQuantity: quantity,
        originalNutrition: {
          kcal: food.kcal,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          fiber: food.fiber,
          sugar: food.sugar,
        },
      };
    });
  }, [response]);

  const [foods, setFoods] = useState<EditableFood[]>([]);

  useEffect(() => {
    if (initialFoods.length > 0) {
      setFoods(initialFoods);
    }
  }, []);
  const totals = useMemo(() => {
    return foods.reduce(
      (acc, food) => {
        acc.kcal += Number(food.kcal) || 0;

        acc.protein += Number(food.protein) || 0;

        acc.carbs += Number(food.carbs) || 0;

        acc.fat += Number(food.fat) || 0;

        acc.fiber += Number(food.fiber) || 0;

        acc.sugar += Number(food.sugar) || 0;

        return acc;
      },
      {
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
      },
    );
  }, [foods]);
  const addMissingFood = async () => {
    try {
      if (!missingFood.trim()) {
        Alert.alert("Enter food name");
        return;
      }

      setAddingFood(true);

      const userid = await AsyncStorage.getItem("userid");

      const response = await axios.post(`${API_URL}/analyze-food`, {
        foodName: missingFood,
        userid,
      });

      const newFoods = response.data.result.foods.map((food: Food) => {
        const match = food.serving.match(/^([\d.]+)\s*(.*)$/);

        const quantity = Number(match?.[1] ?? 1);

        const unit = match?.[2] ?? "";

        return {
          ...food,

          quantity,

          unit,

          originalQuantity: quantity,

          originalNutrition: {
            kcal: food.kcal,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            fiber: food.fiber,
            sugar: food.sugar,
          },
        };
      });

      setFoods([...foods, ...newFoods]);

      setMissingFood("");
    } catch (error: any) {
      console.log("Add food error", error.response?.data || error.message);

      Alert.alert("Error", "Unable to add food");
    } finally {
      setAddingFood(false);
    }
  };
  const logMeal = async () => {
    try {
      setLogging(true);

      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        Alert.alert("Error", "User not found");
        return;
      }

      if (!mealType) {
        Alert.alert(
          "Select Meal Type",
          "Please select Breakfast, Lunch, Dinner or Snacks",
        );

        return;
      }

      const payload = {
        userid,

        meal_type: mealType,

        food_nutrients: foods.map((food) => ({
          name: food.name,
          serving: food.serving,
          quantity: food.quantity,
          unit: food.unit,

          kcal: food.kcal,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          fiber: food.fiber,
          sugar: food.sugar,
        })),
      };
      console.log("KEYS:", Object.keys(payload));

      console.log("Food Log Payload:", JSON.stringify(payload, null, 2));

      await axios.post(`${API_URL}/insert-food-logs`, payload);

      Alert.alert("Success", "Meal logged successfully!");

      router.replace("/dashboard");
    } catch (error: any) {
      console.log(error.response?.data || error.message);

      Alert.alert("Error", "Unable to log meal.");
    } finally {
      setLogging(false);
    }
  };

  const updateQuantity = (index: number, value: string) => {
    const qty = Number(value);

    if (value === "") {
      const updated = [...foods];

      updated[index].quantity = 0;

      setFoods(updated);

      return;
    }

    if (isNaN(qty)) return;

    const updated = [...foods];

    const ratio = qty / updated[index].originalQuantity;

    updated[index] = {
      ...updated[index],

      quantity: qty,

      kcal: Number((updated[index].originalNutrition.kcal * ratio).toFixed(1)),

      protein: Number(
        (updated[index].originalNutrition.protein * ratio).toFixed(1),
      ),

      carbs: Number(
        (updated[index].originalNutrition.carbs * ratio).toFixed(1),
      ),

      fat: Number((updated[index].originalNutrition.fat * ratio).toFixed(1)),

      fiber: Number(
        (updated[index].originalNutrition.fiber * ratio).toFixed(1),
      ),

      sugar: Number(
        (updated[index].originalNutrition.sugar * ratio).toFixed(1),
      ),
    };

    setFoods(updated);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {image ? (
          <Image source={{ uri: image as string }} style={styles.image} />
        ) : null}

        <View style={styles.mealContainer}>
          <Text style={styles.mealTitle}>Select Meal Type</Text>

          <View style={styles.mealOptions}>
            {["Breakfast", "Lunch", "Dinner", "Snacks"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.mealButton,

                  mealType === item && styles.selectedMeal,
                ]}
                onPress={() => setMealType(item)}
              >
                <Text
                  style={[
                    styles.mealText,

                    mealType === item && styles.selectedMealText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.heading}>Food Analysis</Text>

        {/* Total Nutrition */}
        <View style={styles.totalCard}>
          <Text style={styles.totalTitle}>Total Nutrition</Text>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Calories</Text>
            <Text style={styles.totalValue}>{totals.kcal.toFixed(1)} kcal</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Protein</Text>
            <Text style={styles.totalValue}>{totals.protein.toFixed(1)} g</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Carbs</Text>
            <Text style={styles.totalValue}>{totals.carbs.toFixed(1)} g</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Fat</Text>
            <Text style={styles.totalValue}>{totals.fat.toFixed(1)} g</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Fiber</Text>
            <Text style={styles.totalValue}>{totals.fiber.toFixed(1)} g</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sugar</Text>
            <Text style={styles.totalValue}>{totals.sugar.toFixed(1)} g</Text>
          </View>
        </View>

        {foods.map((food, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.foodName}>{food.name}</Text>

            <View style={styles.servingRow}>
              <Text style={styles.label}>Serving</Text>

              <View style={styles.quantityContainer}>
                <TextInput
                  value={food.quantity === 0 ? "" : String(food.quantity)}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  onChangeText={(text) => updateQuantity(index, text)}
                />

                <Text style={styles.unit}>{food.unit}</Text>
              </View>
            </View>

            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridValue}>{food.kcal}</Text>
                <Text style={styles.gridLabel}>Calories</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridValue}>{food.protein} g</Text>
                <Text style={styles.gridLabel}>Protein</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridValue}>{food.carbs} g</Text>
                <Text style={styles.gridLabel}>Carbs</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridValue}>{food.fat} g</Text>
                <Text style={styles.gridLabel}>Fat</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridValue}>{food.fiber} g</Text>
                <Text style={styles.gridLabel}>Fiber</Text>
              </View>

              <View style={styles.gridItem}>
                <Text style={styles.gridValue}>{food.sugar} g</Text>
                <Text style={styles.gridLabel}>Sugar</Text>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.addFoodContainer}>
          <TextInput
            placeholder="Add missing food"
            value={missingFood}
            onChangeText={setMissingFood}
            style={styles.addFoodInput}
          />

          <TouchableOpacity
            style={styles.addFoodButton}
            onPress={addMissingFood}
            disabled={addingFood}
          >
            <Text style={styles.actionText}>
              {addingFood ? "Adding..." : "Add Food"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#999" }]}
            onPress={() => router.back()}
          >
            <Text style={styles.actionText}>Scan Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={logMeal}
            disabled={logging}
          >
            <Text style={styles.actionText}>
              {logging ? "Logging..." : "Log Meal"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
