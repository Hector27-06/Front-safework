import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import { ActivityItem } from "../components/home/ActivityItem";
import { GeneralStatus } from "../components/home/GeneralStatus";
import { HomeHeader } from "../components/home/HomeHeader";

export const ExploreView = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("Loading...");

  // State for stats to fix the TypeScript error in GeneralStatus
  const [stats, setStats] = useState({
    urgent: 2,
    medium: 5,
    low: 12,
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("user_data");

        // FIX: Verify data exists before parsing to avoid "null" error
        if (data) {
          const user = JSON.parse(data);
          // Verify user object and email property exist
          if (user && user.email) {
            setUserEmail(user.email);
          } else {
            setUserEmail("SafeWork User");
          }
        } else {
          setUserEmail("Guest User");
        }
      } catch (error) {
        console.error("Error loading user data", error);
        setUserEmail("User Error");
      }
    };
    getUserData();
  }, []);

  const handleGoToNotifications = () => {
    router.push("/notifications");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Blue Top Section */}
      <HomeHeader
        onReportPress={() => router.push("/(tabs)/report")}
        onNotifyPress={handleGoToNotifications}
      />

      {/* Main Content White Card */}
      <View style={styles.contentCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push("/history")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Activity List */}
          <View style={styles.activityList}>
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
          </View>

          {/* Stats Section - FIX: Added missing props */}
          <Text
            style={[styles.sectionTitle, { marginTop: 25, marginBottom: 15 }]}
          >
            General Overview
          </Text>
          <GeneralStatus
            urgent={stats.urgent}
            medium={stats.medium}
            low={stats.low}
          />

          {/* User Footer Info */}
          <View style={styles.footerContainer}>
            <Ionicons name="person-circle-outline" size={18} color="#BBB" />
            <Text style={styles.userFooter}>Logged in as: {userEmail}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A6295",
  },
  contentCard: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    color: "#4A6295",
    fontWeight: "600",
    fontSize: 14,
  },
  activityList: {
    gap: 10,
  },
  footerContainer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  userFooter: {
    textAlign: "center",
    color: "#BBB",
    fontSize: 12,
    marginLeft: 5,
  },
});
