import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  ArrowRight,
  BarChart3,
  Camera,
  Dumbbell,
  Mic,
  Sparkles,
} from "lucide-react-native";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LandingScreen = () => {
  useEffect(() => {
    console.log("landing");

    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        router.replace("/dashboard");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      Icon: Camera,
      title: "AI Meal Tracking",
      desc: "Snap your meal and get instant nutrition insights.",
      bg: "#e6f2ea",
    },
    {
      Icon: Dumbbell,
      title: "Smart Workouts",
      desc: "Personalized workout plans tailored for you.",
      bg: "#e6ecf5",
    },
    {
      Icon: BarChart3,
      title: "Progress Analytics",
      desc: "Track your progress and stay motivated.",
      bg: "#efe6f5",
    },
  ];

  const bigFeatures = [
    {
      Icon: Camera,
      title: "AI Meal Tracking",
      desc: "Snap your meal and let AI instantly calculate calories and macros.",
    },
    {
      Icon: Mic,
      title: "Voice Food Logging",
      desc: "Simply speak your meal and AI automatically logs calories and nutrition details.",
      bg: "#e6ecf5",
    },
    {
      Icon: BarChart3,
      title: "Progress Analytics",
      desc: "Track your progress with insightful analytics.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Sparkles size={16} color="#f59e0b" />
          <Text style={styles.badgeText}>AI-powered fitness coach</Text>
        </View>

        <Text style={styles.heading}>
          Track smarter.
          {"\n"}
          Train better.
        </Text>

        <Text style={styles.description}>
          Snap a photo of your meal — Tack AI instantly logs calories and
          macros, then guides you with a personal 3-week plan.
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/auth")}
          >
            <Text style={styles.primaryText}>Create account</Text>

            <ArrowRight size={16} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/auth")}
          >
            <Text style={styles.secondaryText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feature Cards */}

      <View style={styles.cards}>
        {features.map(({ Icon, title, desc, bg }) => (
          <View key={title} style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: bg }]}>
              <Icon size={22} color="#222" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{title}</Text>

              <Text style={styles.cardDesc}>{desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Everything you need */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Everything you need to reach your goals
        </Text>

        {bigFeatures.map(({ Icon, title, desc }) => (
          <View key={title} style={styles.bigCard}>
            <View style={styles.circle}>
              <Icon size={25} color="#222" />
            </View>

            <Text style={styles.bigTitle}>{title}</Text>

            <Text style={styles.bigDesc}>{desc}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} Tack AI. Your AI fitness companion.
      </Text>
    </ScrollView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },

  hero: {
    padding: 25,
    paddingTop: 60,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },

  badgeText: {
    marginLeft: 8,
    color: "#d97706",
    fontSize: 14,
  },

  heading: {
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 52,
    marginTop: 25,
    color: "#111",
  },

  description: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
    color: "#737373",
  },

  buttons: {
    flexDirection: "row",
    marginTop: 25,
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#111",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  primaryText: {
    color: "white",
    fontWeight: "700",
    marginRight: 8,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
  },

  secondaryText: {
    fontWeight: "700",
  },

  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },

  avatarContainer: {
    flexDirection: "row",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 20,
    marginRight: -10,
    borderWidth: 2,
    borderColor: "#fafafa",
  },

  stars: {
    flexDirection: "row",
    marginLeft: 20,
  },

  trusted: {
    marginLeft: 20,
    color: "#777",
  },

  cards: {
    padding: 25,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    marginBottom: 15,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  cardDesc: {
    color: "#777",
    marginTop: 5,
  },

  section: {
    padding: 25,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },

  bigCard: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 18,
    marginBottom: 15,
  },

  circle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#fbeadb",
    justifyContent: "center",
    alignItems: "center",
  },

  bigTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "800",
  },

  bigDesc: {
    marginTop: 10,
    color: "#777",
  },

  footer: {
    textAlign: "center",
    color: "#999",
    padding: 30,
    fontSize: 12,
  },
});
