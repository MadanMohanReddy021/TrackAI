import { Pedometer } from "expo-sensors";
import { useEffect } from "react";


useEffect(() => {

  let subscription;


  const start = async () => {

    const available = await Pedometer.isAvailableAsync();

    console.log(
      "Pedometer available:",
      available
    );


    if (!available) return;


    subscription = Pedometer.watchStepCount(
      (result) => {

        console.log(
          "STEP EVENT:",
          result.steps
        );

      }
    );

  };


  start();


  return () => {
    subscription?.remove();
  };


}, []);