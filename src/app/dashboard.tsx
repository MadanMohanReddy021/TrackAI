import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Home, TrendingUp, User } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TabButton from "../components/TabButton.tsx";
import { useTheme } from "../context/ThemeContext";
import DashboardScreen from "../screens/DashboardScreen";
import { createTabBarStyles } from "../styles/tabBarStyles";

export default function Dashboard() {
  const insets = useSafeAreaInsets();

  const { colors, isDark } = useTheme();

  const styles = createTabBarStyles(colors, isDark);

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

      <View
        style={[
          styles.bottomBarContainer,
          {
            bottom: insets.bottom + 7,
          },
        ]}
      >
        <BlurView
          intensity={isDark ? 20 : 80}
          tint={isDark ? "dark" : "light"}
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
            icon={<User size={22} color={colors.secondaryText} />}
            label="Profile"
            onPress={() => router.push("/profile")}
          />
        </BlurView>
      </View>
    </View>
  );
}
