import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header con el azul institucional SafeWork */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="options-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Cuerpo con ScrollView y diseño de tarjeta blanca */}
      <View style={styles.body}>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Sección de Preferencias */}
          <View style={styles.toggleSection}>
            <NotificationToggle />
          </View>

          <View style={styles.divider} />

          {/* Alertas Críticas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Safety Alerts</Text>
            <Text style={styles.sectionSubtitle}>
              You should be careful with...
            </Text>

            <NotificationCard
              faceType="neutral"
              title="Electrical Problem"
              subtitle="Area A - Main Plant"
              onPressDetails={() => {}}
            />
          </View>

          {/* Reportes Recientes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <NotificationCard
              faceType="sad"
              title="Accident resulting in Injury"
              subtitle="Status: In Progress"
              description="Our specialized staff is already looking into your report. Stay tuned for updates."
              onPressDetails={() => {}}
            />
          </View>

          {/* Placeholder para cuando no hay más notificaciones */}
          <View style={styles.emptyFooter}>
            <Ionicons
              name="notifications-off-outline"
              size={40}
              color="#E0E0E0"
            />
            <Text style={styles.footerText}>
              No more notifications for today
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4A6295" }, // Fondo azul base
  header: {
    backgroundColor: "#4A6295",
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  backButton: {
    padding: 5,
    marginLeft: -5,
  },
  settingsButton: {
    padding: 5,
  },
  body: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Gris muy claro para resaltar las tarjetas
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  toggleSection: {
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 25,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 15,
  },
  emptyFooter: {
    alignItems: "center",
    marginTop: 40,
    opacity: 0.5,
  },
  footerText: {
    color: "#95A5A6",
    fontSize: 14,
    marginTop: 10,
    fontWeight: "500",
  },
});
