import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// IMPORTANTE: Al mover el archivo, la ruta a src cambia a un solo nivel de salida
import { FaceType, StatusFace } from "../src/components/common/StatusFace";

export default function ReportDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Mapeo de nivelGravedad del contrato a icono
  const getFaceFromGravity = (gravedad: any): FaceType => {
    if (gravedad === "Alto") return "sad";
    if (gravedad === "Medio") return "neutral";
    return "happy";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>File Preview</Text>
        <Image
          source={{ uri: "https://via.placeholder.com/400x250" }}
          style={styles.previewImage}
        />

        <View style={styles.infoCard}>
          <Text style={styles.detailTitle}>Detailed Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Report ID: </Text>
            <Text style={styles.value}>{params._id}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Location / Area: </Text>
            <Text style={styles.value}>{params.areaIncidente}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.value}>
              {params.fechaCreacion
                ? new Date(params.fechaCreacion as string).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <Text style={styles.label}>Type: </Text>
            <Text style={styles.value}>{params.titulo}</Text>
          </View>

          <View style={styles.priorityRow}>
            <Text style={styles.label}>Priority: </Text>
            <StatusFace
              type={getFaceFromGravity(params.nivelGravedad)}
              size={20}
            />
            <Text style={[styles.value, { marginLeft: 8, fontWeight: "bold" }]}>
              {params.nivelGravedad}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status: </Text>
            <Text
              style={[styles.value, { color: "#2ECC71", fontWeight: "bold" }]}
            >
              {params.estado}
            </Text>
          </View>

          <Text style={styles.detailTitle}>Description</Text>
          <Text style={styles.descriptionText}>{params.descripcion}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: "#4A6295",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 45,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  previewImage: { width: "100%", height: 220, borderRadius: 15 },
  infoCard: { marginTop: 10 },
  detailTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  row: { flexDirection: "row", marginBottom: 8 },
  priorityRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  label: { fontSize: 14, fontWeight: "700", color: "#333" },
  value: { fontSize: 14, color: "#666" },
  separator: { height: 1, backgroundColor: "#EEE", marginVertical: 15 },
  descriptionText: { fontSize: 14, color: "#666", lineHeight: 20 },
});
