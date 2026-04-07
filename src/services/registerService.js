import api from "./api";

export const register = async (userData) => {
  const res = await api.post("/auth/createUser", userData);
  return res.data;
};
