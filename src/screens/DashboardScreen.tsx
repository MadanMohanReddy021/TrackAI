import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import {
  initialize,
  readRecords,
  requestPermission,
} from "react-native-health-connect";
import AddMenu from "../components/dashboard/AddMenu";
import CalorieCard from "../components/dashboard/CalorieCard";
import MacroCard from "../components/dashboard/MacroCard";
import { useTheme } from "../context/ThemeContext";
import { createStyles } from "../styles/dashboardStyles";
import { DarkTheme, LightTheme } from "../theme/colors";
import FoodLogItem from "./FoodLogItem";

import {
  getFoodLogs,
  getNutrients,
  getProfile,
  getSteps,
  getWater,
} from "../services/dashboardApi";

// ---------------- TYPES ----------------

type Profile = {
  userid: string;

  full_name: string;

  gender: string;

  age: number;

  height_cm: number | string;

  current_weight_kg: number | string;

  target_weight_kg: number | string;

  activity_level: string;

  goal: string;

  goal_type: string;

  bmr: number | string;

  maintenance_calories: number | string;

  calories: number | string;

  protein: number | string;
  fiber: number | string;
  sugar: number | string;

  carbs: number | string;

  fat: number | string;

  water: number | string;

  minimum_steps: number | null;

  target_date: string | null;

  referral_source: string | null;
};

type FoodLog = {
  analysis_id: number;
  userid: string;
  meal_type: string;
  detected_foods: {
    name: string;
    serving: string;
    quantity?: number;
    unit?: string;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  }[];
  analyzed_at: string;
};

