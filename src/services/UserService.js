import api from "../models/api";

export const userService = {
  getAllUsers: async () => {
    const response = await api.get("/auth/getAllUsers");
    return response;
  },

  deleteUser: async (id) => {
    return await api.delete(`/auth/deleteUser/${id}`);
  },
};
