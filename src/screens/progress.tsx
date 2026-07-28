import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    Text,
    View
} from "react-native";

import BASE_URL from "@/storage/ipAdress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "../context/ThemeContext";
import { createStyles } from "../styles/progressStyles";

const width = Dimensions.get("window").width;



export default function Progress(){

  const {theme}=useTheme();

  const styles=createStyles(theme);


  const [weightLogs,setWeightLogs]=useState<any[]>([]);
  const [nutritionLogs,setNutritionLogs]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);


const loadProgress = async () => {
  try {

    const userid = await AsyncStorage.getItem("userid");

    if (!userid) {
      console.log("User ID not found");
      return;
    }


    const [
      weightResponse,
      nutritionResponse
    ] = await Promise.all([

      fetch(
        `${BASE_URL}/progress?userid=${userid}`
      ),

      fetch(
        `${BASE_URL}/get-nutrients-range?userid=${userid}`
      ),

    ]);


    const weightData =
      await weightResponse.json();

    const nutritionData =
      await nutritionResponse.json();


    setWeightLogs(
      weightData.weightLogs || []
    );


    setNutritionLogs(
      nutritionData.nutritionLogs || []
    );


  } catch (error) {

    console.log(
      "Progress loading error:",
      error
    );

  } finally {

    setLoading(false);

  }
};

  useEffect(()=>{

    loadProgress();

  },[]);



  const createChart=(labels:any[],values:any[])=>({

    labels,

    datasets:[
      {
        data:values,
        strokeWidth:3
      }
    ]

  });



  if(loading){

    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );

  }


  const weightChart=createChart(
    weightLogs.map(item=>item.month),
    weightLogs.map(item=>item.weight)
  );


  const calorieChart=createChart(
    nutritionLogs.map(item=>item.date),
    nutritionLogs.map(item=>item.calories)
  );


  const proteinChart=createChart(
    nutritionLogs.map(item=>item.date),
    nutritionLogs.map(item=>item.protein)
  );


  const carbsChart=createChart(
    nutritionLogs.map(item=>item.date),
    nutritionLogs.map(item=>item.carbs)
  );


  const fatChart=createChart(
    nutritionLogs.map(item=>item.date),
    nutritionLogs.map(item=>item.fat)
  );
const renderGraph = (
  title: string,
  data: any,
  suffix: string
) => (
  <View style={styles.card}>

    <Text style={styles.title}>
      {title}
    </Text>

    <LineChart
      data={data}

      width={width - 70}

      height={220}

      yAxisSuffix={suffix}

      bezier

      chartConfig={{
        backgroundGradientFrom: theme.card,

        backgroundGradientTo: theme.card,

        decimalPlaces: 1,

        color: (opacity = 1) =>
          `rgba(245,158,11,${opacity})`,

        labelColor: () =>
          theme.secondaryText,

        propsForDots: {
          r: "5",
          strokeWidth: "2",
          stroke: "#F59E0B",
        },
      }}

      style={{
        borderRadius: 16,
      }}
    />

  </View>
);

  return(
    <ScrollView style={styles.container}>

      {renderGraph(
        "Weight Progress",
        weightChart,
        " kg"
      )}

      {renderGraph(
        "Calories",
        calorieChart,
        " kcal"
      )}

      {renderGraph(
        "Protein",
        proteinChart,
        " g"
      )}

      {renderGraph(
        "Carbs",
        carbsChart,
        " g"
      )}

      {renderGraph(
        "Fat",
        fatChart,
        " g"
      )}

    </ScrollView>
  );
}