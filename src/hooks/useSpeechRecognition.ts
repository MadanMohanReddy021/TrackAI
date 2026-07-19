import Voice from "@react-native-voice/voice";
import { useEffect, useState } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsListening(true);
    };

    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };

    Voice.onSpeechResults = (e: any) => {
      if (e.value?.length) {
        setTranscript(e.value[0]);
      }
    };

    Voice.onSpeechPartialResults = (e: any) => {
      if (e.value?.length) {
        setTranscript(e.value[0]);
      }
    };

    Voice.onSpeechError = () => {
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  async function startListening() {
    setTranscript("");
    await Voice.start("en-US");
  }

  async function stopListening() {
    await Voice.stop();
  }

  return {
    transcript,
    setTranscript,
    isListening,
    startListening,
    stopListening,
  };
}