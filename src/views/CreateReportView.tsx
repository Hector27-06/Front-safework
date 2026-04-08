import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthInput } from "../components/Auth/AuthInput";
import { PositionPicker } from "../components/Auth/PositionPicker";
import { AREAS } from "../components/constants/areas";
import { useReportViewModel } from "../viewmodels/ReportViewModel";

export const CreateReportView = () => {
  const vm = useReportViewModel();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo Reporte</Text>
        <Text style={styles.subtitle}>Paso {vm.currentStep} de 3</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* PASO 1 */}
        {vm.currentStep === 1 && (
          <>
            <AuthInput
              label="Título"
              placeholder="Ej: Falla eléctrica"
              value={vm.form.title}
              onChangeText={(v) => vm.setForm({ ...vm.form, title: v })}
            />

            <PositionPicker
              label="Área"
              selectedLabel={vm.form.area || "Seleccionar área"}
              options={AREAS}
              visible={vm.modalVisible.area}
              onOpen={() =>
                vm.setModalVisible({ ...vm.modalVisible, area: true })
              }
              onClose={() =>
                vm.setModalVisible({ ...vm.modalVisible, area: false })
              }
              onSelect={(item) => {
                vm.setForm({ ...vm.form, area: item.value });
                vm.setModalVisible({ ...vm.modalVisible, area: false });
              }}
            />
          </>
        )}

        {/* PASO 2 */}
        {vm.currentStep === 2 && (
          <>
            <Text style={styles.label}>Nivel de gravedad</Text>

            <View style={styles.levelContainer}>
              {["Bajo", "Medio", "Alto"].map((level) => {
                const isSelected = vm.form.severityLevel === level;

                return (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelButton,
                      isSelected && styles.levelSelected,
                    ]}
                    onPress={() =>
                      vm.setForm({
                        ...vm.form,
                        severityLevel: level,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.levelText,
                        isSelected && styles.levelTextSelected,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* PASO 3 */}
        {vm.currentStep === 3 && (
          <AuthInput
            label="Descripción"
            placeholder="Describe el problema..."
            value={vm.form.description}
            onChangeText={(v) => vm.setForm({ ...vm.form, description: v })}
          />
        )}

        {/* ERROR */}
        {vm.error && <Text style={styles.errorText}>{vm.error}</Text>}

        {/* FOOTER */}
        <View style={styles.footer}>
          {vm.currentStep > 1 && (
            <TouchableOpacity style={styles.backBtn} onPress={vm.prevStep}>
              <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (vm.currentStep === 3) {
                const ok = await vm.createReport();

                if (ok) {
                  Alert.alert("Éxito", "Reporte creado");
                  router.push("/(tabs)/history");
                }
              } else {
                vm.nextStep();
              }
            }}
          >
            {vm.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {vm.currentStep === 3 ? "ENVIAR" : "SIGUIENTE"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#4A6295",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#ddd",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    minHeight: 500,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  levelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  levelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },

  levelSelected: {
    backgroundColor: "#4A6295",
    borderColor: "#4A6295",
  },

  levelText: {
    color: "#333",
  },

  levelTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  errorText: {
    color: "red",
    marginTop: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  backBtn: {
    padding: 10,
  },

  backText: {
    color: "#4A6295",
    fontWeight: "bold",
  },

  button: {
    flex: 1,
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
