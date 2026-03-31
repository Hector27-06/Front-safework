import api from "./api";

const UserService = {
  async getUserProfile() {
    const res = await api.get("/user");
    return res.data;
  },

  async updateUserProfile(data) {
    const res = await api.put("/user", data);
    return res.data;
  },
};

export default UserService;