// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useManageUsersViewModel } from "../viewmodels/ManageUsersViewModel";

export const ManageUsersView = () => {
  const router = useRouter();
  const { users, loading, refreshing, setSearch, fetchUsers, deleteUser } =
    useManageUsersViewModel();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestión de Personal</Text>
        <TouchableOpacity onPress={fetchUsers}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Barra de Búsqueda */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Buscar por correo..."
            style={styles.searchInput}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#4A6295" />
            <Text style={styles.loadingText}>Cargando personal...</Text>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item._id || Math.random().toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchUsers} />
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nameText}>{item.email}</Text>
                  <Text style={styles.subText}>
                    {item.rol || item.role || "Sin Rol"} -{" "}
                    {item.area || "Sin Área"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteUser(item._id, item.email)}
                >
                  <Ionicons name="trash" size={22} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={styles.emptyText}>
                  No se encontraron usuarios.
                </Text>
                <TouchableOpacity style={styles.btnRetry} onPress={fetchUsers}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    REINTENTAR
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#4A6295",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  searchInput: { marginLeft: 10, flex: 1 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4A6295",
  },
  nameText: { fontWeight: "bold", fontSize: 15, color: "#1E293B" },
  subText: { color: "#64748B", fontSize: 12, marginTop: 2 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  loadingText: { marginTop: 10, color: "#4A6295" },
  emptyText: { color: "#94A3B8", textAlign: "center" },
  btnRetry: {
    backgroundColor: "#4A6295",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
});
