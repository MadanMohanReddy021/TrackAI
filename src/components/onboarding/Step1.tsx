import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "../../styles/onboardingStyles";

interface Step1Props {
  name: string;
  age: string;
  height: string;
  weight: string;

  setName: (value: string) => void;
  setAge: (value: string) => void;
  setHeight: (value: string) => void;
  setWeight: (value: string) => void;
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
}) => {
  const [heightUnit, setHeightUnit] = useState<"cm" | "inch">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  return (
    <View>
      <Text style={styles.heading}>Tell us about yourself</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="number-pad"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.sectionTitle}>Height</Text>

      <View style={styles.unitContainer}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            heightUnit === "cm" && styles.selectedUnit,
          ]}
          onPress={() => setHeightUnit("cm")}
        >
          <Text>cm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.unitButton,
            heightUnit === "inch" && styles.selectedUnit,
          ]}
          onPress={() => setHeightUnit("inch")}
        >
          <Text>inch</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder={`Height (${heightUnit})`}
        keyboardType="decimal-pad"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.sectionTitle}>Weight</Text>

      <View style={styles.unitContainer}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            weightUnit === "kg" && styles.selectedUnit,
          ]}
          onPress={() => setWeightUnit("kg")}
        >
          <Text>kg</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.unitButton,
            weightUnit === "lbs" && styles.selectedUnit,
          ]}
          onPress={() => setWeightUnit("lbs")}
        >
          <Text>lbs</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder={`Weight (${weightUnit})`}
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={setWeight}
      />
    </View>
  );
};

export default Step1;