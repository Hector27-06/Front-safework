import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { userService } from "../services/UserService";

export const useManageUsersViewModel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      console.log("--- INTENTANDO CONECTAR A LA API ---");
      if (!refreshing) setLoading(true);

      const res = await userService.getAllUsers();

      console.log("RESPUESTA RECIBIDA:", res.data); // 👈 Revisa esto en tu terminal

      // Si el backend manda los usuarios directo en res.data
      if (res.data && Array.isArray(res.data)) {
        setUsers(res.data);
      }
      // Si el backend los manda dentro de un objeto (ej: res.data.users)
      else if (res.data.users && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        console.log("Ojo: La API no mandó un arreglo. Mandó:", res.data);
        setUsers([]);
      }
    } catch (err) {
      console.log("--- ERROR DETECTADO ---");
      console.log("Status:", err.response?.status);
      console.log("Mensaje:", err.response?.data || err.message);

      let msg = "No se pudo conectar. Revisa que el Backend esté corriendo.";
      if (err.response?.status === 401)
        msg = "Sesión expirada (Token no válido).";
      if (err.response?.status === 404)
        msg = "Ruta no encontrada en el servidor.";

      Alert.alert("Error de API", msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
      console.log("--- PROCESO TERMINADO ---");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id, email) => {
    Alert.alert("Confirmar", `¿Borrar a ${email}?`, [
      { text: "No" },
      {
        text: "Sí",
        onPress: async () => {
          try {
            await userService.deleteUser(id);
            setUsers((prev) => prev.filter((u) => u._id !== id));
          } catch (e) {
            Alert.alert("Error", "No se pudo borrar.");
          }
        },
      },
    ]);
  };

  const filteredUsers = users.filter((u) =>
    (u.email || "").toLowerCase().includes(search.toLowerCase()),
  );

  return {
    users: filteredUsers,
    loading,
    refreshing,
    search,
    setSearch,
    fetchUsers,
    deleteUser,
  };
};
