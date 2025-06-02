import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Créez une instance Axios configurable
const createAxiosInstance = () => {
  const token = localStorage.getItem('token');
  
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
};

export const ModuleService = {
  getAllmodules: async (courseId) => {
    const api = createAxiosInstance();
    const res = await api.get(`${BASE_URL}/modules/${courseId}`);
    return res.data;
  },

  createmodules: async (moduleData, courseId) => {
    const api = createAxiosInstance();
    const res = await api.post(`${BASE_URL}/modules/${courseId}`, moduleData);
    return res.data;
  },

 updateModule : async (moduleData, courseId, moduleId) => {
  

  if (moduleData.type_contenu === "text") {
    // Envoi JSON simple
    return await axios.put(
      `${BASE_URL}/modules/${courseId}/${moduleId}`,
      {
        title: moduleData.title,
        duree: parseInt(moduleData.duree, 10),
        ordre: parseInt(moduleData.ordre, 10),
        type_contenu: moduleData.type_contenu,
        contenu: moduleData.contenu, // texte
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
         withCredentials: true,
      }
    );
  } else {
    // Envoi multipart/form-data pour fichier
    const formData = new FormData();
    formData.append("title", moduleData.title);
    formData.append("duree", parseInt(moduleData.duree, 10));
    formData.append("ordre", parseInt(moduleData.ordre, 10));
    formData.append("type_contenu", moduleData.type_contenu);
    formData.append("contenu", moduleData.contenu); // fichier (File)
    formData.append("_method", "PUT");

    return await axios.post(
      `${BASE_URL}/modules/${courseId}/${moduleId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Ne PAS mettre Content-Type, axios le gère automatiquement
         "Content-Type": "multipart/form-data"
        },
         withCredentials: true,
      }
    );
  }
},



  deletemodules: async (moduleId, courseId) => {
    const api = createAxiosInstance();
    const res = await api.delete(`${BASE_URL}/modules/${courseId}${moduleId}`);
    return res.data;
  }
};