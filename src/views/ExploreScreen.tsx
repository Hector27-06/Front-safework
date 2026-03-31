import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

// Componentes con tipado correcto
import { ActivityItem } from "../components/home/ActivityItem";
import { GeneralStatus } from "../components/home/GeneralStatus";
import { HomeHeader } from "../components/home/HomeHeader";

export const ExploreView = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("Loading...");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("user_data");
        if (data) {
          const user = JSON.parse(data);
          setUserEmail(user.email || "User");
        }
      } catch (error) {
        console.error("Error loading user data", error);
      }
    };
    getUserData();
  }, []);

  // Función de navegación real
  const handleGoToNotifications = () => {
    router.push("/notifications");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <HomeHeader
        onReportPress={() => router.push("/(tabs)/report")}
        onNotifyPress={handleGoToNotifications}
      />

      <ScrollView
        style={styles.contentCard}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Recent Activity</Text>
          <Text style={styles.seeAllText}>See All</Text>
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
          icon="alert-circle"
          color="#F39C12"
          title="Electrical Problem"
          status="Under Review"
        />

        <GeneralStatus />

        <View style={styles.footerContainer}>
          <Text style={styles.userFooter}>Logged in as: {userEmail}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

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
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  seeAllText: { color: "#AAA", fontSize: 14 },
  footerContainer: {
    marginTop: 30,
    marginBottom: 50,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 20,
  },
  userFooter: { textAlign: "center", color: "#BBB", fontSize: 12 },
});
