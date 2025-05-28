import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token'); 

const axiosConfig = {
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};



 

 
//catégories
export const FormateurService = {
  getAllFormateurs: async () => {
    const res = await axios.get(`${BASE_URL}/formateurs`, axiosConfig);
    return res.data;
  },
   createFormateurs: async (FormateurData) => {
    const res = await axios.post(`${BASE_URL}/formateurs`, FormateurData, axiosConfig);
    return res.data;
  }, 

  updateFormateurs: async (id, FormateurData) => {
    const res = await axios.put(`${BASE_URL}/formateurs/${id}`, FormateurData, axiosConfig);
    return res.data;
  },

  deleteFormateurs: async (id) => {
    const res = await axios.delete(`${BASE_URL}/formateurs/${id}`, axiosConfig);
    return res.data;
  },
};