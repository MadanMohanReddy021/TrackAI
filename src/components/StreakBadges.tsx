import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const BASE_URL = "YOUR_BASE_URL";

const BADGES_API = `${BASE_URL}/badges`;

// ============================================================
// TYPES
// ============================================================

type Category = "calories" | "nutrition" | "water" | "steps";

type BadgeData = {
  calories: number[];
  nutrition: number[];
  water: number[];
  steps: number[];
};

// ============================================================
// STREAK LEVELS
// ============================================================

const STREAK_DAYS = [1, 3, 7, 14, 30, 50, 100, 183, 365];

// ============================================================
// BADGE IMAGES
// IMPORTANT:
// React Native / Metro needs static require() statements.
// Do not try require(`./${days}.png`).
// ============================================================

const BADGE_IMAGES: Record<Category, Record<number, any>> = {
  calories: {
    1: require("../assets/badges/calories/1.png"),
    3: require("../assets/badges/calories/3.png"),
    7: require("../assets/badges/calories/7.png"),
    14: require("../assets/badges/calories/14.png"),
    30: require("../assets/badges/calories/30.png"),
    50: require("../assets/badges/calories/50.png"),
    100: require("../assets/badges/calories/100.png"),
    183: require("../assets/badges/calories/183.png"),
    365: require("../assets/badges/calories/365.png"),
  },

  nutrition: {
    1: require("../assets/badges/nutrition/1.png"),
    3: require("../assets/badges/nutrition/3.png"),
    7: require("../assets/badges/nutrition/7.png"),
    14: require("../assets/badges/nutrition/14.png"),
    30: require("../assets/badges/nutrition/30.png"),
    50: require("../assets/badges/nutrition/50.png"),
    100: require("../assets/badges/nutrition/100.png"),
    183: require("../assets/badges/nutrition/183.png"),
    365: require("../assets/badges/nutrition/365.png"),
  },

  water: {
    1: require("../assets/badges/water/1.png"),
    3: require("../assets/badges/water/3.png"),
    7: require("../assets/badges/water/7.png"),
    14: require("../assets/badges/water/14.png"),
    30: require("../assets/badges/water/30.png"),
    50: require("../assets/badges/water/50.png"),
    100: require("../assets/badges/water/100.png"),
    183: require("../assets/badges/water/183.png"),
    365: require("../assets/badges/water/365.png"),
  },

  steps: {
    1: require("../assets/badges/steps/1.png"),
    3: require("../assets/badges/steps/3.png"),
    7: require("../assets/badges/steps/7.png"),
    14: require("../assets/badges/steps/14.png"),
    30: require("../assets/badges/steps/30.png"),
    50: require("../assets/badges/steps/50.png"),
    100: require("../assets/badges/steps/100.png"),
    183: require("../assets/badges/steps/183.png"),
    365: require("../assets/badges/steps/365.png"),
  },
};

// ============================================================
// CATEGORY CONFIG
// ============================================================

const CATEGORY_CONFIG: Record<
  Category,
  {
    title: string;
    subtitle: string;
    color: string;
  }
> = {
  calories: {
    title: "Calories",
    subtitle: "Stay on track with your calorie goal",
    color: "#F59E0B",
  },

  nutrition: {
    title: "Nutrition",
    subtitle: "Build consistent nutrition habits",
    color: "#22C55E",
  },

  water: {
    title: "Water",
    subtitle: "Keep yourself hydrated",
    color: "#2196F3",
  },

  steps: {
    title: "Steps",
    subtitle: "Keep moving every day",
    color: "#8B5CF6",
  },
};

const CATEGORIES: Category[] = ["calories", "nutrition", "water", "steps"];

// ============================================================
// COMPONENT
// ============================================================

export default function StreakBadges() {
  const [badges, setBadges] = useState<BadgeData>({
    calories: [],
    nutrition: [],
    water: [],
    steps: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [showAll, setShowAll] = useState(false);

  // ==========================================================
  // LOAD BADGES
  // ==========================================================

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      setLoading(true);
      setError(null);

      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        setError("User ID not found");
        return;
      }

      const response = await fetch(
        `${BADGES_API}?userid=${encodeURIComponent(userid)}`,
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("BADGES API RESPONSE:", data);

      // Expected backend response:
      //
      // {
      //   calories: [1,3,7,14],
      //   nutrition: [1,3,7],
      //   water: [1,3,7,14,30],
      //   steps: [1,3,7]
      // }

      setBadges({
        calories: Array.isArray(data.calories) ? data.calories : [],

        nutrition: Array.isArray(data.nutrition) ? data.nutrition : [],

        water: Array.isArray(data.water) ? data.water : [],

        steps: Array.isArray(data.steps) ? data.steps : [],
      });
    } catch (err) {
      console.log("BADGES API ERROR:", err);

      setError("Unable to load badges");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#111827" />

        <Text style={styles.loadingText}>Loading badges...</Text>
      </View>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.retryButton} onPress={loadBadges}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  // ==========================================================
  // MAIN UI
  // ==========================================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Your Badges</Text>

          <Text style={styles.subtitle}>
            Stay consistent and unlock achievements
          </Text>
        </View>
      </View>

      {/* SHOW ALL TOGGLE */}

      <Pressable
        style={styles.toggleCard}
        onPress={() => setShowAll((previous) => !previous)}
      >
        <View>
          <Text style={styles.toggleTitle}>
            {showAll ? "Hide locked badges" : "Show all badges"}
          </Text>

          <Text style={styles.toggleSubtitle}>
            {showAll ? "Only show earned badges" : "View all available badges"}
          </Text>
        </View>

        <View style={[styles.switch, showAll && styles.switchActive]}>
          <View
            style={[styles.switchCircle, showAll && styles.switchCircleActive]}
          />
        </View>
      </Pressable>

      {/* CATEGORY SECTIONS */}

      {CATEGORIES.map((category) => (
        <CategorySection
          key={category}
          category={category}
          earnedDays={badges[category]}
          showAll={showAll}
        />
      ))}
    </ScrollView>
  );
}

