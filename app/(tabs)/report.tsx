import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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
  const router = useRouter();
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

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tu cámara.");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    try {
      const userDataRaw = await AsyncStorage.getItem("userData");
      const userData = userDataRaw ? JSON.parse(userDataRaw) : null;

      const newReport = {
        _id: Date.now().toString(),
        ...form,
        evidencia: image,
        fechaCreacion: new Date().toISOString(),
        estado: "Abierto",
        // Vinculación con contrato
        reportadoPor: userData?.email || "Usuario Local",
        areaUsuario: userData?.area || "General",
        supervisorArea: `Supervisor de ${form.areaIncidente}`,
      };

      const existingData = await AsyncStorage.getItem("@local_reports");
      const reports = existingData ? JSON.parse(existingData) : [];
      await AsyncStorage.setItem(
        "@local_reports",
        JSON.stringify([newReport, ...reports]),
      );

      setShowSuccessModal(true);
    } catch (e) {
      Alert.alert("Error", "No se pudo guardar el reporte.");
    }
  };

  const resetAndGoHistory = () => {
    setShowSuccessModal(false);
    setForm({
      titulo: "",
      descripcion: "",
      nivelGravedad: "Bajo",
      areaIncidente: "",
    });
    setImage(null);
    setCurrentStep(1);
    router.push("/(tabs)/history");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Información del Incidente</Text>
            <Text style={styles.inputLabel}>Título del Reporte</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Derrame de líquido"
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
                {form.areaIncidente || "Selecciona el área"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#4A6295" />
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Evidencia Visual</Text>
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
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Prioridad y Detalles</Text>
            <Text style={styles.inputLabel}>Nivel de Gravedad</Text>
            <PrioritySelector
              selected={form.nivelGravedad}
              onSelect={(v: string) => setForm({ ...form, nivelGravedad: v })}
            />
            <Text style={styles.inputLabel}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Detalles adicionales..."
              value={form.descripcion}
              onChangeText={(v) => setForm({ ...form, descripcion: v })}
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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

      <ScrollView style={styles.mainScroll}>
        {renderStepContent()}
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
            style={styles.mainButton}
            onPress={
              currentStep === 3
                ? handleSubmit
                : () => setCurrentStep(currentStep + 1)
            }
          >
            <Text style={styles.mainButtonText}>
              {currentStep === 3 ? "FINALIZAR" : "Siguiente"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Áreas */}
      <Modal visible={showAreaModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={AREAS_PLANTA}
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
          </View>
        </View>
      </Modal>

      {/* Modal Éxito */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <StatusFace type="happy" size={80} />
            <Text style={styles.successTitle}>¡Registrado!</Text>
            <Text style={styles.successMsg}>
              El reporte se envió al supervisor de {form.areaIncidente}.
            </Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={resetAndGoHistory}
            >
              <Text style={styles.successBtnText}>Ir al Historial</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Estilos resumidos (usa los mismos que ya tenías)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  header: {
    backgroundColor: "#F17F18",
    padding: 25,
    paddingTop: 50,
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  progressContainer: {
    height: 4,
    width: "70%",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginTop: 12,
  },
  progressLine: { height: "100%", backgroundColor: "#FFF" },
  mainScroll: { padding: 25 },
  stepContainer: { paddingTop: 10 },
  stepTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  inputLabel: { fontWeight: "700", marginTop: 20, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#F9FAFB",
  },
  selectorInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
  },
  selectorText: { fontSize: 15 },
  cameraBox: {
    height: 150,
    borderWidth: 2,
    borderColor: "#4A6295",
    borderStyle: "dashed",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBoxText: { color: "#4A6295", fontWeight: "bold", marginTop: 5 },
  imagePreview: { width: "100%", height: 200, borderRadius: 15 },
  imageWrapper: { position: "relative" },
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 20,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
    gap: 10,
  },
  mainButton: {
    backgroundColor: "#F17F18",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  mainButtonText: { color: "white", fontWeight: "bold" },
  backButton: {
    backgroundColor: "#EEE",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  backButtonText: { color: "#666" },
  textArea: { height: 80, textAlignVertical: "top" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  areaItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  areaItemText: { fontSize: 16 },
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successCard: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  successTitle: { fontSize: 20, fontWeight: "bold", marginTop: 15 },
  successMsg: { textAlign: "center", color: "#666", marginVertical: 10 },
  successBtn: {
    backgroundColor: "#F17F18",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  successBtnText: { color: "white", fontWeight: "bold" },
});
