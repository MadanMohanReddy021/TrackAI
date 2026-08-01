import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import ScanCamera from "../components/scan/CameraView";
import useCamera from "../hooks/useCamera";
import useImagePicker from "../hooks/useImagePicker";

import { scanFood, uploadFoodImage } from "../services/scanApi";

import ResultView from "@/components/scan/ResultView";
import { FoodItem } from "../types/food";

const MEALS = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function ScanScreen() {
  // ---------------- Camera ----------------

  const {
    permission,
    cameraRef,
    flash,
    cameraType,
    toggleFlash,
    switchCamera,
    capture,
  } = useCamera();

  // ---------------- Gallery ----------------

  const { pickImage } = useImagePicker();

  // ---------------- State ----------------

  const [items, setItems] = useState<FoodItem[]>([]);

  const [meal, setMeal] = useState("Snack");

  const [imageUrl, setImageUrl] = useState("");

  const [displayImage, setDisplayImage] = useState("");

  const [cameraOpen, setCameraOpen] = useState(true);

  const [scanning, setScanning] = useState(false);

  const [saving, setSaving] = useState(false);

  const [sheetExpanded, setSheetExpanded] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // ---------------- Permission ----------------

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.permission}>Camera permission denied</Text>
      </SafeAreaView>
    );
  }

  // ---------------- Upload + AI Scan ----------------

  async function processImage(uri: string) {
    try {
      setScanning(true);
      console.log("Processing image");
      // Upload image to backend

      const upload = await uploadFoodImage(uri);

      // AI Scan

      const result = await scanFood(upload.imageUrl);

      upload.imageUrl;

      setDisplayImage(uri);

      setItems(result.items ?? []);

      setCameraOpen(false);
    } catch (err: any) {
      Alert.alert("Error", err?.message ?? "Scan failed");
    } finally {
      setScanning(false);
    }
  }

  // ---------------- Capture ----------------

  async function onCapture() {
    const photo = await capture();

    if (!photo) {
      Alert.alert("Error", "Could not capture image");
      return;
    }

    processImage(photo.uri);
  }

  // ---------------- Gallery ----------------

  async function openGallery() {
    const asset = await pickImage();

    if (!asset) return;

    processImage(asset.uri);
  }

  // ---------------- Loading ----------------

  if (scanning) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>Analyzing Meal...</Text>
      </View>
    );
  }

  // ---------------- Result Screen Placeholder ----------------

  if (!cameraOpen) {
    return <ResultView image={displayImage} items={items} />;
  }

  // ---------------- Camera ----------------

  return (
    <ScanCamera
      cameraRef={cameraRef}
      type={cameraType}
      flash={flash}
      onFlash={toggleFlash}
      onSwitch={switchCamera}
      onCapture={onCapture}
      onGallery={openGallery}
      onClose={() => router.back()}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  permission: {
    fontSize: 18,
    fontWeight: "600",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },

  result: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 15,
  },

  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
  },

  small: {
    color: "#666",
    marginTop: 5,
  },

  foodCard: {
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F4F4F4",
  },

  foodName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
});
