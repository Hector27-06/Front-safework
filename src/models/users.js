import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/api"
    : "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Esto pega el token automáticamente en cada petición (como hiciste en Thunder Client)
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const userService = {
  getAllUsers: () => api.get("/auth/users"),
  deleteUser: (id) => api.delete(`/auth/users/${id}`),
};

export default api;
