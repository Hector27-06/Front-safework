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

export const ReportDetailView = () => {
  const router = useRouter();
  const { report, status, getSeverityColor, markAsResolved } =
    useReportDetailViewModel();

  const isResolved = status === "Resuelto" || status === "Resolved";

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

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

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.card}>
            {/* Header de la tarjeta con Badge de Gravedad */}
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.severityBadge,
                  { backgroundColor: getSeverityColor(report.severity) },
                ]}
              >
                <Text style={styles.severityText}>
                  {report.severity.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.dateText}>{report.date}</Text>
            </View>

            <Text style={styles.mainTitle}>{report.title}</Text>

            <View style={styles.statusRow}>
              <Ionicons
                name={isResolved ? "shield-checkmark" : "time"}
                size={20}
                color={isResolved ? "#059669" : "#4A6295"}
              />
              <Text
                style={[
                  styles.statusValue,
                  { color: isResolved ? "#059669" : "#4A6295" },
                ]}
              >
                Estado: {isResolved ? "RESUELTO" : "EN PROCESO"}
              </Text>
            </View>

            <View style={styles.divider} />

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

            {/* BOTÓN DE ACCIÓN PRINCIPAL */}
            {!isResolved ? (
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
  mainContainer: { flex: 1, backgroundColor: "#4A6295" },
  header: { paddingBottom: 20 },
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
    letterSpacing: 0.5,
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  severityBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  severityText: { color: "white", fontSize: 11, fontWeight: "bold" },
  dateText: { color: "#94A3B8", fontSize: 13 },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
  },
  statusRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  statusValue: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 20 },
  infoSection: { gap: 12 },
  label: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "800",
    letterSpacing: 1,
  },
  valueText: { fontSize: 17, color: "#334155", fontWeight: "500" },
  descriptionText: { fontSize: 16, color: "#475569", lineHeight: 24 },
  footerInfo: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 10,
    fontStyle: "italic",
  },

  // Estilos del Botón de Acción
  resolveButton: {
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#10B981",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  resolveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
    letterSpacing: 1,
  },

  // Estilos del Estado Resuelto
  resolvedContainer: { alignItems: "center", paddingVertical: 10 },
  resolvedIconCircle: {
    backgroundColor: "#10B981",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  resolvedTitle: { fontSize: 18, fontWeight: "bold", color: "#065F46" },
  resolvedSubtitle: {
    fontSize: 14,
    color: "#059669",
    textAlign: "center",
    marginTop: 5,
  },
});
