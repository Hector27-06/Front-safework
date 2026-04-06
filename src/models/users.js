import axios from "axios";
import * as SecureStore from "expo-secure-store"; // 🔐 Importación de seguridad

const apiUsers = axios.create({
  // URL base de tu backend en Render
  baseURL: "https://safework-backend.onrender.com/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para inyectar el Token desde el Keychain
apiUsers.interceptors.request.use(
  async (config) => {
    try {
      // 🔑 Recuperamos el token de forma segura
      const token = await SecureStore.getItemAsync("userToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error al recuperar token del Keychain", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiUsers;
