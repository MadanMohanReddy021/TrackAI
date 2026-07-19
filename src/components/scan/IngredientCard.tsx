import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { FoodItem } from "../../types/food";

type Props = {
  item: FoodItem;
  index: number;
  onIncrease: (index: number) => void;
  onDecrease: (index: number) => void;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
};

export default function IngredientCard({
  item,
  index,
  onIncrease,
  onDecrease,
  onDelete,
  onEdit,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {item.name}
        </Text>

        <TouchableOpacity
          onPress={() => onDelete(index)}
        >
          <Text style={styles.delete}>
            🗑
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
  onPress={() => onEdit(index)}
>
  <Text style={{ fontSize: 20 }}>
    ✏️
  </Text>
</TouchableOpacity>
      </View>

      <Text style={styles.serving}>
        {item.serving}
      </Text>

      <Text style={styles.calories}>
        {item.calories} kcal
      </Text>

      <View style={styles.controls}>

        <TouchableOpacity
          style={styles.circle}
          onPress={() => onDecrease(index)}
        >
          <Text style={styles.symbol}>
            −
          </Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          style={styles.circle}
          onPress={() => onIncrease(index)}
        >
          <Text style={styles.symbol}>
            +
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  delete: {
    fontSize: 22,
  },

  serving: {
    marginTop: 6,
    color: "#666",
  },

  calories: {
    marginTop: 4,
    fontWeight: "600",
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },

  symbol: {
    fontSize: 20,
    fontWeight: "700",
  },

  quantity: {
    marginHorizontal: 18,
    fontSize: 18,
    fontWeight: "700",
  },

});