import React from "react";
import {
    Text,
    TextInput,
    View,
} from "react-native";

import { Goal } from "../../constants/onboarding";
import styles from "../../styles/onboardingStyles";

interface Step3Props {
  goal?: Goal;
  weight: string;
  target: string;
  setTarget: (value: string) => void;
}

const Step3: React.FC<Step3Props> = ({
  goal,
  weight,
  target,
  setTarget,
}) => {

  const currentWeight = Number(weight);
  const targetWeight = Number(target);

  let difference = 0;

  if (
    goal === "weight_loss" &&
    currentWeight &&
    targetWeight
  ) {
    difference = Math.max(
      0,
      currentWeight - targetWeight
    );
  }

  if (
    (goal === "weight_gain" ||
      goal === "muscle_gain") &&
    currentWeight &&
    targetWeight
  ) {
    difference = Math.max(
      0,
      targetWeight - currentWeight
    );
  }

  if (goal === "strength") {
    return (
      <View>

        <Text style={styles.heading}>
          Strength Focus
        </Text>

        <Text style={styles.subHeading}>
          No target weight is needed.
        </Text>

        <View style={styles.card}>

          <Text
            style={{
              color: "#8A8579",
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            Your nutrition plan will maintain your
            current weight while helping you improve
            strength and performance.
          </Text>

        </View>

      </View>
    );
  }

  return (
    <View>

      <Text style={styles.heading}>
        Target Weight
      </Text>

      <Text style={styles.subHeading}>
        Enter the weight you want to reach.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Target Weight (kg)"
        keyboardType="decimal-pad"
        value={target}
        onChangeText={setTarget}
      />

      {difference > 0 && (
        <View style={styles.card}>

          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            {goal === "weight_loss"
              ? "Weight to Lose"
              : "Weight to Gain"}
          </Text>

          <Text
            style={{
              color: "#8A8579",
              fontSize: 15,
            }}
          >
            {difference.toFixed(1)} kg
          </Text>

        </View>
      )}

    </View>
  );
};

export default Step3;