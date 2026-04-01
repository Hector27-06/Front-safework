import { useState } from "react";
import apiUsers from "../models/users";

export const useRegisterViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onRegister = async (email, password, rol, area, onSuccess) => {
    setLoading(true);
    setError(null);

    try {
      // El endpoint debe empezar con / para sumarse a la baseURL
      const response = await apiUsers.post("/auth/createUser", {
        email,
        password,
        rol,
        area,
      });

      if (response.status === 201) {
        onSuccess();
      }
    } catch (err) {
      // Si hay error, extraemos el mensaje del servidor
      const serverMsg =
        err.response?.data?.message || "Error 404: Ruta no encontrada";
      setError(serverMsg);
      console.log("Error en registro:", err.response?.status, err.config?.url);
    } finally {
      setLoading(false);
    }
  };

  return { onRegister, loading, error };
};
