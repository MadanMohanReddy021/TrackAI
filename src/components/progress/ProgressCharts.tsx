import { Dimensions, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/progressStyles";

const screenWidth = Dimensions.get("window").width;

// =====================================================
// TYPES
// =====================================================

interface WeightLog {
  month: string;
  weight: number | string;
}

export interface NutritionLog {
  date: string;
  calories: number | string;
  protein: number | string;
  carbs: number | string;
  fat: number | string;
  fiber?: number | string;
  sugar?: number | string;
}

interface ProgressChartsProps {
  weightLogs: WeightLog[];
  nutritionLogs: NutritionLog[];
}

// =====================================================
// COMPONENT
// =====================================================

export default function ProgressCharts({
  weightLogs,
  nutritionLogs,
}: ProgressChartsProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  // ===================================================
  // WEIGHT DATA
  // ===================================================

  const weightData = {
    labels: weightLogs.length
      ? weightLogs.map((item) => item.month)
      : ["No data"],

    datasets: [
      {
        data: weightLogs.length
          ? weightLogs.map((item) => Number(item.weight) || 0)
          : [0],
      },
    ],
  };

  // ===================================================
  // SORT NUTRITION DATA
  // ===================================================
  //
  // API example:
  //
  // 2026-09-29
  // 2026-09-28
  // 2026-09-27
  //
  // We reverse it so the graph displays:
  //
  // Sep 27 → Sep 28 → Sep 29
  //
  // ===================================================

  const sortedNutritionLogs = nutritionLogs.slice().reverse();

  // ===================================================
  // NUTRITION LABELS
  // ===================================================

  const nutritionLabels = sortedNutritionLogs.length
    ? sortedNutritionLogs.map((item) => {
        const date = new Date(item.date);

        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      })
    : ["No data"];

  // ===================================================
  // NUTRITION DATA
  // ===================================================
  //
  // RAW VALUES ARE USED.
  //
  // Calories → kcal
  // Protein  → grams
  // Carbs    → grams
  // Fat      → grams
  //
  // No percentage calculation.
  //
  // ===================================================

  const nutritionData = {
    labels: nutritionLabels,

    datasets: [
      // -----------------------------------------------
      // CALORIES
      // -----------------------------------------------

      {
        data: sortedNutritionLogs.length
          ? sortedNutritionLogs.map((item) => Number(item.calories) || 0)
          : [0],

        color: (opacity = 1) => `rgba(75, 201, 169, ${opacity})`,

        strokeWidth: 3,
      },

      // -----------------------------------------------
      // PROTEIN
      // -----------------------------------------------

      {
        data: sortedNutritionLogs.length
          ? sortedNutritionLogs.map((item) => Number(item.protein) || 0)
          : [0],

        color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`,

        strokeWidth: 3,
      },

      // -----------------------------------------------
      // CARBS
      // -----------------------------------------------

      {
        data: sortedNutritionLogs.length
          ? sortedNutritionLogs.map((item) => Number(item.carbs) || 0)
          : [0],

        color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,

        strokeWidth: 3,
      },

      // -----------------------------------------------
      // FAT
      // -----------------------------------------------

      {
        data: sortedNutritionLogs.length
          ? sortedNutritionLogs.map((item) => Number(item.fat) || 0)
          : [0],

        color: (opacity = 1) => `rgba(255, 82, 82, ${opacity})`,

        strokeWidth: 3,
      },
    ],

    legend: ["Calories", "Protein", "Carbs", "Fat"],
  };

  // ===================================================
  // COMMON CHART CONFIG
  // ===================================================

  const chartConfig = {
    backgroundGradientFrom: colors.card,

    backgroundGradientTo: colors.card,

    decimalPlaces: 0,

    color: (opacity = 1) => `rgba(75, 201, 169, ${opacity})`,

    labelColor: () => colors.secondaryText,

    propsForBackgroundLines: {
      strokeWidth: 0,
    },

    barPercentage: 0.55,
  };

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <View style={styles.progressChartsContainer}>
      {/* =================================================
          WEIGHT PROGRESS
      ================================================= */}

      <View
        style={[
          styles.progressChartCard,
          {
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.secondaryText,
          },
        ]}
      >
        {/* -----------------------------------------------
            HEADER
        ----------------------------------------------- */}

        <View style={styles.progressChartHeader}>
          <View>
            <Text
              style={[
                styles.progressChartTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              Weight Progress
            </Text>

            <Text
              style={[
                styles.progressChartSubtitle,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              Your weight over time
            </Text>
          </View>

          {/* UNIT */}

          <View
            style={[
              styles.progressChartUnit,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Text
              style={[
                styles.progressChartUnitText,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              kg
            </Text>
          </View>
        </View>

        {/* -----------------------------------------------
            WEIGHT BAR CHART
        ----------------------------------------------- */}

        <BarChart
          data={weightData}
          width={screenWidth - 70}
          height={220}
          fromZero
          yAxisLabel=""
          yAxisSuffix=" kg"
          showValuesOnTopOfBars={false}
          withInnerLines={false}
          withVerticalLabels
          withHorizontalLabels
          chartConfig={chartConfig}
          style={styles.progressChart}
        />
      </View>

      {/* =================================================
          NUTRITION PROGRESS
      ================================================= */}

      <View
        style={[
          styles.progressChartCard,
          {
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.secondaryText,
          },
        ]}
      >
        {/* -----------------------------------------------
            HEADER
        ----------------------------------------------- */}

        <View style={styles.progressChartHeader}>
          <View>
            <Text
              style={[
                styles.progressChartTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              Nutrition Progress
            </Text>

            <Text
              style={[
                styles.progressChartSubtitle,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              Daily calories, protein, carbs and fat
            </Text>
          </View>

          {/* UNIT */}

          <View
            style={[
              styles.progressChartUnit,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Text
              style={[
                styles.progressChartUnitText,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              Raw
            </Text>
          </View>
        </View>

        {/* -----------------------------------------------
            FOUR-LINE NUTRITION CHART
        ----------------------------------------------- */}

        <LineChart
          data={nutritionData}
          width={screenWidth}
          height={280}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          withInnerLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withVerticalLabels
          withHorizontalLabels
          chartConfig={{
            backgroundGradientFrom: colors.card,

            backgroundGradientTo: colors.card,

            decimalPlaces: 0,

            color: (opacity = 1) => `rgba(75, 201, 169, ${opacity})`,

            labelColor: () => colors.secondaryText,

            propsForDots: {
              r: "4",
              strokeWidth: "2",
            },

            propsForBackgroundLines: {
              strokeWidth: 0,
            },
          }}
          bezier
          style={styles.progressChart}
        />

        {/* -----------------------------------------------
            LEGEND
        ----------------------------------------------- */}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            gap: 14,
          }}
        >
          {/* CALORIES */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: "#4BC9A9",
                marginRight: 5,
              }}
            />

            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 12,
              }}
            >
              Calories
            </Text>
          </View>

          {/* PROTEIN */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: "#4285F4",
                marginRight: 5,
              }}
            />

            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 12,
              }}
            >
              Protein
            </Text>
          </View>

          {/* CARBS */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: "#FFC107",
                marginRight: 5,
              }}
            />

            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 12,
              }}
            >
              Carbs
            </Text>
          </View>

          {/* FAT */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: "#FF5252",
                marginRight: 5,
              }}
            />

            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 12,
              }}
            >
              Fat
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
