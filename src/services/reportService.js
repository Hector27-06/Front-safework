import api from "./api";

export const reportService = {
  getAllReports: async () => {
    const response = await api.get("/reportes/getAllReports");
    return response.data; // Devuelve un array de reportes
  },

  createReporte: async (reportData) => {
    const response = await api.post("/reportes/createReporte", reportData);
    return response.data; // Devuelve el reporte creado
  },
};
