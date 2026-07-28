import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "../../styles/onboardingStyles";


interface Step6Props {
  summary: any;
  goal?: string;
  onFinish: () => void;
}


const Step6: React.FC<Step6Props> = ({
  summary,
  goal,
  onFinish,
}) => {

  const { colors } = useTheme();

  const styles = createStyles(colors);


  if (!summary) return null;


  return (
    <View>

      <Text style={styles.heading}>
        🎉 Your Plan is Ready
      </Text>


      <Text style={styles.subHeading}>
        Your personalized nutrition plan has been generated.
      </Text>


      <View style={styles.card}>


        <Text style={styles.summaryTitle}>
          Nutrition Summary
        </Text>


        <View style={styles.summaryRow}>

          <Text style={styles.summaryLabel}>
            Goal
          </Text>

          <Text style={styles.summaryValue}>
            {goal?.replace("_", " ").toUpperCase()}
          </Text>

        </View>


        <View style={styles.summaryRow}>

          <Text style={styles.summaryLabel}>
            Daily Calories
          </Text>

          <Text style={styles.summaryValue}>
            {summary.data?.targetCalories} kcal
          </Text>

        </View>


        <View style={styles.summaryRow}>

          <Text style={styles.summaryLabel}>
            Protein
          </Text>

          <Text style={styles.summaryValue}>
            {summary.data?.protein} g
          </Text>

        </View>


        <View style={styles.summaryRow}>

          <Text style={styles.summaryLabel}>
            Carbs
          </Text>

          <Text style={styles.summaryValue}>
            {summary.data?.carbs} g
          </Text>

        </View>


        <View style={styles.summaryRow}>

          <Text style={styles.summaryLabel}
          >
            Fat
          </Text>

          <Text style={styles.summaryValue}>
            {summary.data?.fat} g
          </Text>

        </View>


        <View style={styles.summaryRow}>

          <Text style={styles.summaryLabel}>
            Water
          </Text>

          <Text style={styles.summaryValue}>
            {summary.data?.water} ml
          </Text>

        </View>


      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={onFinish}
      >

        <Text style={styles.buttonText}>
          Open Dashboard
        </Text>

      </TouchableOpacity>


    </View>
  );
};


export default Step6;