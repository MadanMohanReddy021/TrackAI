import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/progressStyles";

// =====================================================
// TYPES
// =====================================================

export interface StreakRecord {
  streakid?: string;
  userid?: string;
  streakscore: number;
  streak_date?: string;
  streak_day?: string;
  color?: string;
}

interface StepLog {
  date: string;
  steps: number;
}

interface StreakBadgesProps {
  calorieStreakData: StreakRecord[];
  waterStreakData: StreakRecord[];
  nutrientStreakData: StreakRecord[];
  stepLogs: StepLog[];
}

// =====================================================
// BADGE MILESTONES
// =====================================================

const BADGE_MILESTONES = [3, 7, 14, 50, 100, 365];

// =====================================================
// BADGE IMAGES
// =====================================================

const BADGE_IMAGES = {
  calories: {
    3: require("../../../assets/badges/cal3.png"),
    7: require("../../../assets/badges/cal7.png"),
    14: require("../../../assets/badges/cal14.png"),
    50: require("../../../assets/badges/cal50.png"),
    100: require("../../../assets/badges/cal100.png"),
    365: require("../../../assets/badges/cal365.png"),
  },

  water: {
    3: require("../../../assets/badges/water3.png"),
    7: require("../../../assets/badges/water7.png"),
    14: require("../../../assets/badges/water14.png"),
    50: require("../../../assets/badges/water50.png"),
    100: require("../../../assets/badges/water100.png"),
    365: require("../../../assets/badges/water365.png"),
  },

  nutrients: {
    3: require("../../../assets/badges/nut3.png"),
    7: require("../../../assets/badges/nut7.png"),
    14: require("../../../assets/badges/nut14.png"),
    50: require("../../../assets/badges/nut50.png"),
    100: require("../../../assets/badges/nut100.png"),
    365: require("../../../assets/badges/nut365.png"),
  },

  steps: {
    3: require("../../../assets/badges/step3.png"),
    7: require("../../../assets/badges/step7.png"),
    14: require("../../../assets/badges/step14.png"),
    50: require("../../../assets/badges/step50.png"),
    100: require("../../../assets/badges/step100.png"),
    365: require("../../../assets/badges/step365.png"),
  },
};

// =====================================================
// STREAK HELPERS
// =====================================================

const getBestStreak = (data: StreakRecord[]) => {
  if (!data.length) return 0;

  return Math.max(...data.map((item) => Number(item.streakscore) || 0));
};

const getDateKey = (date: string) => date.slice(0, 10);

const getTodayKey = () => {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
};

const toUtcDay = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
};

const getCurrentStreakFromDates = (dates: Set<string>) => {
  if (dates.size === 0) return 0;

  const todayKey = getTodayKey();

  // The latest qualifying day must be today or yesterday.
  const latestDate = [...dates]
    .filter((date) => date <= todayKey)
    .sort()
    .pop();

  if (!latestDate) return 0;

  const dayMs = 24 * 60 * 60 * 1000;
  const daysSinceLatest = (toUtcDay(todayKey) - toUtcDay(latestDate)) / dayMs;

  if (daysSinceLatest > 1) return 0;

  let streak = 0;
  let date = latestDate;

  while (dates.has(date)) {
    streak++;
    date = new Date(toUtcDay(date) - dayMs).toISOString().slice(0, 10);
  }

  return streak;
};

const getCurrentRecordStreak = (data: StreakRecord[]) => {
  const dates = new Set(
    data
      .filter((item) => Number(item.streakscore) > 0 && item.streak_date)
      .map((item) => getDateKey(item.streak_date!)),
  );

  return getCurrentStreakFromDates(dates);
};

const getCurrentStepStreak = (stepLogs: StepLog[], dailyStepGoal: number) => {
  if (dailyStepGoal <= 0) return 0;

  const goalMetDates = new Set(
    stepLogs
      .filter((log) => Number(log.steps) >= dailyStepGoal)
      .map((log) => getDateKey(log.date)),
  );

  return getCurrentStreakFromDates(goalMetDates);
};

// =====================================================
// COMPONENT
// =====================================================

