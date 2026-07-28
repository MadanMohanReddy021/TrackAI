
import {
    Text,
    View
} from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/dashboardStyles";
import { DarkTheme, LightTheme } from "../../theme/colors";

interface Props{

consumed:number;

target:number;

}



const CalorieCard = ({
consumed,
target
}:Props)=>{


const percent =
Math.min(
100,
(consumed / target) * 100
);

const { theme } = useTheme();

const colors =
  theme === "dark"
    ? DarkTheme
    : LightTheme;

const styles = createStyles(colors);

return (

<View style={styles.card}>


<Text style={styles.cardTitle}>

🔥 Calories

</Text>



<Text style={styles.bigNumber}>

{consumed.toLocaleString()}

<Text style={styles.smallText}>

 / {target.toLocaleString()} kcal

</Text>


</Text>



<View style={styles.progressBackground}>


<View

style={[
styles.progressFill,

{
width:`${percent}%`
}

]}


/>


</View>



<Text style={styles.leftText}>

{
Math.max(
0,
target-consumed
).toLocaleString()

}

 kcal left

</Text>



</View>

);


};


export default CalorieCard;