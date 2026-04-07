import { useState } from "react";
import { reportService } from "../services/reportService";

export const useReportViewModel = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    severityLevel: "Medio",
    area: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState({ area: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = () => {
    if (currentStep === 1) {
      if (!form.title.trim()) return "El título es obligatorio";
      if (!form.area) return "Debes seleccionar un área";
    }
    if (currentStep === 3 && !form.description.trim())
      return "La descripción es obligatoria";
    return null;
  };

  const onSendReport = async (onSuccess) => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    const dataFinal = {
      titulo: form.title,
      descripcion: form.description,
      nivelGravedad: form.severityLevel,
      areaIncidente: form.area,
    };

    try {
      await reportService.createReporte(dataFinal);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error de conexión");
    }
  };

  return {
    form,
    setForm,
    currentStep,
    setCurrentStep,
    modalVisible,
    setModalVisible,
    loading,
    error,
    setError,
    onSendReport,
    nextStep: () => {
      const err = validate();
      if (err) setError(err);
      else setCurrentStep((prev) => prev + 1);
    },
    prevStep: () => setCurrentStep((prev) => prev - 1),
  };
};
