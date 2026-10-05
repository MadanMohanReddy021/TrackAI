import { StyleSheet } from "react-native";

export type MealSectionColors = {
  background: string;
  card: string;
  primary: string;
  text: string;
  secondaryText: string;
  border: string;
  shadow: string;
};

export const createStyles = (colors: MealSectionColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      minHeight: 58,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 42,
      height: 42,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    backIcon: {
      color: colors.text,
      fontSize: 38,
      lineHeight: 42,
      fontWeight: "300",
    },
    pageTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: 0.1,
    },
    headerSpacer: {
      width: 42,
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 18,
      paddingBottom: 28,
      gap: 16,
    },
    sectionCard: {
      overflow: "hidden",
      borderRadius: 22,
      backgroundColor: colors.card,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 3,
    },
    sectionPressed: {
      opacity: 0.88,
    },
    sectionHeading: {
      minHeight: 76,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 18,
      paddingVertical: 12,
      gap: 14,
    },
    sectionIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    sectionIcon: {
      fontSize: 26,
    },
    sectionTitle: {
      flex: 1,
      color: colors.text,
      fontSize: 21,
      fontWeight: "700",
    },
    chevron: {
      color: colors.primary,
      fontSize: 32,
      lineHeight: 36,
      fontWeight: "400",
    },
    imageArea: {
      height: 152,
      marginHorizontal: 12,
      marginBottom: 12,
      overflow: "hidden",
      borderRadius: 16,
      backgroundColor: colors.background,
    },
    sectionImage: {
      width: "100%",
      height: "100%",
    },
    imagePlaceholder: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderStyle: "dashed",
      borderRadius: 16,
    },
    placeholderIcon: {
      fontSize: 34,
    },
    placeholderText: {
      color: colors.secondaryText,
      fontSize: 14,
      fontWeight: "500",
    },
  });
