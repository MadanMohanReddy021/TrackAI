import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
  color: "#6B7280",
  lineHeight: 22,
},

primaryButton: {
  marginTop: 18,
  backgroundColor: "#10B981",
  borderRadius: 14,
  paddingVertical: 14,
  alignItems: "center",
},

primaryButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
},

deleteCard: {
  backgroundColor: "#FFFFFF",
  marginHorizontal: 16,
  marginTop: 20,
  marginBottom: 40,
  borderRadius: 20,
  padding: 20,
  borderWidth: 1,
  borderColor: "#FCA5A5",
},

deleteTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#DC2626",
  marginBottom: 12,
},
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 20,

    shadowColor: "#000",
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
    color: "#111827",
    marginBottom: 18,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
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
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  button: {
    backgroundColor: "#10B981",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#10B981",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },

  secondaryButtonText: {
    color: "#10B981",
    fontWeight: "700",
    fontSize: 16,
  },

  dangerCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  dangerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 8,
  },

  dangerDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },

  deleteButton: {
    marginTop: 20,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  errorText: {
    color: "#EF4444",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});