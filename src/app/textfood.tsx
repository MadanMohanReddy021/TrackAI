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
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = BASE_URL;

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
      `${API_URL}/analyze-food`,
      {
        userid,
        foodName: text.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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

    Alert.alert(
      "Error",
      "Unable to analyze food."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >    <View style={styles.header}>
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => router.back()}
  >
    <Ionicons
      name="arrow-back"
      size={28}
      color="#000"
    />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>
    Text Food Logger
  </Text>

  {/* Empty view to keep title centered */}
  <View style={{ width: 28 }} />
</View>
      <Text style={styles.title}>
        Describe Your Meal
      </Text>

      <Text style={styles.subtitle}>
        Example:
      </Text>

      <Text style={styles.example}>
        I ate 2 chapatis, one bowl of dal,
        grilled chicken and a glass of milk.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Describe your meal..."
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
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Analyze Meal
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
  },
header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 30,
},

backButton: {
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
},

headerTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#000",
},
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  example: {
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },

  input: {
    minHeight: 180,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 25,
  },

  button: {
    height: 55,
    backgroundColor: "#C9A24B",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});