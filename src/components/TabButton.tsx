import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  color?: string;
  onPress: () => void;
}

export default function TabButton({
  icon,
  label,
  active = false,
  color = "#6b7280",
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>{icon}</View>

      <Text
        style={{
          color: color,
          fontSize: 12,
          marginTop: 4,
          fontWeight: active ? "600" : "400",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
