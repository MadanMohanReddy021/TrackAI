import { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { FoodItem } from "../../types/food";

type Props = {
  visible: boolean;
  item: FoodItem | null;
  onClose: () => void;
  onSave: (food: FoodItem) => void;
};

export default function IngredientEditor({
  visible,
  item,
  onClose,
  onSave,
}: Props) {

  const [food, setFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    if (item) {
      setFood({ ...item });
    }
  }, [item]);

  if (!food) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>

        <View style={styles.container}>

          <Text style={styles.title}>
            Edit Ingredient
          </Text>

          <TextInput
            style={styles.input}
            value={food.name}
            onChangeText={(text) =>
              setFood({
                ...food,
                name: text,
              })
            }
            placeholder="Food Name"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(food.calories)}
            onChangeText={(text) =>
              setFood({
                ...food,
                calories: Number(text),
              })
            }
            placeholder="Calories"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(food.protein_g)}
            onChangeText={(text) =>
              setFood({
                ...food,
                protein_g: Number(text),
              })
            }
            placeholder="Protein"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(food.carbs_g)}
            onChangeText={(text) =>
              setFood({
                ...food,
                carbs_g: Number(text),
              })
            }
            placeholder="Carbs"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(food.fat_g)}
            onChangeText={(text) =>
              setFood({
                ...food,
                fat_g: Number(text),
              })
            }
            placeholder="Fat"
          />

          <View style={styles.buttons}>

            <TouchableOpacity
              style={styles.cancel}
              onPress={onClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.save}
              onPress={() => onSave(food)}
            >
              <Text style={{ color: "#FFF" }}>
                Save
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  container: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cancel: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#EEE",
    marginRight: 10,
  },

  save: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#22C55E",
  },
});