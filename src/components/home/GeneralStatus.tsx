import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatusItemProps {
  icon: keyof typeof Ionicons.glyphMap; // Valida que el icono exista
  color: string;
  label: string;
  count: string;
}

const StatusItem = ({ icon, color, label, count }: StatusItemProps) => (
  <View style={styles.statusItem}>
    <View style={styles.statusLeft}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.statusLabel}>{label}</Text>
    </View>
    <Text style={styles.statusCount}>{count}</Text>
  </View>
);

export const GeneralStatus = () => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>General Status</Text>
    <StatusItem icon="sad-outline" color="#E74C3C" label="Urgent" count="2" />
    {/* CAMBIADO: "alert-circle-outline" en lugar de "meh-outline" */}
    <StatusItem
      icon="alert-circle-outline"
      color="#F39C12"
      label="Medium"
      count="4"
    />
    <StatusItem icon="happy-outline" color="#2ECC71" label="Low" count="3" />
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 30, marginBottom: 15 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  statusLeft: { flexDirection: "row", alignItems: "center" },
  statusLabel: { marginLeft: 15, fontSize: 16, color: "#444" },
  statusCount: { fontSize: 16, fontWeight: "bold", color: "#666" },
});
