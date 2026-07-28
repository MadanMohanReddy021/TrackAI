import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },


  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },


  backButton: {
    width: 32,
    alignItems: "flex-start",
  },
backIcon: {
  color: colors.text,
},

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },


  sectionTitle: {
    marginTop: 28,
    marginBottom: 10,
    marginHorizontal: 20,
    fontSize: 17,
    fontWeight: "600",
    color: colors.primary,
  },


  card: {
    marginHorizontal: 18,
    backgroundColor: colors.card,
    borderRadius: 24,
    overflow: "hidden",

    shadowColor: colors.shadow,

    shadowOpacity: 0.05,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },


  row: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },


  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },


  rowText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },


  divider: {
    marginLeft: 54,
    height: 1,
    backgroundColor: colors.border,
  },

});