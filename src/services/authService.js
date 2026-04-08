import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../models/api";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/loginUser", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", response.data);

    const token = response.data.token;
    const user =
      response.data.user || response.data.usuario || response.data.data;

    if (!user || !token) {
      throw new Error("Usuario no recibido del backend");
    }

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    await AsyncStorage.setItem("userRole", user.role || user.rol || "User");

    return response.data;
  },

  //  AHORA SÍ está dentro del objeto
  register: async (data) => {
    try {
      const response = await api.post("/auth/createUser", data);

      if (!response.data) {
        throw new Error("No se recibió respuesta del servidor");
      }

      return response.data;
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);

      throw new Error(
        error.response?.data?.message || "Error en el registro"
      );
    }
  },
};