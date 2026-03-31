import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FaceType, StatusFace } from "../common/StatusFace";

interface HistoryItemProps {
  faceType: FaceType;
  title: string;
  status: string;
  statusColor: string;
  onPress: () => void;
}

export const HistoryItem = ({
  faceType,
  title,
  status,
  statusColor,
  onPress,
}: HistoryItemProps) => (
  <View style={styles.container}>
    <StatusFace type={faceType} size={45} />

    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
    </View>

    <TouchableOpacity style={styles.detailsBtn} onPress={onPress}>
      <Text style={styles.detailsText}>Details</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    // Sombra ligera para que resalte
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textContainer: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: "bold", color: "#333" },
  status: { fontSize: 13, fontWeight: "500", marginTop: 2 },
  detailsBtn: {
    borderWidth: 1,
    borderColor: "#CCC",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailsText: { fontSize: 12, fontWeight: "600", color: "#333" },
});
