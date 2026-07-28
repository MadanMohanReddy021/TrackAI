import { router, useLocalSearchParams } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ScanResultScreen() {
  const { image, result } = useLocalSearchParams();

  const response = JSON.parse(result as string);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: image as string }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Server Response</Text>

        <Text style={styles.result}>
          {JSON.stringify(response, null, 2)}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  result: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2E8B57",
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});