import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Definimos la interfaz para las props del Header
interface HomeHeaderProps {
  onReportPress: () => void;
  onNotifyPress: () => void;
}

export const HomeHeader = ({
  onReportPress,
  onNotifyPress,
}: HomeHeaderProps) => {
  return (
    <View style={styles.blueHeader}>
      <View style={styles.headerTop}>
        <Text style={styles.appTitle}>SafeWork App</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="help-circle-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNotifyPress}>
            <Ionicons name="notifications" size={26} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.headerSubtitle}>
        Having a problem? Report it here
      </Text>

      {/* BOTÓN AMARILLO DE REPORTE */}
      <TouchableOpacity style={styles.reportBtn} onPress={onReportPress}>
        <Ionicons
          name="warning"
          size={20}
          color="#333"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.reportBtnText}>Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blueHeader: {
    backgroundColor: "#4A6295", // Azul profesional del diseño
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appTitle: { color: "white", fontSize: 26, fontWeight: "bold" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 15,
    opacity: 0.9,
  },
  reportBtn: {
    backgroundColor: "#FFC107", // Amarillo del diseño
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reportBtnText: { color: "#333", fontWeight: "bold", fontSize: 17 },
});
