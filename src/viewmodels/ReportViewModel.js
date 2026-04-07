import { useState } from "react";
import reportService from "../services/reportService";

export const useReportViewModel = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    severityLevel: "",
    area: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState({ area: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSendReport = async (onSuccess) => {
    setLoading(true);
    setError(null);

    try {
      // 🔥 MAPEAMOS CORRECTAMENTE LOS DATOS
      const payload = {
        titulo: form.title,
        descripcion: form.description,
        nivelGravedad: form.severityLevel,
        areaIncidente: form.area,
      };

      await reportService.createReporte(payload);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Error al crear reporte");
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
    modalVisible,
    setModalVisible,
    loading,
    error,
    setError,
    onSendReport,
  };
};
