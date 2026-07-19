import { router } from "expo-router";
import { Camera, Mic } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

import styles from "../../styles/dashboardStyles";

const AddMenu = () => {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => router.push("/scan")}
      >
        <Camera size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.fabButton, { marginTop: 12 }]}
        onPress={() => router.push("/voice")}
      >
        <Mic size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AddMenu;