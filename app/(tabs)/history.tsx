import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // 1. Importamos el router
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HistoryItem } from "../../src/components/history/HistoryItem";

// MOCK_DATA actualizado con los campos exactos de tu contrato de arquitectura
const MOCK_DATA = [
  {
    _id: "1", // Usamos _id como en tu contrato
    faceType: "sad",
    titulo: "Accident Resultin in Injury",
    estado: "Resolved",
    nivelGravedad: "Urgent",
    areaIncidente: "Area A",
    descripcion: "Trabajador con lesión lumbar al cargar material pesado.",
    fechaCreacion: "2026-03-25T15:50:50.378Z",
    color: "#2ECC71",
  },
  {
    _id: "2",
    faceType: "happy",
    titulo: "Unsafe Condition",
    estado: "In Progress",
    nivelGravedad: "Medium",
    areaIncidente: "Warehouse",
    descripcion: "Estantería floja en el pasillo 4.",
    fechaCreacion: "2026-03-26T10:20:00.000Z",
    color: "#E74C3C",
  },
  // ... puedes añadir más aquí
];

export default function HistoryScreen() {
  const router = useRouter(); // 2. Inicializamos el router
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = MOCK_DATA.filter((item) => {
    // Filtramos por nivelGravedad o titulo según el contrato
    const matchesFilter =
      activeFilter === "All" || item.nivelGravedad === activeFilter;
    const matchesSearch = item.titulo
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Recent Activity</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Are you looking for a specific report?"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={{ height: 50 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            {["All", "Urgent", "Medium", "Low"].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterChip,
                  activeFilter === filter && styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <HistoryItem
                key={item._id}
                faceType={item.faceType as any}
                title={item.titulo}
                status={item.estado}
                statusColor={item.color}
                onPress={() => {
                  // 3. Navegación a la ruta raíz fuera de los tabs
                  router.push({
                    pathname: "/report-detail",
                    params: {
                      _id: item._id,
                      titulo: item.titulo,
                      descripcion: item.descripcion,
                      nivelGravedad: item.nivelGravedad,
                      areaIncidente: item.areaIncidente,
                      fechaCreacion: item.fechaCreacion,
                      estado: item.estado,
                    },
                  });
                }}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No reports found.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: "#45BC75",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 45,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  container: { flex: 1, padding: 20 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
  filtersContainer: { marginBottom: 10 },
  filterChip: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#4A6295",
    marginRight: 10,
    backgroundColor: "white",
    height: 40,
    justifyContent: "center",
  },
  activeFilter: { backgroundColor: "#4A6295" },
  filterText: { color: "#4A6295", fontWeight: "bold" },
  activeFilterText: { color: "white" },
  list: { flex: 1, marginTop: 10 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
    fontSize: 16,
  },
});
