import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AddMenu from "../components/dashboard/AddMenu";
import CalorieCard from "../components/dashboard/CalorieCard";
import FoodLogItem from "../components/dashboard/FoodLogItem";
import MacroCard from "../components/dashboard/MacroCard";
import WaterCard from "../components/dashboard/WaterCard";
import { useTheme } from "../context/ThemeContext";
import { createStyles } from "../styles/dashboardStyles";
import { DarkTheme, LightTheme } from "../theme/colors";

import {
  addWaterIntake,
  getFoodLogs,
  getNutrients,
  getProfile,
  getSteps,
  getWater
} from "../services/dashboardApi";

// ---------------- TYPES ----------------


type Profile = {
  userid: string;

  full_name: string;

  gender: string;

  age: number;

  height_cm: number | string;

  current_weight_kg: number | string;

  target_weight_kg: number | string;

  activity_level: string;

  goal: string;

  goal_type: string;

  bmr: number | string;

  maintenance_calories: number | string;

  calories: number | string;

  protein: number | string;

  carbs: number | string;

  fat: number | string;

  water: number | string;

  minimum_steps: number | null;

  target_date: string | null;

  referral_source: string | null;
};


type FoodLog = {
  analysis_id: number;
  userid: string;
  meal_type: string;
  detected_foods: {
    name: string;
    serving: string;
    quantity?: number;
    unit?: string;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  }[];
  analyzed_at: string;
};





