import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { styles } from "../styles/profileStyles";

import {
  Flame,
  Footprints,
  ShieldCheck,
  Utensils
} from "lucide-react-native";

import FactorRow from "../components/profile/FactorRow";
import HealthGauge from "../components/profile/HealthGauge";
import MonthlyReport from "../components/profile/MonthlyReport";
import ProfileHeader from "../components/profile/ProfileHeader";
import StatCard from "../components/profile/StatCard";

import { profileApi } from "../services/profileApi";

import {
  DayMetrics,
  FoodLog,
  Profile,
  StepLog,
} from "../types/profile";

import { toKey } from "../utils/date";

import {
  STARTING_SCORE,
} from "../constants/healthScore";

import {
  calculateAverageSteps,
  calculateBestDay,
  calculateConsistency,
  calculateCurrentStreak,
  calculateGoalsMet,
  calculateLongestStreak,
  calculateTotalSteps,
  componentBreakdown,
  replayScore,
} from "../utils/healthScore";

const ProfileScreen = () => {

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [stepLogs, setStepLogs] =
    useState<StepLog[]>([]);

  const [foodLogs, setFoodLogs] =
    useState<FoodLog[]>([]);

  const [previousScore, setPreviousScore] =
    useState(0);

  const [error, setError] =
    useState<string | null>(null);
      useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const [
        profileData,
        stepsData,
        foodsData,
        history,
      ] = await Promise.all([
        profileApi.getProfile(),
        profileApi.getStepLogs(),
        profileApi.getFoodLogs(),
        profileApi.getHealthScoreHistory(),
      ]);

      setProfile(profileData);
      setStepLogs(stepsData);
      setFoodLogs(foodsData);

      if (history.length > 0) {
        setPreviousScore(history[0].score);
      }
    } catch (err: any) {
      setError(
        err?.message ??
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };
  const resetOnboarding = async () => {
  try {
    await profileApi.resetOnboarding();

    Alert.alert(
      "Success",
      "Onboarding has been reset.",
      [
        {
          text: "OK",
          onPress: () =>
            router.replace("/onboarding"),
        },
      ]
    );
  } catch (error) {
    Alert.alert(
      "Error",
      "Unable to reset onboarding."
    );
  }
};

const deleteAccount = async () => {
  try {
    await profileApi.deleteAccount();

    Alert.alert(
      "Account Deleted",
      "Your account has been deleted."
    );

    router.replace("/auth");
  } catch (error) {
    Alert.alert(
      "Error",
      "Unable to delete account."
    );
  }
};

const confirmDelete = () => {
  Alert.alert(
    "Delete Account",
    "This action cannot be undone.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: deleteAccount,
      },
    ]
  );
};

    const window30 = useMemo(() => {
    const stepMap = new Map(
      stepLogs.map((item) => [
        item.log_date,
        item,
      ])
    );

    const foodSet = new Set(
      foodLogs.map((item) =>
        toKey(new Date(item.logged_at))
      )
    );

    const goal =
      profile?.daily_steps_target ?? 10000;

    const days: DayMetrics[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();

      date.setDate(date.getDate() - i);

      const key = toKey(date);

      const step = stepMap.get(key);

      const steps = step?.steps ?? 0;

      const hasFood = foodSet.has(key);

      days.push({
        steps,
        stepsGoal: step?.goal ?? goal,
        hasFoodLog: hasFood,
        hasAppActivity:
          steps > 0 || hasFood,
      });
    }

    return days;
  }, [
    profile,
    stepLogs,
    foodLogs,
  ]);
    const score = useMemo(
    () =>
      replayScore(
        STARTING_SCORE,
        window30
      ),
    [window30]
  );

  const breakdown = useMemo(
    () =>
      componentBreakdown(window30),
    [window30]
  );

  const consistency =
    calculateConsistency(window30);

  const avgSteps =
    calculateAverageSteps(window30);

  const streak =
    calculateCurrentStreak(window30);

  const goalsMet =
    calculateGoalsMet(window30);

  const longestStreak =
    calculateLongestStreak(window30);

  const bestDay =
    calculateBestDay(window30);

  const totalSteps =
    calculateTotalSteps(window30);
      if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#10B981"
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
  <SafeAreaView style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <ProfileHeader
        name={profile?.name ?? ""}
        email={profile?.email ?? ""}
        onBack={() => router.back()}
        onSettings={() => {}}
        onEditProfile={() =>
        {}
        }
      />

      {/* Health Score */}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Health Score
        </Text>

        <HealthGauge score={score} />
      </View>

      {/* Overview */}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Overview
        </Text>

        <View style={styles.overviewRow}>

          <StatCard
            icon={
              <ShieldCheck
                size={20}
                color="#0284C7"
              />
            }
            label="Consistency"
            value={`${consistency}%`}
            badge="Good"
            badgeColor="#0284C7"
            iconBackground="#E0F2FE"
          />

          <StatCard
            icon={
              <Flame
                size={20}
                color="#EA580C"
              />
            }
            label="Streak"
            value={String(streak)}
            badge="Days"
            badgeColor="#EA580C"
            iconBackground="#FFF7ED"
          />

        </View>

        <View style={styles.overviewRow}>

          <StatCard
            icon={
              <Footprints
                size={20}
                color="#059669"
              />
            }
            label="Avg Steps"
            value={avgSteps.toLocaleString()}
            badge="Steps"
            badgeColor="#059669"
            iconBackground="#ECFDF5"
          />

          <StatCard
            icon={
              <ShieldCheck
                size={20}
                color="#DC2626"
              />
            }
            label="Goals Met"
            value={`${goalsMet}%`}
            badge="30 Days"
            badgeColor="#DC2626"
            iconBackground="#FEE2E2"
          />

        </View>
      </View>

      {/* Factors */}

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Factors Affecting Score
        </Text>

        <FactorRow
          icon={
            <Footprints
              size={20}
              color="#10B981"
            />
          }
          title="Steps"
          subtitle="High Impact • 70%"
          percentage={breakdown.steps}
          color="#10B981"
          backgroundColor="#ECFDF5"
        />

        <FactorRow
          icon={
            <Utensils
              size={20}
              color="#F97316"
            />
          }
          title="Food Logging"
          subtitle="Medium Impact • 10%"
          percentage={breakdown.food}
          color="#F97316"
          backgroundColor="#FFF7ED"
        />

        <FactorRow
          icon={
            <ShieldCheck
              size={20}
              color="#0284C7"
            />
          }
          title="Consistency"
          subtitle="High Impact • 20%"
          percentage={breakdown.consistency}
          color="#0284C7"
          backgroundColor="#E0F2FE"
        />

      </View>

      {/* Monthly Report */}

      <MonthlyReport
        previousScore={previousScore}
        currentScore={score}
        previousConsistency={Math.max(
          0,
          consistency - 10
        )}
        currentConsistency={consistency}
        totalSteps={totalSteps}
        averageSteps={avgSteps}
        longestStreak={longestStreak}
        bestDay={bestDay}
        onViewReport={() =>
        {}
        }
      />
            <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Reset Goals
        </Text>

        <Text style={styles.description}>
          Clear your goals and complete onboarding
          again.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={resetOnboarding}
        >
          <Text style={styles.primaryButtonText}>
            Reset Onboarding
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.deleteCard}>

        <Text style={styles.deleteTitle}>
          Delete Account
        </Text>

        <Text style={styles.description}>
          Permanently delete your account and all
          your data.
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDelete}
        >
          <Text style={styles.deleteButtonText}>
            Delete Account
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  </SafeAreaView>
);
  
}
};  
export default ProfileScreen;
