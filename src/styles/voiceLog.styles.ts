import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },


  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },


  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,

    shadowColor: colors.shadow || "#000000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },


  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },


  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 22,
  },


  micContainer: {
    marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },


  micButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.button,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: colors.button,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.35,
    shadowRadius: 12,

    elevation: 8,
  },


  micButtonListening: {
    backgroundColor: "#EF4444",
  },


  status: {
    marginTop: 18,
    fontSize: 15,
    textAlign: "center",
    color: colors.secondaryText,
    fontWeight: "600",
  },


  transcriptCard: {
    marginTop: 28,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 180,
    padding: 16,
  },


  transcriptInput: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
    textAlignVertical: "top",
    minHeight: 150,
  },


  button: {
    marginTop: 24,
    backgroundColor: colors.button,
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },


  buttonDisabled: {
    opacity: 0.6,
  },


  buttonText: {
    color: colors.buttonText,
    fontWeight: "700",
    fontSize: 16,
  },


  secondaryButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },


  secondaryButtonText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },


  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },


  errorText: {
    color: "#EF4444",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },

});