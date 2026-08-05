import { StyleSheet } from "react-native";

export const createTabBarStyles = (colors: any, isDark: boolean) =>
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

      backgroundColor: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",

      borderWidth: 1,
      borderColor: colors.border,
    },
  });
