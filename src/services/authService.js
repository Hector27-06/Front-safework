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

    if (!user) {
      throw new Error("Usuario no recibido del backend");
    }

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    await AsyncStorage.setItem("userRole", user.role || user.rol || "User");

    return response.data;
  },
};
