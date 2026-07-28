import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },

    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },

    loadingText: {
      marginTop: 10,
      color: colors.secondaryText,
    },

    header: {
      marginTop: 50,
      marginBottom: 25,
    },

    dayText: {
      fontSize: 14,
      color: colors.secondaryText,
      marginBottom: 5,
    },

    title: {
      fontSize: 30,
      fontWeight: "500",
      color: colors.text,
    },

    goldText: {
      color: colors.primary,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },

    cardTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 10,
    },

    bigNumber: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },

    smallText: {
      fontSize: 14,
      fontWeight: "400",
      color: colors.secondaryText,
    },

    leftText: {
      marginTop: 8,
      fontSize: 13,
      color: colors.secondaryText,
    },

    progressBackground: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 20,
      overflow: "hidden",
      marginTop: 15,
    },

    progressFill: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 20,
    },

    macroContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 15,
    },

    macroCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },

    macroTitle: {
      fontSize: 13,
      color: colors.secondaryText,
      marginBottom: 8,
    },

    macroValue: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },

    smallButton: {
      marginTop: 15,
      backgroundColor: colors.primary,
      height: 40,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "600",
    },

    sectionHeader: {
      marginTop: 10,
      marginBottom: 10,
    },

    sectionTitle: {
      fontSize: 22,
      fontWeight: "600",
      color: colors.text,
    },
        emptyCard: {
      backgroundColor: colors.card,
      padding: 30,
      borderRadius: 20,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    emptyText: {
      color: colors.secondaryText,
    },

    foodCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 12,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },

    foodImage: {
      width: 55,
      height: 55,
      borderRadius: 15,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    foodInfo: {
      flex: 1,
    },

    foodName: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },

    foodSub: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 3,
    },

    foodCalories: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },

    addButton: {
      position: "absolute",
      right: 25,
      bottom: 30,
      width: 65,
      height: 65,
      borderRadius: 35,
      backgroundColor: colors.text,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6,
    },

    addText: {
      fontSize: 35,
      color: colors.card,
      fontWeight: "300",
    },

    fabContainer: {
      position: "absolute",
      bottom: 80,
      right: 25,
      width: 180,
      height: 180,
    },

    fabButton: {
      width: 55,
      height: 55,
      borderRadius: 27.5,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },

    mainFab: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 65,
      height: 65,
      borderRadius: 32.5,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6,
    },

    optionButton: {
      position: "absolute",
      width: 55,
      height: 55,
      borderRadius: 27.5,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
  });