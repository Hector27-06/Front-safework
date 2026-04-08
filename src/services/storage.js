import * as Keychain from "react-native-keychain";

export const saveSecureToken = async (token) => {
  await Keychain.setGenericPassword("session_token", token);
};

export const getSecureToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};
