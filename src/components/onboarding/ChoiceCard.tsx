import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "../../styles/onboardingStyles";


interface ChoiceCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}


const ChoiceCard: React.FC<ChoiceCardProps> = ({
  title,
  description,
  selected,
  onPress,
}) => {

  const { colors } = useTheme();

  const styles = createStyles(colors);


  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.choiceCard,
        selected && styles.choiceCardSelected,
      ]}
    >

      <View style={{ flex: 1 }}>

        <Text style={styles.choiceTitle}>
          {title}
        </Text>


        {description ? (
          <Text style={styles.choiceDescription}>
            {description}
          </Text>
        ) : null}

      </View>


      <View
        style={[
          styles.choiceCircle,
          selected && styles.choiceCircleSelected,
        ]}
      >

        {selected && (
          <Text style={styles.choiceCheck}>
            ✓
          </Text>
        )}

      </View>


    </TouchableOpacity>
  );
};


export default ChoiceCard;