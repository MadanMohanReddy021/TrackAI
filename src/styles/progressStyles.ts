import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    secondaryText: {
      color: colors.secondaryText,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
    content: {
      paddingBottom: 40,
    },
    header: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      marginTop: 10,
      backgroundColor: colors.background,
    },

    backButton: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },

    headerTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
    streakSection: {
      width: "100%",
    },

    streakSummaryCard: {
      borderRadius: 20,
      padding: 18,
      marginBottom: 22,
    },

    streakSummaryHeader: {
      flexDirection: "row",
      alignItems: "center",
    },

    streakIconCircle: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: "rgba(255,107,53,0.12)",
      justifyContent: "center",
      alignItems: "center",
    },

    streakSummaryText: {
      marginLeft: 14,
      flex: 1,
    },

    streakSummaryTitle: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 2,
    },

    streakValueRow: {
      flexDirection: "row",
      alignItems: "baseline",
    },

    currentStreakValue: {
      fontSize: 32,
      fontWeight: "800",
    },

    currentStreakUnit: {
      fontSize: 14,
      fontWeight: "500",
      marginLeft: 5,
    },

    bestStreakRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      paddingTop: 14,
      borderTopWidth: 1,
    },

    bestStreakText: {
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 8,
    },

    bestStreakValue: {
      fontSize: 17,
      fontWeight: "800",
      marginLeft: "auto",
    },

    bestStreakUnit: {
      fontSize: 12,
      fontWeight: "500",
    },

    badgesHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },

    badgesTitle: {
      fontSize: 19,
      fontWeight: "800",
    },

    badgesSubtitle: {
      fontSize: 12,
      marginTop: 3,
    },

    badgeCountContainer: {
      minWidth: 48,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },

    badgeCountText: {
      fontSize: 13,
      fontWeight: "800",
    },

    badgesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },

    badgeWrapper: {
      width: "23%",
      alignItems: "center",
      marginBottom: 18,
    },

    badgeImageContainer: {
      width: 76,
      height: 76,
      borderRadius: 38,
      justifyContent: "center",
      alignItems: "center",
    },

    badgeImage: {
      width: 72,
      height: 72,
    },

    lockedBadgeImageContainer: {
      opacity: 0.42,
    },

    lockedBadgeImage: {
      opacity: 0.55,
    },

    lockIconContainer: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(128,128,128,0.18)",
    },

    badgeLabel: {
      fontSize: 11,
      fontWeight: "700",
      marginTop: 6,
      textAlign: "center",
    },

    lockedBadgeLabel: {
      opacity: 0.55,
    },

    noBadgesCard: {
      minHeight: 110,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      padding: 18,
    },

    noBadgesText: {
      fontSize: 13,
      textAlign: "center",
      marginTop: 8,
    },

    lockedSection: {
      marginTop: 4,
    },

    lockedToggle: {
      minHeight: 48,
      borderRadius: 14,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    lockedToggleLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    lockedToggleText: {
      fontSize: 13,
      fontWeight: "600",
      marginLeft: 9,
    },

    lockedBadgesContainer: {
      marginTop: 8,
      borderRadius: 16,
      paddingTop: 16,
      paddingHorizontal: 8,
    },
    progressChartsContainer: {
      width: "100%",
    },

    progressChartCard: {
      borderRadius: 20,
      paddingTop: 18,
      paddingBottom: 12,
      paddingHorizontal: 10,
      marginBottom: 16,
      overflow: "hidden",
    },

    progressChartHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      marginBottom: 6,
    },

    progressChartTitle: {
      fontSize: 18,
      fontWeight: "800",
    },

    progressChartSubtitle: {
      fontSize: 12,
      marginTop: 3,
    },

    progressChartUnit: {
      minWidth: 48,
      height: 32,
      paddingHorizontal: 10,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },

    progressChartUnitText: {
      fontSize: 12,
      fontWeight: "700",
    },

    progressChart: {
      marginTop: 2,
      borderRadius: 16,
    },
    stepsChartCard: {
      width: "100%",
      borderRadius: 20,
      paddingTop: 18,
      paddingBottom: 12,
      paddingHorizontal: 10,
      marginBottom: 16,
      overflow: "hidden",
    },

    stepsChartHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      marginBottom: 6,
    },

    stepsChartTitle: {
      fontSize: 18,
      fontWeight: "800",
    },

    stepsChartSubtitle: {
      fontSize: 12,
      marginTop: 3,
    },

    stepsGoalBadge: {
      minWidth: 58,
      height: 32,
      paddingHorizontal: 10,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },

    stepsGoalText: {
      fontSize: 12,
      fontWeight: "700",
    },

    stepsChart: {
      marginTop: 2,
      borderRadius: 16,
    },
    categoryIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },

    categoryHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14,
    },

    categoryTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    badgeCategory: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },

    categoryTitle: {
      fontSize: 17,
      fontWeight: "700",
      lineHeight: 22,
    },

    categorySubtitle: {
      fontSize: 12,
      marginTop: 3,
      lineHeight: 16,
    },

    categoryStreak: {
      alignItems: "flex-end",
      justifyContent: "center",
      marginLeft: 10,
    },

    categoryCurrent: {
      fontSize: 20,
      fontWeight: "800",
      lineHeight: 24,
    },

    categoryBest: {
      fontSize: 11,
      fontWeight: "500",
      marginTop: 2,
      lineHeight: 15,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    description: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 22,
    },

    primaryButton: {
      marginTop: 18,
      backgroundColor: colors.button,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: "center",
    },

    primaryButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "700",
    },

    deleteCard: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginTop: 20,
      marginBottom: 40,
      borderRadius: 20,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.dangerBorder,
    },

    deleteTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.danger,
      marginBottom: 12,
    },

    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },

    card: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginTop: 16,
      padding: 20,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.border,

      shadowColor: colors.shadow,

      shadowOffset: {
        width: 0,
        height: 2,
      },

      shadowOpacity: 0.08,
      shadowRadius: 8,

      elevation: 3,
    },

    // Streak section styles
    streakCard: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginTop: 10,
      padding: 18,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    streakTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
      marginBottom: 4,
    },
    streakNumber: {
      fontSize: 42,
      fontWeight: "800" as const,
    },
    streakDays: {
      fontSize: 16,
      fontWeight: "500" as const,
    },
    streakIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
    goalCard: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginTop: 12,
      padding: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row" as const,
      alignItems: "center" as const,
    },
    goalTitle: {
      fontSize: 15,
      fontWeight: "700" as const,
      color: colors.text,
    },
    goalText: {
      fontSize: 13,
      color: colors.secondaryText,
      marginTop: 2,
    },
    streakTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    streakFlameContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    flameBadge: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: "rgba(255, 107, 0, 0.12)",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(255, 107, 0, 0.25)",
    },
    streakCountText: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.text,
    },
    streakSubtitle: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 2,
    },
    streakActiveBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
    },
    streakActiveBadgeText: {
      color: colors.background,
      fontSize: 11,
      fontWeight: "700",
    },
    streakDaysContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.background,
      borderRadius: 18,
      paddingVertical: 12,
      paddingHorizontal: 8,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    streakDayItem: {
      alignItems: "center",
      gap: 5,
    },
    streakDayBubble: {
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },
    streakDayDate: {
      fontSize: 11,
      fontWeight: "700",
    },
    streakDayInitial: {
      fontSize: 10,
      fontWeight: "500",
      color: colors.secondaryText,
    },
    streakMetricsRow: {
      flexDirection: "row",
      gap: 8,
    },
    streakMetricBox: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 14,
      paddingVertical: 10,
      paddingHorizontal: 6,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    streakMetricVal: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },
    streakMetricLbl: {
      fontSize: 10,
      color: colors.secondaryText,
      marginTop: 2,
    },

    // Card Header Enhancements
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16,
    },
    cardHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      flex: 1,
    },
    cardIconBadge: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitleText: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },
    cardSubText: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 2,
    },
    cardMetricPill: {
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "flex-end",
    },
    cardMetricPillText: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.text,
    },
    cardMetricPillSub: {
      fontSize: 10,
      color: colors.secondaryText,
    },

    // Tabs for Nutrition
    tabsContainer: {
      flexDirection: "row",
      gap: 6,
      marginBottom: 14,
      flexWrap: "wrap",
    },
    tabPill: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    tabPillActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    tabPillText: {
      fontSize: 11,
      fontWeight: "600",
      color: colors.secondaryText,
    },
    tabPillTextActive: {
      color: colors.background,
      fontWeight: "700",
    },

    // Chart Footer Summary Row
    chartFooterRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    chartFooterItem: {
      flex: 1,
      alignItems: "center",
    },
    chartFooterValue: {
      fontSize: 14,
      fontWeight: "700",
      color: colors.text,
    },
    chartFooterLabel: {
      fontSize: 10,
      color: colors.secondaryText,
      marginTop: 2,
    },
    legendRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 16,
      marginTop: 12,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      fontSize: 11,
      fontWeight: "600",
      color: colors.secondaryText,
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 18,
    },

    sectionSubtitle: {
      fontSize: 14,
      color: colors.secondaryText,
      marginBottom: 20,
      lineHeight: 22,
    },

    overviewRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 14,
    },

    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },

    button: {
      backgroundColor: colors.button,
      height: 52,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 18,
    },

    buttonText: {
      color: colors.buttonText,
      fontWeight: "700",
      fontSize: 16,
    },

    secondaryButton: {
      borderWidth: 1,
      borderColor: colors.primary,
      height: 52,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 14,
    },

    secondaryButtonText: {
      color: colors.primary,
      fontWeight: "700",
      fontSize: 16,
    },

    dangerCard: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginTop: 20,
      marginBottom: 40,
      padding: 20,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.dangerBorder,
    },

    dangerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.danger,
      marginBottom: 8,
    },

    dangerDescription: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 22,
    },

    deleteButton: {
      marginTop: 20,
      height: 50,
      borderRadius: 14,
      backgroundColor: colors.danger,
      justifyContent: "center",
      alignItems: "center",
    },

    deleteButtonText: {
      color: colors.buttonText,
      fontWeight: "700",
      fontSize: 16,
    },

    errorText: {
      color: colors.error,
      fontSize: 16,
      textAlign: "center",
      paddingHorizontal: 20,
    },
  });
