import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://tu-api-safework.com/api"; // Tu URL de MongoDB

export const reportService = {
  // Obtener reportes según jerarquía (GET /api/reportes/getAllReports)
  getAllReports: async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      const response = await axios.get(
        `${API_BASE_URL}/reportes/getAllReports`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Autenticación requerida por contrato [cite: 4, 84]
          },
        },
      );
      return response.data; // Retorna la lista de incidentes [cite: 86]
    } catch (error) {
      throw error.response?.data?.message || "Error al obtener reportes";
    }
  },

  // Crear reporte (POST /api/reportes/createReporte) [cite: 57]
  createReporte: async (reportData) => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      const response = await axios.post(
        `${API_BASE_URL}/reportes/createReporte`,
        reportData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Error al crear el reporte";
    }
  },
};
