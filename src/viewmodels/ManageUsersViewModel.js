import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import apiUsers from "../models/users";

export const useManageUsersViewModel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // Cargar usuarios desde la API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiUsers.get("/auth/users");
      setUsers(res.data);
      
      if (res.data.length === 0) {
        console.log("Servidor conectado, pero BD vacía.");
      }
    } catch (err) {
      console.log("Error al obtener usuarios:", err.message);
      Alert.alert(
        "Error de Conexión",
        `No se pudo conectar a la API.\nStatus: ${err.response?.status || "Offline"}`
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Lógica de eliminación con confirmación
  const deleteUser = (userId, email) => {
    Alert.alert("Eliminar Usuario", `¿Estás seguro de borrar a ${email}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await apiUsers.delete(`/auth/users/${userId}`);
            setUsers((prev) => prev.filter((u) => u._id !== userId));
          } catch (e) {
            Alert.alert("Error", "No se pudo eliminar el usuario.");
          }
        },
      },
    ]);
  };

  // Filtrado reactivo
  const filteredUsers = users.filter((u) =>
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return {
    users: filteredUsers,
    loading,
    refreshing,
    search,
    setSearch,
    fetchUsers,
    deleteUser
  };
};