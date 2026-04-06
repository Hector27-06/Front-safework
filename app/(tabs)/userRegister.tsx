import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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
  const roles = ["Operador", "Supervisor", "Gerente"];

  const handleRegister = () => {
    if (!form.email || !form.password || !form.area) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, completa todos los campos antes de continuar.",
      );
      return;
    }

    onRegister(form.email, form.password, form.rol, form.area, () => {
      Alert.alert("Éxito", "Empleado registrado correctamente en el sistema.");
      router.back();
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con estilo SafeWork */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>SafeWork</Text>
          <Text style={styles.subTitle}>Gestión de Personal</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Registrar Nuevo Miembro</Text>

          {/* Input de Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Institucional</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="ejemplo@safework.com"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(v) => setForm({ ...form, email: v })}
              />
            </View>
          </View>

          {/* Input de Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña Temporal</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="••••••••"
                secureTextEntry
                style={styles.input}
                onChangeText={(v) => setForm({ ...form, password: v })}
              />
            </View>
          </View>

          {/* Selección de Área */}
          <Text style={styles.label}>Área de Trabajo</Text>
          <View style={styles.areaContainer}>
            {areas.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.areaOption,
                  form.area === item && styles.areaActive,
                ]}
                onPress={() => setForm({ ...form, area: item })}
              >
                <Text
                  style={[
                    styles.areaText,
                    form.area === item && styles.textWhite,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Selección de Rol */}
          <Text style={styles.label}>Rol Jerárquico</Text>
          <View style={styles.row}>
            {roles.map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.chip, form.rol === r && styles.chipActive]}
                onPress={() => setForm({ ...form, rol: r })}
              >
                <Ionicons
                  name={
                    r === "Gerente"
                      ? "shield-checkmark"
                      : r === "Supervisor"
                        ? "eye"
                        : "construct"
                  }
                  size={16}
                  color={form.rol === r ? "#fff" : "#4A6295"}
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={[styles.chipText, form.rol === r && styles.textWhite]}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={18} color="#E74C3C" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.8 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>CONFIRMAR REGISTRO</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F7FA", // Fondo gris azulado muy suave
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#4A6295",
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "700",
    marginBottom: 10,
    color: "#34495E",
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  areaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 25,
  },
  areaOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  areaActive: {
    backgroundColor: "#4A6295",
    borderColor: "#4A6295",
  },
  areaText: {
    color: "#7F8C8D",
    fontWeight: "600",
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 30,
  },
  chip: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: "#4A6295",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  chipActive: {
    backgroundColor: "#4A6295",
  },
  chipText: {
    color: "#4A6295",
    fontWeight: "bold",
    fontSize: 12,
  },
  textWhite: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#4A6295",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#4A6295",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDEDEC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  errorText: {
    color: "#E74C3C",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 13,
  },
});
