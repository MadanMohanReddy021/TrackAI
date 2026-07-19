import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initialize,
  readRecords,
  requestPermission,
} from "react-native-health-connect";

export const getHealthData = async () => {
  try {
    const initialized = await initialize();

    if (!initialized) {
      console.log("Health Connect not available");
      return;
    }

    await requestPermission([
      {
        accessType: "read",
        recordType: "Steps",
      },
    ]);

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();

    const steps = await readRecords("Steps", {
      timeRangeFilter: {
        operator: "between",
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      },
    });

    // Calculate total steps
    const totalSteps = steps.records.reduce(
      (sum, record) => sum + record.count,
      0
    );

    // Data to save
    const stepData = {
      totalSteps,
      records: steps.records,
      updatedAt: new Date().toISOString(),
    };

    // Save to AsyncStorage
    await AsyncStorage.setItem(
      "@health_steps",
      JSON.stringify(stepData)
    );

    console.log("Steps saved locally");

    return stepData;
  } catch (error) {
    console.log(error);
  }
};