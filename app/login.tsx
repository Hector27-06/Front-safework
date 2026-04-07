import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "../src/hooks/useForm";
import { useLoginViewModel } from "../src/viewmodels/LoginViewModel";
import LoginView from "../src/views/LoginScreen";

export default function LoginRoute() {
  const router = useRouter();

  const formState: any = useForm({ email: "", password: "" });
  const vm = useLoginViewModel();

  return (
    <LoginView
      email={formState.form.email}
      password={formState.form.password}
      onChange={formState.onChange}
      onLogin={() =>
        vm.onLogin(formState.form.email, formState.form.password, () => {
          router.replace("/(tabs)/explore");
        })
      }
      onSignUp={() => router.push("/(tabs)/userRegister")}
      loading={vm.loading}
      error={vm.error}
    />
  );
}
