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
import { getHealthData } from "../utils/healthConnect"; // Update the path

import styles from "../styles/dashboardStyles";

import AddMenu from "../components/dashboard/AddMenu";
import CalorieCard from "../components/dashboard/CalorieCard";
import FoodLogItem from "../components/dashboard/FoodLogItem";
import MacroCard from "../components/dashboard/MacroCard";
import WaterCard from "../components/dashboard/WaterCard";


import {
    getDashboardData
} from "../services/dashboardApi";



// ---------------- TYPES ----------------


type Profile = {

name:string | null;

daily_calorie_target:number | null;

daily_protein_target:number | null;

daily_carbs_target:number | null;

daily_fat_target:number | null;

daily_water_ml:number | null;

daily_steps_target:number | null;

onboarding_complete:boolean | null;

};



type FoodLog = {

id:string;

name:string;

meal_type:string | null;

calories:number;

protein_g:number;

carbs_g:number;

fat_g:number;

image_url:string | null;

logged_at:string;

};





const DashboardScreen =()=>{


// ---------------- STATES ----------------


const [profile,setProfile] =
useState<Profile | null>(null);



const [logs,setLogs] =
useState<FoodLog[]>([]);



const [steps,setSteps] =
useState(0);



const [water,setWater] =
useState(0);



const [loading,setLoading] =
useState(true);


//---------------- LOAD HEALTH DATA ----------------

useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const data = await getHealthData();

        if (data) {
          setSteps(data.totalSteps);
        }
      } catch (error) {
        console.log("Error fetching health data:", error);
      }
    };

    fetchHealthData();
  }, []);
// ---------------- LOAD DATA ----------------


useEffect(()=>{


loadDashboard();


},[]);






const loadDashboard = async()=>{


try{


setLoading(true);



// GET EMAIL


const email =
await AsyncStorage.getItem(
"userid"
);



if(!email)
{

Alert.alert(
"Error",
"User email not found"
);

return;

}





const data =
await getDashboardData(
email
);




console.log(
"Dashboard Data",
data
);

setProfile(data.profile);
setLogs(data.foodLogs ?? []);
setWater(data.water ?? 0);
}
catch(error:any){
Alert.alert("Error",error.message ??"Failed loading dashboard");
}

finally{
setLoading(false);
}

};







// ---------------- TOTALS ----------------


const totals = useMemo(()=>{


return logs.reduce(
(acc,item)=>({


cal:
acc.cal +
Number(item.calories),


protein:
acc.protein +
Number(item.protein_g),


carbs:
acc.carbs +
Number(item.carbs_g),


fat:
acc.fat +
Number(item.fat_g),


}),
{


cal:0,

protein:0,

carbs:0,

fat:0,

}

);


},[logs]);





const calorieTarget =
profile?.daily_calorie_target
??
2000;




const proteinTarget =
profile?.daily_protein_target
??
120;



const carbTarget =
profile?.daily_carbs_target
??
220;



const fatTarget =
profile?.daily_fat_target
??
60;



const waterTarget =
profile?.daily_water_ml
??
3000;



const stepTarget =
profile?.daily_steps_target
??
10000;



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

<Text style={styles.goldText}>

{profile?.name || "there"}

</Text>

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

onAdd={(amount)=>{

setWater(
previous =>
previous + amount
);

}}

/>








{/* FOOD LOG */}



<View style={styles.sectionHeader}>


<Text style={styles.sectionTitle}>

Today's Log

</Text>


</View>





{
logs.length === 0 ?

<View style={styles.emptyCard}>


<Text style={styles.emptyText}>

No meals logged yet.

</Text>


</View>


:


logs.map(item=>(


<FoodLogItem

key={item.id}

item={item}


/>


))

}





</ScrollView>






{/* FLOATING ADD BUTTON */}



<AddMenu />


</View>

);

};


export default DashboardScreen;