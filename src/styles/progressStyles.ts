import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

title:{
fontSize: 22,
    fontWeight: "700",
    color: colors.text,
},
  content: {
    paddingBottom: 40,
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
    borderRadius: 20,

    shadowColor: colors.shadow,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
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