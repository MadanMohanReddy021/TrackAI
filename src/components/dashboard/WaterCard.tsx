

import {
    Text,
    TouchableOpacity,
    View
} from "react-native";


import styles from "../../styles/dashboardStyles";



interface Props{

value:number;

target:number;

onAdd:(amount:number)=>void;

}



const WaterCard = ({
value,
target,
onAdd
}:Props)=>{


const percent =
Math.min(
100,
(value/target)*100
);



return (

<View style={styles.card}>


<Text style={styles.cardTitle}>

💧 Water

</Text>



<Text style={styles.bigNumber}>

{value}

<Text style={styles.smallText}>

 / {target} ml

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




<TouchableOpacity

style={styles.smallButton}

onPress={()=>onAdd(250)}

>


<Text style={styles.buttonText}>

+250 ml

</Text>


</TouchableOpacity>



</View>


);


};



export default WaterCard;