import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityItem } from "../../src/components/home/ActivityItem";
import { HomeHeader } from "../../src/components/home/HomeHeader";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <HomeHeader
        onReportPress={() => console.log("Ir a Report")}
        onNotifyPress={() => alert("Notificaciones")}
      />

      <ScrollView style={styles.contentCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All {">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Usamos el componente reutilizable */}
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
