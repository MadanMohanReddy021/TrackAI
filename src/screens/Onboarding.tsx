import { useState } from "react";

import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/onboardingStyles";

import ProgressBar from "../components/onboarding/ProgressBar";
import Step0 from "../components/onboarding/Step0";
import Step1 from "../components/onboarding/Step1";
import Step2 from "../components/onboarding/Step2";
import Step3 from "../components/onboarding/Step3";
import Step4 from "../components/onboarding/Step4";
import Step5 from "../components/onboarding/Step5";
import Step6 from "../components/onboarding/Step6";

import {
  Activity,
  Gender,
  Goal,
} from "../constants/onboarding";



// ---------------- COMPONENT ----------------


const OnboardingScreen = () => {


const TOTAL_STEPS = 7;


// ---------------- STEP ----------------


const [step,setStep] = useState(0);


// ---------------- PROFILE DATA ----------------


const [name,setName] = useState("");

const [age,setAge] = useState("");

const [gender,setGender] =
useState<Gender | undefined>();

const [height,setHeight] =
useState("");

const [weight,setWeight] =
useState("");


// ---------------- GOAL ----------------


const [goal,setGoal] =
useState<Goal | undefined>();


const [target,setTarget] =
useState("");


// ---------------- ACTIVITY ----------------


const [activity,setActivity] =
useState<Activity | undefined>();


// ---------------- PACE ----------------


const [pace,setPace] =
useState<number | undefined>();


// ---------------- RESULT ----------------


const [summary,setSummary] =
useState<any>(null);


const [loading,setLoading] =
useState(false);




// ---------------- VALIDATION ----------------


const validateStep = () => {


 if (step === 0) {
    return !!gender;
  }

  if (step === 1) {
    return (
      name.trim().length > 0 &&
      age.trim().length > 0 &&
      height.trim().length > 0 &&
      weight.trim().length > 0
    );
  }



if(step === 2)
{
return !!goal;
}




if(step === 3)
{

if(goal === "strength")
return true;

return target.length > 0;

}




if(step === 4)
{
return !!activity;
}




if(step === 5)
{
return pace !== undefined;
}



return true;

};





// ---------------- FINISH API ----------------


const finish = async()=>{

console.log("1. FINISH STARTED");

try{

setLoading(true);


console.log("2. Getting email");


const userid =
await AsyncStorage.getItem("userid");
console.log("3. USERID:",userid);
if(!userid)
{
 Alert.alert(
 "Error",
 "User ID not found in storage"
 );
 return;
}



const profile = {
  userid,

  full_name: name,

  gender,

  age: Number(age),

  weight: Number(weight),

  target_weight: target
    ? Number(target)
    : null,

  height: Number(height),

  activityLevel: activity,

  goal,

  goalType: "moderate",

  target_date:null,

  referral_source: null,
};

console.log("4. PROFILE:", profile);

const apiResponse = await fetch(
  "http://172.22.204.4:3000/profile",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
   body: JSON.stringify(profile)
  }
);

console.log("5. STATUS:", apiResponse.status);
console.log(
  "6. CONTENT-TYPE:",
  apiResponse.headers.get("content-type")
);

const responseText = await apiResponse.text();

console.log("7. RAW RESPONSE:");
console.log(responseText);

if (!apiResponse.ok) {
  throw new Error(responseText);
}

let response;

try {
  response = JSON.parse(responseText);
} catch (err) {
  throw new Error(
    "Server did not return valid JSON.\n\n" + responseText
  );
}

console.log("8. PARSED RESPONSE:", response);

setSummary(response);
setStep(6);



console.log(
"5. RESPONSE",
response
);



setSummary(response);

setStep(6);


}

catch(error:any)
{

console.log(
"6. ERROR",
error
);


Alert.alert(
"API Error",
error.message
);


}

finally{

setLoading(false);

}

};





// ---------------- NEXT BUTTON ----------------


const next = ()=>{


if(!validateStep())
{

Alert.alert(
"Complete this step",
"Please fill all required fields"
);

return;

}


if(step === 5)
{
  console.log("Calling finish()");
  finish();
  return;
}


setStep(
previous=>previous+1
);


};





// ---------------- BACK BUTTON ----------------


const back = ()=>{


if(step > 1)
{

setStep(
previous=>previous-1
);

}


};
return (

<View style={styles.container}>


{/* TOP HEADER */}

<View style={styles.header}>


<TouchableOpacity
style={styles.backButton}
onPress={back}
disabled={step === 1}
>

<Text style={styles.backText}>
←
</Text>

</TouchableOpacity>



<Text style={styles.stepText}>
Step {step} / {TOTAL_STEPS}
</Text>


<View style={{width:40}}/>


</View>





{/* PROGRESS BAR */}


<ProgressBar

step={step}

totalSteps={TOTAL_STEPS}

/>





{/* CONTENT */}


<View style={styles.content}>
  {step === 0 && (
    <Step0
      gender={gender}
      setGender={setGender}
    />
  )}

  {step === 1 && (
    <Step1
      name={name}
      age={age}
      height={height}
      weight={weight}
      setName={setName}
      setAge={setAge}
      setHeight={setHeight}
      setWeight={setWeight}
    />
  )}

  {step === 2 && (
    <Step2
      goal={goal}
      setGoal={setGoal}
      setPace={setPace}
    />
  )}

  {step === 3 && (
    <Step3
      goal={goal}
      weight={weight}
      target={target}
      setTarget={setTarget}
    />
  )}

  {step === 4 && (
    <Step4
      activity={activity}
      setActivity={setActivity}
    />
  )}

  {step === 5 && (
    <Step5
      goal={goal}
      weight={weight}
      target={target}
      pace={pace}
      setPace={setPace}
    />
  )}

  {step === 6 && (
    <Step6
      summary={summary}
      goal={goal}
      onFinish={() => {
        Alert.alert(
          "Dashboard",
          "Navigate to dashboard"
        );
      }}
    />
  )}
</View>





{/* NEXT BUTTON */}



{
step < 6 &&


<TouchableOpacity

style={styles.button}

onPress={next}

disabled={loading}

>


<Text style={styles.buttonText}>

{

loading

?

"Generating Plan..."

:

step === 5

?

"Finish & Generate"

:

"Continue"

}


</Text>


</TouchableOpacity>


}





</View>

);

};


export default OnboardingScreen;