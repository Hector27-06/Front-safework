// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useReportDetailViewModel } from "../viewmodels/ReportDetailViewModel";

// 🔥 NUEVO (ROL)
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const ReportDetailView = () => {
  const router = useRouter();

  const { report, status, getSeverityColor, markAsResolved } =
    useReportDetailViewModel();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem("userRole");
      setRole(storedRole);
    };

    loadRole();
  }, []);

  const isResolved = status === "Resuelto" || status === "Resolved";

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Gestión de Incidente</Text>

            <View style={{ width: 26 }} />
          </View>
        </SafeAreaView>
      </View>

      {/* BODY */}
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.card}>
            {/* HEADER CARD */}
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.severityBadge,
                  {
                    backgroundColor: getSeverityColor(report.severity),
                  },
                ]}
              >
                <Text style={styles.severityText}>
                  {report.severity?.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.dateText}>{report.date}</Text>
            </View>

            {/* TITULO */}
            <Text style={styles.mainTitle}>{report.title}</Text>

            {/* ESTADO */}
            <View style={styles.statusRow}>
              <Ionicons
                name={isResolved ? "shield-checkmark" : "time"}
                size={20}
                color={isResolved ? "#059669" : "#4A6295"}
              />

              <Text
                style={[
                  styles.statusValue,
                  {
                    color: isResolved ? "#059669" : "#4A6295",
                  },
                ]}
              >
                Estado: {isResolved ? "RESUELTO" : "EN PROCESO"}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* INFO */}
            <View style={styles.infoSection}>
              <Text style={styles.label}>ÁREA / UBICACIÓN</Text>
              <Text style={styles.valueText}>{report.area}</Text>

              <Text style={styles.label}>DESCRIPCIÓN DEL EVENTO</Text>
              <Text style={styles.descriptionText}>{report.description}</Text>

              <Text style={styles.footerInfo}>
                Reportado por: {report.reportedBy}
              </Text>
            </View>

            <View style={styles.divider} />

            {/* 🔥 BOTONES POR ROL */}
            {!isResolved && role !== "Operador" ? (
              <TouchableOpacity
                style={styles.resolveButton}
                onPress={markAsResolved}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="checkmark-done-circle"
                  size={26}
                  color="white"
                />
                <Text style={styles.resolveButtonText}>
                  MARCAR COMO RESUELTO
                </Text>
              </TouchableOpacity>
            ) : !isResolved && role === "Operador" ? (
              <Text style={styles.noPermission}>
                No tienes permisos para resolver este reporte
              </Text>
            ) : (
              <View style={styles.resolvedContainer}>
                <View style={styles.resolvedIconCircle}>
                  <Ionicons name="checkmark-done" size={30} color="white" />
                </View>

                <Text style={styles.resolvedTitle}>Incidente Solucionado</Text>

                <Text style={styles.resolvedSubtitle}>
                  Este reporte ya no requiere acciones adicionales.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#4A6295",
  },

  header: {
    paddingBottom: 20,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  backButton: { padding: 5 },

  body: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  content: { padding: 20 },

  card: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 25,
    elevation: 5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  severityText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },

  dateText: {
    color: "#94A3B8",
    fontSize: 13,
  },

  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusValue: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 20,
  },

  infoSection: { gap: 12 },

  label: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "800",
  },

  valueText: {
    fontSize: 17,
    color: "#334155",
  },

  descriptionText: {
    fontSize: 16,
    color: "#475569",
  },

  footerInfo: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 10,
  },

  resolveButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
  },

  resolveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },

  noPermission: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
    fontStyle: "italic",
  },

  resolvedContainer: {
    alignItems: "center",
  },

  resolvedIconCircle: {
    backgroundColor: "#10B981",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  resolvedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#065F46",
  },

  resolvedSubtitle: {
    fontSize: 14,
    color: "#059669",
    textAlign: "center",
  },
});
