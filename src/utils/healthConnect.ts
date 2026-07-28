import {
  aggregateRecord,
  initialize,
  requestPermission
} from "react-native-health-connect";

export async function requestHealthPermissions() {

  try {

    const initialized = await initialize();

    if (!initialized) {
      return false;
    }


    const permissions = [
      {
        accessType: "read",
        recordType: "Steps",
      },
    ];


    const result =
      await requestPermission(permissions);


    return result.length > 0;


  } catch(error){

    console.log(
      "Health permission error",
      error
    );

    return false;
  }

}






export async function getHealthData() {

  try {

    const now = new Date();

    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);


    console.log({
      startTime: startTime.toISOString(),
      endTime: now.toISOString()
    });


    const result = await aggregateRecord({
      recordType: "Steps",
      timeRangeFilter: {
        operator: "between",
        startTime: startTime.toISOString(),
        endTime: now.toISOString(),
      },
    });


    return {
      totalSteps: result.COUNT_TOTAL ?? 0
    };


  } catch(error) {

    console.log(
      "Health aggregate error",
      error
    );

    return null;
  }

}