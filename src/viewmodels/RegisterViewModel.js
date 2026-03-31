import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useRegisterViewModel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onRegister = async (name, email, password, position, birthday) => {
    if (!name || !email || !password || !position || !birthday) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const userData = { name, email, password, position, birthday };
      await AsyncStorage.setItem("user_safe_work", JSON.stringify(userData));
      alert("¡Usuario registrado con éxito!");
      router.replace("/login");
    } catch (e) {
      alert("Error al guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  // Estos nombres deben coincidir con tu register.tsx
  return { onRegister, loading };
};
