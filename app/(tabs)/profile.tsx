import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const [tab, setTab] = useState<"info" | "options">("info");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
    birthday: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user_safe_work");
    if (data) {
      setUser(JSON.parse(data));
    }
  };

  const updateUser = async () => {
    await AsyncStorage.setItem("user_safe_work", JSON.stringify(user));
    alert("Perfil actualizado");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user_safe_work");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.name}>{user.name || "Usuario"}</Text>
        <Text style={styles.position}>
          {user.position || "Sin puesto"}
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
            <Input
              label="Name"
              value={user.name}
              onChange={(v: string) =>
                setUser({ ...user, name: v })
              }
            />

            <Input
              label="Email"
              value={user.email}
              onChange={(v: string) =>
                setUser({ ...user, email: v })
              }
            />

            <Input
              label="Position"
              value={user.position}
              onChange={(v: string) =>
                setUser({ ...user, position: v })
              }
            />

            <Input
              label="Birthday"
              value={user.birthday}
              onChange={(v: string) =>
                setUser({ ...user, birthday: v })
              }
            />

            <Input
              label="Password"
              value={user.password}
              secure
              onChange={(v: string) =>
                setUser({ ...user, password: v })
              }
            />

            <TouchableOpacity style={styles.save} onPress={updateUser}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Option
              title="Configuration"
              onPress={() => router.push("/configuration")}
            />

            <Option
              title="Privacy"
              onPress={() => router.push("/privacy")}
            />

            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Text style={styles.logoutText}>LogOut</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

/* 🔹 INPUT COMPONENT */
const Input = ({
  label,
  value,
  onChange,
  secure,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  secure?: boolean;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value || ""}
      onChangeText={onChange}
      secureTextEntry={secure}
      style={styles.input}
    />
  </View>
);

/* 🔹 OPTION COMPONENT */
const Option = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

/* 🔹 STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eee" },

  header: {
    backgroundColor: "#FFC107",
    padding: 20,
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },

  name: { fontWeight: "bold", fontSize: 16 },
  position: { fontSize: 12, marginBottom: 10 },

  tabs: { flexDirection: "row" },
  tab: { marginHorizontal: 10, color: "#555" },

  activeTab: {
    marginHorizontal: 10,
    fontWeight: "bold",
    borderBottomWidth: 2,
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 15,
  },

  inputContainer: { marginBottom: 10 },
  label: { fontSize: 12 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },

  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  save: {
    backgroundColor: "#FFC107",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },

  logout: {
    backgroundColor: "red",
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});