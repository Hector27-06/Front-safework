import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusFace } from "../../src/components/common/StatusFace";
import PrioritySelector from "../../src/components/report/PrioritySelector";

const { width } = Dimensions.get("window");

const AREAS_PLANTA = [
  "Almacén Central",
  "Línea de Ensamblaje",
  "Sector de Pintura",
  "Área de Carga",
  "Mantenimiento",
  "Laboratorio",
  "Control de Calidad",
];

export default function CreateReportScreen() {
  // --- ESTADOS ---
  const [currentStep, setCurrentStep] = useState(1);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    nivelGravedad: "Bajo",
    areaIncidente: "",
  });

  // --- LÓGICA DE NAVEGACIÓN Y CÁMARA ---
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Necesitamos acceso a tu cámara para la evidencia.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && (!form.titulo || !form.areaIncidente)) {
      Alert.alert(
        "Datos faltantes",
        "Por favor completa el título y el área antes de continuar.",
      );
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // --- GUARDADO LOCAL ---
  const handleSubmit = async () => {
    try {
      const newReport = {
        _id: Date.now().toString(), // ID único basado en tiempo
        ...form,
        evidencia: image,
        fechaCreacion: new Date().toISOString(),
        estado: "Pendiente (Local)",
      };

      // Guardar en la lista local existente
      const existingData = await AsyncStorage.getItem("@local_reports");
      const reports = existingData ? JSON.parse(existingData) : [];
      const updatedReports = [newReport, ...reports];

      await AsyncStorage.setItem(
        "@local_reports",
        JSON.stringify(updatedReports),
      );

      // Mostrar el modal de éxito según el diseño
      setShowSuccessModal(true);
    } catch (e) {
      Alert.alert("Error", "No se pudo guardar el reporte localmente.");
    }
  };

  const resetFlow = () => {
    setForm({
      titulo: "",
      descripcion: "",
      nivelGravedad: "Bajo",
      areaIncidente: "",
    });
    setImage(null);
    setCurrentStep(1);
    setShowSuccessModal(false);
  };

  // --- RENDERIZADO DE CONTENIDO POR PASOS ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Paso 1: Datos Básicos
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Información del Incidente</Text>
            <Text style={styles.stepSubtitle}>
              Cuéntanos qué está pasando en la planta.
            </Text>

            <Text style={styles.inputLabel}>Título del Reporte</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Derrame de líquido"
              placeholderTextColor="#9CA3AF"
              value={form.titulo}
              onChangeText={(v) => setForm({ ...form, titulo: v })}
            />

            <Text style={styles.inputLabel}>Área / Ubicación</Text>
            <TouchableOpacity
              style={styles.selectorInput}
              onPress={() => setShowAreaModal(true)}
            >
              <Text
                style={[
                  styles.selectorText,
                  !form.areaIncidente && { color: "#9CA3AF" },
                ]}
              >
                {form.areaIncidente || "Selecciona el área afectada"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#4A6295" />
            </TouchableOpacity>
          </View>
        );
      case 2: // Paso 2: Evidencia
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Evidencia Visual</Text>
            <Text style={styles.stepSubtitle}>
              ¿Tienes alguna foto del incidente?
            </Text>

            {image ? (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => setImage(null)}
                >
                  <Ionicons name="trash-outline" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.cameraBox} onPress={takePhoto}>
                <Ionicons name="camera" size={50} color="#4A6295" />
                <Text style={styles.cameraBoxText}>Tomar Foto</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      case 3: // Paso 3: Gravedad
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Prioridad y Detalles</Text>

            <Text style={styles.inputLabel}>Nivel de Gravedad</Text>
            <PrioritySelector
              selected={form.nivelGravedad}
              onSelect={(v: string) => setForm({ ...form, nivelGravedad: v })}
            />

            <Text style={styles.inputLabel}>Descripción (Opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Añade más detalles sobre el riesgo..."
              placeholderTextColor="#9CA3AF"
              value={form.descripcion}
              onChangeText={(v) => setForm({ ...form, descripcion: v })}
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER CON PROGRESO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuevo Reporte</Text>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressLine,
              { width: `${(currentStep / 3) * 100}%` },
            ]}
          />
        </View>
      </View>

      <ScrollView
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}

        {/* NAVEGACIÓN ENTRE PASOS */}
        <View style={styles.footerButtons}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text style={styles.backButtonText}>Atrás</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.mainButton,
              currentStep === 3 && styles.finishButton,
            ]}
            onPress={currentStep === 3 ? handleSubmit : handleNext}
          >
            <Text style={styles.mainButtonText}>
              {currentStep === 3 ? "FINALIZAR" : "Siguiente"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL DE SELECCIÓN DE ÁREAS */}
      <Modal visible={showAreaModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Ubicación</Text>
            <FlatList
              data={AREAS_PLANTA}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.areaItem}
                  onPress={() => {
                    setForm({ ...form, areaIncidente: item });
                    setShowAreaModal(false);
                  }}
                >
                  <Text style={styles.areaItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowAreaModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE ÉXITO (Diseño Final) */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <StatusFace type="happy" size={85} />
            <Text style={styles.successTitle}>¡Reporte Registrado!</Text>
            <Text style={styles.successMsg}>
              El reporte se guardó localmente en el historial de tu dispositivo.
            </Text>
            <TouchableOpacity style={styles.successBtn} onPress={resetFlow}>
              <Text style={styles.successBtnText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    backgroundColor: "#4A6295",
    paddingVertical: 25,
    paddingTop: 50,
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  progressContainer: {
    height: 4,
    width: "70%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    marginTop: 12,
  },
  progressLine: { height: "100%", backgroundColor: "#FFF", borderRadius: 2 },

  mainScroll: { flex: 1, paddingHorizontal: 25 },
  stepContainer: { paddingTop: 20 },
  stepTitle: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  stepSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 15,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginTop: 22,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 15,
    backgroundColor: "#F9FAFB",
    fontSize: 15,
  },
  selectorInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 15,
    backgroundColor: "#F9FAFB",
  },
  selectorText: { fontSize: 15, color: "#111827" },
  textArea: { height: 100, textAlignVertical: "top" },

  cameraBox: {
    height: 160,
    borderWidth: 2,
    borderColor: "#4A6295",
    borderStyle: "dashed",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
    marginTop: 10,
  },
  cameraBoxText: { color: "#4A6295", fontWeight: "bold", marginTop: 10 },
  imageWrapper: { position: "relative", marginTop: 10 },
  imagePreview: { width: "100%", height: 250, borderRadius: 18 },
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,59,48,0.8)",
    padding: 10,
    borderRadius: 25,
  },

  footerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40,
    paddingBottom: 30,
    gap: 12,
  },
  mainButton: {
    backgroundColor: "#4A6295",
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 15,
  },
  finishButton: { backgroundColor: "#2ECC71", flex: 1, alignItems: "center" },
  mainButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  backButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 15,
  },
  backButtonText: { color: "#4B5563", fontWeight: "bold" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#4A6295",
  },
  areaItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  areaItemText: { fontSize: 16, textAlign: "center", color: "#374151" },
  modalClose: { marginTop: 10, padding: 15 },
  modalCloseText: { color: "#FF3B30", textAlign: "center", fontWeight: "bold" },

  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  successCard: {
    backgroundColor: "white",
    padding: 35,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    color: "#111827",
  },
  successMsg: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 10,
    lineHeight: 22,
  },
  successBtn: {
    backgroundColor: "#4A6295",
    width: "100%",
    padding: 16,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
  },
  successBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
