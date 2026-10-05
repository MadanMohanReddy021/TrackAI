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
      <View style={styles.topBar}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={21} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.topLabel}>Water intake</Text>
        <View style={styles.topSpacer} />
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Ionicons name="water-outline" size={28} color={colors.primary} />
        </View>
        <Text style={styles.heroEyebrow}>Today’s hydration</Text>
        <Text style={styles.value}>{currentWater} ml</Text>
        <Text style={styles.goal}>
          of {WATER_TARGET.toLocaleString()} ml daily goal
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
        <Text style={styles.progressCaption}>
          {Math.round(progress * 100)}% of your daily goal
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Quick add</Text>
      <View style={styles.row}>
        {quickOptions.map((item) => (
          <TouchableOpacity
            key={item.ml}
            accessibilityRole="button"
            style={styles.quick}
            onPress={() => quickAdd(item.ml)}
          >
            <Text style={styles.glassIcon}>{item.icon}</Text>
            <View>
              <Text style={styles.quickTitle}>{item.glasses}</Text>
              <Text style={styles.quickSubtitle}>{item.ml} ml</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Custom amount</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={colors.secondaryText}
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.inputUnit}>ml</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAdd}
        disabled={loading}
        accessibilityRole="button"
      >
        {loading ? (
          <ActivityIndicator color={colors.buttonText} />
        ) : (
          <>
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={colors.buttonText}
            />
            <Text style={styles.buttonText}>Add water</Text>
          </>
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
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 24,
    },
    topBar: {
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    backButton: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    topLabel: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "700",
    },
    topSpacer: {
      width: 42,
    },
    heroCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 22,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 26,
    },
    heroIcon: {
      width: 54,
      height: 54,
      borderRadius: 18,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginBottom: 14,
    },
    heroEyebrow: {
      color: colors.secondaryText,
      textAlign: "center",
      fontSize: 13,
      fontWeight: "600",
    },
    value: {
      color: colors.text,
      textAlign: "center",
      fontSize: 38,
      fontWeight: "800",
      marginTop: 5,
    },
    goal: {
      color: colors.secondaryText,
      textAlign: "center",
      fontSize: 13,
      marginTop: 3,
      marginBottom: 20,
    },
    progressTrack: {
      height: 10,
      borderRadius: 8,
      overflow: "hidden",
      backgroundColor: colors.background,
    },
    progressFill: {
      height: "100%",
      borderRadius: 8,
      backgroundColor: colors.primary,
    },
    progressCaption: {
      color: colors.secondaryText,
      fontSize: 12,
      marginTop: 9,
      textAlign: "right",
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 12,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 12,
      marginBottom: 24,
    },
    quick: {
      width: "48.5%",
      minHeight: 100,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 13,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    glassIcon: {
      fontSize: 23,
      marginRight: 11,
    },
    quickTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "700",
    },
    quickSubtitle: {
      color: colors.secondaryText,
      fontSize: 12,
      marginTop: 4,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      backgroundColor: colors.card,
      paddingHorizontal: 15,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      minHeight: 54,
      color: colors.text,
      fontSize: 16,
    },
    inputUnit: {
      color: colors.secondaryText,
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 10,
    },
    button: {
      minHeight: 54,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingHorizontal: 18,
    },
    buttonText: {
      color: colors.buttonText,
      fontWeight: "700",
      fontSize: 16,
      marginLeft: 8,
    },
  });
