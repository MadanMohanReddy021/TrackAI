import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
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
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
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
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#10B981",
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
    color: "#6B7280",
    fontWeight: "600",
  },

  transcriptCard: {
    marginTop: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 180,
    padding: 16,
  },

  transcriptInput: {
    fontSize: 16,
    color: "#111827",
    lineHeight: 26,
    textAlignVertical: "top",
    minHeight: 150,
  },

  button: {
    marginTop: 24,
    backgroundColor: "#10B981",
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  secondaryButton: {
    marginTop: 14,
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#10B981",
    fontWeight: "700",
    fontSize: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  errorText: {
    color: "#EF4444",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});