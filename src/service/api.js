import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;