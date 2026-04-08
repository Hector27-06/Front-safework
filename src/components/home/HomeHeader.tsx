import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  role?: string;
  user?: any;
  onReportPress: () => void;
  onNotifyPress: () => void;
};

export const HomeHeader = ({
  role,
  user,
  onReportPress,
  onNotifyPress,
}: Props) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔥 INFO USUARIO */}
      <View>
        <Text style={styles.greeting}>
          Hola, {user?.nombre || user?.name || "Usuario"}
        </Text>

        <Text style={styles.role}>{role || "Sin rol"}</Text>
      </View>

      {/* 🔥 BOTONES */}
      <View style={styles.actions}>
        {/* 🔔 Notificaciones */}
        <TouchableOpacity onPress={onNotifyPress}>
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>

        {/* ➕ Reporte */}
        <TouchableOpacity onPress={onReportPress}>
          <Text style={styles.icon}>➕</Text>
        </TouchableOpacity>

        {/* 👑 ADMIN */}
        {role === "Admin" && (
          <TouchableOpacity onPress={() => router.push("/manage-users")}>
            <Text style={styles.admin}>Admin</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4A6295",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    color: "#ddd",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
  },
  admin: {
    color: "#FFD700",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
