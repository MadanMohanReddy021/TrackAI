import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Home, TrendingUp, User } from "lucide-react-native";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabButton from "../components/TabButton.tsx";
import { useTheme } from "../context/ThemeContext";
import DashboardScreen from "../screens/DashboardScreen";
import { DarkTheme, LightTheme } from "../theme/colors";
export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const colors = theme === "dark" ? DarkTheme : LightTheme;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },

        bottomBarContainer: {
          position: "absolute",
          left: 24,
          right: 24,
          height: 72,
          borderRadius: 36,
          overflow: "visible",

          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 15,
          },
          shadowOpacity: 0.22,
          shadowRadius: 20,

          elevation: 25,
        },

        bottomBar: {
          flex: 1,
          borderRadius: 36,
          overflow: "hidden",

          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",

          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        },
      }),
    [colors],
  );
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <DashboardScreen />

      <View style={[styles.bottomBarContainer, { bottom: insets.bottom + 7 }]}>
        <BlurView
          intensity={80}
          tint={theme === "dark" ? "dark" : "light"}
          style={styles.bottomBar}
        >
          <TabButton
            icon={<Home size={22} color={colors.primary} />}
            label="Home"
            active
            onPress={() => router.push("/dashboard")}
          />

          <TabButton
            icon={<TrendingUp size={22} color={colors.secondaryText} />}
            label="Progress"
            onPress={() => router.push("/progress")}
          />

          <TabButton
            icon={<User size={22} color="#6b7280" />}
            label="Profile"
            onPress={() => router.push("/profile")}
          />

          {/* <TabButton
            icon={<Settings size={22} color="#6b7280" />}
            label="Auth"
            onPress={() => router.push("/auth")}
          /> */}
        </BlurView>
      </View>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   bottomBarContainer: {
//     position: "absolute",
//     left: 24,
//     right: 24,
//     height: 72,
//     borderRadius: 36,
//     overflow: "visible",

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 15,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 20,

//     elevation: 25,
//   },

//   bottomBar: {
//     flex: 1,
//     borderRadius: 36,
//     overflow: "hidden",

//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",

//     borderWidth: 1,
//   },
// });
