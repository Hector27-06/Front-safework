import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

export default function TabLayout() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const savedRole = await AsyncStorage.getItem("userRole"); //
      setRole(savedRole);
    };
    checkRole();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFC107",
        headerShown: false, // 👈 ESTO ELIMINA EL TÍTULO BLANCO DE ARRIBA
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color }) => (
            <Ionicons name="warning" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />

      {/* Ocultamos la pestaña de registro si no es Gerente */}
      <Tabs.Screen
        name="userRegister"
        options={{
          title: "Register",
          href: role === "Gerente" ? "/userRegister" : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-add" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
