import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "../../styles/onboardingStyles";

import ChoiceCard from "./ChoiceCard";

import {
  Activity,
  ACTIVITY_LEVELS,
} from "../../constants/onboarding";


interface Step4Props {
  activity?: Activity;
  setActivity: (activity: Activity) => void;
}


const Step4: React.FC<Step4Props> = ({
  activity,
  setActivity,
}) => {

  const { colors } = useTheme();

  const styles = createStyles(colors);


  return (
    <View>

      <Text style={styles.heading}>
        How active are you?
      </Text>


      <Text style={styles.subHeading}>
        Your activity level helps us calculate your daily calorie needs.
      </Text>


      {ACTIVITY_LEVELS.map((item) => (

        <ChoiceCard
          key={item.value}
          title={item.title}
          description={item.description}
          selected={activity === item.value}
          onPress={() => setActivity(item.value)}
        />

      ))}


    </View>
  );
};


export default Step4;