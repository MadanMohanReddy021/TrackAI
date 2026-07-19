import React from "react";
import { Text, View } from "react-native";

import { Goal, GOALS } from "../../constants/onboarding";
import styles from "../../styles/onboardingStyles";
import ChoiceCard from "./ChoiceCard";

interface Step2Props {
  goal?: Goal;
  setGoal: (goal: Goal) => void;
  setPace: (pace?: number) => void;
}

const Step2: React.FC<Step2Props> = ({
  goal,
  setGoal,
  setPace,
}) => {
  return (
    <View>

      <Text style={styles.heading}>
        What is your goal?
      </Text>

      <Text style={styles.subHeading}>
        Choose the result you want to achieve.
      </Text>

      {GOALS.map((item) => (
        <ChoiceCard
          key={item.value}
          title={item.title}
          description={item.description}
          selected={goal === item.value}
          onPress={() => {
            setGoal(item.value);
            setPace(undefined);
          }}
        />
      ))}

    </View>
  );
};

export default Step2;