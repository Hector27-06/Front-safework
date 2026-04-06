import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import apiUsers from "../src/models/users";

export default function ManageUsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // 1. FUNCIÓN PARA PROBAR SI EL SERVIDOR RESPONDE
  const testConnection = async () => {
    try {
      setLoading(true);
      // Intentamos una petición simple
      const res = await apiUsers.get("/auth/users");
      console.log("LOG: Conexión exitosa", res.data);
      setUsers(res.data);
      if (res.data.length === 0)
        Alert.alert("Servidor conectado", "Pero la base de datos está vacía.");
    } catch (err: any) {
      console.log("LOG ERROR:", err.message);
      Alert.alert(
        "Error de Conexión",
        `No se pudo conectar a la API.\n\nStatus: ${err.response?.status || "Sin internet"}\nURL: ${err.config?.url || "Desconocida"}`,
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const handleDelete = (userId: string, email: string) => {
    Alert.alert("Eliminar", `¿Borrar a ${email}?`, [
      { text: "No" },
      {
        text: "Sí",
        style: "destructive",
        onPress: async () => {
          try {
            await apiUsers.delete(`/auth/users/${userId}`);
            setUsers((prev) => prev.filter((u: any) => u._id !== userId));
          } catch (e) {
            Alert.alert("Error", "No se pudo borrar");
          }
        },
      },
    ]);
  };

  const filteredUsers = users.filter((u: any) =>
    (u.email || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestión de Personal</Text>
        <TouchableOpacity onPress={testConnection}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Buscar por correo..."
            style={styles.searchInput}
            onChangeText={setSearch}
          />
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#4A6295" />
            <Text style={{ marginTop: 10 }}>Llamando a Render...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item: any) => item._id || Math.random().toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={testConnection}
              />
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.email}</Text>
                  <Text style={styles.sub}>
                    {item.rol || item.role} - {item.area}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDelete(item._id, item.email)}
                >
                  <Ionicons name="trash" size={22} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={{ color: "#999" }}>
                  No hay datos. Presiona refrescar.
                </Text>
                <TouchableOpacity
                  style={styles.btnRetry}
                  onPress={testConnection}
                >
                  <Text style={{ color: "white" }}>REINTENTAR CONEXIÓN</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#4A6295",
    flexDirection: "row",
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: { marginLeft: 10, flex: 1 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  name: { fontWeight: "bold", fontSize: 15 },
  sub: { color: "#666", fontSize: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  btnRetry: {
    backgroundColor: "#4A6295",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
