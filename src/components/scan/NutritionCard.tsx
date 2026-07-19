import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  value: number;
  unit: string;
  color: string;
};

export default function NutritionCard({
  title,
  value,
  unit,
  color,
}: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        <Text style={[styles.value, { color }]}>
          {Math.round(value)}
        </Text>

        <Text style={styles.unit}>
          {unit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {

    flex: 1,

    backgroundColor: "#FFF",

    padding: 18,

    borderRadius: 20,

    borderLeftWidth: 6,

    margin: 6,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 4,

  },

  title: {

    fontSize: 15,

    color: "#666",

    marginBottom: 12,

  },

  row: {

    flexDirection: "row",

    alignItems: "flex-end",

  },

  value: {

    fontSize: 30,

    fontWeight: "700",

  },

  unit: {

    marginLeft: 6,

    color: "#777",

    marginBottom: 4,

  },

});