import React, { useMemo } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "../../styles/onboardingStyles";

import ChoiceCard from "./ChoiceCard";

import {
  Goal,
  PACE_OPTIONS,
} from "../../constants/onboarding";


interface Step5Props {
  goal?: Goal;
  weight: string;
  target: string;
  pace?: number;
  setPace: (value: number) => void;
}


const Step5: React.FC<Step5Props> = ({
  goal,
  weight,
  target,
  pace,
  setPace,
}) => {

  const { colors } = useTheme();

  const styles = createStyles(colors);


  const difference = useMemo(() => {

    const current = Number(weight);
    const targetWeight = Number(target);


    if (!current || !targetWeight) return 0;


    if (goal === "loss") {
      return Math.max(0, current - targetWeight);
    }


    if (
      goal === "gain" ||
      goal === "gain"
    ) {
      return Math.max(0, targetWeight - current);
    }


    return 0;

  }, [goal, weight, target]);


  if (!goal) return null;


  const options = PACE_OPTIONS[goal];


  return (
    <View>

      <Text style={styles.heading}>
        Choose Your Pace
      </Text>


      <Text style={styles.subHeading}>
        Pick a realistic pace that fits your lifestyle.
      </Text>


      {options.map((item) => {

        const weeks =
          item.value > 0 && difference > 0
            ? Math.ceil(difference / item.value)
            : null;


        return (
          <ChoiceCard
            key={item.value}
            title={item.title}
            description={
              weeks
                ? `${item.description} • About ${weeks} weeks`
                : item.description
            }
            selected={pace === item.value}
            onPress={() => setPace(item.value)}
          />
        );

      })}


    </View>
  );
};


export default Step5;