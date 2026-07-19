import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  image: string;
  score: number;
  onBack: () => void;
  onClose: () => void;
};

export default function ImageHeader({
  image,
  score,
  onBack,
  onClose,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      <LinearGradient
        colors={[
          "transparent",
          "rgba(0,0,0,0.65)",
        ]}
        style={styles.overlay}
      />

      <TouchableOpacity
        style={[styles.icon, { left: 20 }]}
        onPress={onBack}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#FFF"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.icon, { right: 20 }]}
        onPress={onClose}
      >
        <Ionicons
          name="close"
          size={26}
          color="#FFF"
        />
      </TouchableOpacity>

      <View style={styles.badge}>
        <Text style={styles.badgeScore}>
          {score}/10
        </Text>

        <Text style={styles.badgeText}>
          Health
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    width: "100%",
    height: 330,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
  },

  icon: {
    position: "absolute",
    top: 55,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#22C55E",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },

  badgeScore: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 20,
  },

  badgeText: {
    color: "#FFF",
    fontSize: 12,
  },

});