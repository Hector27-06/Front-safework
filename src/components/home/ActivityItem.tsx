import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Definimos la interfaz para las props de cada item de actividad
interface ActivityItemProps {
  icon: any; // O el nombre exacto de la familia de iconos
  color: string;
  title: string;
  status: string;
}

export const ActivityItem = ({
  icon,
  color,
  title,
  status,
}: ActivityItemProps) => {
  return (
    <View style={styles.activityItem}>
      <Ionicons
        name={icon}
        size={22}
        color={color}
        style={{ marginRight: 12 }}
      />
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={[styles.itemStatus, { color: color }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  itemTitle: { flex: 1, fontSize: 15, color: "#444", fontWeight: "500" },
  itemStatus: { fontSize: 13, fontWeight: "600" },
});
