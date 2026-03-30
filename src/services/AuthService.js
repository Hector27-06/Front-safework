import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://tu-api-safework.com/api"; // Tu URL real

export const authService = {
  // 1.1 Iniciar Sesión
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/loginUser`, {
      email,
      password,
    });
    if (response.data.token) {
      await AsyncStorage.setItem("user_token", response.data.token);
      await AsyncStorage.setItem(
        "user_data",
        JSON.stringify(response.data.usuario),
      );
    }
    return response.data;
  },

  // 1.2 Registrar Empleado
  register: async (userData) => {
    // Nota: El contrato pide email, password, rol y area
    const response = await axios.post(
      `${API_BASE_URL}/auth/createUser`,
      userData,
    );
    return response.data;
  },
};
