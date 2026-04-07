import api from "./api";

export const getAllUsers = () => api.get("/auth/users");

export const deleteUser = (id) => api.delete(`/auth/users/${id}`);
