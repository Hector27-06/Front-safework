import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [role, setRole] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [status, setStatus] = useState(params.estado);

  useEffect(() => {
    const getInfo = async () => {
      setRole(await AsyncStorage.getItem("userRole"));
      const userData = await AsyncStorage.getItem("userData");
      if (userData) setArea(JSON.parse(userData).area);
    };
    getInfo();
  }, []);

  const handleResolve = async () => {
    const data = await AsyncStorage.getItem("@local_reports");
    if (data) {
      let reports = JSON.parse(data).map((r: any) =>
        r._id === params._id ? { ...r, estado: "Resuelto" } : r,
      );
      await AsyncStorage.setItem("@local_reports", JSON.stringify(reports));
      setStatus("Resuelto");
      Alert.alert("Éxito", "Incidente marcado como resuelto.");
    }
  };

  const canResolve =
    role === "Gerente" ||
    (role === "Supervisor" && area === params.areaIncidente);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.container}>
        {params.evidencia && (
          <Image
            source={{ uri: params.evidencia as string }}
            style={styles.img}
          />
        )}
        <View style={styles.card}>
          <Text style={styles.label}>
            Estado:{" "}
            <Text style={{ color: status === "Resuelto" ? "green" : "orange" }}>
              {status}
            </Text>
          </Text>
          <Text style={styles.label}>
            Área: <Text style={styles.val}>{params.areaIncidente}</Text>
          </Text>
          <Text style={styles.descTitle}>Descripción</Text>
          <Text style={styles.descText}>{params.descripcion}</Text>

          {canResolve && status !== "Resuelto" && (
            <TouchableOpacity style={styles.btn} onPress={handleResolve}>
              <Text style={styles.btnText}>MARCAR COMO RESUELTO</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: "#4A6295",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  container: { flex: 1, padding: 20 },
  img: { width: "100%", height: 250, borderRadius: 15 },
  card: { marginTop: 20 },
  label: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  val: { fontWeight: "normal", color: "#666" },
  descTitle: { fontWeight: "bold", marginTop: 20 },
  descText: { color: "#666", marginTop: 5, lineHeight: 20 },
  btn: {
    backgroundColor: "#2ECC71",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
});
