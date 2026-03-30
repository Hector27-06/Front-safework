import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthButton } from "../components/Auth/AuthButton";
import { AuthInput } from "../components/Auth/AuthInput";
import { PositionPicker } from "../components/Auth/PositionPicker";

export const RegisterView = ({
  name,
  email,
  password,
  onChange,
  onRegister,
  onBackToLogin,
  loading,
}: any) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Select your position");

  const positions = [
    { id: "1", label: "Operador", value: "Operador" },
    { id: "2", label: "Supervisor", value: "Supervisor" },
    { id: "3", label: "Gerente", value: "Gerente" },
    { id: "4", label: "Mantenimiento", value: "Mantenimiento" },
  ];

  const handleSelectPosition = (item: any) => {
    setSelectedLabel(item.label);
    onChange(item.value, "position");
    setShowPicker(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.appTitle}>SafeWork App</Text>
      <Text style={styles.subText}>
        Sign up and report efficiently and securely.
      </Text>

      <View style={styles.form}>
        <AuthInput
          label="Name"
          placeholder="Miguel Rodríguez"
          value={name}
          onChangeText={(v) => onChange(v, "name")}
        />

        <AuthInput
          label="Email"
          placeholder="miguel@gmail.com"
          value={email}
          onChangeText={(v) => onChange(v, "email")}
          autoCapitalize="none"
        />

        <PositionPicker
          label="Position"
          selectedLabel={selectedLabel}
          options={positions}
          visible={showPicker}
          onOpen={() => setShowPicker(true)}
          onClose={() => setShowPicker(false)}
          onSelect={handleSelectPosition}
        />

        <AuthInput
          label="Birthday"
          placeholder="19/12/1981"
          value=""
          onChangeText={() => {}}
        />

        <AuthInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={(v) => onChange(v, "password")}
          secureTextEntry
        />

        <AuthButton
          title="Get Started"
          onPress={onRegister}
          loading={loading}
        />
      </View>

      <TouchableOpacity onPress={onBackToLogin} style={styles.footer}>
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
  form: { width: "100%" },
  footer: { marginTop: 25, alignItems: "center" },
  link: { color: "#FF9F64", fontWeight: "bold" },
});
