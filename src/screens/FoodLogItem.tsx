import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createStyles } from "../styles/foodLogItemStyles";
import { DarkTheme, LightTheme } from "../theme/colors";

const FoodLogItem = ({ item }: any) => {
  const [expanded, setExpanded] = useState(false);

  const { theme } = useTheme();

  const colors = theme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setExpanded(!expanded)}
        style={styles.header}
      >
        <View>
          <Text style={styles.mealType}>{item.meal_type}</Text>

          <Text style={styles.time}>
            {new Date(item.analyzed_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <MaterialCommunityIcons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          {item.detected_foods.map((food: any, index: number) => (
            <View key={index} style={styles.foodCard}>
              <Text style={styles.foodName}>{food.name}</Text>

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
