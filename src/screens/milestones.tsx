import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { Image, Pressable, ScrollView, Share, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";

const MILESTONES = [3, 7, 14, 50, 100, 365] as const;
const CATEGORIES = ["calories", "water", "nutrients", "steps"] as const;
type Category = (typeof CATEGORIES)[number];

// Keep these asset paths aligned with the badge assets used by StreakBadges.
const BADGE_IMAGES: Record<Category, Record<number, any>> = {
  calories: {
    3: require("../../assets/badges/cal3.png"),
    7: require("../../assets/badges/cal7.png"),
    14: require("../../assets/badges/cal14.png"),
    50: require("../../assets/badges/cal50.png"),
    100: require("../../assets/badges/cal100.png"),
    365: require("../../assets/badges/cal365.png"),
  },
  water: {
    3: require("../../assets/badges/water3.png"),
    7: require("../../assets/badges/water7.png"),
    14: require("../../assets/badges/water14.png"),
    50: require("../../assets/badges/water50.png"),
    100: require("../../assets/badges/water100.png"),
    365: require("../../assets/badges/water365.png"),
  },
  nutrients: {
    3: require("../../assets/badges/nut3.png"),
    7: require("../../assets/badges/nut7.png"),
    14: require("../../assets/badges/nut14.png"),
    50: require("../../assets/badges/nut50.png"),
    100: require("../../assets/badges/nut100.png"),
    365: require("../../assets/badges/nut365.png"),
  },
  steps: {
    3: require("../../assets/badges/step3.png"),
    7: require("../../assets/badges/step7.png"),
    14: require("../../assets/badges/step14.png"),
    50: require("../../assets/badges/step50.png"),
    100: require("../../assets/badges/step100.png"),
    365: require("../../assets/badges/step365.png"),
  },
};

const BADGE_NAMES: Record<number, string> = {
  3: "Rookie",
  7: "Getting Started",
  14: "On a Roll",
  50: "Locked In",
  100: "Triple Threat",
  365: "No Days Off",
};

const numericParam = (value?: string | string[], fallback = 0) => {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function MilestonesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    section?: string;
    calorieCurrent?: string;
    calorieBest?: string;
    stepCurrent?: string;
    stepBest?: string;
    waterBest?: string;
    nutrientBest?: string;
    dailyStepGoal?: string;
    achievedBadges?: string;
    achievedCount?: string;
  }>();
  const { colors } = useTheme();

  const currentStreak = numericParam(params.calorieCurrent);
  const earnedBadgeIds = useMemo(() => {
    try {
      const raw = Array.isArray(params.achievedBadges)
        ? params.achievedBadges[0]
        : params.achievedBadges;
      let parsed: unknown = raw ?? [];

      // Expo Router params are strings; tolerate an accidentally double-encoded payload too.
      for (
        let attempt = 0;
        attempt < 2 && typeof parsed === "string";
        attempt++
      ) {
        parsed = JSON.parse(parsed);
      }

      const entries = Array.isArray(parsed)
        ? parsed
        : parsed &&
            typeof parsed === "object" &&
            "achievedBadges" in parsed &&
            Array.isArray(parsed.achievedBadges)
          ? parsed.achievedBadges
          : parsed &&
              typeof parsed === "object" &&
              "badges" in parsed &&
              Array.isArray(parsed.badges)
            ? parsed.badges
            : [];

      return new Set<string>(
        entries.flatMap((badge) => {
          if (typeof badge === "string") return [badge];
          if (
            badge &&
            typeof badge === "object" &&
            "id" in badge &&
            typeof badge.id === "string"
          ) {
            return [badge.id];
          }
          return [];
        }),
      );
    } catch (error) {
      console.error(
        "[Milestones] Could not parse achieved badges route param",
        error,
      );
      return new Set<string>();
    }
  }, [params.achievedBadges]);

  // An earned milestone is also a reliable lower bound when a streak param is missing.
  const earnedStreakMilestone = Math.max(
    0,
    ...Array.from(earnedBadgeIds, (id) => Number(id.split("-").at(-1)) || 0),
  );
  const longestStreak = Math.max(
    numericParam(params.calorieBest),
    numericParam(params.stepBest),
    numericParam(params.waterBest),
    numericParam(params.nutrientBest),
    earnedStreakMilestone,
  );

  const bestByCategory: Record<Category, number> = {
    calories: Math.max(numericParam(params.calorieBest), currentStreak),
    water: numericParam(params.waterBest),
    nutrients: numericParam(params.nutrientBest),
    steps: Math.max(
      numericParam(params.stepBest),
      numericParam(params.stepCurrent),
    ),
  };
  useEffect(() => {
    console.log("[Milestones] route params and streak summary", {
      section: params.section,
      calorieCurrent: params.calorieCurrent,
      calorieBest: params.calorieBest,
      stepCurrent: params.stepCurrent,
      stepBest: params.stepBest,
      waterBest: params.waterBest,
      nutrientBest: params.nutrientBest,
      achievedCountParam: params.achievedCount,
      achievedBadgeIds: Array.from(earnedBadgeIds),
      bestByCategory,
      achievedFromStreaks: CATEGORIES.flatMap((category) =>
        MILESTONES.filter(
          (milestone) => bestByCategory[category] >= milestone,
        ).map((milestone) => `${category}-${milestone}`),
      ),
      longestStreak,
    });
  }, [
    params.section,
    params.calorieCurrent,
    params.calorieBest,
    params.stepCurrent,
    params.stepBest,
    params.waterBest,
    params.nutrientBest,
    params.achievedCount,
    earnedBadgeIds,
    longestStreak,
  ]);

  const badges = CATEGORIES.flatMap((category) =>
    MILESTONES.map((milestone) => {
      const id = `${category}-${milestone}`;
      return {
        id,
        category,
        milestone,
        image: BADGE_IMAGES[category][milestone],
        achieved:
          earnedBadgeIds.has(id) || bestByCategory[category] >= milestone,
      };
    }),
  );
  const earnedCount = badges.filter((badge) => badge.achieved).length;
  const progress = badges.length ? earnedCount / badges.length : 0;

  const handleShare = async () => {
    await Share.share({
      message: `I've earned ${earnedCount} of ${badges.length} badges and my current streak is ${currentStreak} days!`,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{ paddingHorizontal: 22, paddingTop: 12, paddingBottom: 22 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={circleButton(colors.card)}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share milestones"
            onPress={handleShare}
            style={circleButton(colors.card)}
          >
            <Ionicons name="share-outline" size={23} color={colors.text} />
          </Pressable>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 36,
            fontWeight: "800",
            marginTop: 24,
            marginBottom: 22,
          }}
        >
          Milestones
        </Text>

        <View style={{ flexDirection: "row", marginHorizontal: -6 }}>
          <View style={{ flex: 1, alignItems: "center", marginHorizontal: 6 }}>
            <View
              style={{
                height: 124,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Ionicons name="flame" size={82} color="#F3A12E" />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 27,
                  fontWeight: "800",
                  marginTop: -11,
                }}
              >
                {currentStreak}
              </Text>
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: 17,
                fontWeight: "600",
                marginTop: 8,
              }}
            >
              Day streak
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center", marginHorizontal: 6 }}>
            <View
              style={{
                height: 124,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 24,
                  backgroundColor: "#342A43",
                  borderColor: "#D0A850",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [{ rotate: "45deg" }],
                }}
              >
                <Ionicons
                  name="ribbon"
                  size={42}
                  color="#BBA6D2"
                  style={{ transform: [{ rotate: "-45deg" }] }}
                />
              </View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 27,
                  fontWeight: "800",
                  marginTop: -3,
                }}
              >
                {earnedCount}
              </Text>
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: 17,
                fontWeight: "600",
                marginTop: 8,
              }}
            >
              Badges earned
            </Text>
          </View>
        </View>

        <View
          style={{ flexDirection: "row", marginTop: 18, marginHorizontal: -5 }}
        >
          <View style={summaryCard(colors.card, colors.secondaryText)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="flame" size={23} color="#F3A12E" />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  marginLeft: 8,
                  fontWeight: "600",
                }}
              >
                {longestStreak} days
              </Text>
            </View>
            <Text
              style={{
                color: colors.secondaryText,
                fontSize: 13,
                marginTop: 5,
                marginLeft: 31,
              }}
            >
              longest streak
            </Text>
          </View>
          <View style={summaryCard(colors.card, colors.secondaryText)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="ribbon" size={22} color="#57476B" />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 15,
                  marginLeft: 8,
                  fontWeight: "600",
                }}
              >
                {earnedCount}/{badges.length} Badges
              </Text>
            </View>
            <View
              style={{
                height: 5,
                backgroundColor: colors.background,
                borderRadius: 4,
                marginTop: 7,
                marginLeft: 30,
              }}
            >
              <View
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  height: 5,
                  backgroundColor: colors.primary,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.card,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          paddingHorizontal: 14,
          paddingTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {badges.map((badge) => (
            <View
              key={badge.id}
              style={{
                width: "33.333%",
                alignItems: "center",
                paddingHorizontal: 3,
                paddingBottom: 22,
              }}
            >
              <View
                style={{
                  width: 92,
                  height: 92,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={badge.image}
                  resizeMode="contain"
                  style={{
                    width: 88,
                    height: 88,
                    opacity: badge.achieved ? 1 : 0.24,
                  }}
                />
                <View style={{ position: "absolute", top: 2, right: 2 }}>
                  <Ionicons
                    name={badge.achieved ? "checkmark-circle" : "lock-closed"}
                    size={18}
                    color={
                      badge.achieved ? colors.primary : colors.secondaryText
                    }
                  />
                </View>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  color: colors.text,
                  fontSize: 13,
                  fontWeight: "600",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                {BADGE_NAMES[badge.milestone]}
              </Text>
              <Text
                style={{
                  color: colors.secondaryText,
                  fontSize: 11,
                  marginTop: 3,
                  textAlign: "center",
                }}
              >
                {badge.milestone} day streak · {categoryLabel(badge.category)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function circleButton(backgroundColor: string) {
  return {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };
}

function summaryCard(backgroundColor: string, borderColor: string) {
  return {
    flex: 1,
    minHeight: 76,
    marginHorizontal: 5,
    paddingHorizontal: 11,
    paddingVertical: 12,
    borderRadius: 19,
    borderWidth: 1,
    borderColor,
    backgroundColor,
    justifyContent: "center" as const,
  };
}

function categoryLabel(category: Category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}
