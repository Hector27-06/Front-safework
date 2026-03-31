import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function useProfileViewModel() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user_safe_work");
    const parsed = data ? JSON.parse(data) : {};

    setUser(parsed);
    setForm(parsed);
  };

  const updateUser = async () => {
    await AsyncStorage.setItem("user_safe_work", JSON.stringify(form));
    setUser(form);
    alert("Perfil actualizado");
  };

  return {
    user,
    form,
    setForm,
    loadUser,
    updateUser,
  };
}