import { useState } from "react";

export const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const onChange = (value, field) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return {
    form,
    onChange,
  };
};
