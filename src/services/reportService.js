import api from "../models/api";

const createReporte = async (data) => {
  return await api.post("/reportes/createReporte", data);
};

export default {
  createReporte,
};
