import BASE_URL from "@/storage/ipAdress"; // adjust if needed
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createStyles } from "../styles/foodLogItemStyles";
const FoodLogItem = ({ item }: any) => {
  const [expanded, setExpanded] = useState(false);

  const { colors } = useTheme();

  const styles = createStyles(colors);
  const handleDeleteFood = async (foodIndex: number) => {
    Alert.alert(
      "Delete Food",
      "Are you sure you want to delete this food item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const userid = await AsyncStorage.getItem("userid");

              if (!userid) {
                console.log("User ID not found");
                return;
              }

              const updatedFoods = item.detected_foods.filter(
                (_: any, index: number) => index !== foodIndex,
              );

              const payload = {
                userid,
                analysis_id: item.analysis_id,
                analyzed_foods: updatedFoods,
              };

              const response = await axios.post(
                `${BASE_URL}/update-food-logs`,
                payload,
              );

              console.log("Food delete response:", response.data);
            } catch (error: any) {
              console.log(
                "Food delete error:",
                error.response?.data || error.message,
              );
            }
          },
        },
      ],
    );
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Food Log",
      "Are you sure you want to delete this entire food log? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const userid = await AsyncStorage.getItem("userid");

              if (!userid) {
                console.log("User ID not found");
                return;
              }

              const response = await axios.post(
                `${BASE_URL}/delete-food-logs`,
                {
                  data: {
                    analysis_id: item.analysis_id,
                    userid,
                  },
                },
              );

              console.log("Log delete response:", response.data);
            } catch (error: any) {
              console.log(
                "Log delete error:",
                error.response?.data || error.message,
              );
            }
          },
        },
      ],
    );
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setExpanded(!expanded)}
        style={styles.header}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.mealType}>{item.meal_type}</Text>

          <Text style={styles.time}>
            {new Date(item.analyzed_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ marginRight: 10 }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>

          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          {item.detected_foods.map((food: any, index: number) => (
            <View key={index} style={styles.foodCard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={styles.foodName}>{food.name}</Text>

                <TouchableOpacity
                  onPress={() => handleDeleteFood(index)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={18}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.serving}>{food.serving}</Text>

              <View style={styles.row}>
                <Text style={styles.label}>Calories</Text>
                <Text style={styles.value}>{food.kcal} kcal</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Protein</Text>
                <Text style={styles.value}>{food.protein} g</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Carbs</Text>
                <Text style={styles.value}>{food.carbs} g</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Fat</Text>
                <Text style={styles.value}>{food.fat} g</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Fiber</Text>
                <Text style={styles.value}>{food.fiber} g</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Sugar</Text>
                <Text style={styles.value}>{food.sugar} g</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default FoodLogItem;
