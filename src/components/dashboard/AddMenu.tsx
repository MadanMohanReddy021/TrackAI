import { router } from "expo-router";
import { Camera, Mic, Plus, Type } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/dashboardStyles";
import { DarkTheme, LightTheme } from "../../theme/colors";

export default function AddMenu() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const colors = theme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(colors);
  return (
    <View style={styles.fabContainer}>
      {/* Camera */}
      {open && (
        <TouchableOpacity
          style={[styles.optionButton, { bottom: 120, right: 35 }]}
          onPress={() => {
            setOpen(false);
            router.push("/foodscan");
          }}
        >
          <Camera size={22} color={colors.background} />
        </TouchableOpacity>
      )}

      {/* Voice */}
      {open && (
        <TouchableOpacity
          style={[styles.optionButton, { bottom: 90, right: 100 }]}
          onPress={() => {
            setOpen(false);
            router.push("/voice");
          }}
        >
          <Mic size={22} color={colors.background} />
        </TouchableOpacity>
      )}

      {/* Text */}
      {open && (
        <TouchableOpacity
          style={[styles.optionButton, { bottom: 30, right: 120 }]}
          onPress={() => {
            setOpen(false);
            router.push("/textfood");
          }}
        >
          <Type size={22} color={colors.background} />
        </TouchableOpacity>
      )}

      {/* Main FAB */}
      <TouchableOpacity style={styles.mainFab} onPress={() => setOpen(!open)}>
        <Plus
          size={30}
          color={colors.background}
          style={{
            transform: [
              {
                rotate: open ? "0deg" : "0deg",
              },
            ],
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
