import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);

  const onChange = (value, field) => {
    setForm({ ...form, [field]: value });
  };

  return {
    ...form, // <--- Esto permite extraer { email, password, name }
    form,
    onChange,
  };
};