const DashboardScreen = () => {
  const [steps, setSteps] = useState(0);
  //----------------Add water-------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  //---------------- THEME ----------------

  const { theme } = useTheme();

  const systemTheme = useColorScheme();

  const colors =
    theme === "system"
      ? systemTheme === "dark"
        ? DarkTheme
        : LightTheme
      : theme === "dark"
        ? DarkTheme
        : LightTheme;

  const styles = useMemo(() => createStyles(colors), [colors]);
  // ---------------- STATES ----------------

  const [profile, setProfile] = useState<Profile | null>(null);

  const [nutrients, setNutrients] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    fiber: 0,
  });
  const [logs, setLogs] = useState<FoodLog[]>([]);

  const [profileName, setProfileName] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [water, setWater] = useState(0);

  const today = new Date();

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));

    const formatted = d.toISOString().split("T")[0];

    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      fullDate: formatted,
    };
  });
  useEffect(() => {
    if (profile) {
      setProfileName(profile.full_name);
    }
  }, [profile]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const loadProfile = async () => {
  //     try {
  //       const storedProfile = await AsyncStorage.getItem("profile");

  //       if (storedProfile) {
  //         const profile = JSON.parse(storedProfile);

  //         setProfileName(
  //           profile.name || profile.full_name || ""
  //         );
  //       }

  //     } catch (error) {
  //       console.log("Profile storage error:", error);
  //     }
  //   };

  //   loadProfile();

  // }, []);

  //---------------- LOAD HEALTH DATA ----------------
  // useEffect(() => {

  //   const loadSteps = async () => {

  //     const saved = await AsyncStorage.getItem(
  //       "todaySteps"
  //     );

  //     if (saved) {
  //       setSteps(Number(saved));
  //     }

  //   };

  //   loadSteps();

  // }, []);
  // useEffect(() => {

  //   let subscription: any;

  //   const startPedometer = async () => {

  //     const available = await Pedometer.isAvailableAsync();

  //     console.log("Pedometer available:", available);

  //     if (!available) return;

  //     subscription = Pedometer.watchStepCount(
  //       async (result) => {

  //         console.log("STEP EVENT:", result.steps);

  //         setSteps(result.steps);

  //         await AsyncStorage.setItem(
  //           "todaySteps",
  //           String(result.steps)
  //         );

  //       }
  //     );

  //   };

  //   startPedometer();

  //   return () => {

  //     if (subscription) {
  //       subscription.remove();
  //     }

  //   };

  // }, []);
  // useEffect(() => {

  //   startStepService();

  //   const loadSteps = async () => {

  //     const steps = await getTodaySteps();

  //     setSteps(Number(steps));

  //   };

  //   loadSteps();

  // }, []);
  // ---------------- LOAD DATA ----------------
  //----------------------------------------------- getting steps from the health connect--------------------------------------------------------------

  useEffect(() => {
    const loadSteps = async () => {
      try {
        // Initialize Health Connect
        const isInitialized = await initialize();

        if (!isInitialized) {
          console.log("Health Connect initialization failed");
          return;
        }

        // Request permission
        await requestPermission([
          {
            accessType: "read",
            recordType: "Steps",
          },
        ]);

        // Create start and end of the selected day
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const result = await readRecords("Steps", {
          timeRangeFilter: {
            operator: "between",
            startTime: startOfDay.toISOString(),
            endTime: endOfDay.toISOString(),
          },
        });

        const totalSteps = result.records.reduce(
          (sum, record) => sum + record.count,
          0,
        );

        setSteps(totalSteps);

        console.log(`Steps for ${selectedDate}:`, totalSteps);
      } catch (error) {
        console.log("Error loading steps:", error);
      }
    };

    if (selectedDate) {
      loadSteps();
    }
  }, [selectedDate]);
  //----------------------------------------------- getting steps from the health connect--------------------------------------------------------------

  useEffect(() => {
    loadDashboard(selectedDate);
  }, [selectedDate]);

  const loadDashboard = async (date: string) => {
    try {
      setLoading(true);

      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        Alert.alert("Error", "User ID not found");
        router.replace("/auth");
        return;
      }
      const nutrientsResponse = await getNutrients(userid, date);
      console.log("Nutrients Response:", nutrientsResponse);
      const [profile, foodLogs, water, steps] = await Promise.all([
        getProfile(userid),
        getFoodLogs(userid, date),
        getWater(userid, date),
        getSteps(userid, date),
      ]);

      if (!profile?.data || !profile.data.userid) {
        router.replace("/onboarding");
        return;
      }

      setProfile(profile.data);
      setLogs(foodLogs);
      setWater(water);
      //setSteps(steps);

      try {
        const item = nutrientsResponse.data[0];

        console.log("Item:", item);

        setNutrients({
          calories: Number(item.calories),
          protein: Number(item.protein),
          carbs: Number(item.carbs),
          fat: Number(item.fat),
          fiber: Number(item.fiber),
          sugar: Number(item.sugar),
        });
      } catch (e) {
        console.error("Error reading nutrients:", e);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message ?? "Failed loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- TOTALS ----------------

  const totals = useMemo(
    () => ({
      cal: Number(nutrients?.calories ?? 0),
      protein: Number(nutrients?.protein ?? 0),
      carbs: Number(nutrients?.carbs ?? 0),
      fat: Number(nutrients?.fat ?? 0),
      sugar: Number(nutrients?.sugar ?? 0),
      fiber: Number(nutrients?.fiber ?? 0),
    }),
    [nutrients],
  );

  const calorieTarget = Number(profile?.calories) || 2000;

  const proteinTarget = Number(profile?.protein) || 120;
  const [activeDot, setActiveDot] = useState(0);
  const carbTarget = Number(profile?.carbs) || 220;

  const fatTarget = Number(profile?.fat) || 60;

  const waterTarget = Number(profile?.water) || 3000;

  const stepTarget = Number(profile?.minimum_steps) || 10000;
  const fiberTarget = Number(profile?.fiber) || 35;

  const sugarTarget = Number(profile?.sugar) || 30;

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonHeader} />

        <View style={styles.skeletonCard}>
          <View style={styles.skeletonCircle} />

          <View style={styles.skeletonContent}>
            <View style={styles.skeletonLineLarge} />
            <View style={styles.skeletonLineSmall} />
          </View>
        </View>

        <View style={styles.skeletonSectionTitle} />

        <View style={styles.skeletonCard}>
          <View style={styles.skeletonLineLarge} />
          <View style={styles.skeletonLineMedium} />
          <View style={styles.skeletonLineSmall} />
        </View>

        <View style={styles.skeletonCard}>
          <View style={styles.skeletonLineLarge} />
          <View style={styles.skeletonLineMedium} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrackAI</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* HEADER */}
        <Text style={styles.greeting}>
          Hello {profile?.full_name ?? "there"},
        </Text>
        {/* Date Selector*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateContainer}
        >
          {dates.map((item) => (
            <TouchableOpacity
              key={item.fullDate}
              onPress={() => setSelectedDate(item.fullDate)}
              style={[
                styles.dateCard,
                {
                  backgroundColor:
                    selectedDate === item.fullDate
                      ? colors.primary
                      : colors.card,
                },
              ]}
            >
              <Text
                style={[
                  styles.day,
                  {
                    color:
                      selectedDate === item.fullDate
                        ? colors.background
                        : colors.secondaryText,
                  },
                ]}
              >
                {item.day}
              </Text>

              <Text
                style={[
                  styles.date,
                  {
                    color:
                      selectedDate === item.fullDate
                        ? colors.background
                        : colors.text,
                  },
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* CALORIES */}

        <View style={styles.topSection}>
          <View style={{ flex: 1 }}>
            <CalorieCard
              consumed={Math.round(totals.cal)}
              target={calorieTarget}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.waterMiniCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                overflow: "hidden",
              },
            ]}
            onPress={() => router.push("/water")}
          >
            {/* Water Fill */}
            <View
              style={[
                styles.waterFill,
                {
                  height: `${Math.min((water / waterTarget) * 100, 100)}%`,
                  backgroundColor: colors.waterfill,
                },
              ]}
            />

            <MaterialCommunityIcons
              name="cup-water"
              size={36}
              color={colors.primary}
            />

            <Text
              style={[
                styles.waterAmount,
                {
                  color: colors.text,
                },
              ]}
            >
              {water} ml
            </Text>

            <Text
              style={[
                styles.waterTarget,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              {(waterTarget / 1000).toFixed(2)}L/{waterTarget} ml
            </Text>
          </TouchableOpacity>
        </View>
        {/* STEPS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚶 Steps</Text>

          <Text style={styles.bigNumber}>
            {steps.toLocaleString()}

            <Text style={styles.smallText}>
              / {stepTarget.toLocaleString()}
            </Text>
          </Text>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(100, (steps / stepTarget) * 100)}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.leftText}>
            {Math.max(0, stepTarget - steps).toLocaleString()} steps left
          </Text>

          <Text style={styles.healthNote}>
            📱 Steps are tracked automatically using your phone's step counter
            or Health Connect.
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.macroContainer}
          scrollEventThrottle={16}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;

            if (x < 90) {
              setActiveDot(0);
            } else if (x < 130) {
              setActiveDot(1);
            } else {
              setActiveDot(2);
            }
          }}
        >
          <MacroCard
            title="Protein"
            value={totals.protein}
            target={proteinTarget}
          />

          <MacroCard title="Carbs" value={totals.carbs} target={carbTarget} />

          <MacroCard title="Fat" value={totals.fat} target={fatTarget} />

          <MacroCard title="Sugar" value={totals.sugar} target={sugarTarget} />

          <MacroCard title="Fiber" value={totals.fiber} target={fiberTarget} />
        </ScrollView>
        <View style={styles.pagination}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.dot, activeDot === i && styles.activeDot]}
            />
          ))}
        </View>
        {/* FOOD LOG */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Log</Text>
        </View>

        {logs.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No meals logged yet.</Text>
          </View>
        ) : (
          logs.map((item) => <FoodLogItem key={item.analysis_id} item={item} />)
        )}
      </ScrollView>

      {/* FLOATING ADD BUTTON */}

      <AddMenu />
    </View>
  );
};

export default DashboardScreen;
