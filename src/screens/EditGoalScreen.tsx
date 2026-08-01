import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "../context/ThemeContext";


export default function EditGoalScreen() {


const {colors}=useTheme();

const styles=createStyles(colors);



const [loading,setLoading]=useState(true);

const [editing,setEditing]=useState(false);


const [goals,setGoals]=useState({

calories:"",
protein:"",
carbs:"",
fat:"",
water:"",
steps:"",

calories_until:"",
protein_until:"",
carbs_until:"",
fat_until:"",
water_until:"",

});



useEffect(()=>{

fetchGoals();

},[]);




const fetchGoals=async()=>{

try{

const profileData =
await AsyncStorage.getItem("profile");


if(!profileData){

Alert.alert(
"Error",
"Profile data not found"
);

return;

}


const profile=JSON.parse(profileData);



setGoals({

calories:String(profile.data.calories),

protein:String(profile.data.protein),

carbs:String(profile.data.carbs),

fat:String(profile.data.fat),

water:String(profile.data.water ?? 0),

steps:String(profile.data.minimum_steps ?? 0),


calories_until:
profile.data.calories_custom_until ?? "",

protein_until:
profile.data.protein_custom_until ?? "",

carbs_until:
profile.data.carbs_custom_until ?? "",

fat_until:
profile.data.fat_custom_until ?? "",

water_until:
profile.data.water_custom_until ?? "",

});


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};





const updateGoals=async()=>{

try{


const userid=
await AsyncStorage.getItem("userid");


if(!userid){

Alert.alert(
"Error",
"User ID missing"
);

return;

}



const date=new Date();

date.setFullYear(
date.getFullYear()+10
);


const untilDate=
date.toISOString().split("T")[0];



const response=
await fetch(
`${BASE_URL}/update-nutrients`,
{

method:"POST",

headers:{
"Content-Type":"application/json",
},


body:JSON.stringify({

userid,


calories_custom:Number(goals.calories),

protein_custom:Number(goals.protein),

carbs_custom:Number(goals.carbs),

fat_custom:Number(goals.fat),

water_custom:Number(goals.water),


calories_custom_until:untilDate,

protein_custom_until:untilDate,

carbs_custom_until:untilDate,

fat_custom_until:untilDate,

water_custom_until:untilDate,


})

}

);



const result=
await response.json();



if(response.ok){

Alert.alert(
"Success",
"Goals Updated"
);


setEditing(false);

}
else{

Alert.alert(
"Error",
result.message
);

}


}
catch(error){

Alert.alert(
"Error",
"Network error"
);

}


};







const renderField=(

label:string,

key:keyof typeof goals,

icon:keyof typeof Ionicons.glyphMap

)=>(


<View style={styles.card}>


<Text style={styles.label}>
{label}
</Text>



<View style={styles.inputContainer}>


<Ionicons

name={icon}

size={22}

color={colors.secondaryText}

style={styles.inputIcon}

/>



<TextInput


editable={editing}


keyboardType="numeric"


value={goals[key]}


onChangeText={(text)=>

setGoals({
...goals,
[key]:text
})

}


style={[
styles.input,
editing && styles.editInput
]}


/>



</View>



</View>


);






if(loading){

return(

<View style={styles.loader}>

<ActivityIndicator

size="large"

color={colors.primary}

/>

</View>

);

}






return(

<ScrollView

style={styles.container}

showsVerticalScrollIndicator={false}

>


<View style={styles.header}>


<View style={styles.headerLeft}>


<TouchableOpacity

onPress={()=>router.back()}

style={styles.backButton}

>


<Ionicons

name="arrow-back"

size={24}

color={colors.text}

/>


</TouchableOpacity>




<Text style={styles.title}>

Nutrition Goals

</Text>


</View>





<TouchableOpacity

onPress={()=>{

if(editing){

updateGoals();

}

else{

setEditing(true);

}

}}

>


<Ionicons

name={
editing
?
"checkmark"
:
"create-outline"
}

size={26}

color={colors.text}

/>


</TouchableOpacity>



</View>





{renderField(
"Calorie Target (kcal)",
"calories",
"flame-outline"
)}



{renderField(
"Protein (g)",
"protein",
"barbell-outline"
)}



{renderField(
"Carbohydrates (g)",
"carbs",
"nutrition-outline"
)}



{renderField(
"Fat (g)",
"fat",
"water-outline"
)}



{renderField(
"Steps Goal",
"steps",
"footsteps-outline"
)}



{renderField(
"Water (ml)",
"water",
"water-outline"
)}



</ScrollView>


);

}






const createStyles=(colors:any)=>

StyleSheet.create({

container:{

flex:1,

backgroundColor:colors.background,

paddingHorizontal:20,

},



loader:{

flex:1,

justifyContent:"center",

alignItems:"center",

backgroundColor:colors.background,

},



header:{

marginTop:60,

marginBottom:30,

flexDirection:"row",

justifyContent:"space-between",

alignItems:"center",

},



headerLeft:{

flexDirection:"row",

alignItems:"center",

},



backButton:{

marginRight:12,

},



title:{

fontSize:28,

fontWeight:"700",

color:colors.text,

},



card:{

marginBottom:18,

},



label:{

color:colors.secondaryText,

marginBottom:8,

fontSize:15,

},



inputContainer:{

flexDirection:"row",

alignItems:"center",

backgroundColor:colors.card,

borderRadius:14,

paddingHorizontal:15,

},



inputIcon:{

marginRight:12,

},



input:{

flex:1,

paddingVertical:16,

fontSize:17,

color:colors.text,

backgroundColor:"transparent",

},



editInput:{

borderWidth:1,

borderColor:colors.primary,

backgroundColor:colors.background,

},


});