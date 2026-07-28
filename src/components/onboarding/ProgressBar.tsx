import React from "react";
import { View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "../../styles/onboardingStyles";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  step,
  totalSteps,
}) => {

  const { colors } = useTheme();

  const styles = createStyles(colors);


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
            },
          ]}
        />

      </View>

    </View>
  );
};

export default ProgressBar;