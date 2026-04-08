import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRegisterViewModel } from "../viewmodels/RegisterViewModel";

// 🔥 IMPORTAMOS AREAS
import { AREAS } from "../components/constants/areas";

import { AuthHeader } from "../components/Auth/AuthHeader";
import { AuthInput } from "../components/Auth/AuthInput";
import { PositionPicker } from "../components/Auth/PositionPicker";

const ROLES = [
  { id: "1", label: "Operador", value: "Operador" },
  { id: "2", label: "Supervisor", value: "Supervisor" },
  { id: "3", label: "Gerente", value: "Gerente" },
];

export const RegisterScreen = () => {
  const router = useRouter();
  const { onRegister, loading, error } = useRegisterViewModel();

  const [success, setSuccess] = useState(false);

  const initialState = {
    name: "",
    email: "",
    password: "",
    area: "",
    rol: "",
    birthday: "2000-01-01",
  };

  const [form, setForm] = useState(initialState);
  const [modalVisible, setModalVisible] = useState({
    area: false,
    rol: false,
  });

  const handleSuccess = () => {
    setSuccess(true);

    if (Platform.OS === "web") {
      alert("¡Registro Exitoso!\nEl empleado ha sido creado correctamente.");
      setForm(initialState);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      Alert.alert(
        "¡Registro Exitoso!",
        "El empleado ha sido creado correctamente en SafeWork.",
        [
          {
            text: "Entendido",
            onPress: () => {
              setForm(initialState);
              setSuccess(false);
            },
          },
        ],
      );
    }
  };

  const handleRegister = () => {
    setSuccess(false);

    if (
      !form.email ||
      !form.password ||
      !form.name ||
      !form.area ||
      !form.rol
    ) {
      Alert.alert(
        "Campos incompletos",
        "Por favor completa toda la información.",
      );
      return;
    }

    onRegister(form, handleSuccess);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AuthHeader
        title="Nuevo Registro"
        subtitle="Gestión de Personal SafeWork"
      />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Datos del Empleado</Text>

        <AuthInput
          label="Nombre Completo"
          placeholder="Ej. Pedro Picapiedra"
          value={form.name}
          onChangeText={(v) => setForm({ ...form, name: v })}
        />

        <AuthInput
          label="Correo"
          placeholder="correo@safework.com"
          value={form.email}
          onChangeText={(v) => setForm({ ...form, email: v })}
        />

        <AuthInput
          label="Contraseña"
          placeholder="••••••••"
          value={form.password}
          onChangeText={(v) => setForm({ ...form, password: v })}
          secureTextEntry
        />

        <PositionPicker
          label="Área"
          selectedLabel={form.area || "Seleccionar área"}
          options={AREAS}
          visible={modalVisible.area}
          onOpen={() => setModalVisible({ ...modalVisible, area: true })}
          onClose={() => setModalVisible({ ...modalVisible, area: false })}
          onSelect={(item) => {
            setForm({ ...form, area: item.value });
            setModalVisible({ ...modalVisible, area: false });
          }}
        />

        <PositionPicker
          label="Rol"
          selectedLabel={form.rol || "Seleccionar rol"}
          options={ROLES}
          visible={modalVisible.rol}
          onOpen={() => setModalVisible({ ...modalVisible, rol: true })}
          onClose={() => setModalVisible({ ...modalVisible, rol: false })}
          onSelect={(item) => {
            setForm({ ...form, rol: item.value });
            setModalVisible({ ...modalVisible, rol: false });
          }}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
        {success && <Text style={styles.successText}>Usuario creado ✔</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>REGISTRAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F4F7FA", flexGrow: 1 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  sectionTitle: { fontWeight: "bold", marginBottom: 15 },
  button: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "red", textAlign: "center" },
  successText: { color: "green", textAlign: "center" },
});
