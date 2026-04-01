import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import apiUsers from "../models/users";

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiUsers.post("/auth/loginUser", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        // 1. Guardamos el Token para las peticiones API
        await AsyncStorage.setItem("userToken", response.data.token);

        // 2. Guardamos el Rol para ocultar el registro
        await AsyncStorage.setItem("userRole", response.data.usuario.rol);

        // 3. ¡ESTA ES LA QUE FALTA!: Guardamos TODO el usuario como texto JSON
        // Esto permite que el Perfil muestre el nombre, área, etc.
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(response.data.usuario),
        );

        onSuccess();
      }
    } catch (err) {
      console.log("Error en Login:", err.response?.data);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return { onLogin, loading, error };
};
