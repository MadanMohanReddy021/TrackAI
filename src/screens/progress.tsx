import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { readRecords } from "react-native-health-connect";

import BASE_URL from "@/storage/ipAdress";

import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "../styles/progressStyles";

import { StreakRecord } from "../components/progress/StreakBadges";

import ProgressCharts from "../components/progress/ProgressCharts";
import StepsChart, { StepLog } from "../components/progress/StepsChart";
import StreakBadges from "../components/progress/StreakBadges";

import ProgressHeader from "../components/progress/ProgressHeader";

// =====================================================
// TYPES
// =====================================================

interface WeightLog {
  month: string;
  weight: number | string;
}

interface NutritionLog {
  date: string;
  calories: number | string;
  protein: number | string;
  carbs: number | string;
  fat: number | string;
}

// =====================================================
// STREAK API RESPONSE
// =====================================================

interface StreakApiResponse {
  data?: {
    calories?: StreakRecord[];
    water?: StreakRecord[];
    nutrients?: StreakRecord[];
  };
  calories?: StreakRecord[];
  water?: StreakRecord[];
  nutrients?: StreakRecord[];
}

// =====================================================
// PROGRESS SCREEN
// =====================================================

export default function Progress() {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  const [nutritionTargets, setNutritionTargets] = useState<NutritionTargets>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  // ===================================================
  // WEIGHT
  // ===================================================

  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);

  // ===================================================
  // NUTRITION
  // ===================================================

  const [nutritionLogs, setNutritionLogs] = useState<NutritionLog[]>([]);

  // ===================================================
  // STEPS
  // ===================================================

  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);

  // ===================================================
  // CALORIE STREAK
  // ===================================================

  const [calorieStreakData, setCalorieStreakData] = useState<StreakRecord[]>(
    [],
  );

  // ===================================================
  // WATER STREAK
  // ===================================================

  const [waterStreakData, setWaterStreakData] = useState<StreakRecord[]>([]);

  // ===================================================
  // NUTRIENT STREAK
  // ===================================================

  const [nutrientStreakData, setNutrientStreakData] = useState<StreakRecord[]>(
    [],
  );

  // ===================================================
  // STEPS PERMISSION
  // ===================================================

  const [stepsPermissionError, setStepsPermissionError] = useState(false);

  // ===================================================
  // LOADING
  // ===================================================

  const [loading, setLoading] = useState(true);

  // ===================================================
  // LOAD PROGRESS API DATA
  // ===================================================
  interface NutritionTargets {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }
  const loadProgressData = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        console.log("User ID not found");

        return;
      }

      // ---------------------------------------------
      // CALL ALL APIs
      // ---------------------------------------------

      const [
        weightResponse,
        nutritionResponse,
        streakResponse,
        profileResponse,
      ] = await Promise.all([
        fetch(`${BASE_URL}/progress?userid=${userid}`),

        fetch(`${BASE_URL}/get-nutrients-range?userid=${userid}`),

        fetch(`${BASE_URL}/get-streaks?userid=${userid}`),

        fetch(`${BASE_URL}/get-profile?userid=${userid}`),
      ]);

      // =============================================
      // WEIGHT
      // =============================================

      if (weightResponse.ok) {
        const weightData = await weightResponse.json();

        setWeightLogs(weightData.weightLogs || []);
      }
      //------------------------------------------------
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();

        const profile = profileData.data;

        setNutritionTargets({
          calories: Number(profile?.calories) || 0,
          protein: Number(profile?.protein) || 0,
          carbs: Number(profile?.carbs) || 0,
          fat: Number(profile?.fat) || 0,
        });
      }
      // =============================================
      // NUTRITION
      // =============================================

      if (nutritionResponse.ok) {
        const nutritionData = await nutritionResponse.json();

        setNutritionLogs(nutritionData.data || []);
      }

      // =============================================
      // STREAK
      // =============================================

      if (streakResponse.ok) {
        const streakData: StreakApiResponse = await streakResponse.json();

        // -------------------------------------------
        // API FORMAT:
        //
        // {
        //   data: {
        //     calories: [...],
        //     water: [...],
        //     nutrients: [...]
        //   }
        // }
        // -------------------------------------------
        const streakRecords = streakData.data ?? streakData;
        const calories = Array.isArray(streakRecords.calories)
          ? streakRecords.calories
          : [];
        const water = Array.isArray(streakRecords.water)
          ? streakRecords.water
          : [];
        const nutrients = Array.isArray(streakRecords.nutrients)
          ? streakRecords.nutrients
          : [];

        console.log("[Progress] get-streaks response mapping", {
          responseKeys: Object.keys(streakData),
          nestedDataKeys: streakData.data ? Object.keys(streakData.data) : null,
          calorieRecords: calories.map(({ streakscore, streak_date }) => ({
            streakscore,
            streak_date,
          })),
          waterCount: water.length,
          nutrientCount: nutrients.length,
        });

        setCalorieStreakData(calories);
        setWaterStreakData(water);
        setNutrientStreakData(nutrients);
      }
    } catch (error) {
      console.log("Progress API loading error:", error);
    }
  };

  // ===================================================
  // DATE KEY
  // ===================================================

  const getDateKey = (date: Date): string => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ===================================================
  // LOAD LAST 7 DAYS STEPS
  // ===================================================

  const loadWeeklySteps = async () => {
    try {
      const today = new Date();

      const stepsData: StepLog[] = [];

      // ---------------------------------------------
      // LAST 7 DAYS
      // ---------------------------------------------

      for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(today.getDate() - i);

        date.setHours(0, 0, 0, 0);

        const endDate = new Date(date);

        endDate.setHours(23, 59, 59, 999);

        // -------------------------------------------
        // HEALTH CONNECT
        // -------------------------------------------

        const result = await readRecords("Steps", {
          timeRangeFilter: {
            operator: "between",

            startTime: date.toISOString(),

            endTime: endDate.toISOString(),
          },
        });

        // -------------------------------------------
        // TOTAL STEPS FOR THE DAY
        // -------------------------------------------

        const totalSteps = (result.records || []).reduce(
          (sum, item) => sum + (item.count ?? 0),

          0,
        );

        stepsData.push({
          // IMPORTANT:
          // Store actual date.
          // Do NOT store only Mon/Tue/etc.
          date: getDateKey(date),

          steps: totalSteps,
        });
      }

      // ---------------------------------------------
      // CHECK WHETHER HEALTH CONNECT RETURNED DATA
      // ---------------------------------------------

      const hasSteps = stepsData.some((item) => item.steps > 0);

      if (!hasSteps) {
        setStepsPermissionError(true);

        setStepLogs([]);
      } else {
        setStepsPermissionError(false);

        setStepLogs(stepsData);
      }
    } catch (error) {
      console.log("Health Connect steps error:", error);

      setStepsPermissionError(true);

      setStepLogs([]);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        await Promise.all([loadProgressData(), loadWeeklySteps()]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ===================================================
  // LOADING SCREEN
  // ===================================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <View style={styles.container}>
      {/* =============================================
          HEADER
      ============================================= */}

      <ProgressHeader />

      {/* =============================================
          CONTENT
      ============================================= */}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ===========================================
            STREAKS + BADGES
        =========================================== */}

        <StreakBadges
          calorieStreakData={calorieStreakData}
          waterStreakData={waterStreakData}
          nutrientStreakData={nutrientStreakData}
          stepLogs={stepLogs}
        />

        {/* ===========================================
            WEIGHT + CALORIES
        =========================================== */}

        <ProgressCharts
          weightLogs={weightLogs}
          nutritionLogs={nutritionLogs}
          nutritionTargets={nutritionTargets}
        />
        {/* ===========================================
            WEEKLY STEPS
        =========================================== */}

        {stepsPermissionError ? (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
              },
            ]}
          >
            <View
              style={{
                paddingVertical: 10,
              }}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Steps unavailable
              </Text>

              <Text
                style={[
                  styles.secondaryText,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                Please check Health Connect permissions
              </Text>
            </View>
          </View>
        ) : (
          <StepsChart stepLogs={stepLogs} />
        )}
      </ScrollView>
    </View>
  );
}
