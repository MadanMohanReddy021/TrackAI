import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";

export default function StreakCard() {
  const { colors } = useTheme();

  const [currentStreak, setCurrentStreak] = useState(0);

  const [longestStreak, setLongestStreak] = useState(0);

  const [loading, setLoading] = useState(true);

  const loadStreak = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        console.log("User ID not found");
        return;
      }

      const response = await fetch(`${BASE_URL}/streak?userid=${userid}`);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Streak response:", data);

      setCurrentStreak(Number(data.currentStreak) || 0);

      setLongestStreak(Number(data.longestStreak) || 0);
    } catch (error) {
      console.log("Streak loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStreak();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 18,
          padding: 20,
          marginBottom: 16,
          height: 130,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 20,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Streak information */}

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Current Streak : Nutrion
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: 4,
          }}
        >
          <Text
            style={{
              color: colors.progress,
              fontSize: 42,
              fontWeight: "800",
            }}
          >
            {currentStreak}
          </Text>

          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 17,
              fontWeight: "600",
              marginLeft: 6,
            }}
          >
            {currentStreak === 1 ? "day" : "days"}
          </Text>
        </View>

        <Text
          style={{
            color: colors.secondaryText,
            fontSize: 13,
            marginTop: 2,
          }}
        >
          {currentStreak > 0 ? "Keep going! 🔥" : "Start your streak today"}
        </Text>

        <Text
          style={{
            color: colors.secondaryText,
            fontSize: 12,
            marginTop: 8,
          }}
        >
          Best: {longestStreak} days
        </Text>
      </View>

      {/* Fire icon */}

      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "rgba(255,107,53,0.12)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="flame" size={42} color="#FF6B35" />
      </View>
    </View>
  );
}
