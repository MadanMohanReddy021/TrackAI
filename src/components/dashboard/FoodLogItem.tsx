import {
    Text,
    View
} from "react-native";
import { createStyles } from "../../styles/dashboardStyles";
import { LightTheme } from "../../theme/colors";

const styles = createStyles(LightTheme);
interface Props {
  item:any;
}


const FoodLogItem = ({
  item
}:Props)=>{


const totalCalories =
item.detected_foods?.reduce(
  (sum:number, food:any)=>
    sum + Number(food.kcal || 0),
  0
);



const foodNames =
item.detected_foods
?.map(
  (food:any)=>food.name
)
.join(", ");



return (

<View style={styles.foodCard}>


<View style={styles.foodImage}>

<Text>
🍽️
</Text>

</View>



<View style={styles.foodInfo}>


<Text style={styles.foodName}>

{foodNames || "Food"}

</Text>



<Text style={styles.foodSub}>

{
item.meal_type ??
"Meal"
}

</Text>


</View>





<View>

<Text style={styles.foodCalories}>

{
Math.round(totalCalories)
}

</Text>


<Text style={styles.foodSub}>

kcal

</Text>


</View>



</View>

);


};


export default FoodLogItem;