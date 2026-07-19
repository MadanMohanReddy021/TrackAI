import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MEALS = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
];

type Props = {
  selected: string;
  onSelect: (meal: string) => void;
};

export default function MealSelector({
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      {MEALS.map((meal) => (
        <TouchableOpacity
          key={meal}
          onPress={() => onSelect(meal)}
          style={[
            styles.chip,
            selected === meal && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.text,
              selected === meal && styles.selectedText,
            ]}
          >
            {meal}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 10,
  },

  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },

  selected: {
    backgroundColor: "#111827",
  },

  text: {
    color: "#111827",
    fontWeight: "600",
  },

  selectedText: {
    color: "#FFF",
  },
});