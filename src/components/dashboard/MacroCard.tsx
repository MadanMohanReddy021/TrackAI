import { Text, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/dashboardStyles";

import CircularProgress from "react-native-circular-progress-indicator";
type MacroType = "Protein" | "Carbs" | "Fat" | "Fiber" | "Sugar";

type Props = {
  title: MacroType;
  value: number;
  target: number;
};

const MacroCard = ({ title, value, target }: Props) => {
  const percent = Math.min(100, (value / target) * 100);
  const macroIcons = {
    Protein: "food-drumstick",
    Carbs: "bread-slice",
    Fat: "water",
    Fiber: "leaf",
    Sugar: "cube-outline",
  };
  const macroEmoji = {
    Protein: "🥩",
    Carbs: "🍚",
    Fat: "🧈",
    Fiber: "🥦",
    Sugar: "🍬",
  };
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.macroCard}>
      <Text style={styles.macroTitle}>{title}</Text>

      <View style={styles.macroProgress}>
        <CircularProgress
          value={percent}
          radius={45}
          maxValue={100}
          activeStrokeWidth={9}
          inActiveStrokeWidth={9}
          activeStrokeColor={colors.primary}
          inActiveStrokeColor={colors.progressBackground}
          showProgressValue={false}
        />

        {/* Center Content */}
        <View style={styles.centerContent}>
          <Text style={styles.emoji}>
            {macroEmoji[title as keyof typeof macroEmoji]}
          </Text>

          <Text style={styles.circleValue}>{Math.round(value)}g</Text>

          <Text style={styles.circleTarget}>/ {target}g</Text>
        </View>
      </View>
    </View>
  );
};

export default MacroCard;
