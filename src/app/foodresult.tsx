import BASE_URL from "@/storage/ipAdress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert, Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

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
  const { image, result } = useLocalSearchParams();

  const API_URL =BASE_URL ;

  const [logging, setLogging] = useState(false);
  const [mealType, setMealType] = useState("");
const [missingFood,setMissingFood]=useState("");
const [addingFood,setAddingFood]=useState(false);
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

  if(initialFoods.length > 0){
    setFoods(initialFoods);
  }

}, []);
  const totals = useMemo(() => {
    return foods.reduce(
      (acc, food) => {
        acc.kcal += food.kcal;
        acc.protein += food.protein;
        acc.carbs += food.carbs;
        acc.fat += food.fat;
        acc.fiber += food.fiber;
        acc.sugar += food.sugar;

        return acc;
      },
      {
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
      }
    );
  }, [foods]);
const addMissingFood = async()=>{

try{

if(!missingFood.trim()){
  Alert.alert(
    "Enter food name"
  );
  return;
}


setAddingFood(true);


const userid =
await AsyncStorage.getItem("userid");


const response = await axios.post(
`${API_URL}/analyze-food`,
{
  foodName:missingFood,
  userid
}
);



const newFoods =
response.data.result.foods.map(
(food:Food)=>{

const match =
food.serving.match(/^([\d.]+)\s*(.*)$/);


const quantity =
Number(match?.[1] ?? 1);


const unit =
match?.[2] ?? "";


return {

...food,

quantity,

unit,

originalQuantity:quantity,


originalNutrition:{
kcal:food.kcal,
protein:food.protein,
carbs:food.carbs,
fat:food.fat,
fiber:food.fiber,
sugar:food.sugar
}

};

});



setFoods([
...foods,
...newFoods
]);



setMissingFood("");



}
catch(error:any){

console.log(
"Add food error",
error.response?.data || error.message
);


Alert.alert(
"Error",
"Unable to add food"
);


}
finally{

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


   if(!mealType){

  Alert.alert(
    "Select Meal Type",
    "Please select Breakfast, Lunch, Dinner or Snacks"
  );

  return;

}



const payload = {

  userid,

  meal_type: mealType,


  food_nutrients: foods.map((food)=>({

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

  }))

};
console.log("KEYS:", Object.keys(payload));

    console.log(
      "Food Log Payload:",
      JSON.stringify(payload,null,2)
    );


    await axios.post(
      `${API_URL}/insert-food-logs`,
      payload
    );


    Alert.alert(
      "Success",
      "Meal logged successfully!"
    );


    router.replace("/");


  } catch (error:any) {

    console.log(
      error.response?.data || error.message
    );


    Alert.alert(
      "Error",
      "Unable to log meal."
    );


  } finally {

    setLogging(false);

  }
};

