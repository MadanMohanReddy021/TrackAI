import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Language
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.description}>
          Choose your preferred language.
        </Text>

        <TouchableOpacity
          style={styles.languageCard}
          activeOpacity={0.8}
          onPress={() => setSelectedLanguage("English")}
        >
          <View>
            <Text style={styles.languageName}>
              English
            </Text>

            <Text style={styles.languageSub}>
              English (United States)
            </Text>
          </View>

          {selectedLanguage === "English" && (
            <Ionicons
              name="checkmark-circle"
              size={26}
              color="#000"
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
    backgroundColor: "#fff",
  },

  header: {
    height: 50,
    paddingTop: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },

  content: {
    padding: 10,
  },

  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  languageCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    padding: 18,
  },

  languageName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },

  languageSub: {
    marginTop: 4,
    fontSize: 14,
    color: "#777",
  },
});