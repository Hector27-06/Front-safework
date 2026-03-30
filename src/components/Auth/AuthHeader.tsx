import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.appTitle}>SafeWork App</Text>
    <Text style={styles.welcomeText}>{title}</Text>
    <Text style={styles.subText}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 30 },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A6295",
    marginBottom: 10,
  },
  welcomeText: { fontSize: 18, color: "#333", fontWeight: "600" },
  subText: { fontSize: 14, color: "#888", textAlign: "center", marginTop: 5 },
});
