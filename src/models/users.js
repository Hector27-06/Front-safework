import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiUsers = axios.create({
  // URL base terminada en /api según el contrato
  baseURL: "https://safework-backend.onrender.com/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para enviar el Token del Gerente logueado
apiUsers.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiUsers;
