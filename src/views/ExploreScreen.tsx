// @ts-nocheck
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityItem } from "../components/home/ActivityItem";
import { GeneralStatus } from "../components/home/GeneralStatus";
import { HomeHeader } from "../components/home/HomeHeader";
import { useHomeViewModel } from "../viewmodels/HomeViewModel";

export const ExploreView = () => {
  const router = useRouter();
  const { displayReports, counts, loading } = useHomeViewModel();

  return (
    <View style={styles.container}>
      <HomeHeader
        onReportPress={() => router.push("/(tabs)/report")}
        onNotifyPress={() => router.push("/notifications")}
      />

      <ScrollView
        style={styles.contentCard}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Panel de Control</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/history")}>
            <Text style={styles.seeAll}>Ver Historial {">"}</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4A6295"
            style={{ marginTop: 20 }}
          />
        ) : displayReports.length > 0 ? (
          displayReports.map((item) => (
            <ActivityItem
              key={item._id || item.id}
              // IMPORTANTE: Mapeo de nombres de variables
              title={item.titulo || item.title || "Incidente sin nombre"}
              status={item.estado === "Resuelto" ? "Resuelto" : "Pendiente"}
              icon={
                item.estado === "Resuelto" ? "checkmark-circle" : "alert-circle"
              }
              color={
                item.estado === "Resuelto"
                  ? "#2ECC71"
                  : item.nivelGravedad === "Alto"
                    ? "#E74C3C"
                    : "#F39C12"
              }
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay actividades recientes</Text>
          </View>
        )}

        <View style={styles.divider} />

        <GeneralStatus
          urgent={counts.urgent}
          medium={counts.medium}
          low={counts.low}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4A6295" },
  contentCard: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  seeAll: { color: "#888", fontSize: 14 },
  emptyContainer: { padding: 40, alignItems: "center" },
  emptyText: { color: "#AAA", fontStyle: "italic" },
  divider: { height: 1, backgroundColor: "#EEE", marginVertical: 20 },
});
