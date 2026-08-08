import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { readRecords } from "react-native-health-connect";

import { LineChart } from "react-native-chart-kit";

import { useTheme } from "../context/ThemeContext";
import { createStyles } from "../styles/progressStyles";

const width = Dimensions.get("window").width;

export default function Progress() {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  const [stepLogs, setStepLogs] = useState<any[]>([]);
  const [stepsPermissionError, setStepsPermissionError] = useState(false);
  const loadWeeklySteps = async () => {
    try {
      const today = new Date();

      const stepsData = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const result = await readRecords("Steps", {
          timeRangeFilter: {
            operator: "between",
            startTime: date.toISOString(),
            endTime: endDate.toISOString(),
          },
        });

        const totalSteps = (result.records || []).reduce(
          (sum, item) => sum + (item.count ?? 0),
          0,
        );

        stepsData.push({
          date: date.toLocaleDateString("en-US", {
            weekday: "short",
          }),
          steps: totalSteps,
        });
      }

      const hasSteps = stepsData.some((item) => item.steps > 0);

      if (!hasSteps) {
        setStepsPermissionError(true);
      } else {
        setStepLogs(stepsData);
      }
    } catch (error) {
      console.log("Steps error:", error);
      setStepsPermissionError(true);
    }
  };

  const [weightLogs, setWeightLogs] = useState<any[]>([
    {
      month: "Jan",
      weight: 82,
    },
    {
      month: "Feb",
      weight: 80,
    },
    {
      month: "Mar",
      weight: 78,
    },
    {
      month: "Apr",
      weight: 77,
    },
    {
      month: "May",
      weight: 75,
    },
    {
      month: "Jun",
      weight: 74,
    },
  ]);
  const [nutritionLogs, setNutritionLogs] = useState<any[]>([
    {
      calories: 2200,
      protein: 120,
      carbs: 250,
      fat: 70,
    },
    {
      calories: 2400,
      protein: 130,
      carbs: 280,
      fat: 75,
    },
    {
      calories: 2100,
      protein: 110,
      carbs: 230,
      fat: 65,
    },
    {
      calories: 2600,
      protein: 140,
      carbs: 300,
      fat: 80,
    },
    {
      calories: 2300,
      protein: 125,
      carbs: 260,
      fat: 72,
    },
    {
      calories: 2500,
      protein: 135,
      carbs: 290,
      fat: 78,
    },
    {
      calories: 2700,
      protein: 150,
      carbs: 320,
      fat: 85,
    },
  ]);
  const [loading, setLoading] = useState(true);

  const loadProgress = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        console.log("User ID not found");

        return;
      }

      const [weightResponse, nutritionResponse] = await Promise.all([
        fetch(`${BASE_URL}/progress?userid=${userid}`),

        fetch(`${BASE_URL}/get-nutrients-range?userid=${userid}`),
      ]);

      const weightData = await weightResponse.json();

      const nutritionData = await nutritionResponse.json();

      setWeightLogs(weightData.weightLogs || []);

      setNutritionLogs(nutritionData.data || []);
    } catch (error) {
      console.log("Progress loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
    loadWeeklySteps();
  }, []);

  const createChart = (labels: any[], values: any[]) => ({
    labels,

    datasets: [
      {
        data: values.map(Number),
        strokeWidth: 3,
        color: () => "#FFFFFF",
      },
    ],
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const weightChart = {
    labels: weightLogs.map((item) => item.month),

    datasets: [
      {
        data: weightLogs.map((item) => Number(item.weight)),

        strokeWidth: 4,

        color: () => colors.progress,

        fillShadowGradient: colors.card,
        fillShadowGradientOpacity: 0,
      },
    ],
  };
  const nutritionChart = {
    labels: [" "], // blank label

    datasets: [
      {
        data: nutritionLogs.length
          ? nutritionLogs.map((item) => Number(item.calories) || 0)
          : [0],
        color: () => "#FF5252",
        strokeWidth: 3,
      },
      {
        data: nutritionLogs.length
          ? nutritionLogs.map((item) => Number(item.protein) || 0)
          : [0],
        color: () => "#4CAF50",
        strokeWidth: 3,
      },
      {
        data: nutritionLogs.length
          ? nutritionLogs.map((item) => Number(item.carbs) || 0)
          : [0],
        color: () => "#2196F3",
        strokeWidth: 3,
      },
      {
        data: nutritionLogs.length
          ? nutritionLogs.map((item) => Number(item.fat) || 0)
          : [0],
        color: () => "#FFC107",
        strokeWidth: 3,
      },
    ],

    legend: ["Calories", "Protein", "Carbs", "Fat"],
  };
  const stepsChart = {
    labels: stepLogs.map((item) => item.date),

    datasets: [
      {
        data: stepLogs.map((item) => item.steps),

        strokeWidth: 3,

        color: () => colors.progress,
      },
    ],
  };
  function renderGraph(
    title: string,

    data: any,

    suffix: string,
  ) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>

        <LineChart
          data={data}
          width={width - 70}
          height={220}
          yAxisSuffix={suffix}
          bezier
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withShadow={false}
          withDots={true}
          chartConfig={{
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.card,

            decimalPlaces: 1,

            color: (opacity = 1) => `rgba(75,201,169,${opacity})`,

            labelColor: () => colors.secondaryText,

            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: colors.progress,
              fill: colors.progress,
            },

            // Remove graph fill
            fillShadowGradient: colors.card,
            fillShadowGradientOpacity: 0,
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Progress</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {renderGraph(
          "Weight Progress",

          weightChart,

          " kg",
        )}
        {renderGraph("Nutrition Progress", nutritionChart, "")}{" "}
        {stepsPermissionError ? (
          <View style={styles.card}>
            <Text style={styles.title}>Steps unavailable</Text>

            <Text style={styles.secondaryText}>
              Please check Health Connect permissions
            </Text>
          </View>
        ) : (
          renderGraph("Weekly Steps", stepsChart, "")
        )}
      </ScrollView>
    </View>
  );
}
