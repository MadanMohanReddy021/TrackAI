import { useTheme } from "@/context/ThemeContext";
import BASE_URL from "@/storage/ipAdress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function TextFoodScreen() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const submitFood = async () => {
    if (!text.trim()) {
      Alert.alert("Enter Food", "Please describe what you ate.");

      return;
    }

    try {
      setLoading(true);

      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        Alert.alert("Error", "User ID not found.");

        return;
      }

      const response = await axios.post(
        `${BASE_URL}/analyze-food`,

        {
          userid,
          foodName: text.trim(),
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      router.push({
        pathname: "/foodresult",

        params: {
          image: "",
          result: JSON.stringify(response.data),
        },
      });
    } catch (error: any) {
      console.log(error.response?.data || error.message);

      Alert.alert("Error", "Unable to analyze food.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Text Food Logger</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* CONTENT */}

      <View style={styles.content}>
        <Text style={styles.title}>Describe Your Meal</Text>

        <Text style={styles.subtitle}>Example:</Text>

        <Text style={styles.example}>
          I ate 2 chapatis, one bowl of dal, grilled chicken and a glass of
          milk.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Describe your meal..."
          placeholderTextColor={colors.textSecondary}
          multiline
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={submitFood}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={styles.buttonText}>Analyze Meal</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,

      padding: 24,

      backgroundColor: colors.background,
    },

    content: {
      flex: 1,

      justifyContent: "center",
    },

    header: {
      flexDirection: "row",

      alignItems: "center",

      justifyContent: "space-between",

      marginBottom: 20,
    },

    backButton: {
      width: 40,

      height: 40,

      borderRadius: 20,

      justifyContent: "center",

      alignItems: "center",

      backgroundColor: colors.card,
    },

    headerTitle: {
      fontSize: 22,

      fontWeight: "700",

      color: colors.text,
    },

    title: {
      fontSize: 28,

      fontWeight: "700",

      color: colors.text,

      marginBottom: 10,
    },

    subtitle: {
      fontSize: 18,

      fontWeight: "600",

      color: colors.text,

      marginBottom: 5,
    },

    example: {
      color: colors.textSecondary,

      marginBottom: 25,

      lineHeight: 22,

      fontSize: 15,
    },

    input: {
      minHeight: 180,

      borderWidth: 1,

      borderColor: colors.border,

      borderRadius: 18,

      padding: 16,

      fontSize: 16,

      marginBottom: 25,

      backgroundColor: colors.card,

      color: colors.text,
    },

    button: {
      height: 55,

      backgroundColor: colors.button,

      borderRadius: 16,

      justifyContent: "center",

      alignItems: "center",

      shadowColor: colors.primary,

      shadowOpacity: 0.2,

      shadowRadius: 8,

      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 4,
    },

    buttonText: {
      color: colors.buttonText,

      fontSize: 18,

      fontWeight: "700",
    },
  });
