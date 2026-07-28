import axios from "axios";


// Change this to your backend URL
import BASE_URL from "@/storage/ipAdress";
const API_URL = BASE_URL;



import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProfile = async (userid: string) => {
  try {
    const response = await axios.get(`${API_URL}/get-profile`, {
      params: { userid },
    });

    await AsyncStorage.setItem(
      "profile",
      JSON.stringify(response.data)
    );

    return response.data;
  } catch {
    return null;
  }
};

export const getNutrients = async (
  userid: string,
  date: string
) => {
  try {
    const response = await axios.get(`${API_URL}/get-nutrients`, {
      params: { userid, date },
    });

    return response.data;
    
  } catch {
    return null;
  }
};

export const getFoodLogs = async (
  userid: string,
  date: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/get-food-logs-by-date`,
      {
        params: { userid, date },
      }
    );

    return response.data;
  } catch {
    return [];
  }
};

export const getWater = async (
  userid: string,
  date: string
) => {
  const response = await axios.get(
    `${API_URL}/get-water-intake`,
    {
      params: {
        userid,
        intake_date: date,
      },
    }
  );

  return response.data.data.water_ml;
};

export const getSteps = async (
  userid: string,
  date: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/get-steps`,
      {
        params: {
          userid,
          step_date: date,
        },
      }
    );

    return response.data;
  } catch {
    return { steps: 0 };
  }
};
export const addWaterIntake = async (
  userid: string,
  intake_date: string,
  amount: number
) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-water-intake`,
      {
        userid,
        intake_date,
        amount, // Change to water_ml if your backend expects that
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(
      "Add Water API Error:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
      "Failed to add water intake"
    );
  }
};
export const updateSteps = async (
  userid: string,
  step_date: string,
  steps: number
) => {
  const response = await axios.post(
    `${API_URL}/update-steps`,
    {
      userid,
      step_date,
      steps,
    }
  );

  return response.data;
};