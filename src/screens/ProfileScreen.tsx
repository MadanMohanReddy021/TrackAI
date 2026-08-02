import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyles } from "../styles/profileStyles";
const accountItems = [
  {
    title: "Personal details",
    icon: "person-outline",
    id: 1,
  },
  {
    title: "Preferences",
    icon: "settings-outline",
    id: 2,
  },
  {
    title: "Language",
    icon: "language-outline",
    id: 3,
  },
];

const goalItems = [
  {
    title: "Edit Nutrition Goals",
    icon: "nutrition-outline",
    id: 1,
  },

  {
    title: "Tracking Reminders",
    icon: "notifications-outline",
    id: 3,
  },

  {
    title: "Update Weight",
    icon: "reload-outline",
    id: 4,
  },
  {
    title: "Ring Colors Explained",
    icon: "ellipse-outline",
    id: 5,
  },
];
const accountActions = [
  {
    title: "Privacy Policy",
    icon: "shield-checkmark-outline",
    action: "privacy",
  },
  {
    title: "Terms & Conditions",
    icon: "document-text-outline",
    action: "terms",
  },
  {
    title: "Sign Out",
    icon: "log-out-outline",
    action: "logout",
    danger: true,
  },
  {
    title: "Delete Account",
    icon: "trash-outline",
    action: "delete",
    danger: true,
  },
];

export default function ProfileScreen() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const router = useRouter();

  function SettingsRow({ item, onPress }: any) {
    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.rowLeft}>
          <Ionicons
            name={item.icon}
            size={20}
            color={item.danger ? colors.danger : colors.text}
          />

          <Text
            style={[styles.rowText, item.danger && { color: colors.danger }]}
          >
            {item.title}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.secondaryText}
        />
      </TouchableOpacity>
    );
  }
  const handleAction = async (action: string) => {
    console.log("Handling action:", action);
    switch (action) {
      case "privacy":
        router.push("/privacy");
        break;

      case "terms":
        router.push("/terms");
        break;

      case "logout":
        console.log("Handling logout action");

        Alert.alert("Sign Out", "Are you sure you want to sign out?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sign Out",
            onPress: async () => {
              try {
                const before = await AsyncStorage.getItem("userid");

                console.log("Before remove:", before);

                const after = await AsyncStorage.getItem("userid");

                router.replace("/auth");
              } catch (error) {
                console.log("Logout error:", error);
              }
            },
          },
        ]);

        break;
      case "delete":
        Alert.alert(
          "Delete Account",
          "This action cannot be undone. Are you sure?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                try {
                  const userId = await AsyncStorage.getItem("userid");

                  // Example API
                  await fetch("YOUR_BACKEND_DELETE_API", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userId,
                    }),
                  });

                  await AsyncStorage.removeItem("userid");

                  router.replace("/auth");
                } catch (e) {
                  Alert.alert("Error", "Failed to delete account.");
                }
              },
            },
          ],
        );
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={styles.backIcon.color} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* Account Section */}

        <View style={styles.card}>
          {accountItems.map((item, index) => (
            <View key={item.title}>
              <SettingsRow
                item={item}
                onPress={() => {
                  switch (item.id) {
                    case 1:
                      router.push("/personal");
                      break;

                    case 2:
                      router.push("/preferences");
                      break;

                    case 3:
                      router.push("/language");
                      break;

                    default:
                      break;
                  }
                }}
              />

              {index !== accountItems.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Goals */}

        <Text style={styles.sectionTitle}>Goals & Tracking</Text>

        <View style={styles.card}>
          {goalItems.map((item, index) => (
            <View key={item.title}>
              <SettingsRow
                item={item}
                onPress={() => {
                  switch (item.id) {
                    case 1:
                      router.push("/editgoal");
                      break;

                    case 3:
                      router.push("/notify");
                      break;

                    case 4:
                      router.push("/weight");
                      break;

                    default:
                      break;
                  }
                }}
              />

              {index !== goalItems.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Account & Legal</Text>

        <View style={styles.card}>
          {accountActions.map((item, index) => (
            <View key={item.title}>
              <SettingsRow
                item={item}
                onPress={() => {
                  handleAction(item.action);
                }}
              />

              {index !== accountActions.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
