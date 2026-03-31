import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Interfaz para TypeScript
interface HomeHeaderProps {
  onReportPress: () => void;
  onNotifyPress: () => void;
}

export const HomeHeader = ({
  onReportPress,
  onNotifyPress,
}: HomeHeaderProps) => (
  <View style={styles.headerContainer}>
    <View style={styles.topRow}>
      <View>
        <Text style={styles.appTitle}>SafeWork App</Text>
        <Text style={styles.headerSubtitle}>
          Having a problem? Report it here
        </Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Ionicons name="help-circle-outline" size={28} color="white" />
        </TouchableOpacity>
        {/* Aquí es donde se activa la navegación */}
        <TouchableOpacity onPress={onNotifyPress}>
          <Ionicons name="notifications" size={26} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </View>

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

const styles = StyleSheet.create({
  headerContainer: { padding: 25, paddingTop: Platform.OS === "ios" ? 50 : 40 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  appTitle: { fontSize: 24, fontWeight: "bold", color: "white" },
  headerSubtitle: { color: "#D1D9E6", fontSize: 14, marginTop: 5 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  reportBtn: {
    backgroundColor: "#FFB800",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  reportBtnText: { fontWeight: "bold", fontSize: 16, color: "#333" },
});
