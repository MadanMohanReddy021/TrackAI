import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    macroProgress: {
      width: 90,
      height: 90,
      justifyContent: "center",
      alignItems: "center",
    },

    centerContent: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },

    emoji: {
      fontSize: 23,
      marginBottom: 2,
    },

    circleValue: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },

    circleTarget: {
      fontSize: 10,
      color: colors.secondaryText,
    },
    calorieCard: {
      width: "75%",
      backgroundColor: colors.card,

      borderRadius: 24,
      paddingVertical: 10,
      paddingHorizontal: 20,

      alignItems: "center",
      justifyContent: "center",

      borderWidth: 1,
      borderColor: colors.border,

      marginBottom: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },

    previousText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#666",
    },

    dayText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#000",
    },

    title: {
      fontSize: 30,
      fontWeight: "700",
      color: colors.text,
      textAlign: "left",
      marginTop: 12,
      marginBottom: 20,
      paddingVertical: 0,
      backgroundColor: colors.background,
      letterSpacing: 1,
    },
    calorieTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 20,
    },

    calorieProgress: {
      alignItems: "center",
      justifyContent: "center",
    },

    calorieValue: {
      fontSize: 22,
      fontWeight: "800",
    },

    calorieTarget: {
      fontSize: 12,
      fontWeight: "500",
    },
    dateContainer: {
      gap: 5,
      backgroundColor: colors.date,
      marginBottom: 10,
    },
    greeting: {
      fontSize: 26,
      fontWeight: "700",
      color: colors.text,
      marginTop: 8,
      marginBottom: 0,
      paddingHorizontal: 0,
    },
    topSection: {
      flexDirection: "row",
      gap: 0,
      alignItems: "stretch",
      marginBottom: 15,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
      marginBottom: 12,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.progressBackground,
      marginHorizontal: 4,
    },

    macroIcon: {
      marginBottom: 2,
    },
    activeDot: {
      width: 20,
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    waterMiniCard: {
      width: 90,
      borderWidth: 1,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      marginBottom: 5,
    },

    waterAmount: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: "700",
    },

    waterTarget: {
      marginTop: 2,
      fontSize: 12,
    },
    dateCard: {
      width: 50,
      height: 60,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },

    day: {
      fontSize: 12,
      marginBottom: 4,
      fontWeight: "500",
    },

    date: {
      fontSize: 22,
      fontWeight: "700",
    },
    leftCalories: {
      marginTop: 10,
      fontSize: 15,
      fontWeight: "600",
      color: colors.secondaryText,
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
      width: "100%",
      height: 12,
      backgroundColor: colors.progressBackground,
      borderRadius: 999,
      overflow: "hidden",
      marginTop: 12,
    },

    progressFill: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 999,
    },

    macroContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 15,
      paddingHorizontal: 5,
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
    macroCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 22,
      paddingVertical: 20,
      paddingHorizontal: 15,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 5,
    },

    macroValue: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginTop: 20,
    },
    waterFill: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.25,
    },

    macroTarget: {
      fontSize: 14,
      color: colors.secondaryText,
      marginTop: 4,
    },
    macroTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      textAlign: "center",
      marginBottom: 15,
    },
    healthNote: {
      marginTop: 10,
      fontSize: 12,
      color: colors.text,
      textAlign: "center",
    },

    calorieLeft: {
      flex: 1,
    },
  });
