import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View>{icon}</View>
      <Text
        style={[
          styles.label,
          active && {
            color: "#ffc800",
            fontWeight: "600",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },
});