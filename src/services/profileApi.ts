import AsyncStorage from "@react-native-async-storage/async-storage";
import apis from "./apis";

const getUserId = async () => {
  return await AsyncStorage.getItem("userid");
};


export const profileApi = { 

  // Profile
  async getProfile() {

    const userid = await getUserId();

    const response = await apis.get("/get-profile", {
      params: {
        userid,
      },
    });
    return response.data;
  },


  // Step Logs
  async getStepLogs(days = 30) {

    const userid = await getUserId();

    const response = await apis.get("/get-steps", {
      params: {
        days,
        userid,
      },
    });

    return response.data;
  },


  // Food Logs
  async getFoodLogs(days = 30) {

    const userid = await getUserId();

    const response = await apis.get("/food-logs", {
      params: {
        days,
        userid,
      },
    });

    return response.data;
  },


  // Previous Health Score
  async getHealthScoreHistory() {

    const userid = await getUserId();

    const response = await apis.get(
      "/health-score/history",
      {
        params: {
          userid,
        },
      }
    );

    return response.data;
  },


  // Save Monthly Snapshot
  async saveHealthScore(payload: {
    score: number;
    steps_component: number;
    consistency_component: number;
    food_component: number;
  }) {

    const userid = await getUserId();

    const response = await apis.post(
      "/health-score",
      {
        userid,
        ...payload,
      }
    );

    return response.data;
  },


  // Reset onboarding
  async resetOnboarding() {

    const userid = await getUserId();

    const response = await apis.put(
      "/profile/reset-onboarding",
      {
        userid,
      }
    );

    return response.data;
  },


  // Delete account
  async deleteAccount() {

    const userid = await getUserId();

    const response = await apis.delete(
      "/user",
      {
        data: {
          userid,
        },
      }
    );

    return response.data;
  },

};