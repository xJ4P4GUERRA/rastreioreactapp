import axios from 'axios';

const api = axios.create({
  // CORREÇÃO: Usa a variável de ambiente para apontar para o servidor de produção.
  baseURL: process.env.REACT_APP_API_URL, 
});

// O interceptor já está correto, não precisa de mudanças.
// Ele vai adicionar os tokens de autenticação em todas as requisições.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const apiKey = process.env.REACT_APP_API_KEY;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;