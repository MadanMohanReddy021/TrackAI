import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { ChevronRight } from "lucide-react-native";

interface Props {
  icon: React.ReactNode;

  title: string;

  subtitle: string;

  percentage: number;

  color: string;

  backgroundColor: string;
}

const FactorRow: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  percentage,
  color,
  backgroundColor,
}) => {
  return (
    <View style={styles.container}>

      <View
        style={[
          styles.iconBox,
          { backgroundColor },
        ]}
      >
        {icon}
      </View>

      <View style={styles.content}>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.progressBackground}>

          <View
            style={[
              styles.progress,
              {
                width: `${percentage}%`,
                backgroundColor: color,
              },
            ]}
          />

        </View>

      </View>

      <Text style={styles.percent}>
        {percentage}%
      </Text>

      <ChevronRight
        size={18}
        color="#9CA3AF"
      />

    </View>
  );
};

export default FactorRow;

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 14,
    marginRight: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  progressBackground: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginTop: 10,
    overflow: "hidden",
  },

  progress: {
    height: 6,
    borderRadius: 4,
  },

  percent: {
    width: 45,
    textAlign: "right",
    fontWeight: "700",
    color: "#111827",
    marginRight: 8,
  },

});