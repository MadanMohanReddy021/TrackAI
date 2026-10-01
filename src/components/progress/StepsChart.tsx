import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/progressStyles";

const screenWidth = Dimensions.get("window").width;

export interface StepLog {
  date: string;
  steps: number;
}

interface StepsChartProps {
  stepLogs: StepLog[];
}

export default function StepsChart({ stepLogs }: StepsChartProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const stepsData = {
    labels: stepLogs.length ? stepLogs.map((item) => item.date) : ["No data"],

    datasets: [
      {
        data: stepLogs.length
          ? stepLogs.map((item) => Number(item.steps) || 0)
          : [0],
      },
    ],
  };

  return (
    <View
      style={[
        styles.stepsChartCard,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      {/* Header */}

      <View style={styles.stepsChartHeader}>
        <View>
          <Text
            style={[
              styles.stepsChartTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Weekly Steps
          </Text>

          <Text
            style={[
              styles.stepsChartSubtitle,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Your steps for the last 7 days
          </Text>
        </View>

        <View
          style={[
            styles.stepsGoalBadge,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <Text
            style={[
              styles.stepsGoalText,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            5K goal
          </Text>
        </View>
      </View>

      {/* Chart */}

      <BarChart
        data={stepsData}
        width={screenWidth - 70}
        height={220}
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
        showValuesOnTopOfBars={false}
        withInnerLines={false}
        withVerticalLabels
        withHorizontalLabels
        chartConfig={{
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,

          decimalPlaces: 0,

          color: (opacity = 1) => `rgba(75, 201, 169, ${opacity})`,

          labelColor: () => colors.secondaryText,

          barPercentage: 0.55,

          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        style={styles.stepsChart}
      />
    </View>
  );
}