const DashboardScreen =()=>{
//----------------Add water-------------------------------------------------------------------------------------------
const handleAddWater = async (amount: number) => {
  try {
    const userid = await AsyncStorage.getItem("userid");

    if (!userid) {
      Alert.alert("Error", "User not found");
      return;
    }

    const intake_date = new Date().toISOString().split("T")[0];

    await addWaterIntake(userid, intake_date, amount);

    setWater((prev) => prev + amount);
  } catch (error: any) {
    Alert.alert(
      "Error",
      error.message ?? "Failed to add water"
    );
  }
};
//----------------------------------------------------------------------------------------------------------------
//---------------- THEME ----------------


const { theme } = useTheme();

const colors =
  theme === "dark"
    ? DarkTheme
    : LightTheme;

const styles = createStyles(colors);
// ---------------- STATES ----------------


const [profile,setProfile] =
useState<Profile | null>(null);


const [nutrients, setNutrients] = useState({
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
});
const [logs,setLogs] =
useState<FoodLog[]>([]);

const [profileName, setProfileName] = useState("");

const [steps,setSteps] =
useState(0);



const [water,setWater] =
useState(0);


useEffect(()=>{

  if(profile){
    setProfileName(profile.full_name);
  }

},[profile]);
const [loading,setLoading] =
useState(true);
// useEffect(() => {
//   const loadProfile = async () => {
//     try {
//       const storedProfile = await AsyncStorage.getItem("profile");

//       if (storedProfile) {
//         const profile = JSON.parse(storedProfile);

//         setProfileName(
//           profile.name || profile.full_name || ""
//         );
//       }

//     } catch (error) {
//       console.log("Profile storage error:", error);
//     }
//   };

//   loadProfile();

// }, []);

//---------------- LOAD HEALTH DATA ----------------
// useEffect(() => {

//   const loadSteps = async () => {

//     const saved = await AsyncStorage.getItem(
//       "todaySteps"
//     );

//     if (saved) {
//       setSteps(Number(saved));
//     }

//   };


//   loadSteps();

// }, []);
// useEffect(() => {

//   let subscription: any;


//   const startPedometer = async () => {

//     const available = await Pedometer.isAvailableAsync();

//     console.log("Pedometer available:", available);

//     if (!available) return;


//     subscription = Pedometer.watchStepCount(
//       async (result) => {

//         console.log("STEP EVENT:", result.steps);


//         setSteps(result.steps);


//         await AsyncStorage.setItem(
//           "todaySteps",
//           String(result.steps)
//         );

//       }
//     );

//   };


//   startPedometer();


//   return () => {

//     if (subscription) {
//       subscription.remove();
//     }

//   };


// }, []);
// useEffect(() => {

//   startStepService();

//   const loadSteps = async () => {

//     const steps = await getTodaySteps();

//     setSteps(Number(steps));

//   };

//   loadSteps();

// }, []);
// ---------------- LOAD DATA ----------------


useEffect(()=>{


loadDashboard();


},[]);






const loadDashboard = async () => {
  try {
    setLoading(true);

    const userid = await AsyncStorage.getItem("userid");

    if (!userid) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    const date = new Date().toISOString().split("T")[0];

    const [
      profile,
      nutrients,
      foodLogs,
      water,
      steps,
    ] = await Promise.all([
      getProfile(userid),
      getNutrients(userid, date),
      getFoodLogs(userid, date),
      getWater(userid, date),
      getSteps(userid, date),
    ]);

    
setProfile(profile.data);
    setLogs(foodLogs);
    setWater(water.data.water_ml);
    setSteps(steps.data.steps);
    console.log(steps.data.steps);
    setNutrients(
  nutrients.data?.[0] ?? {
    calories:0,
    protein:0,
    carbs:0,
    fat:0,
    fiber:0,
    sugar:0
  }
);
   
    console.log("logs",nutrients);

  } catch (error: any) {
    Alert.alert(
      "Error",
      error.message ?? "Failed loading dashboard"
    );
  } finally {
    setLoading(false);
  }
};







// ---------------- TOTALS ----------------


const totals = useMemo(
  () => ({
    cal: Number(nutrients?.calories ?? 0),
    protein: Number(nutrients?.protein ?? 0),
    carbs: Number(nutrients?.carbs ?? 0),
    fat: Number(nutrients?.fat ?? 0),
  }),
  [nutrients]
);



 
const calorieTarget =
  Number(profile?.calories) || 2000;

const proteinTarget =
  Number(profile?.protein) || 120;

const carbTarget =
  Number(profile?.carbs) || 220;

const fatTarget =
  Number(profile?.fat) || 60;

const waterTarget =
  Number(profile?.water) || 3000;

const stepTarget =
  Number(profile?.minimum_steps) || 10000;


if(loading)
{

return (

<View style={styles.loader}>

<ActivityIndicator
size="large"
color="#C9A24B"
/>


<Text style={styles.loadingText}>
Loading...
</Text>


</View>

);

}
return (

<View style={styles.container}>


<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={{
paddingBottom:120
}}

>



{/* HEADER */}

<View style={styles.header}>


<Text style={styles.dayText}>

Today

</Text>


<Text style={styles.title}>
  Hello{" "}

  {profile?.full_name ?? "there"}

</Text>


</View>


{/* CALORIES */}


<CalorieCard

consumed={Math.round(totals.cal)}

target={calorieTarget}

/>






{/* STEPS */}


<View style={styles.card}>


<Text style={styles.cardTitle}>

🚶 Steps

</Text>


<Text style={styles.bigNumber}>

{steps.toLocaleString()}

<Text style={styles.smallText}>

 / {stepTarget.toLocaleString()}

</Text>

</Text>



<View style={styles.progressBackground}>


<View

style={[
styles.progressFill,

{

width:
`${Math.min(
100,
(steps / stepTarget)*100
)}%`

}

]}


/>


</View>


<Text style={styles.leftText}>

{
Math.max(
0,
stepTarget-steps
).toLocaleString()
}

 steps left

</Text>


</View>








{/* MACROS */}


<View style={styles.macroContainer}>


<MacroCard

title="Protein"

value={totals.protein}

target={proteinTarget}

/>



<MacroCard

title="Carbs"

value={totals.carbs}

target={carbTarget}

/>



<MacroCard

title="Fat"

value={totals.fat}

target={fatTarget}

/>



</View>








{/* WATER */}
<WaterCard
  value={water}
  target={waterTarget}
  onAdd={handleAddWater}
/>

{/* FOOD LOG */}

<View style={styles.sectionHeader}>
 <Text style={styles.sectionTitle}>
  Today's Log
 </Text>
</View>

{
  logs.length === 0 ? (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyText}>
        No meals logged yet.
      </Text>
    </View>
  ) : (
    logs.map((item) => (
      <FoodLogItem
        key={item.analysis_id}
        item={item}
      />
    ))
  )
}

</ScrollView>

{/* FLOATING ADD BUTTON */}

<AddMenu />


</View>

);

};


export default DashboardScreen;