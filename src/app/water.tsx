import { useTheme } from "@/context/ThemeContext";
import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const WATER_TARGET = 2500;

// Replace with your backend API
async function addWater(userid: string, date: string, amount: number) {
  const res = await fetch(`${BASE_URL}/add-water-intake`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid,
      intake_date: date,
      water_ml: amount,
    }),
  });

  if (!res.ok) throw new Error("Failed to add water");
  return res.json();
}

export default function WaterScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [currentWater, setCurrentWater] = useState(0);
  const [amount, setAmount] = useState("250");
  const [loading, setLoading] = useState(false);
  const quickOptions = [
    { glasses: "1 Glass", ml: 250, icon: "🥛" },
    { glasses: "2 Glasses", ml: 500, icon: "🥛🥛" },
    { glasses: "3 Glasses", ml: 750, icon: "🥛🥛🥛" },
    { glasses: "4 Glasses", ml: 1000, icon: "🥛🥛🥛🥛" },
  ];
  const progress = useMemo(
    () => Math.min(currentWater / WATER_TARGET, 1),
    [currentWater],
  );

  const quickAdd = (ml: number) => {
    setAmount(String(ml));
  };

  const handleAdd = async () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      Alert.alert("Invalid", "Enter a valid amount.");
      return;
    }

    try {
      setLoading(true);

      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        Alert.alert("Error", "User not found.");
        return;
      }

      const date = new Date().toISOString().split("T")[0];

      await addWater(userid, date, value);

      setCurrentWater((prev) => prev + value);

      Alert.alert("Success", "Water added.", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Water Intake</Text>

      <Text style={styles.value}>{currentWater} ml</Text>
      <Text style={styles.goal}>Goal {WATER_TARGET} ml</Text>

      <View style={styles.row}>
        {quickOptions.map((item) => (
          <TouchableOpacity
            key={item.ml}
            style={styles.quick}
            onPress={() => quickAdd(item.ml)}
          >
            <Text style={styles.glassIcon}>{item.icon}</Text>

            <Text style={styles.quickTitle}>{item.glasses}</Text>

            <Text style={styles.quickSubtitle}>{item.ml} ml</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Custom amount"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add Water</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      justifyContent: "center",
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      marginVertical: 20,
      textAlign: "center",
      color: colors.text,
    },

    bottle: {
      alignSelf: "center",
      width: 130,
      height: 300,
      borderWidth: 4,
      borderColor: colors.primary,
      borderRadius: 30,
      overflow: "hidden",
      justifyContent: "flex-end",
      marginBottom: 20,
    },

    glassIcon: {
      fontSize: 26,
      marginBottom: 6,
    },

    bottleIcon: {
      alignSelf: "center",
      marginVertical: 20,
    },

    quickTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
    },

    quickSubtitle: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 3,
      textAlign: "center",
    },

    quick: {
      width: 85,
      paddingVertical: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: "center",
    },

    fill: {
      width: "100%",
      backgroundColor: "#3BA7FF",
    },

    value: {
      fontSize: 32,
      fontWeight: "700",
      textAlign: "center",
      color: colors.text,
    },

    goal: {
      textAlign: "center",
      color: colors.secondaryText,
      marginBottom: 25,
    },

    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 12,
      marginBottom: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 14,
      marginBottom: 20,
      color: colors.text,
      backgroundColor: colors.card,
    },

    button: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 16,
      alignItems: "center",
    },

    buttonText: {
      color: colors.buttonText,
      fontWeight: "700",
      fontSize: 16,
    },
  });
