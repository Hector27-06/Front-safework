import { useState } from "react";
import { validateEmail, validatePassword } from "../helpers/validators"; // Importamos los tuyos
import apiUsers from "../models/users";

export const useRegisterViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onRegister = async (values, onSuccess) => {
    // 1. Validaciones usando tus helpers
    if (!validateEmail(values.email)) {
      setError("Por favor, ingresa un correo de Gmail válido.");
      return;
    }

    if (!validatePassword(values.password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una letra y un número.",
      );
      return;
    }

    if (values.name.trim().length < 3) {
      setError("El nombre es demasiado corto.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiUsers.post("/auth/createUser", values);
      if (response.status === 201 || response.status === 200) {
        setLoading(false);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setLoading(false);
      // Aquí atrapamos el error "El usuario ya existe" que sale en tu captura
      const msg = err.response?.data?.message || "Error en el registro";
      setError(msg);
    }
  };

  return { onRegister, loading, error, setError };
};
