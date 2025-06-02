import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

const axiosConfig = {
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  },
};

export const apprentissageService = {
  getMesCours: async (userId) => {
    const res = await axios.get(`${BASE_URL}/apprentissages/${userId}`, axiosConfig);
    console.log(res.data);
    return res.data;
  },

  getProgressionCours: async (coursId) => {
    const res = await axios.get(`${BASE_URL}/apprentissage/${coursId}`, axiosConfig);
    return res.data;
  },

  marquerModule: async (moduleId) => {
    const res = await axios.patch(`${BASE_URL}/apprentissage/module/${moduleId}`, {}, axiosConfig);
    return res.data;
  },

  telechargerCertificat: async (coursId) => {
    const res = await axios.get(`${BASE_URL}/certificat/${coursId}`, {
      ...axiosConfig,
      responseType: "blob", // nécessaire pour gérer les fichiers PDF
    });
    return res.data;
  },
};
