import React from "react";
import { Text, View } from "react-native";

import { Gender } from "../../constants/onboarding";
import styles from "../../styles/onboardingStyles";
import ChoiceCard from "./ChoiceCard";

interface Step0Props {
  gender?: Gender;
  setGender: (value: Gender) => void;
}

const Step0: React.FC<Step0Props> = ({
  gender,
  setGender,
}) => {
  return (
    <View>
      <Text style={styles.heading}>
        Let's start with the basics
      </Text>

      <Text style={styles.subHeading}>
        We'll personalize your nutrition plan.
      </Text>

      <Text style={styles.sectionTitle}>Gender</Text>

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