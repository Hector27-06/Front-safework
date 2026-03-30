import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Position {
  id: string;
  label: string;
  value: string;
}

interface Props {
  label: string;
  selectedLabel: string;
  options: Position[];
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (item: Position) => void;
}

export const PositionPicker = ({
  label,
  selectedLabel,
  options,
  visible,
  onOpen,
  onClose,
  onSelect,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.pickerButton} onPress={onOpen}>
      <Text
        style={[
          styles.pickerText,
          selectedLabel !== "Select your position" && { color: "#000" },
        ]}
      >
        {selectedLabel}
      </Text>
      <Ionicons name="chevron-down" size={20} color="#666" />
    </TouchableOpacity>

    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select {label}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  label: { fontWeight: "bold", marginBottom: 5 },
  pickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FAFAFA",
  },
  pickerText: { color: "#AAA", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "50%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  optionItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  optionText: { fontSize: 16, color: "#333" },
  closeButton: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
});
