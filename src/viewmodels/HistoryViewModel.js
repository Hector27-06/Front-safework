import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

export const useHistoryViewModel = () => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const loadReports = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Obtener datos de almacenamiento local
      const data = await AsyncStorage.getItem("@local_reports");
      const role = await AsyncStorage.getItem("userRole");
      const userDataRaw = await AsyncStorage.getItem("userData");

      if (data) {
        let allReports = JSON.parse(data);

        // 2. Aplicar lógica de filtrado por ROL
        if (role === "Gerente" || role === "Manager") {
          setReports(allReports); // Ve todo
        } else if (role === "Supervisor" && userDataRaw) {
          const myArea = JSON.parse(userDataRaw).area;
          setReports(
            allReports.filter(
              (r) => r.areaIncidente === myArea || r.incidentArea === myArea,
            ),
          );
        } else if (userDataRaw) {
          const myEmail = JSON.parse(userDataRaw).email;
          setReports(
            allReports.filter(
              (r) => r.reportadoPor === myEmail || r.reportedBy === myEmail,
            ),
          );
        } else {
          setReports(allReports);
        }
      }
    } catch (error) {
      console.error("Error loading reports in ViewModel:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lógica de búsqueda (filtrado en tiempo real)
  const filteredReports = reports.filter((r) => {
    const title = r.titulo || r.title || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Helper para colores de prioridad
  const getStatusColor = (severity) => {
    const priority = severity?.toLowerCase();
    if (priority === "alto" || priority === "high") return "#E74C3C";
    if (priority === "medio" || priority === "medium") return "#F1C40F";
    return "#2ECC71";
  };

  return {
    searchQuery,
    setSearchQuery,
    loading,
    loadReports,
    filteredReports,
    getStatusColor,
    hasReports: reports.length > 0,
  };
};
