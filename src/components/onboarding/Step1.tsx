import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "../../styles/onboardingStyles";

interface Step1Props {
  name: string;
  age: string;
  height: string;
  weight: string;

  setName: (value: string) => void;
  setAge: (value: string) => void;
  setHeight: (value: string) => void;
  setWeight: (value: string) => void;

  setHeightUnit: (value: "cm" | "inch") => void;
  setWeightUnit: (value: "kg" | "lbs") => void;
}

const Step1: React.FC<Step1Props> = ({
  name,
  age,
  height,
  weight,
  setName,
  setAge,
  setHeight,
  setWeight,
  setHeightUnit,
  setWeightUnit,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [selectedHeightUnit, setSelectedHeightUnit] = useState<"cm" | "inch">(
    "cm",
  );

  const [selectedWeightUnit, setSelectedWeightUnit] = useState<"kg" | "lbs">(
    "kg",
  );

  const handleHeightUnit = (unit: "cm" | "inch") => {
    setSelectedHeightUnit(unit);
    setHeightUnit(unit);
  };

  const handleWeightUnit = (unit: "kg" | "lbs") => {
    setSelectedWeightUnit(unit);
    setWeightUnit(unit);
  };

  return (
    <View>
      <Text style={styles.heading}>Tell us about yourself</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor={colors.secondaryText}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor={colors.secondaryText}
        keyboardType="number-pad"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.sectionTitle}>Height</Text>

      <View style={styles.unitContainer}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            selectedHeightUnit === "cm" && styles.selectedUnit,
          ]}
          onPress={() => handleHeightUnit("cm")}
        >
          <Text
            style={{
              color:
                selectedHeightUnit === "cm" ? colors.buttonText : colors.text,
            }}
          >
            cm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.unitButton,
            selectedHeightUnit === "inch" && styles.selectedUnit,
          ]}
          onPress={() => handleHeightUnit("inch")}
        >
          <Text
            style={{
              color:
                selectedHeightUnit === "inch" ? colors.buttonText : colors.text,
            }}
          >
            inch
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder={`Height (${selectedHeightUnit})`}
        placeholderTextColor={colors.secondaryText}
        keyboardType="decimal-pad"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.sectionTitle}>Weight</Text>

      <View style={styles.unitContainer}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            selectedWeightUnit === "kg" && styles.selectedUnit,
          ]}
          onPress={() => handleWeightUnit("kg")}
        >
          <Text
            style={{
              color:
                selectedWeightUnit === "kg" ? colors.buttonText : colors.text,
            }}
          >
            kg
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.unitButton,
            selectedWeightUnit === "lbs" && styles.selectedUnit,
          ]}
          onPress={() => handleWeightUnit("lbs")}
        >
          <Text
            style={{
              color:
                selectedWeightUnit === "lbs" ? colors.buttonText : colors.text,
            }}
          >
            lbs
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder={`Weight (${selectedWeightUnit})`}
        placeholderTextColor={colors.secondaryText}
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={setWeight}
      />
    </View>
  );
};

export default Step1;
