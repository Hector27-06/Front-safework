export const validateEmail = (email) => {
  // Regex para Gmail específico
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Tu regex actual: mínimo 8 caracteres, una letra y un número
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};
