// src/services/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/v1', // usa proxy configurado no Vite para redirecionar ao backend
});

// Interceptador para incluir o token JWT automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ou pode buscar de um store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
