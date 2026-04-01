import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRegisterViewModel } from "../../src/viewmodels/RegisterViewModel";

export default function RegisterScreen() {
  const router = useRouter();
  const { onRegister, loading, error }: any = useRegisterViewModel();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rol: "Operador",
    area: "",
  });

  const areas = ["Almacén", "Mantenimiento", "Ensamble", "Dirección General"];

  const handleRegister = () => {
    onRegister(form.email, form.password, form.rol, form.area, () => {
      alert("Empleado registrado con éxito");
      router.back();
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Nuevo Personal</Text>

      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, email: v })}
      />

      <TextInput
        placeholder="Contraseña Temporal"
        secureTextEntry
        style={styles.input}
        onChangeText={(v) => setForm({ ...form, password: v })}
      />

      <Text style={styles.label}>Área de Trabajo:</Text>
      <View style={styles.areaContainer}>
        {areas.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.areaOption, form.area === item && styles.areaActive]}
            onPress={() => setForm({ ...form, area: item })}
          >
            <Text style={{ color: form.area === item ? "#fff" : "#000" }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Rol Jerárquico:</Text>
      <View style={styles.row}>
        {["Operador", "Supervisor", "Gerente"].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.chip, form.rol === r && styles.chipActive]}
            onPress={() => setForm({ ...form, rol: r })}
          >
            <Text style={{ color: form.rol === r ? "#fff" : "#4A6295" }}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Muestra el error 404 o cualquier otro error del servidor */}
      {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>REGISTRAR EN SISTEMA</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#4A6295",
  },
  label: { fontWeight: "bold", marginBottom: 8 },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 8,
  },
  areaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  areaOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  areaActive: { backgroundColor: "#4A6295", borderColor: "#4A6295" },
  row: { flexDirection: "row", gap: 10, marginBottom: 30 },
  chip: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#4A6295",
    borderRadius: 20,
  },
  chipActive: { backgroundColor: "#4A6295" },
  button: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
});
