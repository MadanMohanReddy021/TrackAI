import { Pedometer } from "expo-sensors";

export const startStepService = async () => {
  const available = await Pedometer.isAvailableAsync();

  console.log("Pedometer available:", available);

  if (!available) {
    console.log("Pedometer not available");
    return;
  }

  const subscription = Pedometer.watchStepCount((result) => {
    console.log("Steps:", result.steps);
  });

  return subscription;
};


export const getTodaySteps = async () => {
  const end = new Date();

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const result = await Pedometer.getStepCountAsync(
    start,
    end
  );

  return result.steps;
};