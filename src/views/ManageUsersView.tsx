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

  // Extraemos todo lo necesario del ViewModel
  const {
    users,
    loading,
    refreshing,
    search,
    setSearch,
    fetchUsers,
    deleteUser,
  } = useManageUsersViewModel();

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado con botón de regreso y refrescar */}
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
            placeholder="Buscar por correo o nombre..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
        </View>

        {loading && !refreshing ? (
          <ActivityIndicator
            size="large"
            color="#4A6295"
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchUsers}
                colors={["#4A6295"]}
              />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>No se encontraron usuarios.</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  {/* Mostramos el email y el rol que vienen del backend */}
                  <Text style={styles.nameText}>{item.email}</Text>
                  <Text style={styles.subText}>
                    {item.rol || "Sin Rol"} — {item.area || "Sin Área"}
                  </Text>
                </View>

                {/* Botón para eliminar usuario con confirmación */}
                <TouchableOpacity
                  onPress={() => deleteUser(item._id, item.email)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={22} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4A6295",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#4A6295",
    elevation: 2,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2C3E50",
  },
  subText: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 2,
  },
  deleteButton: {
    padding: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
});
