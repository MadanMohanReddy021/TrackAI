import apis from "./apis";

export const profileApi = {
  // Profile
  async getProfile() {
    const response = await apis.get("/profile");
    return response.data;
  },

  // Step Logs
  async getStepLogs(days = 30) {
    const response = await apis.get(`/steps?days=${days}`);
    return response.data;
  },

  // Food Logs
  async getFoodLogs(days = 30) {
    const response = await apis.get(`/food-logs?days=${days}`);
    return response.data;
  },

  // Previous Health Score
  async getHealthScoreHistory() {
    const response = await apis.get("/health-score/history");
    return response.data;
  },

  // Save Monthly Snapshot
  async saveHealthScore(payload: {
    score: number;
    steps_component: number;
    consistency_component: number;
    food_component: number;
  }) {
    const response = await apis.post("/health-score", payload);
    return response.data;
  },

  // Reset onboarding
  async resetOnboarding() {
    const response = await apis.put("/profile/reset-onboarding");
    return response.data;
  },

  // Delete account
  async deleteAccount() {
    const response = await apis.delete("/user");
    return response.data;
  },
};