import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-pi-59mq.onrender.com', // use a URL do seu backend
});

// Adiciona o token JWT automaticamente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
