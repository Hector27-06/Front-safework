import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusFace } from "../common/StatusFace";

const priorities = [
  { label: "Low", value: "Bajo", face: "happy" },
  { label: "Medium", value: "Medio", face: "neutral" },
  { label: "Urgent", value: "Alto", face: "sad" },
];

const PrioritySelector = ({ selected, onSelect }: any) => {
  return (
    <View style={styles.container}>
      {priorities.map((item) => (
        <TouchableOpacity
          key={item.value}
          activeOpacity={0.7}
          style={[styles.card, selected === item.value && styles.selectedCard]}
          onPress={() => onSelect(item.value)}
        >
          <StatusFace type={item.face as any} size={38} />
          <Text
            style={[
              styles.label,
              selected === item.value && styles.selectedLabel,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  card: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    marginHorizontal: 6,
    backgroundColor: "#FFFFFF",
    // Sombra suave para que parezca de Figma
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedCard: {
    borderColor: "#4A6295",
    backgroundColor: "#F0F4FF",
    borderWidth: 2,
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  selectedLabel: {
    color: "#4A6295",
  },
});

export default PrioritySelector;
