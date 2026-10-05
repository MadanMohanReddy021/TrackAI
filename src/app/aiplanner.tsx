import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";

type MenuOption = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Href;
};

export default function HomeOptions() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const options: MenuOption[] = [
    {
      title: "About Me",
      subtitle: "View and update your profile",
      icon: "person-circle-outline",
      route: "/personal" as Href,
    },
    {
      title: "Plan My Meals",
      subtitle: "Choose a meal and build a plan",
      icon: "restaurant-outline",
      route: "/planmymeals" as Href,
    },
    {
      title: "Today’s Plan",
      subtitle: "View meals planned for today",
      icon: "calendar-outline",
      route: "/todaysplan" as Href,
    },
    {
      title: "Saved Meals",
      subtitle: "Browse meals saved from previous days",
      icon: "bookmarks-outline",
      route: "/pastsavedlogs" as Href,
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerLabel}>MEAL PLANNER</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.heading}>Plan your meals{"\n"}with AI</Text>
      <Text style={styles.description}>
        Your personal food companion for healthier choices every day.
      </Text>

      <View style={styles.heroCard}>
        <View style={styles.heroCopy}>
          <View style={styles.aiPill}>
            <Ionicons name="sparkles" size={13} color="#F9D879" />
            <Text style={styles.aiPillText}>AI FOOD ASSISTANT</Text>
          </View>
          <Text style={styles.heroTitle}>Let’s make something good.</Text>
          <Text style={styles.heroSubtitle}>
            Tell me what you like, and I’ll help plan it.
          </Text>
        </View>

        <View style={styles.botArt} accessibilityLabel="Chatbot illustration">
          <View style={styles.botAntenna} />
          <View style={styles.botHead}>
            <View style={styles.botEyes}>
              <View style={styles.botEye} />
              <View style={styles.botEye} />
            </View>
            <View style={styles.botSmile} />
          </View>
          <View style={styles.botBody}>
            <Ionicons name="chatbubble-ellipses" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.botSparkle}>
            <Ionicons name="sparkles" size={17} color="#F9D879" />
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your shortcuts</Text>
        <Text style={styles.sectionCaption}>Choose where to go</Text>
      </View>

      <View style={styles.options}>
        {options.map((option, index) => (
          <Pressable
            key={option.title}
            accessibilityRole="button"
            accessibilityLabel={option.title}
            onPress={() => router.push(option.route)}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <View
              style={[styles.iconWrap, index === 1 && styles.highlightIconWrap]}
            >
              <Ionicons name={option.icon} size={24} color={colors.primary} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{option.title}</Text>
              <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
            </View>
            <View style={styles.arrowWrap}>
              <Ionicons
                name="chevron-forward"
                size={17}
                color={colors.secondaryText}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: {
  background: string;
  card: string;
  text: string;
  secondaryText: string;
  primary: string;
}) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 34 },
    header: {
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 17,
    },
    backButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
    },
    headerLabel: {
      flex: 1,
      marginLeft: 12,
      color: colors.secondaryText,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1.5,
    },
    headerSpacer: { width: 42 },
    heading: {
      color: colors.text,
      fontSize: 31,
      lineHeight: 36,
      fontWeight: "800",
    },
    description: {
      color: colors.secondaryText,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 8,
      marginBottom: 18,
    },
    heroCard: {
      minHeight: 174,
      borderRadius: 24,
      padding: 18,
      backgroundColor: "#263C52",
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      marginBottom: 24,
    },
    heroCopy: { flex: 1, paddingRight: 4, zIndex: 1 },
    aiPill: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      borderRadius: 20,
      paddingHorizontal: 9,
      paddingVertical: 6,
      backgroundColor: "rgba(255,255,255,0.14)",
      marginBottom: 12,
    },
    aiPillText: {
      color: "#FFFFFF",
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 0.7,
      marginLeft: 5,
    },
    heroTitle: {
      color: "#FFFFFF",
      fontSize: 18,
      lineHeight: 23,
      fontWeight: "800",
      maxWidth: 190,
    },
    heroSubtitle: {
      color: "#D8E2EB",
      fontSize: 12,
      lineHeight: 17,
      marginTop: 6,
      maxWidth: 185,
    },
    botArt: {
      width: 106,
      height: 134,
      alignItems: "center",
      justifyContent: "flex-end",
      marginLeft: -5,
    },
    botAntenna: {
      position: "absolute",
      top: 4,
      width: 5,
      height: 17,
      borderRadius: 3,
      backgroundColor: "#9EDBD0",
    },
    botHead: {
      width: 78,
      height: 62,
      borderRadius: 23,
      backgroundColor: "#B9E7DE",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: "#E8FFF8",
      zIndex: 1,
    },
    botEyes: { flexDirection: "row", gap: 18, marginTop: 2 },
    botEye: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: "#263C52",
    },
    botSmile: {
      width: 18,
      height: 8,
      borderBottomWidth: 2,
      borderColor: "#263C52",
      borderRadius: 10,
      marginTop: 5,
    },
    botBody: {
      width: 94,
      height: 49,
      marginTop: -3,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#6FBEB1",
      borderWidth: 3,
      borderColor: "#D6F7F0",
    },
    botSparkle: { position: "absolute", top: 19, right: 2 },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "800" },
    sectionCaption: { color: colors.secondaryText, fontSize: 11 },
    options: { gap: 11 },
    card: {
      minHeight: 78,
      flexDirection: "row",
      alignItems: "center",
      padding: 13,
      borderRadius: 18,
      backgroundColor: colors.card,
    },
    cardPressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
    iconWrap: {
      width: 48,
      height: 48,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      marginRight: 12,
    },
    highlightIconWrap: { backgroundColor: "#E3F4EF" },
    cardText: { flex: 1 },
    cardTitle: { color: colors.text, fontSize: 15, fontWeight: "700" },
    cardSubtitle: { color: colors.secondaryText, fontSize: 11, marginTop: 4 },
    arrowWrap: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
    },
  });
