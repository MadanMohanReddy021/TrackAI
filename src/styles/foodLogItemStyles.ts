import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 12,
      padding: 16,
      borderRadius: 18,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    mealType: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },

    time: {
      marginTop: 4,
      color: colors.secondaryText,
      fontSize: 13,
    },

    content: {
      marginTop: 15,
    },

    foodCard: {
      backgroundColor: colors.background,
      padding: 12,
      borderRadius: 12,
      marginBottom: 10,
    },

    foodName: {
      fontSize: 17,
      fontWeight: "700",
      color: colors.text,
      textTransform: "capitalize",
    },

    serving: {
      marginTop: 4,
      marginBottom: 10,
      color: colors.secondaryText,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 4,
    },

    label: {
      color: colors.secondaryText,
    },

    value: {
      color: colors.text,
      fontWeight: "600",
    },
  });
