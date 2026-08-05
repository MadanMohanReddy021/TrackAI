import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },

    image: {
      width: "100%",
      height: 240,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    deleteButton: {
      position: "absolute",
      right: 10,
      top: 8,
      zIndex: 10,
    },
    mealContainer: {
      margin: 20,
      padding: 15,
      backgroundColor: colors.card,
      borderRadius: 15,
    },

    mealTitle: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 12,
      color: colors.text,
    },

    mealOptions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },

    mealButton: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },

    selectedMeal: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    mealText: {
      color: colors.secondaryText,
      fontWeight: "600",
    },

    selectedMealText: {
      color: colors.secondaryText,
    },

    heading: {
      fontSize: 26,
      fontWeight: "700",
      color: colors.text,
      marginHorizontal: 20,
      marginVertical: 18,
    },

    addFoodContainer: {
      margin: 20,
    },

    addFoodInput: {
      height: 55,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 10,
      color: colors.text,
      backgroundColor: colors.card,
    },

    addFoodButton: {
      height: 55,
      backgroundColor: colors.primary,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      color: colors.buttonText,
    },

    card: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 20,
      padding: 18,

      shadowColor: colors.primary,
      shadowOpacity: 0.08,
      shadowRadius: 12,

      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 3,
    },

    foodName: {
      fontSize: 21,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
      textTransform: "capitalize",
    },

    servingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },

    label: {
      fontSize: 16,
      color: colors.secondaryText,
      marginRight: 10,
    },

    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    qtyButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.primaryLight,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.primary,
    },

    qtyButtonText: {
      color: colors.primary,
      fontSize: 22,
      fontWeight: "700",
    },

    input: {
      width: 65,
      height: 38,
      marginHorizontal: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      textAlign: "center",
      color: colors.text,
      fontWeight: "600",
    },

    unit: {
      marginLeft: 8,
      fontSize: 15,
      color: colors.secondaryText,
      fontWeight: "600",
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 8,
      color: colors.text,
    },

    gridItem: {
      width: "31%",
      backgroundColor: colors.surface,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    gridLabel: {
      fontSize: 14,
      color: colors.text,
      marginTop: 4,
      fontWeight: "500",
    },
    totalLabel: {
      fontSize: 16,
      color: colors.text,
    },

    totalValue: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    gridValue: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 4,
      color: colors.text,
    },

    totalCard: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 18,
      borderRadius: 22,
      padding: 20,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,

      shadowColor: colors.primary,
      shadowOpacity: 0.1,
      shadowRadius: 14,

      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 4,
    },

    totalTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.primary,
      marginBottom: 16,
    },

    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 7,
      color: colors.secondaryText,
    },

    actionButton: {
      flex: 1,
      marginHorizontal: 6,
      backgroundColor: colors.primary,
      paddingVertical: 13,
      borderRadius: 28,
      alignItems: "center",

      shadowColor: colors.primary,
      shadowOpacity: 0.22,
      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 6,
    },

    actionText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "700",
    },

    backButton: {
      margin: 18,
      backgroundColor: colors.primary,
      borderRadius: 28,
      paddingVertical: 13,
      alignItems: "center",

      shadowColor: colors.primary,
      shadowOpacity: 0.22,
      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 6,
    },

    backText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "700",
    },
  });
