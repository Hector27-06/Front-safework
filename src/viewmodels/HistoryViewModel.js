import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import reportService from "../services/reportService";

export const useHistoryViewModel = () => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const normalize = (text) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const loadReports = useCallback(async () => {
    setLoading(true);

    try {
      const role = await AsyncStorage.getItem("userRole");
      const userDataRaw = await AsyncStorage.getItem("userData");
      const user = userDataRaw ? JSON.parse(userDataRaw) : null;

      
      const res = await reportService.getReportes();
      let data = res.data || [];

      
      data = data.map((r) => ({
        ...r,
        area: r.areaIncidente || r.area,
      }));

      
      if (role !== "Admin" && role !== "Gerente" && user?.area) {
        data = data.filter((r) => normalize(r.area) === normalize(user.area));
      }

      
      data.sort(
        (a, b) =>
          new Date(b.fechaCreacion || 0) - new Date(a.fechaCreacion || 0),
      );

      setReports(data);
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  
  const filteredReports = reports.filter((r) => {
    const title = r.titulo || r.title || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusColor = (severity) => {
    const s = normalize(severity);
    if (s === "alto") return "#E74C3C";
    if (s === "medio") return "#F1C40F";
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
