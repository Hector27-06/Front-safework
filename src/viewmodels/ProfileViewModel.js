import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useProfileViewModel = () => {
  const router = useRouter();
  const [tab, setTab] = useState("info");
  const [role, setRole] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    position: "",
    area: "",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      const savedRole = await AsyncStorage.getItem("userRole");

      if (data) {
        const parsedUser = JSON.parse(data);
        setUser({
          name: parsedUser.fullName || parsedUser.email.split("@")[0],
          email: parsedUser.email,
          position: parsedUser.rol || parsedUser.role || "Not assigned",
          area: parsedUser.area || "General Area",
        });
      }
      setRole(savedRole || "");
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["userToken", "userRole", "userData"]);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  return {
    user,
    role,
    tab,
    setTab,
    handleLogout,
    navigateTo,
  };
};
