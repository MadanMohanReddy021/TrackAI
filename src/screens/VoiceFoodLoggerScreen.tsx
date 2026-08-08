import { useTheme } from "@/context/ThemeContext";
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

import { Ionicons } from "@expo/vector-icons";

import BASE_URL from "@/storage/ipAdress";
export default function VoiceFoodLoggerScreen() {
  const finalTranscriptRef = useRef("");
  const transcriptRef = useRef("");
  const [isListening, setIsListening] = useState(false);
  const lastFinalRef = useRef("");
  const [transcript, setTranscript] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setup() {
      const permission =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();

      console.log("Speech permission", permission);
    }

    setup();
  }, []);

  /*
    Live speech updates
  */
  const { colors } = useTheme();

  const styles = createStyles(colors);
  useSpeechRecognitionEvent("result", (event) => {
    const result = event.results?.[0];

    if (!result) return;

    const text = result.transcript.trim();

    if (!text) return;

    if (result.isFinal) {
      if (text !== lastFinalRef.current) {
        lastFinalRef.current = text;

        finalTranscriptRef.current = (
          finalTranscriptRef.current +
          " " +
          text
        ).trim();
      }

      setTranscript(finalTranscriptRef.current);
    } else {
      setTranscript(`${finalTranscriptRef.current} ${text}`.trim());
    }
  });

  useSpeechRecognitionEvent("end", () => {
    console.log("Speech recognition ended");
    setIsListening(false);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech Error:", event);
    setIsListening(false);
  });

  const startListening = async () => {
    try {
      finalTranscriptRef.current = "";
      lastFinalRef.current = "";

      setTranscript("");

      await ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
        continuous: true,
      });

      setIsListening(true);
    } catch (err) {
      console.log(err);
    }
  };

  const stopListening = async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();

      setIsListening(false);

      const finalText = finalTranscriptRef.current.trim();

      if (finalText.length > 0) {
        await sendToBackend(finalText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendToBackend = async (text: string) => {
    try {
      setLoading(true);

      const userid = await AsyncStorage.getItem("userid");

      console.log("User ID:", userid);
      if (!userid) {
        console.log("User ID not found");
        return;
      }

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
      console.log("Backend error", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="volume-mute-outline"
              size={28}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Voice Food Logger</Text>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="volume-mute-outline"
              size={28}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Text Area */}

        <View style={styles.center}>
          <View style={styles.textBox}>
            <Text style={styles.textTitle}>Tell me what you ate</Text>

            <ScrollView>
              <Text style={styles.transcript}>
                {transcript || "Your speech will appear here..."}
              </Text>
            </ScrollView>
          </View>

          <TouchableOpacity
            style={[styles.micButton, isListening && styles.activeMic]}
            onPress={isListening ? stopListening : startListening}
          >
            <Ionicons
              name={isListening ? "stop" : "mic"}
              size={50}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.status}>
            {isListening ? "Listening..." : "Tap microphone to speak"}
          </Text>
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />

          <Text style={styles.loadingText}>Processing food...</Text>
        </View>
      )}

      {/* Backend Result */}
    </View>
  );
}

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
      justifyContent: "space-between",
      alignItems: "center",
    },

    title: {
      color: colors.text,
      fontSize: 26,
      fontWeight: "700",
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
