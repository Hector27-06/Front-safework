import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "../src/hooks/useForm";
import { useLoginViewModel } from "../src/viewmodels/LoginViewModel";
import { LoginView } from "../src/views/LoginScreen";

export default function LoginRoute() {
  const router = useRouter();
  const formState: any = useForm({ email: "", password: "" });
  const vm: any = useLoginViewModel();

  return (
    <LoginView
      email={formState.email}
      password={formState.password}
      onChange={formState.onChange}
      onLogin={() =>
        vm.onLogin(formState.email, formState.password, () => {
          router.replace("/(tabs)/explore");
        })
      }
      onSignUp={() => router.push("/register")} // RUTA HACIA register.tsx
      loading={vm.loading}
      error={vm.error}
    />
  );
}
