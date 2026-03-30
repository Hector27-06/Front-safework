import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useLoginViewModel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async (email, password) => {
    setError("");
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const res = await AsyncStorage.getItem("user_safe_work");
      const user = res ? JSON.parse(res) : null;

      if (
        user &&
        user.email.trim() === email.trim() &&
        user.password === password
      ) {
        router.replace("/(tabs)/explore");
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (e) {
      setError("Error al leer datos");
    } finally {
      setLoading(false);
    }
  };

  return { onLogin, loading, error };
};
