import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Al estar aquí arriba, NO tienen barra de pestañas */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />

      {/* Al entrar aquí, RECIÉN aparece la barra de pestañas */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
