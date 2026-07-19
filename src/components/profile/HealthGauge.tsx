import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, {
    Defs,
    LinearGradient,
    Path,
    Stop,
} from "react-native-svg";

import {
    MAX_SCORE,
    MIN_SCORE,
} from "../../constants/healthScore";

import { statusFor } from "../../utils/healthScore";

interface Props {
  score: number;
}

const RADIUS = 120;
const CENTER_X = 140;
const CENTER_Y = 140;

const HealthGauge: React.FC<Props> = ({ score }) => {
  const percentage = Math.max(
    0,
    Math.min(
      1,
      (score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)
    )
  );

  const angle = Math.PI - Math.PI * percentage;

  const endX =
    CENTER_X + RADIUS * Math.cos(angle);

  const endY =
    CENTER_Y - RADIUS * Math.sin(angle);

  const largeArc = percentage > 0.5 ? 1 : 0;

  const status = statusFor(score);

  const badgeColor = {
    danger: "#EF4444",
    warn: "#F59E0B",
    good: "#10B981",
    excellent: "#059669",
  }[status.tone];

  return (
    <View style={styles.container}>
      <Svg
        width={320}
        height={180}
        viewBox="0 0 280 170"
      >
        <Defs>
          <LinearGradient
            id="grad"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <Stop
              offset="0%"
              stopColor="#EF4444"
            />
            <Stop
              offset="40%"
              stopColor="#F59E0B"
            />
            <Stop
              offset="75%"
              stopColor="#10B981"
            />
            <Stop
              offset="100%"
              stopColor="#059669"
            />
          </LinearGradient>
        </Defs>

        {/* Background Track */}

        <Path
          d={`
            M ${CENTER_X - RADIUS} ${CENTER_Y}
            A ${RADIUS} ${RADIUS}
            0 0 1
            ${CENTER_X + RADIUS}
            ${CENTER_Y}
          `}
          stroke="#E5E7EB"
          strokeWidth={16}
          fill="none"
          strokeLinecap="round"
        />

        {/* Progress */}

        <Path
          d={`
            M ${CENTER_X - RADIUS} ${CENTER_Y}
            A ${RADIUS} ${RADIUS}
            0 ${largeArc} 1
            ${endX}
            ${endY}
          `}
          stroke="url(#grad)"
          strokeWidth={16}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.score}>
          {score}
        </Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: badgeColor },
          ]}
        >
          <Text style={styles.badgeText}>
            {status.label}
          </Text>
        </View>
      </View>

      <View style={styles.range}>
        <Text style={styles.rangeText}>
          {MIN_SCORE}
        </Text>

        <Text style={styles.rangeText}>
          {MAX_SCORE}
        </Text>
      </View>
    </View>
  );
};

export default HealthGauge;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  center: {
    position: "absolute",

    top: 70,

    alignItems: "center",
  },

  score: {
    fontSize: 54,

    fontWeight: "700",

    color: "#111827",
  },

  badge: {
    marginTop: 10,

    borderRadius: 20,

    paddingHorizontal: 18,

    paddingVertical: 6,
  },

  badgeText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 12,
  },

  range: {
    width: 280,

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: -10,
  },

  rangeText: {
    color: "#6B7280",

    fontSize: 12,
  },
});