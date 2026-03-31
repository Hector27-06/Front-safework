import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Imports corregidos para apuntar a la carpeta src
import { NotificationCard } from "../src/components/notifications/NotificationCard";
import { NotificationToggle } from "../src/components/notifications/NotificationToggle";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Azul Oscuro */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Switch de activar */}
        <NotificationToggle />

        <Text style={styles.sectionTitle}>You should be careful with...</Text>
        <NotificationCard
          faceType="neutral"
          title="Electrical Problem"
          subtitle="Area A"
          onPressDetails={() => {}}
        />

        <Text style={styles.sectionTitle}>Most Recent Report</Text>
        <NotificationCard
          faceType="sad"
          title="Accident resulting in Injury"
          subtitle="In Progress"
          description="Our staff is already looking into your report."
          onPressDetails={() => {}}
        />
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 45,
  },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 15,
  },
});
