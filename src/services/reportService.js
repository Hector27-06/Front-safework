import api from "../models/api";

const createReporte = async (data) => {
  return await api.post("/reportes/createReporte", data);
};

const getReportes = async () => {
  return await api.get("/reportes/getAllReports");
};

export default {
  createReporte,
  getReportes,
};
