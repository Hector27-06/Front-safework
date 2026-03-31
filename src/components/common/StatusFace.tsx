import React from "react";
import { StyleSheet, View } from "react-native";
// Importamos librerías de iconos que vienen con Expo
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

// Definimos los tipos de caras para que coincidan con Figma
export type FaceType = "neutral" | "sad" | "happy";

interface StatusFaceProps {
  type: FaceType;
  size?: number; // Opcional, por defecto será 45 para las tarjetas
}

export const StatusFace = ({ type, size = 45 }: StatusFaceProps) => {
  // Función para obtener el icono y los colores exactos de Figma
  const getFaceData = () => {
    switch (type) {
      case "neutral":
        return {
          lib: FontAwesome5, // FontAwesome5 para la cara de 'meh'
          name: "meh",
          iconColor: "#FF9500", // Naranja intenso
          bgColor: "#FFF4E5", // Naranja claro de fondo
        };
      case "sad":
        return {
          lib: Ionicons, // Ionicons para la cara triste 'sad'
          name: "sad-outline",
          iconColor: "#FF3B30", // Rojo intenso
          bgColor: "#FFE5E5", // Rojo claro de fondo
        };
      case "happy":
        return {
          lib: FontAwesome5, // FontAwesome5 para la cara feliz 'smile'
          name: "smile",
          iconColor: "#34C759", // Verde intenso
          bgColor: "#E5F9E0", // Verde claro de fondo
        };
      default: // Fallback neutral
        return {
          lib: FontAwesome5,
          name: "meh",
          iconColor: "#888",
          bgColor: "#F0F0F0",
        };
    }
  };

  const { lib: IconLibrary, name, iconColor, bgColor } = getFaceData();

  return (
    // Estilizamos el contenedor con el fondo claro y el borde redondeado
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          width: size,
          height: size,
          borderRadius: 12,
        },
      ]}
    >
      {/* Renderizamos el icono con el color intenso */}
      <IconLibrary name={name} size={size * 0.6} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
