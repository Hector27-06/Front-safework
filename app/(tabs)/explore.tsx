import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Componentes personalizados
import { ActivityItem } from "../../src/components/home/ActivityItem";
import { GeneralStatus } from "../../src/components/home/GeneralStatus";
import { HomeHeader } from "../../src/components/home/HomeHeader";

export default function ExploreScreen() {
  const router = useRouter();
  const [displayReports, setDisplayReports] = useState([]);
  const [counts, setCounts] = useState({ urgent: 0, medium: 0, low: 0 });

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const data = await AsyncStorage.getItem("@local_reports");
        if (data) {
          const allReports = JSON.parse(data);
          const now = Date.now();
          const TWO_HOURS_MS = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

          // 1. FILTRADO LÓGICO:
          // Mostramos el reporte si:
          // - NO está resuelto (sigue abierto)
          // - O SI está resuelto, pero han pasado menos de 2 horas desde su creación/resolución
          const filteredForHome = allReports.filter((report: any) => {
            if (report.estado !== "Resuelto") return true;

            const reportTime = new Date(report.fechaCreacion).getTime();
            const timePassed = now - reportTime;

            return timePassed < TWO_HOURS_MS; // Retorna true si es menor a 2 horas
          });

          // 2. ACTUALIZAR LISTA DE ACTIVIDAD (Top 4 visibles)
          setDisplayReports(filteredForHome.slice(0, 4));

          // 3. ACTUALIZAR CONTADORES (Solo cuentan los que NO están resueltos)
          const activeCounts = allReports.reduce(
            (acc: any, report: any) => {
              // Solo contamos para el "General Status" los que siguen Abiertos
              if (report.estado !== "Resuelto") {
                if (report.nivelGravedad === "Alto") acc.urgent++;
                else if (report.nivelGravedad === "Medio") acc.medium++;
                else acc.low++;
              }
              return acc;
            },
            { urgent: 0, medium: 0, low: 0 },
          );

          setCounts(activeCounts);
        }
      };
      loadData();
    }, []),
  );

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

        {/* Renderizado dinámico de la actividad */}
        {displayReports.length > 0 ? (
          displayReports.map((item: any) => (
            <ActivityItem
              key={item._id}
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
              title={item.titulo}
              status={item.estado}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay actividades recientes</Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Status General con datos reales filtrados */}
        <GeneralStatus
          urgent={counts.urgent}
          medium={counts.medium}
          low={counts.low}
        />
      </ScrollView>
    </View>
  );
}

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
  emptyContainer: { padding: 20, alignItems: "center" },
  emptyText: { color: "#AAA", fontStyle: "italic" },
  divider: { height: 1, backgroundColor: "#EEE", marginVertical: 10 },
});
