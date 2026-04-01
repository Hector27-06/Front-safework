import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"info" | "options">("info");
  const [role, setRole] = useState(""); // Para controlar la visibilidad del registro

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    position: "", // Aquí mapearemos el 'rol' de la API
    area: "", // Añadimos área del contrato
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    // 1. Cargamos el objeto completo del usuario
    const data = await AsyncStorage.getItem("userData");
    const savedRole = await AsyncStorage.getItem("userRole");

    if (data) {
      const parsedUser = JSON.parse(data);
      setUser({
        name: parsedUser.email.split("@")[0], // Usamos el prefijo del email como nombre temporal
        email: parsedUser.email,
        password: "********",
        position: parsedUser.rol,
        area: parsedUser.area,
      });
    }
    setRole(savedRole || "");
  };

  const logout = async () => {
    // Limpiamos todo al salir
    await AsyncStorage.multiRemove(["userToken", "userRole", "userData"]);
    router.replace("/login");
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.name}>{user.email || "Usuario"}</Text>
        <Text style={styles.position}>
          {user.position} - {user.area}
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setTab("info")}>
            <Text style={tab === "info" ? styles.activeTab : styles.tab}>
              Personal Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab("options")}>
            <Text style={tab === "options" ? styles.activeTab : styles.tab}>
              Other Options
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.card}>
        {tab === "info" ? (
          <>
            <Input label="Email" value={user.email} editable={false} />
            <Input label="Role" value={user.position} editable={false} />
            <Input label="Area" value={user.area} editable={false} />

            <TouchableOpacity
              style={styles.save}
              onPress={() =>
                Alert.alert(
                  "SafeWork",
                  "Contacta a sistemas para editar datos.",
                )
              }
            >
              <Text style={styles.saveText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* LÓGICA DE VISIBILIDAD: Solo aparece si es Gerente */}
            {role === "Gerente" && (
              <Option
                title="Register New Personnel"
                onPress={() => router.push("/(tabs)/userRegister")}
                isSpecial
              />
            )}

            <Option
              title="Configuration"
              onPress={() => router.push("../configuration")}
            />
            <Option
              title="Privacy Policy"
              onPress={() => router.push("../privacy")}
            />

            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

/* 🔹 COMPONENTS */
const Input = ({ label, value, editable = true }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      editable={editable}
      style={[
        styles.input,
        !editable && { backgroundColor: "#f9f9f9", color: "#888" },
      ]}
    />
  </View>
);

const Option = ({ title, onPress, isSpecial }: any) => (
  <TouchableOpacity
    style={[
      styles.option,
      isSpecial && {
        backgroundColor: "#fff9e6",
        borderLeftWidth: 4,
        borderLeftColor: "#FFC107",
      },
    ]}
    onPress={onPress}
  >
    <Text style={[isSpecial && { fontWeight: "bold", color: "#4A6295" }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

/* 🔹 STYLES (Manteniendo tus colores) */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eee" },
  header: { backgroundColor: "#FFC107", padding: 30, alignItems: "center" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  name: { fontWeight: "bold", fontSize: 18, color: "#333" },
  position: { fontSize: 14, color: "#555", marginBottom: 15 },
  tabs: { flexDirection: "row", marginTop: 10 },
  tab: { marginHorizontal: 15, color: "#666" },
  activeTab: {
    marginHorizontal: 15,
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomColor: "#333",
    paddingBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: "bold", color: "#666", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12 },
  option: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 10,
  },
  save: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold" },
  logout: {
    backgroundColor: "#ff4444",
    marginTop: 30,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
