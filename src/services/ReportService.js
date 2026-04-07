import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://tu-api-safework.com/api"; // Cambia por tu IP/URL real

export const reportService = {
  createReporte: async (reportData) => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      const response = await axios.post(
        `${API_BASE_URL}/reportes/createReporte`,
        reportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Error al conectar con el servidor"
      );
    }
  },
};
