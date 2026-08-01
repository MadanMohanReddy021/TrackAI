import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
export default function SplashScreen() {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userid = await AsyncStorage.getItem("userid");

        setTimeout(() => {
          if (userid) {
            router.replace("/dashboard");
          } else {
            router.replace("/landing");
          }
        }, 3000);
      } catch (error) {
        console.log("Splash error:", error);

        router.replace("/landing");
      }
    };

    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/TrackAI-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>TrackAI</Text>

      <ActivityIndicator size="small" color="#3B82F6" style={styles.loader} />

      <Text style={styles.loadingText}>Redirecting in 3 seconds...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05070b",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },

  title: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: 1,
  },

  loader: {
    marginTop: 35,
  },

  loadingText: {
    marginTop: 15,
    color: "#d1d5db",
    fontSize: 15,
  },
});
