import api from "../models/api";

export const userService = {
  getUsers: async () => {
    const res = await api.get("/auth/users");
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await api.delete(`/auth/users/${id}`);
    return res.data;
  },
};
