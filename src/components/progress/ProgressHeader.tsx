import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useTheme } from "../../context/ThemeContext";

export default function ProgressHeader() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {/* Back Button */}

      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
        style={[
          styles.backButton,
          {
            backgroundColor: colors.card,
          },
        ]}
      >
        <Ionicons name="arrow-back" size={22} color={colors.text} />
      </TouchableOpacity>

      {/* Title */}

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        Progress
      </Text>

      {/* Right Side Spacer */}

      <View style={styles.rightSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flex: 1,

    fontSize: 21,
    fontWeight: "800",

    marginLeft: 14,
  },

  rightSpacer: {
    width: 42,
  },
});
