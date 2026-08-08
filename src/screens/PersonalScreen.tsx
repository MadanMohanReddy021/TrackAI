import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createStyles } from "../styles/personalStyles";

const API_URL = `${BASE_URL}/get-profile`;

export default function PersonalScreen() {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        Alert.alert("Error", "User ID not found");
        return;
      }

      const response = await fetch(`${API_URL}?userid=${userid}`);
      const result = await response.json();

      if (!result.success) {
        Alert.alert("Error", "Profile not found");
        return;
      }

      const profile = result.data;

      setUser({
        name: profile.full_name,
        gender: profile.gender,
        age: String(profile.age),
        height: String(profile.height_cm),
        weight: String(profile.current_weight_kg),
      });
    } catch (err) {
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async () => {
    try {
      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        Alert.alert("Error", "User ID not found");
        return;
      }

      const profileString = await AsyncStorage.getItem("profile");

      if (!profileString) {
        Alert.alert("Error", "Profile not found");
        return;
      }

      const profile = JSON.parse(profileString);

      const payload = {
        ...profile.data,

        userid,
        full_name: user.name,
        gender: user.gender,
        age: Number(user.age),
        height: Number(user.height),
        current_weight_kg: Number(user.weight),
      };
      console.log(payload);

      const response = await fetch(`${BASE_URL}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      await AsyncStorage.setItem(
        "profile",
        JSON.stringify({ success: true, data: payload }),
      );

      Alert.alert("Success", "Profile Updated");
      setEditing(false);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Network Error");
    }
  };

  const renderField = (
    label: string,
    key: keyof typeof user,
    keyboard: any = "default",
  ) => (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        editable={editing}
        value={user[key]}
        keyboardType={keyboard}
        style={[styles.input, editing && styles.editInput]}
        onChangeText={(text) => setUser({ ...user, [key]: text })}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>

            <Text style={styles.title}>Personal Details</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (editing) {
                updateProfile();
              } else {
                setEditing(true);
              }
            }}
          >
            <Ionicons
              name={editing ? "checkmark" : "create-outline"}
              size={26}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {renderField("Name", "name")}

        {renderField("Gender", "gender")}

        {renderField("Age", "age", "numeric")}

        {renderField("Height (cm)", "height", "numeric")}

        {renderField("Weight (kg)", "weight", "numeric")}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
