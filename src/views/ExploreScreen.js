import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

// Importamos tus nuevos componentes
import { ActivityItem } from "../components/home/ActivityItem";
import { GeneralStatus } from "../components/home/GeneralStatus";
import { HomeHeader } from "../components/home/HomeHeader";

export const ExploreView = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("Cargando...");

  useEffect(() => {
    const getUserData = async () => {
      const data = await AsyncStorage.getItem("user_data");
      if (data) {
        const user = JSON.parse(data);
        setUserEmail(user.email);
      }
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    // ... tu lógica de logout aquí ...
    await AsyncStorage.removeItem("user_token");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <HomeHeader
        onReportPress={() => router.push("/(tabs)/report")}
        onNotifyPress={handleLogout} // Por ahora lo tienes vinculado al logout según tu código
      />

      <ScrollView style={styles.contentCard}>
        <Text style={styles.sectionTitle}>My Recent Activity</Text>

        <ActivityItem
          icon="checkmark-circle"
          color="#2ECC71"
          title="Accident Injury"
          status="Resolved"
        />
        <ActivityItem
          icon="close-circle"
          color="#E74C3C"
          title="Unsafe Condition"
          status="In Progress"
        />

        <GeneralStatus />

        <Text style={styles.userFooter}>Logged in as: {userEmail}</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  userFooter: {
    textAlign: "center",
    color: "#CCC",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 40,
  },
});
