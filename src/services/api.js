import axios from "axios";

const API_URL = "https://tu-api-safework.com/api"; // Cambia por tu URL real

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/loginUser`, {
        email,
        password,
      });
      return response.data; // Aquí viene el Token y datos del usuario
    } catch (error) {
      throw error.response?.data?.message || "Error de conexión";
    }
  },
};
