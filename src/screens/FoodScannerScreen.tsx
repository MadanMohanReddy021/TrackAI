import BASE_URL from "@/storage/ipAdress";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { File } from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { DarkTheme, LightTheme } from "../theme/colors";
export default function FoodScannerScreen() {
  const cameraRef = useRef<CameraView>(null);
  const { theme } = useTheme();

  const colors = theme === "dark" ? DarkTheme : LightTheme;
  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<CameraType>("back");
  const API_URL = BASE_URL;
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const [capturedImage, setCapturedImage] = useState("");

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No camera permission</Text>
      </View>
    );
  }

  const uploadImage = async (uri: string) => {
    try {
      setLoading(true);

      const userid = await AsyncStorage.getItem("userid");

      if (!userid) {
        console.log("User ID not found");
        return;
      }

      // Convert image to JPEG file
      const result = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      const imageUri = result.uri;

      const file = new File(imageUri);

      const formData = new FormData();

      formData.append("image", {
        uri: imageUri,
        name: "food.jpg",
        type: "image/jpeg",
      } as any);

      formData.append("userid", userid);

      console.log("FORM DATA:", formData);

      const response = await axios.post(`${API_URL}/analyze-food`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        transformRequest: () => formData,
      });

      console.log("Food Analysis Response:", response.data);

      setResult(response.data);
      router.push({
        pathname: "/foodresult",
        params: {
          image: uri,
          result: JSON.stringify(response.data),
        },
      });
    } catch (error: any) {
      console.log(
        "Food Analysis Error:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };
  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    if (!photo) return;

    setCapturedImage(photo.uri);

    uploadImage(photo.uri);
  };

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!res.canceled) {
      const uri = res.assets[0].uri;
      setCapturedImage(uri);
      uploadImage(uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={facing}
        ref={cameraRef}
      />

      <View style={styles.overlay}>
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity style={styles.topButton}>
            <Ionicons name="volume-mute-outline" size={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Scan Food</Text>

          <TouchableOpacity
            style={styles.topButton}
            onPress={() => setFacing(facing === "back" ? "front" : "back")}
          >
            <Ionicons name="camera-reverse-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Scan Box */}

        <View style={styles.scanArea}>
          <View style={styles.square} />
        </View>

        <Text style={styles.message}>Center your meal inside the frame</Text>

        {/* Bottom */}

        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="images-outline" size={36} color="white" />
            <Text style={styles.bottomText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.capture} onPress={takePicture}>
            <Ionicons name="camera" size={45} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={router.back} style={styles.closeButton}>
            <Ionicons name="close" size={36} color={colors.text} />
            <Text style={styles.bottomText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading */}

      {loading && (
        <View style={styles.analyzingScreen}>
          <ActivityIndicator size="large" color="white" />

          <Text style={styles.loadingText}>Analyzing your food...</Text>
        </View>
      )}

      {/* Result Modal */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  header: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  analyzingScreen: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },

  topButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  scanArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    width: 290,
    height: 290,
    borderWidth: 4,
    borderRadius: 30,
    borderColor: "white",
  },

  message: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 40,
  },

  bottomBar: {
    marginBottom: 45,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  capture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  bottomText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },

  loading: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
