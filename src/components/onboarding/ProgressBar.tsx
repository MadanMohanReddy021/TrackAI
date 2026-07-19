import React from "react";
import { View } from "react-native";

import { COLORS } from "../../constants/onboarding";
import styles from "../../styles/onboardingStyles";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  step,
  totalSteps,
}) => {
  const progress =
    step >= totalSteps
      ? 100
      : ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: COLORS.gold,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
