// src/viewmodels/ReportDetailViewModel.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useReportDetailViewModel = () => {
  const params = useLocalSearchParams();
  // Estado inicial basado en los parámetros que vienen del historial
  const [status, setStatus] = useState(
    params.estado || params.status || "Pendiente",
  );

  const reportData = {
    id: params._id || params.id,
    title: params.titulo || params.title || "Sin título",
    description: params.descripcion || params.description || "Sin descripción",
    area: params.areaIncidente || params.incidentArea || "Área General",
    severity: params.nivelGravedad || params.severityLevel || "Bajo",
    date: params.fechaCreacion || params.createdAt || "Reciente",
    reportedBy: params.reportadoPor || params.reportedBy || "Personal",
  };

  const markAsResolved = async () => {
    try {
      const storedData = await AsyncStorage.getItem("@local_reports");
      if (storedData) {
        const allReports = JSON.parse(storedData);

        
        const updatedReports = allReports.map((r) => {
          if (r._id === reportData.id || r.id === reportData.id) {
            return { ...r, estado: "Resuelto", status: "Resolved" };
          }
          return r;
        });

        await AsyncStorage.setItem(
          "@local_reports",
          JSON.stringify(updatedReports),
        );
        setStatus("Resuelto");
        Alert.alert(
          "Incidente Cerrado",
          "El reporte ha sido marcado como RESUELTO correctamente.",
        );
      }
    } catch (error) {
      console.error("Error al resolver:", error);
      Alert.alert("Error", "No se pudo actualizar el estado del reporte.");
    }
  };

  const getSeverityColor = (severity) => {
    const s = severity?.toLowerCase();
    if (s === "alto" || s === "high") return "#E74C3C";
    if (s === "medio" || s === "medium") return "#F1C40F";
    return "#2ECC71";
  };

  return {
    report: reportData,
    status,
    getSeverityColor,
    markAsResolved,
  };
};
