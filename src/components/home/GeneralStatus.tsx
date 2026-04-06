import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface GeneralStatusProps {
  urgent: number;
  medium: number;
  low: number;
}

export const GeneralStatus = ({ urgent, medium, low }: GeneralStatusProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>General Status</Text>

      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="sad-outline" size={24} color="#E74C3C" />
          <Text style={styles.statusLabel}>Urgent</Text>
        </View>
        <Text style={styles.count}>{urgent}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="alert-circle-outline" size={24} color="#F39C12" />
          <Text style={styles.statusLabel}>Medium</Text>
        </View>
        <Text style={styles.count}>{medium}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons name="happy-outline" size={24} color="#2ECC71" />
          <Text style={styles.statusLabel}>Low</Text>
        </View>
        <Text style={styles.count}>{low}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 30, paddingBottom: 50 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20, color: "#333" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
  },
  left: { flexDirection: "row", alignItems: "center" },
  statusLabel: {
    marginLeft: 15,
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  count: { fontSize: 18, fontWeight: "bold", color: "#333" },
});
