import React from "react";
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { createStyles, MealSectionColors } from "../styles/PlanMyMeals.styles";

export type MealSectionCode =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snacks"
  | "pre&post workout";

type MealSection = {
  code: MealSectionCode;
  title: string;
  image?: ImageSourcePropType;
  icon: string;
};

export type PlanMyMealsProps = {
  onBack?: () => void;
  /** Navigate to the meal plan screen with this section code. */
  onSelectSection: (sectionCode: MealSectionCode) => void;
  sectionImages?: Partial<Record<MealSectionCode, ImageSourcePropType>>;
};

const SECTIONS: MealSection[] = [
  {
    code: "breakfast",
    title: "Breakfast",
    icon: "☀️",
    image: require("../../assets/meal-planning/breakfast.png"),
  },
  {
    code: "lunch",
    title: "Lunch",
    icon: "🥗",
    image: require("../../assets/meal-planning/lunch.png"),
  },
  {
    code: "dinner",
    title: "Dinner",
    icon: "🌙",
    image: require("../../assets/meal-planning/dinner.png"),
  },
  {
    code: "snacks",
    title: "Snacks",
    icon: "🥣",
    image: require("../../assets/meal-planning/snacks.png"),
  },
  {
    code: "pre&post workout",
    title: "Pre & Post Workout",
    icon: "💪",
    image: require("../../assets/meal-planning/pre.png"),
  },
];

export default function PlanMyMeals({
  onBack,
  onSelectSection,
  sectionImages = {},
}: PlanMyMealsProps): React.JSX.Element {
  const { colors } = useTheme() as { colors: MealSectionColors };
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBack}
            hitSlop={12}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Text style={styles.pageTitle}>Plan My Meals</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {SECTIONS.map((section) => {
            const image = sectionImages[section.code] ?? section.image;
            return (
              <Pressable
                key={section.code}
                accessibilityRole="button"
                accessibilityLabel={`${section.title} meal plan`}
                onPress={() => onSelectSection(section.code)}
                style={({ pressed }) => [
                  styles.sectionCard,
                  pressed && styles.sectionPressed,
                ]}
              >
                <View style={styles.sectionHeading}>
                  <View style={styles.sectionIconWrap}>
                    <Text style={styles.sectionIcon}>{section.icon}</Text>
                  </View>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.chevron}>›</Text>
                </View>
                <View style={styles.imageArea}>
                  {image ? (
                    <Image
                      source={image}
                      style={styles.sectionImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.placeholderIcon}>{section.icon}</Text>
                      <Text style={styles.placeholderText}>
                        Add a meal photo
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
