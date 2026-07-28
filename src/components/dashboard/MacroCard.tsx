
import {
    Text,
    View
} from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "../../styles/dashboardStyles";
import { DarkTheme, LightTheme } from "../../theme/colors";


interface Props{

title:string;

value:number;

target:number;

}



const MacroCard = ({
title,
value,
target
}:Props)=>{


const percent =
Math.min(
100,
(value/target)*100
);

const { theme } = useTheme();

const colors =
  theme === "dark"
    ? DarkTheme
    : LightTheme;

const styles = createStyles(colors);


return (

<View style={styles.macroCard}>


<Text style={styles.macroTitle}>

{title}

</Text>



<Text style={styles.macroValue}>

{Math.round(value)}g

<Text style={styles.smallText}>

 / {target}g

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



</View>

);


};


export default MacroCard;