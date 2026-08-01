import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = `${BASE_URL}/get-profile`;

export default function PersonalScreen() {
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
        weight: Number(user.weight),

        target_weight_kg: profile.data.target_weight_kg ?? "60.00",
        activity_level: profile.data.activity_level ?? "moderately_active",
        goal: profile.data.goal ?? "gain",
        goal_type: profile.data.goal_type ?? "moderate",

        minimum_steps: profile.data.minimum_steps ?? 10000,
        target_date: profile.data.target_date ?? "2026-12-31",
        referral_source: profile.data.referral_source ?? "app",
      };

      console.log(payload);

      const response = await fetch(`${BASE_URL}/profile`, {
        method: "POST",
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
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
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
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {renderField("Name", "name")}

      {renderField("Gender", "gender")}

      {renderField("Age", "age", "numeric")}

      {renderField("Height (cm)", "height", "numeric")}

      {renderField("Weight (kg)", "weight", "numeric")}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    marginRight: 12,
    padding: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    marginBottom: 18,
  },

  label: {
    color: "#777",
    marginBottom: 8,
    fontSize: 15,
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 10,
    fontSize: 17,
    color: "#000",
  },

  editInput: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
});
