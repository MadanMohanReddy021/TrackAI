import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  previousScore: number;
  currentScore: number;

  previousConsistency: number;
  currentConsistency: number;

  totalSteps: number;
  averageSteps: number;

  longestStreak: number;
  bestDay: number;

  onViewReport?: () => void;
}

const MonthlyReport: React.FC<Props> = ({
  previousScore,
  currentScore,
  previousConsistency,
  currentConsistency,
  totalSteps,
  averageSteps,
  longestStreak,
  bestDay,
  onViewReport,
}) => {
  const scoreImprovement = Math.max(
    0,
    currentScore - previousScore
  );

  const ReportItem = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View>

          <Text style={styles.smallTitle}>
            Monthly Health Report
          </Text>

          <Text style={styles.title}>
            Last 30 Days
          </Text>

        </View>

        <View style={styles.badge}>

          <Text style={styles.badgeText}>
            +{scoreImprovement} pts
          </Text>

        </View>

      </View>

      <View style={styles.grid}>

        <ReportItem
          label="Health Score"
          value={`${previousScore} → ${currentScore}`}
        />

        <ReportItem
          label="Consistency"
          value={`${previousConsistency}% → ${currentConsistency}%`}
        />

        <ReportItem
          label="Total Steps"
          value={totalSteps.toLocaleString()}
        />

        <ReportItem
          label="Average Steps"
          value={averageSteps.toLocaleString()}
        />

        <ReportItem
          label="Longest Streak"
          value={`${longestStreak} Days`}
        />

        <ReportItem
          label="Best Day"
          value={bestDay.toLocaleString()}
        />

      </View>

      <Pressable
        style={styles.button}
        onPress={onViewReport}
      >
        <Text style={styles.buttonText}>
          View Full Report
        </Text>
      </Pressable>

    </View>
  );
};

export default MonthlyReport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F172A",

    borderRadius: 24,

    padding: 20,

    marginTop: 20,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 20,
  },

  smallTitle: {
    color: "#94A3B8",

    fontSize: 12,
  },

  title: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 22,

    marginTop: 4,
  },

  badge: {
    backgroundColor: "#14532D",

    borderRadius: 18,

    paddingHorizontal: 14,

    paddingVertical: 8,
  },

  badgeText: {
    color: "#86EFAC",

    fontWeight: "700",
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  card: {
    width: "48%",

    backgroundColor: "#1E293B",

    borderRadius: 14,

    padding: 14,

    marginBottom: 12,
  },

  label: {
    color: "#94A3B8",

    fontSize: 11,
  },

  value: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 16,

    marginTop: 6,
  },

  button: {
    backgroundColor: "#FFFFFF",

    borderRadius: 30,

    marginTop: 10,

    paddingVertical: 14,

    alignItems: "center",
  },

  buttonText: {
    color: "#0F172A",

    fontWeight: "700",

    fontSize: 16,
  },
});