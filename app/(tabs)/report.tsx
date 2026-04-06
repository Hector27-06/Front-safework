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
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusFace } from "../../src/components/common/StatusFace";
import PrioritySelector from "../../src/components/report/PrioritySelector";

const PLANT_AREAS = [
  "Central Warehouse",
  "Assembly Line",
  "Painting Sector",
  "Loading Area",
  "Maintenance",
  "Laboratory",
  "Quality Control",
];

export default function CreateReportScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    severityLevel: "Low",
    incidentArea: "",
  });

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera access to take photos.");
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
      const userDataRaw = await AsyncStorage.getItem("user_data"); // Use the same key as ExploreView
      const userData = userDataRaw ? JSON.parse(userDataRaw) : null;

      const newReport = {
        _id: Date.now().toString(),
        ...form,
        evidence: image,
        createdAt: new Date().toISOString(),
        status: "Open",
        reportedBy: userData?.email || "Local User",
        userArea: userData?.area || "General",
      };

      const existingData = await AsyncStorage.getItem("@local_reports");
      const reports = existingData ? JSON.parse(existingData) : [];
      await AsyncStorage.setItem(
        "@local_reports",
        JSON.stringify([newReport, ...reports]),
      );

      setShowSuccessModal(true);
    } catch (e) {
      Alert.alert("Error", "Could not save the report.");
    }
  };

  const resetAndGoHistory = () => {
    setShowSuccessModal(false);
    setForm({
      title: "",
      description: "",
      severityLevel: "Low",
      incidentArea: "",
    });
    setImage(null);
    setCurrentStep(1);
    router.push("/history");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Incident Information</Text>
            <Text style={styles.inputLabel}>Report Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Liquid Spill"
              placeholderTextColor="#999"
              value={form.title}
              onChangeText={(v) => setForm({ ...form, title: v })}
            />
            <Text style={styles.inputLabel}>Area / Location</Text>
            <TouchableOpacity
              style={styles.selectorInput}
              onPress={() => setShowAreaModal(true)}
            >
              <Text
                style={[
                  styles.selectorText,
                  !form.incidentArea && { color: "#9CA3AF" },
                ]}
              >
                {form.incidentArea || "Select an area"}
              </Text>
              <Ionicons name="location-outline" size={20} color="#F17F18" />
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Visual Evidence</Text>
            <Text style={styles.stepSubtitle}>
              A photo helps us understand the situation better.
            </Text>
            {image ? (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => setImage(null)}
                >
                  <Ionicons name="trash" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.cameraBox} onPress={takePhoto}>
                <View style={styles.cameraCircle}>
                  <Ionicons name="camera" size={40} color="white" />
                </View>
                <Text style={styles.cameraBoxText}>Take a Photo</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Priority & Details</Text>
            <Text style={styles.inputLabel}>Severity Level</Text>
            <PrioritySelector
              selected={form.severityLevel}
              onSelect={(v: string) => setForm({ ...form, severityLevel: v })}
            />
            <Text style={styles.inputLabel}>Additional Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder="Describe what happened..."
              placeholderTextColor="#999"
              value={form.description}
              onChangeText={(v) => setForm({ ...form, description: v })}
            />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Dynamic Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>New Incident Report</Text>
          <View style={styles.progressWrapper}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentStep / 3) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.stepIndicator}>Step {currentStep} of 3</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {renderStepContent()}

          <View style={styles.footerButtons}>
            {currentStep > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setCurrentStep(currentStep - 1)}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.mainButton,
                currentStep === 3 && styles.finishButton,
              ]}
              onPress={
                currentStep === 3
                  ? handleSubmit
                  : () => setCurrentStep(currentStep + 1)
              }
            >
              <Text style={styles.mainButtonText}>
                {currentStep === 3 ? "SUBMIT REPORT" : "Next Step"}
              </Text>
              {currentStep < 3 && (
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="white"
                  style={{ marginLeft: 5 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Area Selection Modal */}
      <Modal visible={showAreaModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Area</Text>
              <TouchableOpacity onPress={() => setShowAreaModal(false)}>
                <Ionicons name="close-circle" size={28} color="#CCC" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={PLANT_AREAS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.areaItem}
                  onPress={() => {
                    setForm({ ...form, incidentArea: item });
                    setShowAreaModal(false);
                  }}
                >
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color="#4A6295"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.areaItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <StatusFace type="happy" size={80} />
            <Text style={styles.successTitle}>Report Registered!</Text>
            <Text style={styles.successMsg}>
              Your report has been sent to the supervisor of {form.incidentArea}
              .
            </Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={resetAndGoHistory}
            >
              <Text style={styles.successBtnText}>View History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FA" },
  header: {
    backgroundColor: "#F17F18", // Orange for action/emergency
    paddingHorizontal: 25,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  progressWrapper: { marginTop: 20, alignItems: "center" },
  progressBackground: {
    height: 6,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#FFF" },
  stepIndicator: {
    color: "white",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },

  mainScroll: { padding: 20, marginTop: -20 },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 50,
  },
  stepContainer: { minHeight: 300 },
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  stepSubtitle: { fontSize: 14, color: "#7F8C8D", marginBottom: 20 },
  inputLabel: {
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
    color: "#34495E",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#333",
  },
  selectorInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#F9FAFB",
  },
  selectorText: { fontSize: 16, fontWeight: "500" },

  cameraBox: {
    height: 180,
    borderWidth: 2,
    borderColor: "#4A6295",
    borderStyle: "dashed",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F3FF",
  },
  cameraCircle: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
  },
  cameraBoxText: { color: "#4A6295", fontWeight: "bold", fontSize: 16 },
  imagePreview: { width: "100%", height: 220, borderRadius: 15 },
  imageWrapper: { position: "relative" },
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(231, 76, 60, 0.9)",
    padding: 10,
    borderRadius: 20,
  },

  footerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 40,
    gap: 12,
  },
  mainButton: {
    flexDirection: "row",
    backgroundColor: "#4A6295",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  finishButton: { backgroundColor: "#F17F18" },
  mainButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  backButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
  },
  backButtonText: { color: "#7F8C8D", fontWeight: "600" },

  textArea: { height: 100, textAlignVertical: "top" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#2C3E50" },
  areaItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  areaItemText: { fontSize: 16, color: "#34495E" },

  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(74, 98, 149, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  successCard: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    color: "#2C3E50",
  },
  successMsg: {
    textAlign: "center",
    color: "#7F8C8D",
    marginVertical: 15,
    fontSize: 16,
  },
  successBtn: {
    backgroundColor: "#F17F18",
    width: "100%",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  successBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
