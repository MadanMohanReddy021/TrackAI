import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { Gender } from "../../constants/onboarding";
import { createStyles } from "../../styles/onboardingStyles";

import ChoiceCard from "./ChoiceCard";


interface Step0Props {
  gender?: Gender;
  setGender: (value: Gender) => void;
}


const Step0: React.FC<Step0Props> = ({
  gender,
  setGender,
}) => {

  const { colors } = useTheme();

  const styles = createStyles(colors);


  return (
    <View>

      <Text style={styles.heading}>
        Let's start with the basics
      </Text>


      <Text style={styles.subHeading}>
        We'll personalize your nutrition plan.
      </Text>


      <Text style={styles.sectionTitle}>
        Gender
      </Text>


      <ChoiceCard
        title="Male"
        selected={gender === "male"}
        onPress={() => setGender("male")}
      />


      <ChoiceCard
        title="Female"
        selected={gender === "female"}
        onPress={() => setGender("female")}
      />


      <ChoiceCard
        title="Other"
        selected={gender === "other"}
        onPress={() => setGender("other")}
      />

    </View>
  );
};


export default Step0;