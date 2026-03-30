import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const SignUpView = ({ onRegister, onBack, loading }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>SafeWork App</Text>
      <Text style={styles.subText}>
        Sign up and unlock new opportunities...
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Miguel Rodríguez" />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="miguel@gmail.com"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Position</Text>
        <TextInput style={styles.input} placeholder="Machinery Technician" />

        <Text style={styles.label}>Birthday</Text>
        <View style={styles.inputIcon}>
          <TextInput style={{ flex: 1 }} placeholder="19/12/1981" />
          <Ionicons name="calendar-outline" size={20} color="#666" />
        </View>

        <TouchableOpacity style={styles.btn} onPress={onRegister}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onBack} style={styles.footer}>
        <Text>
          Already have an account? <Text style={styles.link}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A6295",
    textAlign: "center",
  },
  subText: { textAlign: "center", color: "#666", marginVertical: 15 },
  label: { fontWeight: "bold", marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#DDD", borderRadius: 8, padding: 12 },
  inputIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  btn: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
  footer: { marginTop: 20, alignItems: "center" },
  link: { color: "#FF9F64", fontWeight: "bold" },
});
