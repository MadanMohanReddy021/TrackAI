import { Pedometer } from "expo-sensors";


export async function checkPedometer() {
  try {
    const available = await Pedometer.isAvailableAsync();

    return available;

  } catch (error) {
    console.log("Pedometer check error:", error);
    return false;
  }
}



export async function getTodaySteps() {

  try {

    const end = new Date();


    const start = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
      0,
      0,
      0
    );


    const result = await Pedometer.getStepCountAsync(
      start,
      end
    );


    return {
      steps: result.steps
    };


  } catch (error) {

    console.log(
      "Pedometer error:",
      error
    );

    return {
      steps: 0
    };
  }
}