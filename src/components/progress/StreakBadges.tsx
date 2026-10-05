import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";

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

const getCurrentStepStreak = (
  stepLogs: StepLog[],
  dailyStepGoal: number,
  savedCurrent: number,
  savedDate: string | null,
) => {
  if (dailyStepGoal <= 0) {
    return { current: savedCurrent, date: savedDate };
  }

  const goalMetDates = new Set(
    stepLogs
      .filter((log) => Number(log.steps) >= dailyStepGoal)
      .map((log) => getDateKey(log.date)),
  );
  const todayKey = getTodayKey();
  const yesterdayKey = new Date(toUtcDay(todayKey) - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  // Keep the saved streak during an unfinished day; it can continue tomorrow.
  if (!goalMetDates.has(todayKey)) {
    if (savedDate) return { current: savedCurrent, date: savedDate };

    // Without saved state, build from yesterday and the available local logs.
    const availableDates = new Set(
      [...goalMetDates].filter((date) => date <= yesterdayKey),
    );
    return {
      current: getCurrentStreakFromDates(availableDates),
      date: [...availableDates].sort().pop() ?? null,
    };
  }

  if (savedDate === todayKey) {
    return { current: savedCurrent, date: todayKey };
  }

  if (savedDate === yesterdayKey) {
    return { current: savedCurrent + 1, date: todayKey };
  }

  // A stale saved date may be outside the locally retained step-log window.
  // Rebuild from the available qualifying dates rather than discarding history.
  return {
    current: getCurrentStreakFromDates(goalMetDates),
    date:
      [...goalMetDates]
        .filter((date) => date <= todayKey)
        .sort()
        .pop() ?? null,
  };
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
  const router = useRouter();
  const { colors } = useTheme();

  const [dailyStepGoal, setDailyStepGoal] = useState(0);
  const [stepGoalLoaded, setStepGoalLoaded] = useState(false);

  const [stepCurrent, setStepCurrent] = useState(0);
  const [stepCurrentDate, setStepCurrentDate] = useState<string | null>(null);
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
          setStepCurrentDate(
            savedData.date ? getDateKey(savedData.date) : null,
          );
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

    const result = getCurrentStepStreak(
      stepLogs,
      dailyStepGoal,
      stepCurrent,
      stepCurrentDate,
    );
    const { current, date } = result;
    const best = Math.max(stepBest, current);

    setStepCurrent(current);
    setStepCurrentDate(date);
    setStepBest(best);

    AsyncStorage.setItem(
      "stepStreaks",
      JSON.stringify({ current, best, date }),
    ).catch((error) => {
      console.warn("Could not save step streaks:", error);
    });
  }, [
    stepLogs,
    dailyStepGoal,
    stepStorageLoaded,
    stepGoalLoaded,
    stepBest,
    stepCurrent,
    stepCurrentDate,
  ]);

  // ===================================================
  // CURRENT AND BEST STREAKS
  // ===================================================

  const calorieCurrent = getCurrentRecordStreak(calorieStreakData);
  const calorieBest = getBestStreak(calorieStreakData);

  const waterBest = getBestStreak(waterStreakData);
  const nutrientBest = getBestStreak(nutrientStreakData);
  useEffect(() => {
    console.log("[StreakBadges] calorie streak input", {
      isArray: Array.isArray(calorieStreakData),
      records: Array.isArray(calorieStreakData)
        ? calorieStreakData.map(({ streakscore, streak_date, streak_day }) => ({
            streakscore,
            streak_date,
            streak_day,
          }))
        : calorieStreakData,
      calculatedCurrent: calorieCurrent,
      calculatedBest: calorieBest,
    });
  }, [calorieStreakData, calorieCurrent, calorieBest]);

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

  const today = new Date();
  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const key = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    return {
      key,
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
    };
  });
  const completedDays = new Set(
    calorieStreakData
      .filter((item) => Number(item.streakscore) > 0 && item.streak_date)
      .map((item) => getDateKey(item.streak_date!)),
  );

  return (
    <View style={{ marginBottom: 16 }}>
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          router.push({
            pathname: "/milestones",
            params: {
              section: "streaks",
              calorieCurrent: String(calorieCurrent),
              calorieBest: String(calorieBest),
              stepCurrent: String(stepCurrent),
              stepBest: String(stepBest),
              waterBest: String(waterBest),
              nutrientBest: String(nutrientBest),
              dailyStepGoal: String(dailyStepGoal),
              achievedBadges: JSON.stringify(
                achievedBadges.map(({ id, streak }) => ({ id, streak })),
              ),
              achievedCount: String(achievedBadges.length),
            },
          })
        }
        style={{
          backgroundColor: colors.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.secondaryText,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: colors.background,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Ionicons name="flame" size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}
            >
              Streak
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              {calorieCurrent} day{calorieCurrent === 1 ? "" : "s"} current ·{" "}
              {calorieBest} best
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 18,
          }}
        >
          {lastSevenDays.map((day) => {
            const achieved = completedDays.has(day.key);
            return (
              <View key={day.key} style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: achieved ? colors.primary : "transparent",
                    borderWidth: 2,
                    borderColor: achieved
                      ? colors.primary
                      : colors.secondaryText,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {achieved && (
                    <Ionicons name="checkmark" size={14} color={colors.card} />
                  )}
                </View>
                <Text
                  style={{
                    color: colors.secondaryText,
                    fontSize: 10,
                    marginTop: 5,
                  }}
                >
                  {day.label}
                </Text>
              </View>
            );
          })}
        </View>
        <Text
          style={{ color: colors.secondaryText, fontSize: 11, marginTop: 10 }}
        >
          Last 7 days · filled circles show goal achieved
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() =>
          router.push({
            pathname: "/milestones",
            params: {
              section: "badges",
              calorieCurrent: String(calorieCurrent),
              calorieBest: String(calorieBest),
              stepCurrent: String(stepCurrent),
              stepBest: String(stepBest),
              waterBest: String(waterBest),
              nutrientBest: String(nutrientBest),
              dailyStepGoal: String(dailyStepGoal),
              achievedBadges: JSON.stringify(
                achievedBadges.map(({ id, streak }) => ({ id, streak })),
              ),
              achievedCount: String(achievedBadges.length),
            },
          })
        }
        style={{
          backgroundColor: colors.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.secondaryText,
          padding: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: colors.background,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Ionicons name="ribbon-outline" size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: "700" }}
            >
              Badges
            </Text>
            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              {achievedBadges.length} earned
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          {(achievedBadges.length > 0
            ? achievedBadges.slice(0, 5)
            : allBadges.slice(0, 5)
          ).map((badge) => (
            <Image
              key={badge.id}
              source={badge.image}
              resizeMode="contain"
              style={{
                width: 42,
                height: 42,
                marginRight: 8,
                opacity: badge.achieved ? 1 : 0.3,
              }}
            />
          ))}
          {achievedBadges.length > 5 && (
            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 12,
                marginLeft: 2,
              }}
            >
              +{achievedBadges.length - 5}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}