const updateQuantity = (index:number,value:string)=>{

  const qty = Number(value);

  if(value===""){
    const updated=[...foods];

    updated[index].quantity=0;

    setFoods(updated);

    return;
  }


  if(isNaN(qty)) return;


  const updated=[...foods];


  const ratio =
    qty / updated[index].originalQuantity;


  updated[index]={
    ...updated[index],

    quantity:qty,

    kcal:Number(
      (
        updated[index].originalNutrition.kcal *
        ratio
      ).toFixed(1)
    ),

    protein:Number(
      (
        updated[index].originalNutrition.protein *
        ratio
      ).toFixed(1)
    ),

    carbs:Number(
      (
        updated[index].originalNutrition.carbs *
        ratio
      ).toFixed(1)
    ),

    fat:Number(
      (
        updated[index].originalNutrition.fat *
        ratio
      ).toFixed(1)
    ),

    fiber:Number(
      (
        updated[index].originalNutrition.fiber *
        ratio
      ).toFixed(1)
    ),

    sugar:Number(
      (
        updated[index].originalNutrition.sugar *
        ratio
      ).toFixed(1)
    ),

  };


  setFoods(updated);

};

  return (
    <ScrollView style={styles.container}>

     {image ? (
  <Image
    source={{ uri: image as string }}
    style={styles.image}
  />
) : null}


<View style={styles.mealContainer}>

<Text style={styles.mealTitle}>
Select Meal Type
</Text>


<View style={styles.mealOptions}>


{
["Breakfast","Lunch","Dinner","Snacks"].map((item)=>(
  
<TouchableOpacity

key={item}

style={[
styles.mealButton,

mealType === item &&
styles.selectedMeal

]}

onPress={()=>setMealType(item)}

>

<Text
style={[
styles.mealText,

mealType === item &&
styles.selectedMealText

]}
>

{item}

</Text>

</TouchableOpacity>

))

}


</View>

</View>

      <Text style={styles.heading}>
        Food Analysis
      </Text>

      {/* Total Nutrition */}
      <View style={styles.totalCard}>
        <Text style={styles.totalTitle}>
          Total Nutrition
        </Text>

        <View style={styles.totalRow}>
          <Text>Calories</Text>
          <Text>{totals.kcal.toFixed(1)} kcal</Text>
        </View>

        <View style={styles.totalRow}>
          <Text>Protein</Text>
          <Text>{totals.protein.toFixed(1)} g</Text>
        </View>

        <View style={styles.totalRow}>
          <Text>Carbs</Text>
          <Text>{totals.carbs.toFixed(1)} g</Text>
        </View>

        <View style={styles.totalRow}>
          <Text>Fat</Text>
          <Text>{totals.fat.toFixed(1)} g</Text>
        </View>

        <View style={styles.totalRow}>
          <Text>Fiber</Text>
          <Text>{totals.fiber.toFixed(1)} g</Text>
        </View>

        <View style={styles.totalRow}>
          <Text>Sugar</Text>
          <Text>{totals.sugar.toFixed(1)} g</Text>
        </View>
      </View>

      {foods.map((food, index) => (
        <View key={index} style={styles.card}>

          <Text style={styles.foodName}>
            {food.name}
          </Text>

          <View style={styles.servingRow}>

  <Text style={styles.label}>
    Serving
  </Text>


  <View style={styles.quantityContainer}>


    <TextInput
  value={
    food.quantity === 0
    ? ""
    : String(food.quantity)
  }
  keyboardType="decimal-pad"
  style={styles.input}
  onChangeText={(text)=>updateQuantity(index,text)}
/>


    <Text style={styles.unit}>
      {food.unit}
    </Text>


  </View>


</View>

          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridValue}>{food.kcal}</Text>
              <Text>Calories</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridValue}>{food.protein} g</Text>
              <Text>Protein</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridValue}>{food.carbs} g</Text>
              <Text>Carbs</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridValue}>{food.fat} g</Text>
              <Text>Fat</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridValue}>{food.fiber} g</Text>
              <Text>Fiber</Text>
            </View>

            <View style={styles.gridItem}>
              <Text style={styles.gridValue}>{food.sugar} g</Text>
              <Text>Sugar</Text>
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

{
addingFood
?
"Adding..."
:
"Add Food"
}

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
          style={[
            styles.actionButton,
            { backgroundColor: "#999" },
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.actionText}>
            Scan Again
          </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F2",
  },

  image: {
    width: "100%",
    height: 240,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
mealContainer:{
margin:20,
padding:15,
backgroundColor:"#fff",
borderRadius:15,
},


mealTitle:{
fontSize:16,
fontWeight:"700",
marginBottom:12,
},


mealOptions:{
flexDirection:"row",
flexWrap:"wrap",
gap:10,
},


mealButton:{
paddingHorizontal:18,
paddingVertical:10,
borderRadius:20,
borderWidth:1,
borderColor:"#ddd",
},


selectedMeal:{
backgroundColor:"#F59E0B",
borderColor:"#F59E0B",
},


mealText:{
color:"#555",
fontWeight:"600",
},


selectedMealText:{
color:"white",
},
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2D2D2D",
    marginHorizontal: 20,
    marginVertical: 18,
  },
addFoodContainer:{
margin:20,
},


addFoodInput:{
height:55,
borderWidth:1,
borderColor:"#ddd",
borderRadius:12,
paddingHorizontal:15,
fontSize:16,
marginBottom:10,
},


addFoodButton:{
height:55,
backgroundColor:"#F59E0B",
borderRadius:12,
justifyContent:"center",
alignItems:"center",
},
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    padding: 18,
    shadowColor: "#FF8A00",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  foodName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
    textTransform: "capitalize",
  },

  servingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    color: "#555",
    marginRight: 10,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFE7CC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFC78C",
  },

  qtyButtonText: {
    color: "#F57C00",
    fontSize: 22,
    fontWeight: "700",
  },

  input: {
    width: 65,
    height: 38,
    marginHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFD3A5",
    backgroundColor: "#FFF",
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
  },

  unit: {
    marginLeft: 8,
    fontSize: 15,
    color: "#666",
    fontWeight: "600",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },

  gridItem: {
    width: "31%",
    backgroundColor: "#FFF7EF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFE0BF",
  },

  gridValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F57C00",
    marginBottom: 4,
  },

  totalCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FFE2C0",
    shadowColor: "#FF9800",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  totalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F57C00",
    marginBottom: 16,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 7,
  },

  actionButton: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "#FF9F1C",
    paddingVertical: 13,
    borderRadius: 28,
    alignItems: "center",

    shadowColor: "#FF9800",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },

  actionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  backButton: {
    margin: 18,
    backgroundColor: "#FF9F1C",
    borderRadius: 28,
    paddingVertical: 13,
    alignItems: "center",

    shadowColor: "#FF9800",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },

  backText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});