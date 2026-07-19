import { StyleSheet, Text, View } from "react-native";

type Props = {
  score: number;
};

export default function AIInsights({
  score,
}: Props) {

  let message = "";

  if (score >= 8) {
    message =
      "Excellent meal. High nutritional balance.";
  } else if (score >= 6) {
    message =
      "Good meal. Consider adding more vegetables.";
  } else {
    message =
      "This meal is high in calories. Add more protein and fiber.";
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        AI Insights
      </Text>

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 18,
    marginTop: 25,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  text: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },

});