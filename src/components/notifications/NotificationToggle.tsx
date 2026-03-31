import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export const NotificationToggle = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Ionicons name="notifications" size={24} color="#333" />
        <Text style={styles.label}>Activate Notifications</Text>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: "#4A6295" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    marginVertical: 20,
  },
  leftContent: { flexDirection: "row", alignItems: "center" },
  label: { marginLeft: 10, fontSize: 16, fontWeight: "600", color: "#333" },
});
