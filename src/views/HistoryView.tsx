// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Importamos sin tipos, el @ts-nocheck arriba arregla esto
import { HistoryItem } from "../components/history/HistoryItem";
import { useHistoryViewModel } from "../viewmodels/HistoryViewModel";

export const HistoryView = () => {
  const router = useRouter();
  const vm = useHistoryViewModel();

  useFocusEffect(
    useCallback(() => {
      vm.loadReports();
    }, [vm.loadReports]),
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>Actividad Reciente</Text>
          <Text style={styles.headerSubtitle}>SafeWork Monitoring</Text>
        </SafeAreaView>
      </View>

      <View style={styles.body}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar reportes..."
              placeholderTextColor="#94A3B8"
              value={vm.searchQuery}
              onChangeText={(text) => vm.setSearchQuery(text)}
            />
          </View>
        </View>

        {vm.loading ? (
          <ActivityIndicator
            size="large"
            color="#4A6295"
            style={{ marginTop: 50 }}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {vm.filteredReports &&
              vm.filteredReports.map((item) => (
                <HistoryItem
                  key={item._id || Math.random().toString()}
                  faceType={
                    item.nivelGravedad === "Alto" ||
                    item.severityLevel === "High"
                      ? "sad"
                      : "happy"
                  }
                  title={item.titulo || item.title}
                  status={item.estado || item.status}
                  statusColor={vm.getStatusColor(
                    item.nivelGravedad || item.severityLevel,
                  )}
                  onPress={() =>
                    router.push({ pathname: "/report-detail", params: item })
                  }
                />
              ))}

            {!vm.hasReports && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="document-text-outline"
                  size={50}
                  color="#CBD5E1"
                />
                <Text style={{ color: "#94A3B8", marginTop: 10 }}>
                  No hay reportes disponibles.
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#4A6295" },
  header: { paddingHorizontal: 25, paddingBottom: 40, paddingTop: 10 },
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
  searchSection: { paddingHorizontal: 25, marginTop: 25, marginBottom: 15 },
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
