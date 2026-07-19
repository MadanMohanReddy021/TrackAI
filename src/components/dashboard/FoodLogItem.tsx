

import {
    Text,
    View
} from "react-native";


import styles from "../../styles/dashboardStyles";



interface Props{

item:any;

}



const FoodLogItem = ({
item
}:Props)=>{


return (

<View style={styles.foodCard}>


<View style={styles.foodImage}>

<Text>

🍽️

</Text>

</View>



<View style={styles.foodInfo}>


<Text style={styles.foodName}>

{item.name}

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
Math.round(
item.calories
)
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