export default function StreakBadges({
  calorieStreakData,
  waterStreakData,
  nutrientStreakData,
  stepLogs,
}: StreakBadgesProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [showUnachieved, setShowUnachieved] = useState(false);

  const [dailyStepGoal, setDailyStepGoal] = useState(0);
  const [stepGoalLoaded, setStepGoalLoaded] = useState(false);

  const [stepCurrent, setStepCurrent] = useState(0);
  const [stepBest, setStepBest] = useState(0);
  const [stepStorageLoaded, setStepStorageLoaded] = useState(false);

  // ===================================================
  // LOAD STEP GOAL FROM SAVED PROFILE
  // ===================================================

  useEffect(() => {
    let cancelled = false;

    const loadStepGoal = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem("profile");
        const profile = savedProfile ? JSON.parse(savedProfile) : null;
        const goal = Number(profile?.data?.minimum_steps) || 0;

        if (!cancelled) {
          setDailyStepGoal(goal);
        }
      } catch (error) {
        console.warn("Could not load the step goal from profile:", error);
      } finally {
        if (!cancelled) {
          setStepGoalLoaded(true);
        }
      }
    };

    loadStepGoal();

    return () => {
      cancelled = true;
    };
  }, []);

  // ===================================================
  // LOAD SAVED STEP STREAKS
  // ===================================================

  useEffect(() => {
    let cancelled = false;

    const loadSavedStepStreaks = async () => {
      try {
        const savedValue = await AsyncStorage.getItem("stepStreaks");
        const savedData = savedValue ? JSON.parse(savedValue) : {};

        if (!cancelled) {
          setStepBest(Number(savedData.best) || 0);
          setStepCurrent(Number(savedData.current) || 0);
        }
      } catch (error) {
        console.warn("Could not load saved step streaks:", error);
      } finally {
        if (!cancelled) {
          setStepStorageLoaded(true);
        }
      }
    };

    loadSavedStepStreaks();

    return () => {
      cancelled = true;
    };
  }, []);

  // ===================================================
  // CALCULATE AND SAVE STEP STREAKS
  // ===================================================

  useEffect(() => {
    if (!stepStorageLoaded || !stepGoalLoaded) return;

    const current = getCurrentStepStreak(stepLogs, dailyStepGoal);
    const best = Math.max(stepBest, current);

    setStepCurrent(current);
    setStepBest(best);

    AsyncStorage.setItem(
      "stepStreaks",
      JSON.stringify({ current, best }),
    ).catch((error) => {
      console.warn("Could not save step streaks:", error);
    });
  }, [stepLogs, dailyStepGoal, stepStorageLoaded, stepGoalLoaded, stepBest]);

  // ===================================================
  // CURRENT AND BEST STREAKS
  // ===================================================

  const calorieCurrent = getCurrentRecordStreak(calorieStreakData);
  const calorieBest = getBestStreak(calorieStreakData);

  const waterBest = getBestStreak(waterStreakData);
  const nutrientBest = getBestStreak(nutrientStreakData);

  // ===================================================
  // CREATE ALL BADGES
  // ===================================================

  const allBadges = useMemo(() => {
    const badges: {
      id: string;
      image: any;
      streak: number;
      achieved: boolean;
    }[] = [];

    const categories = [
      {
        name: "calories",
        best: calorieBest,
        images: BADGE_IMAGES.calories,
      },
      {
        name: "water",
        best: waterBest,
        images: BADGE_IMAGES.water,
      },
      {
        name: "nutrients",
        best: nutrientBest,
        images: BADGE_IMAGES.nutrients,
      },
      {
        name: "steps",
        best: stepBest,
        images: BADGE_IMAGES.steps,
      },
    ];

    categories.forEach((category) => {
      BADGE_MILESTONES.forEach((milestone) => {
        badges.push({
          id: `${category.name}-${milestone}`,
          image: category.images[milestone as keyof typeof category.images],
          streak: milestone,
          achieved: category.best >= milestone,
        });
      });
    });

    return badges;
  }, [calorieBest, waterBest, nutrientBest, stepBest]);

  // ===================================================
  // ACHIEVED / UNACHIEVED BADGES
  // ===================================================

  const achievedBadges = allBadges.filter((badge) => badge.achieved);
  const unachievedBadges = allBadges.filter((badge) => !badge.achieved);

  // ===================================================
  // RENDER BADGE
  // ===================================================

  const renderBadge = (badge: (typeof allBadges)[number]) => (
    <View
      key={badge.id}
      style={{
        width: 72,
        height: 72,
        margin: 6,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={badge.image}
        resizeMode="contain"
        style={{
          width: 64,
          height: 64,
          opacity: badge.achieved ? 1 : 0.25,
        }}
      />
    </View>
  );

  // ===================================================
  // UI
  // ===================================================

  return (
    <View
      style={[
        styles.progressChartCard,
        {
          backgroundColor: colors.card,
          marginBottom: 16,
        },
      ]}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Badges
          </Text>

          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 12,
              marginTop: 3,
            }}
          >
            Your streak achievements
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 12,
            backgroundColor: colors.background,
          }}
        >
          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {achievedBadges.length}/{allBadges.length}
          </Text>
        </View>
      </View>

      {/* CALORIE STREAK SUMMARY */}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 12,
          padding: 12,
          borderRadius: 12,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
            Current calorie streak
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            {calorieCurrent} days
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
            Best calorie streak
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            {calorieBest} days
          </Text>
        </View>
      </View>

      {/* STEP STREAK SUMMARY */}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 16,
          padding: 12,
          borderRadius: 12,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
            Current steps streak
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            {stepCurrent} days
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
            Best steps streak
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            {stepBest} days
          </Text>
        </View>
      </View>

      {/* ACHIEVED */}
      <Text
        style={{
          color: colors.text,
          fontSize: 14,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        Achieved
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          marginHorizontal: -6,
        }}
      >
        {achievedBadges.length > 0 ? (
          achievedBadges.map(renderBadge)
        ) : (
          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 13,
              paddingVertical: 10,
            }}
          >
            No badges achieved yet.
          </Text>
        )}
      </View>

      {/* UNACHIEVED TOGGLE */}
      {unachievedBadges.length > 0 && (
        <Pressable
          onPress={() => setShowUnachieved((previous) => !previous)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            marginTop: 4,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 13,
              fontWeight: "600",
              marginRight: 5,
            }}
          >
            {showUnachieved ? "Hide Unachieved" : "Show Unachieved"}
          </Text>

          <Ionicons
            name={showUnachieved ? "chevron-up" : "chevron-down"}
            size={16}
            color={colors.primary}
          />
        </Pressable>
      )}

      {/* UNACHIEVED */}
      {showUnachieved && unachievedBadges.length > 0 && (
        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            Unachieved
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              marginHorizontal: -6,
            }}
          >
            {unachievedBadges.map(renderBadge)}
          </View>
        </View>
      )}
    </View>
  );
}
