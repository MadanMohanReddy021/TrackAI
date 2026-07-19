import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Home, Settings, User } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import TabButton from "../components/TabButton.tsx";
import DashboardScreen from "../screens/DashboardScreen";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DashboardScreen />
      </View>

     <View style={styles.bottomBarContainer}>
  <BlurView intensity={100} tint="light" style={styles.bottomBar}>
  <TabButton
    icon={<Home size={22} color="#ffd000" />}
    label="Home"
    active
    onPress={() => router.push("/dashboard")}
  />

  <TabButton
    icon={<User size={22} color="#6b7280" />}
    label="Onboarding"
    onPress={() => router.push("/onboarding")}
  />
  <TabButton
    icon={<User size={22} color="#6b7280" />}
    label="Profile"
    onPress={() => router.push("/profile")}
  />
  <TabButton
    icon={<Settings size={22} color="#6b7280" />}
    label="Auth"
    onPress={() => router.push("/auth")}
  />
  </BlurView>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  flex: 1,
  paddingBottom: 100,
},
 bottomBarContainer: {
  position: "absolute",
  bottom: 5,
  left: 20,
  right: 20,

  borderRadius: 34,

  shadowColor: "#c4b0b007",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 20,
  elevation: 10,
},

bottomBar: {
  height: 68,
  borderRadius: 34,
  overflow: "hidden",
 backgroundColor: "rgb(83, 130, 138)",
  flexDirection: "row",
  color: "rgba(255, 255, 255, 0.05)",
  justifyContent: "space-around",
  alignItems: "center",

  borderWidth: 1,
  borderColor: "rgba(35, 142, 14, 0.3)",
},
});