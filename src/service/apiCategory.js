import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token'); // ou où tu stockes ton token

const axiosConfig = {
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};



 

 
//catégories
export const categorieService = {
  getAllCategories: async () => {
    const res = await axios.get(`${BASE_URL}/categories`, axiosConfig);
    return res.data;
  },
   createCategory: async (courseData) => {
    const res = await axios.post(`${BASE_URL}/categories`, courseData, axiosConfig);
    return res.data;
  }, 

  updateCategory: async (id, courseData) => {
    const res = await axios.put(`${BASE_URL}/categories/${id}`, courseData, axiosConfig);
    return res.data;
  },

  deleteCourse: async (id) => {
    const res = await axios.delete(`${BASE_URL}/categories/${id}`, axiosConfig);
    return res.data;
  },
};