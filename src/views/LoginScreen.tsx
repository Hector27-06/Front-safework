import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
}: LoginProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appTitle}>SafeWork App</Text>
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        {/* FORMULARIO */}
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

          {/* ERROR */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* BOTÓN LOGIN */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={() => {
              console.log("BOTON PRESIONADO"); // 👈 DEBUG
              onLogin();
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* REGISTRO */}
        <TouchableOpacity onPress={onSignUp} style={styles.footer}>
          <Text style={styles.footerText}>
            ¿No tienes cuenta? <Text style={styles.signUpText}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A6295",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  form: {
    width: "100%",
  },
  button: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    color: "#666",
  },
  signUpText: {
    color: "#4A6295",
    fontWeight: "bold",
  },
});
