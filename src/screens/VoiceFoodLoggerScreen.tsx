import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

import { useTheme } from "@/context/ThemeContext";
import BASE_URL from "@/storage/ipAdress";

export default function VoiceFoodLoggerScreen() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Stores only final speech results
  const finalTranscriptRef = useRef("");

  // Prevent duplicate final results
  const lastFinalRef = useRef("");

  /*
   * Request speech recognition permission
   */
  useEffect(() => {
    const setup = async () => {
      try {
        const permission =
          await ExpoSpeechRecognitionModule.requestPermissionsAsync();

        console.log("Speech permission", permission);
      } catch (error) {
        console.log("Speech permission error:", error);
      }
    };

    setup();
  }, []);

  /*
   * Speech recognition result
   */
  useSpeechRecognitionEvent("result", (event) => {
    console.log("Speech result event:", event);

    const results = event.results;

    if (!results || results.length === 0) {
      return;
    }

    // Get the latest recognized result
    const result = results[results.length - 1];

    const text = result?.transcript?.trim();

    if (!text) {
      return;
    }

    console.log("Recognized text:", text);
    console.log("Is final:", event.isFinal);

    /*
     * FINAL RESULT
     */
    if (event.isFinal) {
      console.log("FINAL:", text);

      // Prevent exact duplicate
      if (text === lastFinalRef.current) {
        return;
      }

      lastFinalRef.current = text;

      const currentFinal = finalTranscriptRef.current.trim();

      /*
       * Handle cumulative results.
       */
      if (!currentFinal) {
        finalTranscriptRef.current = text;
      } else if (text.startsWith(currentFinal)) {
        // Example:
        // current = "I ate two"
        // new     = "I ate two eggs"
        finalTranscriptRef.current = text;
      } else if (currentFinal.startsWith(text)) {
        // Ignore shorter duplicate
        return;
      } else {
        // New independent sentence
        finalTranscriptRef.current = `${currentFinal} ${text}`.trim();
      }

      setTranscript(finalTranscriptRef.current);

      console.log("FINAL TRANSCRIPT:", finalTranscriptRef.current);
    } else {
      /*
       * INTERIM RESULT
       */
      setTranscript(`${finalTranscriptRef.current} ${text}`.trim());
    }
  });

  /*
   * Speech recognition ended
   */
  useSpeechRecognitionEvent("end", () => {
    console.log("Speech recognition ended");

    setIsListening(false);
  });

  /*
   * Speech recognition error
   */
  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech Error:", event);

    setIsListening(false);
  });

  /*
   * Start speech recognition
   */
  const startListening = async () => {
    try {
      finalTranscriptRef.current = "";
      lastFinalRef.current = "";

      setTranscript("");
      setIsListening(true);

      console.log("Starting speech recognition...");

      await ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
        continuous: true,
      });

      console.log("Speech recognition started");
    } catch (error) {
      console.log("Start speech error:", error);

      setIsListening(false);
    }
  };

  /*
   * Stop speech recognition
   */
  const stopListening = async () => {
    try {
      console.log("Stopping speech recognition...");

      await ExpoSpeechRecognitionModule.stop();

      setIsListening(false);

      // Give the final event time to update
      setTimeout(async () => {
        const finalText = finalTranscriptRef.current.trim();

        console.log("=================================");
        console.log("FINAL COMPLETE TEXT:", finalText);
        console.log("=================================");

        if (!finalText) {
          console.log("No speech text detected");
          return;
        }

        await sendToBackend(finalText);

        console.log("Sent to backend:", finalText);
      }, 500);
    } catch (error) {
      console.log("Stop speech error:", error);

      setIsListening(false);
    }
  };

  /*
   * Send food text to backend
   */
  const sendToBackend = async (text: string) => {
    try {
      setLoading(true);

      const userid = await AsyncStorage.getItem("userid");

      console.log("User ID:", userid);

      if (!userid) {
        console.log("User ID not found");
        return;
      }

      console.log("Sending food text:", text);

      const response = await axios.post(
        `${BASE_URL}/analyze-food`,
        {
          foodName: text,
          userid: userid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Food Analysis Response:", response.data);

      router.push({
        pathname: "/foodresult",
        params: {
          image: "",
          result: JSON.stringify(response.data),
        },
      });
    } catch (error: any) {
      console.log("Backend error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Voice Food Logger</Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.center}>
        {/* Speech Text Box */}
        <View style={styles.textBox}>
          <Text style={styles.textTitle}>Tell me what you ate</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            <Text style={styles.transcript}>
              {transcript || "Your speech will appear here..."}
            </Text>
          </ScrollView>
        </View>

        {/* Microphone Button */}
        <TouchableOpacity
          style={[styles.micButton, isListening && styles.activeMic]}
          onPress={isListening ? stopListening : startListening}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isListening ? "stop" : "mic"}
            size={50}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Status */}
        <Text style={styles.status}>
          {isListening ? "Listening..." : "Tap microphone to speak"}
        </Text>
      </View>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />

          <Text style={styles.loadingText}>Processing food...</Text>
        </View>
      )}
    </View>
  );
}

