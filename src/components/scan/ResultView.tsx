import { router } from "expo-router";
import { useState } from "react";
import {
    Alert, ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { saveMeal } from "../../services/mealApi";
import { FoodItem } from "../../types/food";
import {
    calculateHealthScore,
    calculateTotals,
} from "../../utils/healthScores";
import AIInsights from "./AIInsights";
import BottomSheet from "./BottomSheet";
import HealthScore from "./HealthScore";
import ImageHeader from "./ImageHeader";
import IngredientCard from "./IngredientCard";
import IngredientEditor from "./IngredientEditor";
import MealSelector from "./MealSelector";
import NutritionCard from "./NutritionCard";
const [meal, setMeal] = useState("Lunch");
type Props = {

    image: string;

    items: FoodItem[];

};

export default function ResultView({

    image,

    items,

}: Props) {

    const totals =calculateTotals(items);
    const [editorVisible, setEditorVisible] = useState(false);

const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
const [meal, setMeal] = useState("Lunch");
    const score =
        calculateHealthScore(items);
        const [foods, setFoods] = useState(items);
        function onIncrease(index: number) {
const [editorVisible, setEditorVisible] = useState(false);

const [selectedIndex, setSelectedIndex] =useState<number | null>(null);
  const updated = [...foods];

  updated[index].quantity += 1;

  updated[index].calories =
    updated[index].calories + updated[index].calories;

  updated[index].protein_g =
    updated[index].protein_g + updated[index].protein_g;

  updated[index].carbs_g =
    updated[index].carbs_g + updated[index].carbs_g;

  updated[index].fat_g =
    updated[index].fat_g + updated[index].fat_g;

  setFoods(updated);

}
function onEdit(index: number) {
  setSelectedIndex(index);
  setEditorVisible(true);
}
function onDecrease(index: number) {

  const updated = [...foods];

  if (updated[index].quantity <= 1)
    return;

  updated[index].quantity -= 1;

  updated[index].calories =
    Math.round(
      updated[index].calories / 2
    );

  updated[index].protein_g =
    updated[index].protein_g / 2;

  updated[index].carbs_g =
    updated[index].carbs_g / 2;

  updated[index].fat_g =
    updated[index].fat_g / 2;

  setFoods(updated);

}
function onDelete(index: number) {

  setFoods(

    foods.filter((_, i) => i !== index)

  );

}
function onSave(food: FoodItem) {

  if (selectedIndex === null)
    return;

  const updated = [...foods];

  updated[selectedIndex] = food;

  setFoods(updated);

  setEditorVisible(false);

}
async function onSaveMeal() {

  try {

    await saveMeal({

      mealType: meal,

      foods,

      totals,

      score,

      image,

    });

    Alert.alert(
      "Success",
      "Meal saved successfully."
    );

  } catch {

    Alert.alert(
      "Error",
      "Could not save meal."
    );

  }

}
  return (
  <View style={{ flex: 1 }}>
    <ImageHeader
    image={image}
    score={score}
    onBack={() => router.back()}
    onClose={() => router.back()}
/>

    <BottomSheet>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          <Text style={styles.title}>
            Detected Meal
          </Text>

          <HealthScore
    score={score}
/>

          {/* Calories */}

          <View style={styles.grid}>

<NutritionCard
title="Calories"
value={totals.calories}
unit="kcal"
color="#F97316"
/>

<NutritionCard
title="Protein"
value={totals.protein}
unit="g"
color="#22C55E"
/>

</View>

<View style={styles.grid}>

<NutritionCard
title="Carbs"
value={totals.carbs}
unit="g"
color="#3B82F6"
/>

<NutritionCard
title="Fat"
value={totals.fat}
unit="g"
color="#EAB308"
/>

</View>

          {/* Meal Selector */}

          <Text style={styles.section}>
            Meal Type
          </Text>

          <MealSelector
            selected={meal}
            onSelect={setMeal}
          />

          {/* Ingredients */}

          <Text style={styles.section}>
            Ingredients
          </Text>

          {items.map((item, index) => (
  <IngredientCard
  key={index}
  item={item}
  index={index}
  onIncrease={onIncrease}
  onDecrease={onDecrease}
  onDelete={onDelete}
  onEdit={onEdit}
/>
))}
<IngredientEditor
  visible={editorVisible}
  item={
    selectedIndex !== null
      ? foods[selectedIndex]
      : null
  }
  onClose={() => setEditorVisible(false)}
  onSave={onSave}
/>
<AIInsights
    score={score}
/>
          {/* Button */}

          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Save Meal
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </BottomSheet>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },

  image: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  score: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "700",
    color: "#22C55E",
  },

  row: {
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "space-between",
  },
grid:{

flexDirection:"row",

justifyContent:"space-between",

marginTop:15,

},
  section: {
    marginTop: 25,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  food: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  foodTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  button: {
    marginTop: 30,
    marginBottom: 40,
    height: 56,
    backgroundColor: "#22C55E",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

function setEditorVisible(arg0: boolean) {
    throw new Error("Function not implemented.");
}
function setSelectedIndex(index: number) {
    throw new Error("Function not implemented.");
}

