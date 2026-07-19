import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apis = axios.create({
  baseURL: "http://YOUR_SERVER_IP:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
apis.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apis;