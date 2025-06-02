import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token'); 

const axiosConfig = {
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
   
    
    Accept: 'application/json',
    
  },
};

export const courseService = {
  getAllCourses: async () => {
    const res = await axios.get(`${BASE_URL}/cours`, axiosConfig);
    return res.data;
  },


  createCourse: async (courseData) => {
    const res = await axios.post(`${BASE_URL}/cours`, courseData, axiosConfig);
     console.log("Données envoyées au backend:", courseData);
    return res.data;
  }, 

  updateCourse: async (id, courseData) => {
    if (!id) throw new Error("Course ID is required");
    const res = await axios.put(`${BASE_URL}/cours/${id}`, courseData, {
  headers: {
   Authorization: token ? `Bearer ${token}` : '',
     'Content-Type': 'application/json',
Accept: 'application/json',
     
  },
   withCredentials: true,
});
    return res.data;
  },
  updateImageCourse: async (id, courseData) => {
    if (!id) throw new Error("Course ID is required");
     courseData.append('_method', 'PUT');
    const res = await axios.post(`${BASE_URL}/coursImage/${id}`, courseData, {
  headers: {
   "Authorization": `Bearer ${localStorage.getItem('token')}`,
    

     
  },
   withCredentials: true,
});
    return res.data;
  },

  deleteCourse: async (id) => {
    if (!id) throw new Error("Course ID is required");
    const res = await axios.delete(`${BASE_URL}/cours/${id}`, axiosConfig)
    return res.data;
  },

  ArchiverCourse: async (id) => {
    if (!id) throw new Error("Course ID is required");
    const res = await axios.delete(`${BASE_URL}/cours/archiver/${id}`, axiosConfig);
    return res.data;
  },

  DesarchiverCourse: async (id) => {
    
    const res = await axios.post(`${BASE_URL}/cours/restore/${id}`,null, axiosConfig);
    return res.data;
  },

  ListArchivCourse: async () => {
    const res = await axios.get(`${BASE_URL}/cours/trash`, axiosConfig);
    return res.data;
  },
  
   publishCourse : async (id) => {
  const response = await axios.put(`/api/courses/publish/${id}`);
  return response.data;
},

};