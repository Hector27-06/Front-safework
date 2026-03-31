import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// IMPORTANTE: Ruta corregida para subir un nivel
import { FaceType, StatusFace } from "../common/StatusFace";

interface NotificationCardProps {
  // faceType reemplaza a icon y iconBgColor manuales
  faceType: FaceType;
  title: string;
  subtitle: string;
  description?: string;
  onPressDetails: () => void;
}

export const NotificationCard = ({
  faceType,
  title,
  subtitle,
  description,
  onPressDetails,
}: NotificationCardProps) => (
  <View style={styles.card}>
    <View style={styles.mainInfo}>
      {/* CAMBIADO: Renderizamos el componente StatusFace, pasándole el tipo */}
      <StatusFace type={faceType} size={45} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.detailsBtn} onPress={onPressDetails}>
        <Text style={styles.detailsText}>Details</Text>
      </TouchableOpacity>
    </View>
    {description && <Text style={styles.description}>{description}</Text>}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "white",
  },
  mainInfo: { flexDirection: "row", alignItems: "center" },
  textContainer: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 13, color: "#666" },
  detailsBtn: {
    borderWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailsText: { fontSize: 12, color: "#333", fontWeight: "500" },
  description: {
    marginTop: 10,
    color: "#2ECC71",
    fontSize: 13,
    fontWeight: "500",
  },
});
