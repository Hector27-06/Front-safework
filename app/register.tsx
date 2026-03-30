import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "../src/hooks/useForm";
import { useRegisterViewModel } from "../src/viewmodels/RegisterViewModel";
import { RegisterView } from "../src/views/RegisterScreen";

export default function RegisterRoute() {
  const router = useRouter();
  const form: any = useForm({ name: "", email: "", password: "" });
  const vm: any = useRegisterViewModel();

  return (
    <RegisterView
      name={form.name}
      email={form.email}
      password={form.password}
      onChange={form.onChange}
      onRegister={() => vm.onRegister(form.name, form.email, form.password)}
      onBackToLogin={() => router.back()} // REGRESA AL LOGIN
      loading={vm.loading}
    />
  );
}
