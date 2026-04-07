import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthInput } from "../components/Auth/AuthInput";
import { PositionPicker } from "../components/Auth/PositionPicker";
import { StatusFace } from "../components/common/StatusFace";
import PrioritySelector from "../components/report/PrioritySelector";
import { useReportViewModel } from "../viewmodels/ReportViewModel";

const AREAS = [
  { id: "1", label: "Almacén", value: "Almacén" },
  { id: "2", label: "Mantenimiento", value: "Mantenimiento" },
  { id: "3", label: "Ensamble", value: "Ensamble" },
  { id: "4", label: "Dirección General", value: "Dirección General" },
];

export const CreateReportView = () => {
  const {
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
  } = useReportViewModel();

  const [showSuccess, setShowSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuevo Reporte</Text>
        <Text style={styles.stepIndicator}>Paso {currentStep} de 3</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.card}>
          {currentStep === 1 && (
            <View>
              <AuthInput
                label="Título"
                placeholder="Ej. Falla de equipo"
                value={form.title}
                onChangeText={(v) => {
                  setError(null);
                  setForm({ ...form, title: v });
                }}
              />
              <PositionPicker
                label="Área del Incidente"
                selectedLabel={form.incidentArea || "Seleccionar área"}
                options={AREAS}
                visible={modalVisible}
                onOpen={() => setModalVisible(true)}
                onClose={() => setModalVisible(false)}
                onSelect={(item: any) => {
                  setForm({ ...form, incidentArea: item.value });
                  setModalVisible(false);
                }}
              />
            </View>
          )}

          {currentStep === 2 && (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.cameraBox} onPress={takePhoto}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.preview} />
                ) : (
                  <Ionicons name="camera" size={50} color="#4A6295" />
                )}
              </TouchableOpacity>
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <PrioritySelector
                selected={form.severityLevel}
                onSelect={(v: string) => setForm({ ...form, severityLevel: v })}
              />
              <AuthInput
                label="Descripción"
                placeholder="Describe lo sucedido..."
                value={form.description}
                onChangeText={(v) => {
                  setError(null);
                  setForm({ ...form, description: v });
                }}
              />
            </View>
          )}

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.footer}>
            {currentStep > 1 && (
              <TouchableOpacity onPress={prevStep} style={styles.btnBack}>
                <Text>Atrás</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={
                currentStep === 3
                  ? () => onSendReport(() => setShowSuccess(true))
                  : nextStep
              }
              style={styles.btnNext}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>
                  {currentStep === 3 ? "ENVIAR" : "SIGUIENTE"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <StatusFace type="happy" size={80} />
            <Text style={styles.successTitle}>¡Reporte Creado!</Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={() => setShowSuccess(false)}
            >
              <Text style={styles.btnText}>ENTENDIDO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FA" },
  header: {
    backgroundColor: "#F17F18",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerTitle: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  stepIndicator: { color: "#FFF", fontSize: 12, marginTop: 5 },
  card: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  cameraBox: {
    width: "100%",
    height: 180,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#4A6295",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F3FF",
  },
  preview: { width: "100%", height: "100%", borderRadius: 15 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnBack: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginRight: 10,
  },
  btnNext: {
    flex: 2,
    backgroundColor: "#4A6295",
    padding: 15,
    alignItems: "center",
    borderRadius: 12,
  },
  btnText: { color: "#FFF", fontWeight: "bold" },
  errorBox: {
    backgroundColor: "#FFEDED",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  errorText: { color: "#D32F2F", textAlign: "center", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 40,
  },
  successCard: {
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  successTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  successBtn: {
    backgroundColor: "#F17F18",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
});
