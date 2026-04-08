import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import reportService from "../services/reportService";

export const useReportViewModel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    area: "",
    severityLevel: "",
    description: "",
  });

  const [modalVisible, setModalVisible] = useState({
    area: false,
  });

  
  const nextStep = () => {
    if (currentStep === 1 && (!form.title || !form.area)) {
      setError("Completa todos los campos");
      return;
    }

    if (currentStep === 2 && !form.severityLevel) {
      setError("Selecciona nivel de gravedad");
      return;
    }

    setError(null);
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);


  const createReport = async () => {
    if (!form.description) {
      setError("La descripción es obligatoria");
      return false;
    }

    setLoading(true);

    try {
      const data = {
        titulo: form.title,
        descripcion: form.description,
        nivelGravedad: form.severityLevel,
        areaIncidente: form.area,
      };

      const response = await reportService.createReporte(data);

      
      const existing = await AsyncStorage.getItem("@local_reports");
      const reports = existing ? JSON.parse(existing) : [];

      await AsyncStorage.setItem(
        "@local_reports",
        JSON.stringify([response.data, ...reports]),
      );

      
      setForm({
        title: "",
        area: "",
        severityLevel: "",
        description: "",
      });

      setCurrentStep(1);

      return true; 
    } catch (err) {
      console.log(err);
      setError("Error al crear reporte");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    currentStep,
    nextStep,
    prevStep,
    createReport,
    loading,
    error,
    setError,
    modalVisible,
    setModalVisible,
  };
};
