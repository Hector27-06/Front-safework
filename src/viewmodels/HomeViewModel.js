// src/viewmodels/HomeViewModel.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export const useHomeViewModel = () => {
  const [displayReports, setDisplayReports] = useState([]);
  const [counts, setCounts] = useState({ urgent: 0, medium: 0, low: 0 });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("@local_reports");
      if (data) {
        const allReports = JSON.parse(data);
        const now = Date.now();
        const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

        // 1. FILTRADO LÓGICO
        const filteredForHome = allReports.filter((report) => {
          if (report.estado !== "Resuelto") return true;

          // Soporta fechaCreacion o updatedAt si existe
          const reportTime = new Date(
            report.fechaCreacion || report.updatedAt,
          ).getTime();
          return now - reportTime < TWO_HOURS_MS;
        });

        // 2. TOP 4 PARA ACTIVIDAD RECIENTE
        setDisplayReports(filteredForHome.slice(0, 4));

        // 3. CONTADORES (Solo activos)
        const activeCounts = allReports.reduce(
          (acc, report) => {
            if (report.estado !== "Resuelto") {
              const gravedad = report.nivelGravedad?.toLowerCase();
              if (gravedad === "alto" || gravedad === "high") acc.urgent++;
              else if (gravedad === "medio" || gravedad === "medium")
                acc.medium++;
              else acc.low++;
            }
            return acc;
          },
          { urgent: 0, medium: 0, low: 0 },
        );

        setCounts(activeCounts);
      }
    } catch (error) {
      console.error("Error cargando datos en Home:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Recargar datos cada vez que el usuario entre a la pestaña
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return {
    displayReports,
    counts,
    loading,
    refreshData: loadData,
  };
};
