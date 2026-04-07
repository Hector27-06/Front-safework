import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
// Importante: R mayúscula para que coincida con tu archivo ReportService.js
import { reportService } from "../services/ReportService";

export const useReportViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    severityLevel: "Low",
    incidentArea: "",
  });

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      setError("Permiso de cámara denegado.");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const nextStep = () => {
    if (currentStep === 1 && (!form.title || !form.incidentArea)) {
      setError("Título y Área son obligatorios.");
      return;
    }
    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  // Quitamos el ": () => void" para que sea JS puro
  const onSendReport = async (onSuccess) => {
    if (!form.description) {
      setError("La descripción es obligatoria.");
      return;
    }
    setLoading(true);
    try {
      // Obtenemos el token para la petición
      const token = await AsyncStorage.getItem("user_token");

      const reportData = {
        ...form,
        evidence: image,
        createdAt: new Date().toISOString(),
      };

      // Llamada al servicio que creamos
      await reportService.createReporte(reportData);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setLoading(false);
      setError(err.toString());
    }
  };

  return {
    form,
    setForm,
    currentStep,
    image,
    loading,
    error,
    setError,
    takePhoto,
    nextStep,
    prevStep,
    onSendReport,
  };
};
