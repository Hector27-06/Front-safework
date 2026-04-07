// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import React from "react";
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
import { useProfileViewModel } from "../viewmodels/ProfileViewModel";

export const ProfileView = () => {
  const { user, role, tab, setTab, handleLogout, navigateTo } =
    useProfileViewModel();

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
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

          <View style={styles.tabs}>
            <TabButton
              label="Information"
              active={tab === "info"}
              onPress={() => setTab("info")}
            />
            <TabButton
              label="Options"
              active={tab === "options"}
              onPress={() => setTab("options")}
            />
          </View>
        </SafeAreaView>
      </View>

      {/* BODY */}
      <View style={styles.contentBody}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={styles.card}>
            {tab === "info" ? (
              <InfoTab user={user} />
            ) : (
              <OptionsTab
                role={role}
                onLogout={handleLogout}
                onNavigate={navigateTo}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

/* SECCIONES INTERNAS */
const InfoTab = ({ user }) => (
  <>
    <ProfileInput label="Full Name" value={user.name} icon="person-outline" />
    <ProfileInput
      label="Email Address"
      value={user.email}
      icon="mail-outline"
    />
    <ProfileInput
      label="Work Position"
      value={user.position}
      icon="briefcase-outline"
    />
    <ProfileInput
      label="Assigned Area"
      value={user.area}
      icon="location-outline"
    />
    <TouchableOpacity
      style={styles.save}
      onPress={() =>
        Alert.alert("SafeWork Support", "Please contact IT to update records.")
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
);

const OptionsTab = ({ role, onLogout, onNavigate }) => (
  <>
    {role === "Gerente" && (
      <View style={styles.adminBox}>
        <Text style={styles.adminLabel}>ADMINISTRATION PANEL</Text>
        <MenuOption
          title="Register New Personnel"
          icon="person-add-outline"
          isSpecial
          onPress={() => onNavigate("/userRegister")}
        />
        <MenuOption
          title="Manage Personnel"
          icon="people-outline"
          isSpecial
          onPress={() => onNavigate("/manage-users")}
        />
      </View>
    )}
    <Text style={styles.sectionLabel}>PREFERENCES</Text>
    <MenuOption
      title="App Configuration"
      icon="settings-outline"
      onPress={() => onNavigate("/configuration")}
    />
    <MenuOption
      title="Privacy Policy"
      icon="shield-checkmark-outline"
      onPress={() => onNavigate("/privacy")}
    />
    <TouchableOpacity style={styles.logout} onPress={onLogout}>
      <Ionicons
        name="log-out-outline"
        size={20}
        color="white"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  </>
);

/* COMPONENTES REUTILIZABLES */
const TabButton = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, active && styles.activeTabButton]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const ProfileInput = ({ label, value, icon }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputWrapper, { backgroundColor: "#F1F5F9" }]}>
      <Ionicons
        name={icon}
        size={18}
        color="#94A3B8"
        style={{ marginRight: 10 }}
      />
      <TextInput
        value={value}
        editable={false}
        style={[styles.input, { color: "#64748B" }]}
      />
    </View>
  </View>
);

const MenuOption = ({ title, onPress, icon, isSpecial }) => (
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

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#4A6295" },
  header: { backgroundColor: "#4A6295", paddingBottom: 25 },
  headerTop: { alignItems: "center", paddingTop: 10 },
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
  activeTabButton: { backgroundColor: "white" },
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
  input: { flex: 1, fontSize: 16 },
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
