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

  const { displayReports, counts, loading, role, user } = useHomeViewModel();

  return (
    <View style={styles.container}>
      {/* 🔥 HEADER */}
      <HomeHeader
        role={role || ""}
        user={user}
        onReportPress={() => router.push("/(tabs)/report")}
        onNotifyPress={() => router.push("/notifications")}
      />

      <ScrollView style={styles.contentCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Panel de Control</Text>

          <TouchableOpacity onPress={() => router.push("/(tabs)/history")}>
            <Text style={styles.seeAll}>Ver Historial {">"}</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4A6295" />
        ) : displayReports.length > 0 ? (
          displayReports.map((item: any) => (
            <ActivityItem
              key={item._id || item.id}
              title={item.titulo || item.title || "Sin nombre"}
              status={item.estado || "Pendiente"}
              icon="alert-circle"
              color={
                item.nivelGravedad === "Alto"
                  ? "#E74C3C"
                  : item.nivelGravedad === "Medio"
                    ? "#F1C40F"
                    : "#2ECC71"
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#888",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#aaa",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },
});
