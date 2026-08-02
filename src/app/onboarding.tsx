import { useEffect } from "react";
import { Platform } from "react-native";
import OnboardingScreen from "../screens/Onboarding";

import { initialize, requestPermission } from "react-native-health-connect";

export default function Onboarding() {
  useEffect(() => {
    requestHealthPermissions();
  }, []);

  const requestHealthPermissions = async () => {
    try {
      if (Platform.OS === "android") {
        const initialized = await initialize();

        if (initialized) {
          const granted = await requestPermission([
            {
              accessType: "read",
              recordType: "Steps",
            },
            {
              accessType: "read",
              recordType: "ActiveCaloriesBurned",
            },
            {
              accessType: "read",
              recordType: "Weight",
            },
            {
              accessType: "read",
              recordType: "Distance",
            },
          ]);

          console.log("Health Connect Permissions:", granted);
        }
      }
    } catch (error) {
      console.log("Health Connect Error:", error);
    }
  };

  return <OnboardingScreen />;
}
