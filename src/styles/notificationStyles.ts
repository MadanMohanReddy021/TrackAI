import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingTop: 35,
    },

    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },

    header: {
      marginTop: 20,
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
      color: colors.text,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
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
      color: colors.text,
    },

    timeInput: {
      marginTop: 15,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 12,
      fontSize: 16,
      backgroundColor: colors.background,
      color: colors.text,
    },
  });
