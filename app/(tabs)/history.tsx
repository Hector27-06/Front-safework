import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { HistoryItem } from "../../src/components/history/HistoryItem";

export default function HistoryScreen() {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          // Mantenemos tus llaves originales de AsyncStorage
          const data = await AsyncStorage.getItem("@local_reports");
          const role = await AsyncStorage.getItem("userRole");
          const userDataRaw = await AsyncStorage.getItem("userData");

          if (data) {
            let allReports = JSON.parse(data);

            // LÓGICA DE FILTRADO ORIGINAL [RESTAURADA]
            if (role === "Gerente" || role === "Manager") {
              setReports(allReports); // Gerente ve todo
            } else if (role === "Supervisor" && userDataRaw) {
              const myArea = JSON.parse(userDataRaw).area;
              setReports(
                allReports.filter(
                  (r: any) =>
                    r.areaIncidente === myArea || r.incidentArea === myArea,
                ),
              );
            } else if (userDataRaw) {
              const myEmail = JSON.parse(userDataRaw).email;
              setReports(
                allReports.filter(
                  (r: any) =>
                    r.reportadoPor === myEmail || r.reportedBy === myEmail,
                ),
              );
            } else {
              setReports(allReports); // Fallback
            }
          }
        } catch (error) {
          console.error("Error loading reports", error);
        }
      };
      load();
    }, []),
  );

  // Colores de prioridad (soporta Esp/Eng)
  const getStatusColor = (g: string) => {
    const priority = g?.toLowerCase();
    if (priority === "alto" || priority === "high") return "#E74C3C";
    if (priority === "medio" || priority === "medium") return "#F1C40F";
    return "#2ECC71";
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* Header Estilo SafeWork */}
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>Recent Activity</Text>
          <Text style={styles.headerSubtitle}>Safety Monitoring System</Text>
        </SafeAreaView>
      </View>

      <View style={styles.body}>
        {/* Buscador funcional */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search reports..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {reports
            .filter((r: any) => {
              const title = r.titulo || r.title || "";
              return title.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .map((item: any) => (
              <HistoryItem
                key={item._id}
                // Soporte para iconos según gravedad
                faceType={
                  item.nivelGravedad === "Alto" || item.severityLevel === "High"
                    ? "sad"
                    : "happy"
                }
                title={item.titulo || item.title}
                status={item.estado || item.status}
                statusColor={getStatusColor(
                  item.nivelGravedad || item.severityLevel,
                )}
                onPress={() =>
                  router.push({ pathname: "/report-detail", params: item })
                }
              />
            ))}

          {reports.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={{ color: "#94A3B8" }}>
                No reports available for your role.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#4A6295" },
  header: {
    backgroundColor: "#4A6295",
    paddingHorizontal: 25,
    paddingBottom: 40,
    paddingTop: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  body: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -20,
  },
  searchSection: {
    paddingHorizontal: 25,
    marginTop: 25,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  emptyState: { alignItems: "center", marginTop: 50 },
});
