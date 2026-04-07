import { useState } from "react";
import { validateEmail, validatePassword } from "../helpers/validators";
import { authService } from "../services/authService";

export const useRegisterViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onRegister = async (values, onSuccess) => {
    // VALIDACIONES
    if (!validateEmail(values.email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    if (!validatePassword(values.password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una letra y un número.",
      );
      return;
    }

    if (!values.name || values.name.trim().length < 3) {
      setError("El nombre es demasiado corto.");
      return;
    }

    if (!values.area || !values.rol) {
      setError("Debes seleccionar área y rol.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.register(values);

      if (onSuccess) onSuccess();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Error en el registro";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { onRegister, loading, error, setError };
};
