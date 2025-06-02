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



 

 

export const UserService = {
  getAllUsers: async () => {
    const res = await axios.get(`${BASE_URL}/users`, axiosConfig);
    return res.data;
  },
   createCategory: async (courseData) => {
    const res = await axios.post(`${BASE_URL}/users`, courseData, axiosConfig);
    return res.data;
  }, 

  
  deleteCourse: async (id) => {
    const res = await axios.delete(`${BASE_URL}/users/${id}`, axiosConfig);
    return res.data;
  },
};