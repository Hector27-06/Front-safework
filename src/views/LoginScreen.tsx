import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthButton } from "../components/Auth/AuthButton";
import { AuthInput } from "../components/Auth/AuthInput";

interface LoginProps {
  email: string;
  password: string;
  onChange: (value: string, field: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
  loading: boolean;
  error: string | null;
}

export const LoginView = ({
  email,
  password,
  onChange,
  onLogin,
  onSignUp,
  loading,
  error,
}: LoginProps) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.appTitle}>SafeWork App</Text>
      <Text style={styles.welcomeText}>Welcome Back!</Text>

      <View style={styles.form}>
        <AuthInput
          label="Email"
          placeholder="email@example.com"
          value={email}
          onChangeText={(text) => onChange(text, "email")}
          autoCapitalize="none"
        />
        <AuthInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={(text) => onChange(text, "password")}
          secureTextEntry
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <AuthButton title="Log In" onPress={onLogin} loading={loading} />
      </View>

      <TouchableOpacity
        onPress={onSignUp}
        style={styles.footer}
      ></TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", justifyContent: "center" },
  content: { paddingHorizontal: 30, alignItems: "center" },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A6295",
    marginBottom: 10,
  },
  welcomeText: { fontSize: 16, color: "#666", marginBottom: 30 },
  form: { width: "100%" },
  errorText: { color: "red", textAlign: "center", marginTop: 10 },
  footer: { marginTop: 40 },
  footerText: { color: "#AAA" },
  signUpText: { color: "#FF9F64", fontWeight: "bold" },
});
