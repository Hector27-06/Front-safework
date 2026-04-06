import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"info" | "options">("info");
  const [role, setRole] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
    area: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("userData");
    const savedRole = await AsyncStorage.getItem("userRole");

    if (data) {
      const parsedUser = JSON.parse(data);
      setUser({
        name: parsedUser.fullName || parsedUser.email.split("@")[0],
        email: parsedUser.email,
        password: "********",
        position: parsedUser.rol || parsedUser.role,
        area: parsedUser.area,
      });
    }
    setRole(savedRole || "");
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["userToken", "userRole", "userData"]);
    router.replace("/login");
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* HEADER AZUL SAFEWORK */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerTop}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={45} color="#4A6295" />
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.position}>
              {user.position} • {user.area}
            </Text>
          </View>

          {/* TABS MEJORADOS */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                tab === "info" && styles.activeTabButton,
              ]}
              onPress={() => setTab("info")}
            >
              <Text
                style={[styles.tabText, tab === "info" && styles.activeTabText]}
              >
                Information
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                tab === "options" && styles.activeTabButton,
              ]}
              onPress={() => setTab("options")}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === "options" && styles.activeTabText,
                ]}
              >
                Options
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* CONTENIDO DENTRO DE CARD BLANCA */}
      <View style={styles.contentBody}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={styles.card}>
            {tab === "info" ? (
              <>
                <Input
                  label="Full Name"
                  value={user.name}
                  editable={false}
                  icon="person-outline"
                />
                <Input
                  label="Email Address"
                  value={user.email}
                  editable={false}
                  icon="mail-outline"
                />
                <Input
                  label="Work Position"
                  value={user.position}
                  editable={false}
                  icon="briefcase-outline"
                />
                <Input
                  label="Assigned Area"
                  value={user.area}
                  editable={false}
                  icon="location-outline"
                />

                <TouchableOpacity
                  style={styles.save}
                  onPress={() =>
                    Alert.alert(
                      "SafeWork Support",
                      "Please contact the IT department to update your personal records.",
                    )
                  }
                >
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.saveText}>Edit Profile Request</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* 🛡️ SECCIÓN ADMINISTRATIVA (Solo Gerente) */}
                {role === "Gerente" && (
                  <View style={styles.adminBox}>
                    <Text style={styles.adminLabel}>ADMINISTRATION PANEL</Text>

                    <Option
                      title="Register New Personnel"
                      onPress={() => router.push("/userRegister")}
                      icon="person-add-outline"
                      isSpecial
                    />

                    <Option
                      title="Manage Personnel (Edit/Delete)"
                      onPress={() => router.push("/manage-users")}
                      icon="people-outline"
                      isSpecial
                    />
                  </View>
                )}

                <Text style={styles.sectionLabel}>PREFERENCES</Text>
                <Option
                  title="App Configuration"
                  onPress={() => router.push("../configuration")}
                  icon="settings-outline"
                />
                <Option
                  title="Privacy Policy"
                  onPress={() => router.push("../privacy")}
                  icon="shield-checkmark-outline"
                />

                <TouchableOpacity style={styles.logout} onPress={logout}>
                  <Ionicons
                    name="log-out-outline"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/* 🔹 COMPONENTS */
const Input = ({ label, value, editable = true, icon }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View
      style={[styles.inputWrapper, !editable && { backgroundColor: "#F1F5F9" }]}
    >
      <Ionicons
        name={icon}
        size={18}
        color="#94A3B8"
        style={{ marginRight: 10 }}
      />
      <TextInput
        value={value}
        editable={editable}
        style={[styles.input, !editable && { color: "#64748B" }]}
      />
    </View>
  </View>
);

const Option = ({ title, onPress, isSpecial, icon }: any) => (
  <TouchableOpacity
    style={[styles.option, isSpecial && styles.specialOption]}
    onPress={onPress}
  >
    <View style={styles.optionLeft}>
      <View
        style={[styles.iconCircle, isSpecial && { backgroundColor: "#E0E7FF" }]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isSpecial ? "#4A6295" : "#64748B"}
        />
      </View>
      <Text
        style={[
          styles.optionText,
          isSpecial && { fontWeight: "bold", color: "#4A6295" },
        ]}
      >
        {title}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
  </TouchableOpacity>
);

/* 🔹 STYLES */
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#4A6295" },
  header: {
    backgroundColor: "#4A6295",
    paddingBottom: 25,
  },
  headerTop: {
    alignItems: "center",
    paddingTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.2)",
  },
  name: { fontWeight: "bold", fontSize: 22, color: "white" },
  position: { fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 20 },

  tabs: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.1)",
    marginHorizontal: 30,
    borderRadius: 15,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: "white",
  },
  tabText: { color: "rgba(255,255,255,0.8)", fontWeight: "600" },
  activeTabText: { color: "#4A6295", fontWeight: "bold" },

  contentBody: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  card: {
    backgroundColor: "white",
    margin: 20,
    padding: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: { marginBottom: 20 },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  input: { flex: 1, fontSize: 16, color: "#1E293B" },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#94A3B8",
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  optionLeft: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionText: { fontSize: 16, color: "#334155" },
  specialOption: {
    backgroundColor: "#F8FAFF",
    marginHorizontal: -10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  adminBox: {
    marginBottom: 25,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    padding: 15,
  },
  adminLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#64748B",
    marginBottom: 10,
    textAlign: "center",
  },
  save: {
    backgroundColor: "#4A6295",
    flexDirection: "row",
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  logout: {
    backgroundColor: "#EF4444",
    flexDirection: "row",
    marginTop: 30,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