// ============================================================
// CATEGORY SECTION
// ============================================================

function CategorySection({
  category,
  earnedDays,
  showAll,
}: {
  category: Category;
  earnedDays: number[];
  showAll: boolean;
}) {
  const config = CATEGORY_CONFIG[category];

  const earnedSet = new Set(earnedDays);

  const earnedCount = STREAK_DAYS.filter((day) => earnedSet.has(day)).length;

  const visibleDays = showAll
    ? STREAK_DAYS
    : STREAK_DAYS.filter((day) => earnedSet.has(day));

  return (
    <View style={styles.section}>
      {/* SECTION HEADER */}

      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: config.color,
              },
            ]}
          >
            {config.title}
          </Text>

          <Text style={styles.sectionSubtitle}>{config.subtitle}</Text>
        </View>

        <View
          style={[
            styles.count,
            {
              borderColor: config.color,
            },
          ]}
        >
          <Text
            style={[
              styles.countText,
              {
                color: config.color,
              },
            ]}
          >
            {earnedCount}/{STREAK_DAYS.length}
          </Text>
        </View>
      </View>

      {/* BADGES */}

      {visibleDays.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No badges earned yet. Keep going!
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgesContainer}
        >
          {visibleDays.map((days) => {
            const earned = earnedSet.has(days);

            return (
              <BadgeCard
                key={`${category}-${days}`}
                category={category}
                days={days}
                earned={earned}
                color={config.color}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

// ============================================================
// BADGE CARD
// ============================================================

function BadgeCard({
  category,
  days,
  earned,
  color,
}: {
  category: Category;
  days: number;
  earned: boolean;
  color: string;
}) {
  return (
    <View style={[styles.badgeCard, !earned && styles.lockedBadgeCard]}>
      {/* ACTUAL BADGE IMAGE */}

      <Image
        source={BADGE_IMAGES[category][days]}
        style={[styles.badgeImage, !earned && styles.lockedImage]}
        resizeMode="contain"
      />

      {/* DAY TEXT */}

      <Text style={[styles.daysText, !earned && styles.lockedText]}>
        {days}
      </Text>

      <Text style={[styles.dayLabel, !earned && styles.lockedText]}>
        {days === 1 ? "DAY" : "DAYS"}
      </Text>

      {/* STATUS */}

      <Text
        style={[
          styles.status,
          {
            color: earned ? color : "#9CA3AF",
          },
        ]}
      >
        {earned ? "Earned" : "Locked"}
      </Text>
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 15,
    textAlign: "center",
  },

  retryButton: {
    marginTop: 15,
    backgroundColor: "#111827",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
  },

  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // HEADER

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  // TOGGLE

  toggleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  toggleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  toggleSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#9CA3AF",
  },

  switch: {
    width: 48,
    height: 27,
    borderRadius: 20,
    backgroundColor: "#D1D5DB",
    padding: 3,
    justifyContent: "center",
  },

  switchActive: {
    backgroundColor: "#111827",
  },

  switchCircle: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },

  switchCircleActive: {
    alignSelf: "flex-end",
  },

  // SECTION

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 16,
    paddingTop: 17,
    paddingBottom: 17,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  sectionTitleContainer: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#9CA3AF",
  },

  count: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  countText: {
    fontSize: 12,
    fontWeight: "800",
  },

  // BADGES

  badgesContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },

  badgeCard: {
    width: 105,
    minHeight: 155,

    borderRadius: 16,

    backgroundColor: "#FAFAFA",

    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 10,

    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  lockedBadgeCard: {
    opacity: 0.65,
  },

  badgeImage: {
    width: 78,
    height: 78,
  },

  lockedImage: {
    opacity: 0.35,
  },

  daysText: {
    marginTop: 5,
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
  },

  dayLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 1,
  },

  status: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "700",
  },

  lockedText: {
    color: "#9CA3AF",
  },

  // EMPTY

  empty: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
});
