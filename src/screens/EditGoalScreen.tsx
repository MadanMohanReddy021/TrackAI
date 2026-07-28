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

const API_URL = `${BASE_URL}/profile`;

export default function EditGoalScreen() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

const [goals, setGoals] = useState({
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  water: "",
  steps: "",

  calories_until: "",
  protein_until: "",
  carbs_until: "",
  fat_until: "",
  water_until: "",
});

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
  try {
    const profileData = await AsyncStorage.getItem("profile");

    if (!profileData) {
      Alert.alert("Error", "Profile data not found");
      return;
    }

    const profile = JSON.parse(profileData);

   setGoals({
  calories: String(profile.data.calories),
  protein: String(profile.data.protein),
  carbs: String(profile.data.carbs),
  fat: String(profile.data.fat),
  water: String(profile.data.water ?? 0),
  steps: String(profile.data.minimum_steps ?? 0),

  calories_until: profile.data.calories_custom_until ?? "",
  protein_until: profile.data.protein_custom_until ?? "",
  carbs_until: profile.data.carbs_custom_until ?? "",
  fat_until: profile.data.fat_custom_until ?? "",
  water_until: profile.data.water_custom_until ?? "",
});

  } catch (error) {
    console.log("Profile load error:", error);
    Alert.alert("Error", "Failed to load goals");
  } finally {
    setLoading(false);
  }
};

const updateGoals = async () => {
  try {
    const userid = await AsyncStorage.getItem("userid");

    if (!userid) {
      Alert.alert("Error", "User ID not found");
      return;
    }

    // 10 days from today
    const date = new Date();
date.setFullYear(date.getFullYear() + 10);

const untilDate = date.toISOString().split("T")[0];
    // Example: 2026-08-06

    const response = await fetch(
      `${BASE_URL}/update-nutrients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userid,

          calories_custom: Number(goals.calories),
          protein_custom: Number(goals.protein),
          carbs_custom: Number(goals.carbs),
          fat_custom: Number(goals.fat),
          water_custom: Number(goals.water),

          calories_custom_until: untilDate,
          protein_custom_until: untilDate,
          carbs_custom_until: untilDate,
          fat_custom_until: untilDate,
          water_custom_until: untilDate,
        }),
      }
    );

    const result = await response.json();

    console.log("Update nutrients:", result);

    if (response.ok) {
      Alert.alert("Success", "Goals Updated");
      setEditing(false);
    } else {
      Alert.alert(
        "Error",
        result.message || "Failed to update"
      );
    }

  } catch (error) {
    console.log("Update error:", error);
    Alert.alert("Error", "Network Error");
  }
};

  const renderField = (
  label: string,
  key: keyof typeof goals,
  icon: keyof typeof Ionicons.glyphMap
) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>

    <View style={styles.inputContainer}>
      <Ionicons
        name={icon}
        size={22}
        color="#666"
        style={styles.inputIcon}
      />

      <TextInput
        editable={editing}
        keyboardType="numeric"
        value={goals[key]}
        onChangeText={(text) =>
          setGoals({ ...goals, [key]: text })
        }
        style={[
          styles.input,
          editing && styles.editInput,
        ]}
      />
    </View>
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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          <Text style={styles.title}>Nutrition Goals</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (editing) {
              updateGoals();
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

      {renderField("Calorie Target (kcal)", "calories", "flame-outline")}

{renderField("Protein (g)", "protein", "barbell-outline")}

{renderField("Carbohydrates (g)", "carbs", "nutrition-outline")}

{renderField("Fat (g)", "fat", "water-outline")}

{renderField("Steps Goal", "steps", "footsteps-outline")}
{renderField(
  "Water (ml)",
  "water",
  "water-outline"
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 60,
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
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },

  card: {
    marginBottom: 18,
  },

  label: {
    color: "#777",
    marginBottom: 8,
    fontSize: 15,
  },


  editInput: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F5F5F5",
  borderRadius: 14,
  paddingHorizontal: 15,
},

inputIcon: {
  marginRight: 12,
},

input: {
  flex: 1,
  paddingVertical: 16,
  fontSize: 17,
  color: "#000",
  backgroundColor: "transparent",
},
});