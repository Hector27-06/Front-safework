import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AuthFooterProps {
  message: string;
  linkText: string;
  onPress: () => void;
}

export const AuthFooter = ({ message, linkText, onPress }: AuthFooterProps) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>{message} </Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.signUpText}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: { flexDirection: "row", marginTop: 30, justifyContent: "center" },
  footerText: { color: "#AAA" },
  signUpText: { color: "#FF9F64", fontWeight: "bold" },
});
