import React, { useMemo } from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { LineChart } from "react-native-gifted-charts";

import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";

import { Activity, Gender, Goal } from "../../constants/onboarding";

import { createStyles } from "../../styles/onboardingStyles";

interface Step6Props {
  summary: any;

  name: string;

  age: string;

  gender?: Gender;

  height: string;

  weight: string;

  target: string;

  activity?: Activity;

  pace?: number;

  goal?: Goal;

  heightUnit: "cm" | "inch";

  weightUnit: "kg" | "lbs";

  onFinish: () => void;
}

const Step6: React.FC<Step6Props> = ({
  summary,

  name,

  age,

  gender,

  height,

  weight,

  target,

  activity,

  pace,

  goal,

  heightUnit,

  weightUnit,

  onFinish,
}) => {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  if (!summary) return null;

  /*
    Convert units
  */

  const currentWeight =
    weightUnit === "lbs" ? Number(weight) * 0.453592 : Number(weight);

  const targetWeight = Number(target) || currentWeight;

  const weightDifference = Math.abs(currentWeight - targetWeight);

  /*
    Pace calculation

    0.5kg/week default
  */

  const weeklyChange = pace && pace > 0 ? pace : 0.5;

  const totalWeeks = Math.ceil(weightDifference / weeklyChange);

  /*
     Goal Date
  */

  const goalDate = useMemo(() => {
    const date = new Date();

    date.setDate(date.getDate() + totalWeeks * 7);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [totalWeeks]);

  /*
      Generate graph points

      Example:

      82kg
      81.5kg
      81kg
      ...
      70kg

  */

  const chartData = useMemo(() => {
    const points = [];

    const difference = currentWeight - targetWeight;

    const steps = totalWeeks > 0 ? totalWeeks : 1;

    for (let i = 0; i <= steps; i++) {
      const value = currentWeight - (difference / steps) * i;

      points.push({
        value: Number(value.toFixed(1)),

        label: i === 0 ? "Now" : i === steps ? "Goal" : `W${i}`,
      });
    }

    return points;
  }, [currentWeight, targetWeight, totalWeeks]);

  const nutrition = {
    calories: summary.data?.targetCalories ?? 0,

    protein: summary.data?.protein ?? 0,

    carbs: summary.data?.carbs ?? 0,

    fat: summary.data?.fat ?? 0,

    water: summary.data?.water ?? 0,
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* HEADER */}

      <Text style={styles.heading}>🎉 Your Plan is Ready</Text>

      <Text style={styles.subHeading}>
        Your personalized fitness journey has been created.
      </Text>

      {/* NUTRITION SUMMARY */}

      <View style={styles.card}>
        <Text style={styles.summaryTitle}>🔥 Daily Nutrition</Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Calories</Text>

            <Text style={styles.metricValue}>{nutrition.calories}</Text>

            <Text style={styles.metricUnit}>kcal</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Protein</Text>

            <Text style={styles.metricValue}>{nutrition.protein}</Text>

            <Text style={styles.metricUnit}>grams</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Carbs</Text>

            <Text style={styles.metricValue}>{nutrition.carbs}</Text>

            <Text style={styles.metricUnit}>grams</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Fat</Text>

            <Text style={styles.metricValue}>{nutrition.fat}</Text>

            <Text style={styles.metricUnit}>grams</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Water Goal</Text>

          <Text style={styles.summaryValue}>{nutrition.water} ml</Text>
        </View>
      </View>

      {/* GOAL GRAPH */}

      <View style={styles.card}>
        <Text style={styles.summaryTitle}>📈 Goal Timeline</Text>

        <Text style={styles.chartDescription}>
          Estimated progress from {currentWeight.toFixed(1)}
          kg to {targetWeight.toFixed(1)}
          kg
        </Text>

        <LineChart
          data={chartData}
          height={220}
          spacing={45}
          thickness={3}
          hideRules={false}
          hideDataPoints={false}
          initialSpacing={15}
          endSpacing={20}
          xAxisLabelTextStyle={{
            fontSize: 12,
            color: colors.secondaryText,
          }}
          yAxisTextStyle={{
            fontSize: 12,
            color: colors.secondaryText,
          }}
        />
      </View>

      {/* GOAL STATISTICS */}

      <View style={styles.card}>
        <Text style={styles.summaryTitle}>🎯 Goal Details</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Current Weight</Text>

          <Text style={styles.summaryValue}>{currentWeight.toFixed(1)} kg</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Target Weight</Text>

          <Text style={styles.summaryValue}>{targetWeight.toFixed(1)} kg</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Weight Difference</Text>

          <Text style={styles.summaryValue}>
            {weightDifference.toFixed(1)} kg
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Estimated Duration</Text>

          <Text style={styles.summaryValue}>{totalWeeks} weeks</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Goal Date</Text>

          <Text style={styles.summaryValue}>{goalDate}</Text>
        </View>
      </View>

      {/* USER PROFILE */}

      <View style={styles.card}>
        <Text style={styles.summaryTitle}>👤 Your Details</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Name</Text>

          <Text style={styles.summaryValue}>{name}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Age</Text>

          <Text style={styles.summaryValue}>{age} years</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Gender</Text>

          <Text style={styles.summaryValue}>{gender ?? "-"}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Height</Text>

          <Text style={styles.summaryValue}>
            {height} {heightUnit}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Weight</Text>

          <Text style={styles.summaryValue}>{currentWeight.toFixed(1)} kg</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Target</Text>

          <Text style={styles.summaryValue}>{targetWeight.toFixed(1)} kg</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Goal</Text>

          <Text style={styles.summaryValue}>
            {goal?.replace("_", " ").toUpperCase()}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Activity</Text>

          <Text style={styles.summaryValue}>{activity ?? "-"}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Pace</Text>

          <Text style={styles.summaryValue}>{weeklyChange} kg/week</Text>
        </View>
      </View>

      {/* BUTTON */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.buttonText}>🚀 Start My Journey</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Step6;
