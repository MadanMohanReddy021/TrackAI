import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Moon, Smartphone, Sun } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function PreferencesScreen() {
  const { theme, setTheme } = useTheme();

  const Option = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: "light" | "dark" | "system";
    icon: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[
        styles.option,
        theme === value && styles.selectedOption,
      ]}
      onPress={() => setTheme(value)}
    >
      <View style={styles.left}>
        {icon}
        <Text style={styles.optionText}>
          {title}
        </Text>
      </View>

      {theme === value && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#F59E0B"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Preferences
        </Text>

        <View style={{ width: 28 }} />

      </View>

      <Text style={styles.sectionTitle}>
        Appearance
      </Text>

      <Option
        title="Light"
        value="light"
        icon={<Sun size={22} color="#F59E0B" />}
      />

      <Option
        title="Dark"
        value="dark"
        icon={<Moon size={22} color="#111827" />}
      />

      <Option
        title="System Default"
        value="system"
        icon={<Smartphone size={22} color="#6B7280" />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 15,
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  selectedOption: {
    borderColor: "#F59E0B",
    borderWidth: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#222",
    fontWeight: "600",
  },
});