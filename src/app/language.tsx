import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Language() {
  const { colors } = useTheme();

  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Language
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.description,
            {
              color: colors.secondaryText,
            },
          ]}
        >
          Choose your preferred language.
        </Text>

        <TouchableOpacity
          style={[
            styles.languageCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => setSelectedLanguage("English")}
        >
          <View>
            <Text
              style={[
                styles.languageName,
                {
                  color: colors.text,
                },
              ]}
            >
              English
            </Text>

            <Text
              style={[
                styles.languageSub,
                {
                  color: colors.secondaryText,
                },
              ]}
            >
              English (United States)
            </Text>
          </View>

          {selectedLanguage === "English" && (
            <Ionicons
              name="checkmark-circle"
              size={26}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 65,
    paddingTop: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  content: {
    padding: 10,
  },

  description: {
    fontSize: 15,
    marginBottom: 20,
  },

  languageCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
  },

  languageName: {
    fontSize: 17,
    fontWeight: "600",
  },

  languageSub: {
    marginTop: 4,
    fontSize: 14,
  },
});
