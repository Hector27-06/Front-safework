import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
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
        const data = await AsyncStorage.getItem("@local_reports");
        const role = await AsyncStorage.getItem("userRole");
        const userData = await AsyncStorage.getItem("userData");

        if (data) {
          let allReports = JSON.parse(data);
          if (role === "Gerente") {
            setReports(allReports); // Gerente ve todo
          } else if (role === "Supervisor" && userData) {
            const myArea = JSON.parse(userData).area;
            setReports(
              allReports.filter((r: any) => r.areaIncidente === myArea),
            ); // Filtro por área
          } else {
            const myEmail = JSON.parse(userData || "{}").email;
            setReports(
              allReports.filter((r: any) => r.reportadoPor === myEmail),
            );
          }
        }
      };
      load();
    }, []),
  );

  const getStatusColor = (g: string) =>
    g === "Alto" ? "#E74C3C" : g === "Medio" ? "#F1C40F" : "#2ECC71";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Actividad Reciente</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar reporte..."
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {reports
            .filter((r: any) =>
              r.titulo.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((item: any) => (
              <HistoryItem
                key={item._id}
                faceType={item.nivelGravedad === "Alto" ? "sad" : "happy"}
                title={item.titulo}
                status={item.estado}
                statusColor={getStatusColor(item.nivelGravedad)}
                onPress={() =>
                  router.push({ pathname: "/report-detail", params: item })
                }
              />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: "#45BC75",
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  container: { flex: 1, padding: 20 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
  },
  searchInput: { flex: 1, marginLeft: 10 },
});
