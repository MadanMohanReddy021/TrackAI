import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { DarkTheme, LightTheme } from "../theme/colors";

interface Props {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress: () => void;
}

export default function TabButton({
  icon,
  label,
  active = false,
  onPress,
}: Props) {
  const { theme } = useTheme();

  const colors = theme === "dark" ? DarkTheme : LightTheme;

  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View>{icon}</View>

      <Text
        style={[
          styles.label,
          active && {
            color: colors.primary,
            fontWeight: "600",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const createStyles = (colors: typeof LightTheme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    label: {
      marginTop: 4,
      fontSize: 12,
      color: colors.secondaryText,
    },
  });
