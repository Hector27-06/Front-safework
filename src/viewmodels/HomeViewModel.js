import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import reportService from "../services/reportService";

export const useHomeViewModel = () => {
  const [displayReports, setDisplayReports] = useState([]);
  const [counts, setCounts] = useState({
    urgent: 0,
    medium: 0,
    low: 0,
  });
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const normalize = (text) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const loadData = async () => {
    try {
      setLoading(true);

      // 🔥 USER
      const roleStorage = await AsyncStorage.getItem("userRole");
      const userStorage = await AsyncStorage.getItem("userData");

      const parsedUser = userStorage ? JSON.parse(userStorage) : null;

      setRole(roleStorage);
      setUser(parsedUser);

      // 🔥 BACKEND
      const res = await reportService.getReportes();
      let reports = res.data || [];

      // 🔥 NORMALIZAR DATA (IMPORTANTE)
      reports = reports.map((r) => ({
        ...r,
        area: r.areaIncidente || r.area,
        gravedad: normalize(r.nivelGravedad),
      }));

      // 🔥 FILTRO POR ROL
      if (
        roleStorage !== "Admin" &&
        roleStorage !== "Gerente" &&
        parsedUser?.area
      ) {
        reports = reports.filter(
          (r) => normalize(r.area) === normalize(parsedUser.area),
        );
      }

      // 🔥 ORDENAR
      reports.sort(
        (a, b) =>
          new Date(b.fechaCreacion || 0) - new Date(a.fechaCreacion || 0),
      );

      // 🔥 MOSTRAR SOLO 5
      setDisplayReports(reports.slice(0, 5));

      // 🔥 CONTADORES
      const urgent = reports.filter((r) => r.gravedad === "alto").length;
      const medium = reports.filter((r) => r.gravedad === "medio").length;
      const low = reports.filter((r) => r.gravedad === "bajo").length;

      setCounts({ urgent, medium, low });
    } catch (error) {
      console.log("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    displayReports,
    counts,
    loading,
    role,
    user,
    reload: loadData,
  };
};
