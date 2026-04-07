import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../models/api";

export const authService = {
  login: async (email, password) => {
    const res = await api.post("/auth/loginUser", {
      email,
      password,
    });

    if (res.data.token) {
      await AsyncStorage.setItem("userToken", res.data.token);
      await AsyncStorage.setItem("userRole", res.data.usuario.rol);
      await AsyncStorage.setItem("userData", JSON.stringify(res.data.usuario));
    }

    return res.data;
  },

  register: async (data) => {
    const res = await api.post("/auth/createUser", data);
    return res.data;
  },
};