/*
 * Styles
 */
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    overlay: {
      flex: 1,
      backgroundColor: colors.overlay || "rgba(0,0,0,0.55)",
    },

    header: {
      marginTop: 60,
      paddingHorizontal: 20,

      flexDirection: "row",
      alignItems: "center",
    },

    backButton: {
      width: 45,
      height: 45,
      borderRadius: 22.5,

      backgroundColor: colors.card,

      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      flex: 1,
      textAlign: "center",

      color: colors.text,
      fontSize: 26,
      fontWeight: "700",
    },

    headerSpacer: {
      width: 45,
    },

    iconButton: {
      width: 60,
      height: 60,

      borderRadius: 30,

      backgroundColor: colors.card,

      justifyContent: "center",
      alignItems: "center",
    },

    center: {
      flex: 1,

      justifyContent: "center",
      alignItems: "center",

      paddingHorizontal: 20,
    },

    textBox: {
      width: "100%",
      height: 250,

      borderWidth: 2,
      borderColor: colors.primary,

      borderRadius: 25,

      padding: 20,

      backgroundColor: colors.card,
    },

    textTitle: {
      color: colors.primary,

      fontSize: 22,
      fontWeight: "700",

      marginBottom: 20,
    },

    scrollView: {
      flex: 1,
    },

    transcript: {
      color: colors.text,

      fontSize: 20,
      lineHeight: 30,
    },

    micButton: {
      marginTop: 50,

      width: 100,
      height: 100,

      borderRadius: 50,

      backgroundColor: colors.card,

      justifyContent: "center",
      alignItems: "center",

      shadowColor: colors.primary,
      shadowOpacity: 0.25,
      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 5,
    },

    activeMic: {
      backgroundColor: colors.primary,
    },

    status: {
      marginTop: 20,

      color: colors.text,

      fontSize: 18,
    },

    loading: {
      ...StyleSheet.absoluteFill,

      backgroundColor: "rgba(0,0,0,0.7)",

      justifyContent: "center",
      alignItems: "center",
    },

    loadingText: {
      color: "#fff",

      marginTop: 15,

      fontSize: 18,
    },

    modal: {
      flex: 1,

      padding: 25,

      backgroundColor: colors.background,
    },

    resultTitle: {
      fontSize: 28,

      fontWeight: "bold",

      marginBottom: 20,

      color: colors.text,
    },

    resultText: {
      fontSize: 16,

      lineHeight: 24,

      color: colors.text,
    },

    closeButton: {
      marginTop: 30,

      backgroundColor: colors.primary,

      padding: 15,

      borderRadius: 15,
    },

    closeText: {
      color: colors.buttonText,

      textAlign: "center",

      fontSize: 18,

      fontWeight: "700",
    },
  });
