import { StyleSheet, Text, View } from "react-native";

type Props = {
  score: number;
};

export default function HealthScore({
  score,
}: Props) {

  let color = "#EF4444";

  if (score >= 8)
    color = "#22C55E";
  else if (score >= 6)
    color = "#F59E0B";

  return (
    <View style={styles.container}>

      <View
        style={[
          styles.circle,
          {
            borderColor: color,
          },
        ]}
      >
        <Text
          style={[
            styles.number,
            {
              color,
            },
          ]}
        >
          {score}
        </Text>

        <Text style={styles.label}>
          /10
        </Text>

      </View>

      <Text style={styles.title}>
        Health Score
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    marginVertical: 25,
  },

  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    fontSize: 42,
    fontWeight: "700",
  },

  label: {
    fontSize: 18,
    color: "#666",
  },

  title: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
  },

});