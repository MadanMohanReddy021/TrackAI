import { Text, View } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";
import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/dashboardStyles";

interface Props {
  consumed: number;
  target: number;
}

const CalorieCard = ({ consumed, target }: Props) => {
  const percent = Math.min(100, (consumed / target) * 100);

  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.calorieCard}>
      <Text style={styles.calorieTitle}>🔥 Calories</Text>

      <View style={styles.calorieProgress}>
        <CircularProgress
          value={percent}
          maxValue={100}
          radius={65}
          activeStrokeWidth={14}
          inActiveStrokeWidth={14}
          activeStrokeColor={colors.primary}
          inActiveStrokeColor={colors.progressBackground}
          showProgressValue={false}
          title={`${consumed.toLocaleString()}`}
          subtitle={`/ ${target.toLocaleString()} kcal`}
          titleColor={colors.text}
          subtitleColor={colors.secondaryText}
          titleStyle={styles.calorieValue}
          subtitleStyle={styles.calorieTarget}
          valueSuffix=""
        />
      </View>

      <Text style={styles.leftCalories}>
        {Math.max(0, target - consumed).toLocaleString()} kcal left
      </Text>
    </View>
  );
};

export default CalorieCard;
