import { useRouter } from "expo-router"; // Importamos el router para navegar
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Corregimos las rutas de importación según tu estructura de carpetas
import { ActivityItem } from "../../src/components/home/ActivityItem";
import { GeneralStatus } from "../../src/components/home/GeneralStatus";
import { HomeHeader } from "../../src/components/home/HomeHeader";

export default function ExploreScreen() {
  const router = useRouter(); // Hook para la navegación

  return (
    <View style={styles.container}>
      <HomeHeader
        onReportPress={() => router.push("/(tabs)/report")}
        // CAMBIO CLAVE: Quitamos el alert() y ponemos router.push
        onNotifyPress={() => router.push("/notifications")}
      />

      <ScrollView
        style={styles.contentCard}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All {">"}</Text>
          </TouchableOpacity>
        </View>

        <ActivityItem
          icon="checkmark-circle"
          color="#2ECC71"
          title="Accident resulting in Injury"
          status="Resolved"
        />
        <ActivityItem
          icon="close-circle"
          color="#E74C3C"
          title="Unsafe Condition"
          status="In Progress"
        />
        <ActivityItem
          icon="remove-circle"
          color="#F39C12"
          title="Electrical Problem"
          status="Under Review"
        />

        {/* Agregamos el estatus general que faltaba en tu versión */}
        <GeneralStatus />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4A6295" },
  contentCard: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  seeAll: { color: "#888" },
});
