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

  updateModule: async (moduleId, courseId, moduleData) => {
  const api = createAxiosInstance();

  const formData = new FormData();
  formData.append('title', moduleData.title);
  formData.append('duree', moduleData.duree);
  formData.append('ordre', moduleData.ordre);
  formData.append('type_contenu', moduleData.type_contenu);



  const res = await api.post(
    `${BASE_URL}/modules/${courseId}/${moduleId}?_method=PUT`, // Laravel method spoofing
    formData,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        // Ne PAS mettre 'Content-Type': multipart/form-data ici, axios le gère automatiquement
      },
    }
  );

  return res.data;
},
  deletemodules: async (moduleId, courseId) => {
    const api = createAxiosInstance();
    const res = await api.delete(`${BASE_URL}/modules/${courseId}${moduleId}`);
    return res.data;
  }
};