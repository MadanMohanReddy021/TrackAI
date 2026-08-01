import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Moon, Smartphone, Sun } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function PreferencesScreen() {
  const { theme, setTheme, colors } = useTheme();

  const Option = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: "light" | "dark" | "system";
    icon: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[
        styles.option,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        theme === value && {
          borderColor: colors.primary,
          borderWidth: 2,
        },
      ]}
      onPress={() => setTheme(value)}
    >
      <View style={styles.left}>
        {icon}
        <Text
          style={[
            styles.optionText,
            { color: colors.text },
          ]}
        >
          {title}
        </Text>
      </View>

      {theme === value && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={colors.primary}
        />
      )}
    </TouchableOpacity>
  );

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

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Preferences
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* Section */}

      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.secondaryText,
          },
        ]}
      >
        Appearance
      </Text>

      <Option
        title="Light"
        value="light"
        icon={
          <Sun
            size={22}
            color={colors.primary}
          />
        }
      />

      <Option
        title="Dark"
        value="dark"
        icon={
          <Moon
            size={22}
            color={colors.text}
          />
        }
      />

      <Option
        title="System Default"
        value="system"
        icon={
          <Smartphone
            size={22}
            color={colors.secondaryText}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },
});