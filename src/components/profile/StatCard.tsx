import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
  badgeColor?: string;
  iconBackground?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  badge,
  badgeColor = "#10B981",
  iconBackground = "#ECFDF5",
}) => {
  return (
    <View style={styles.container}>

      <View
        style={[
          styles.iconContainer,
          { backgroundColor: iconBackground },
        ]}
      >
        {icon}
      </View>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

      {badge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: badgeColor + "20",
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: badgeColor },
            ]}
          >
            {badge}
          </Text>
        </View>
      )}

    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  label: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },

  badge: {
    marginTop: 6,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
});