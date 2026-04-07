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

// Componentes
import { AuthHeader } from "../components/Auth/AuthHeader";
import { AuthInput } from "../components/Auth/AuthInput";
import { PositionPicker } from "../components/Auth/PositionPicker";

const ROLES = [
  { id: "1", label: "Operador", value: "Operador" },
  { id: "2", label: "Supervisor", value: "Supervisor" },
  { id: "3", label: "Gerente", value: "Gerente" },
];

const AREAS = [
  { id: "1", label: "Almacén", value: "Almacén" },
  { id: "2", label: "Mantenimiento", value: "Mantenimiento" },
  { id: "3", label: "Ensamble", value: "Ensamble" },
  { id: "4", label: "Dirección General", value: "Dirección General" },
];

export const RegisterScreen = () => {
  const router = useRouter();
  const { onRegister, loading, error } = useRegisterViewModel();

  // NUEVO: Estado para mostrar éxito visualmente en pantalla
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
  const [modalVisible, setModalVisible] = useState({ area: false, rol: false });

  const handleSuccess = () => {
    setSuccess(true); // Muestra el mensaje verde

    if (Platform.OS === "web") {
      // En Web usamos el alert nativo porque Alert.alert falla
      alert("¡Registro Exitoso!\nEl empleado ha sido creado correctamente.");
      setForm(initialState);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      // En Móvil usamos tu Alert original
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
        { cancelable: false },
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
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
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
          label="Correo Institucional"
          placeholder="ejemplo@safework.com"
          value={form.email}
          onChangeText={(v) => setForm({ ...form, email: v })}
          autoCapitalize="none"
        />

        <AuthInput
          label="Contraseña Temporal"
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

        {/* FEEDBACK VISUAL: ERROR O ÉXITO */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {success && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>¡Usuario creado con éxito!</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.mainButton, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>CONFIRMAR REGISTRO</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F4F7FA", flexGrow: 1 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A6295",
    marginBottom: 20,
    textAlign: "center",
  },
  mainButton: {
    backgroundColor: "#4A6295",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 15 },
  errorBox: {
    backgroundColor: "#FFEDED",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  errorText: { color: "#D32F2F", textAlign: "center", fontWeight: "600" },
  // NUEVO ESTILO PARA ÉXITO
  successBox: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  successText: { color: "#2E7D32", textAlign: "center", fontWeight: "600" },
});
