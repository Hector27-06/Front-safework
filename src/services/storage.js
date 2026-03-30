import * as Keychain from "react-native-keychain";

export const saveSecureToken = async (token) => {
  // El Sprint 2 usará esto para el JWT de la API
  await Keychain.setGenericPassword("session_token", token);
};

export const getSecureToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};
