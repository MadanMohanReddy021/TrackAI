import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },

    header: {
      marginTop: 20,
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
      padding: 4,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },

    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },

    card: {
      marginBottom: 18,
    },

    label: {
      color: colors.secondaryText,
      marginBottom: 8,
      fontSize: 15,
    },

    input: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 10,
      fontSize: 17,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },

    editInput: {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.card,
    },
  });
