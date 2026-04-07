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
import { useReportViewModel } from "../viewmodels/ReportViewModel";

const AREAS = [
  { id: "1", label: "Almacén", value: "Almacén" },
  { id: "2", label: "Producción", value: "Producción" },
  { id: "3", label: "Mantenimiento", value: "Mantenimiento" },
  { id: "4", label: "Oficinas", value: "Oficinas" },
];

export const CreateReportView = () => {
  const vm = useReportViewModel();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo Reporte</Text>
        <Text style={styles.subtitle}>Paso {vm.currentStep} de 3</Text>
      </View>

      <View style={styles.card}>
        {/* Paso 1 */}
        {vm.currentStep === 1 && (
          <View>
            <AuthInput
              label="Título"
              placeholder="Ej: Falla eléctrica"
              value={vm.form.title}
              onChangeText={(v) => {
                vm.setError(null);
                vm.setForm({ ...vm.form, title: v });
              }}
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
                vm.setError(null);
                vm.setForm({ ...vm.form, area: item.value });
                vm.setModalVisible({ ...vm.modalVisible, area: false });
              }}
            />
          </View>
        )}

        {/* Paso 2 */}
        {vm.currentStep === 2 && (
          <View>
            <Text style={styles.label}>Nivel de Gravedad</Text>
            {["Bajo", "Medio", "Alto"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.selector,
                  vm.form.severityLevel === level && styles.selectorActive,
                ]}
                onPress={() => vm.setForm({ ...vm.form, severityLevel: level })}
              >
                <Text
                  style={
                    vm.form.severityLevel === level ? { color: "#fff" } : {}
                  }
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Paso 3 */}
        {vm.currentStep === 3 && (
          <AuthInput
            label="Descripción"
            placeholder="Describe el problema..."
            value={vm.form.description}
            onChangeText={(v) => {
              vm.setError(null);
              vm.setForm({ ...vm.form, description: v });
            }}
          />
        )}

        {vm.error && <Text style={styles.errorText}>{vm.error}</Text>}

        <View style={styles.footer}>
          {vm.currentStep > 1 && (
            <TouchableOpacity style={styles.btnBack} onPress={vm.prevStep}>
              <Text>Atrás</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, { flex: vm.currentStep === 1 ? 1 : 2 }]}
            onPress={() =>
              vm.currentStep === 3
                ? vm.onSendReport(() =>
                    Alert.alert("Éxito", "Reporte enviado correctamente"),
                  )
                : vm.nextStep()
            }
            disabled={vm.loading}
          >
            {vm.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>
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
  container: { flexGrow: 1, backgroundColor: "#F5F5F5", paddingBottom: 20 },
  header: {
    backgroundColor: "#F17F18",
    paddingVertical: 40,
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#fff", opacity: 0.8 },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  label: { fontWeight: "bold", marginBottom: 10 },
  selector: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectorActive: { backgroundColor: "#4A6295", borderColor: "#4A6295" },
  footer: { flexDirection: "row", marginTop: 20 },
  btnBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#4A6295",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  errorText: { color: "red", marginTop: 15, textAlign: "center" },
});
