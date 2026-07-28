import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
const STORAGE_KEY = "@notification_settings";

export default function NotificationScreen() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const defaultSettings = {
  enabled: true,

  breakfastEnabled: true,
  breakfastTime: "08:00",

  lunchEnabled: true,
  lunchTime: "13:00",

  dinnerEnabled: true,
  dinnerTime: "20:00",

  endDayEnabled: true,
  endDayTime: "22:00",
};

  const [settings, setSettings] = useState({
    enabled: true,

    breakfastEnabled: true,
    breakfastTime: "08:00",

    lunchEnabled: true,
    lunchTime: "13:00",

    dinnerEnabled: true,
    dinnerTime: "20:00",

    endDayEnabled: true,
    endDayTime: "22:00",
  });

  useEffect(() => {
    fetchSettings();
     requestPermission();
  }, []);
  const scheduleNotifications = async (settings: any) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!settings.enabled) return;

  const schedule = async (
    title: string,
    body: string,
    time: string
  ) => {
    const [hour, minute] = time.split(":").map(Number);

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  };

  if (settings.breakfastEnabled) {
    await schedule(
      "🍳 Breakfast Time",
      "Don't forget to log your breakfast.",
      settings.breakfastTime
    );
  }

  if (settings.lunchEnabled) {
    await schedule(
      "🍱 Lunch Time",
      "Time to enjoy your lunch.",
      settings.lunchTime
    );
  }

  if (settings.dinnerEnabled) {
    await schedule(
      "🍽 Dinner Time",
      "Remember to log your dinner.",
      settings.dinnerTime
    );
  }

  if (settings.endDayEnabled) {
    await schedule(
      "🌙 End of Day",
      "Complete today's nutrition summary.",
      settings.endDayTime
    );
  }
};
const requestPermission = async () => {
  const { status } =
    await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Required",
      "Enable notifications to receive reminders."
    );
  }
};
 const fetchSettings = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);

    if (value) {
      setSettings(JSON.parse(value));
    } else {
      setSettings(defaultSettings);
    }
  } finally {
    setLoading(false);
  }
};

 const saveSettings = async () => {
  console.log("1");

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );

  console.log("2");

  await scheduleNotifications(settings);

  console.log("3");

  Alert.alert("Saved");

  setEditing(false);
};

  const ReminderRow = (
    title: string,
    toggleKey: keyof typeof settings,
    timeKey: keyof typeof settings,
    icon: keyof typeof Ionicons.glyphMap
  ) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name={icon} size={22} color="#000" />
          <Text style={styles.title}>{title}</Text>
        </View>

        <Switch
          disabled={!editing}
          value={settings[toggleKey] as boolean}
          onValueChange={(value) =>
            setSettings({ ...settings, [toggleKey]: value })
          }
        />
      </View>

      <TextInput
        editable={editing}
        value={settings[timeKey] as string}
        onChangeText={(text) =>
          setSettings({ ...settings, [timeKey]: text })
        }
        placeholder="08:00"
        style={styles.timeInput}
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        <TouchableOpacity
  onPress={() => {
    console.log("Button pressed");

    if (editing) {
      console.log("Saving...");
      saveSettings();
    } else {
      console.log("Editing enabled");
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

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#000"
            />

            <Text style={styles.title}>
              Allow Notifications
            </Text>
          </View>

          <Switch
            disabled={!editing}
            value={settings.enabled}
            onValueChange={(value) =>
              setSettings({ ...settings, enabled: value })
            }
          />
        </View>
      </View>

      {ReminderRow(
        "Breakfast",
        "breakfastEnabled",
        "breakfastTime",
        "cafe-outline"
      )}

      {ReminderRow(
        "Lunch",
        "lunchEnabled",
        "lunchTime",
        "restaurant-outline"
      )}

      {ReminderRow(
        "Dinner",
        "dinnerEnabled",
        "dinnerTime",
        "moon-outline"
      )}

      {ReminderRow(
        "End of Day",
        "endDayEnabled",
        "endDayTime",
        "bed-outline"
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
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 12,
  },

  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "600",
  },

  timeInput: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});