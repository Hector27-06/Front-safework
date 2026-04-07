import { useState } from "react";
import { authService } from "../services/authService";

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, password);
      onSuccess();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al iniciar sesión";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return { onLogin, loading, error };
};
