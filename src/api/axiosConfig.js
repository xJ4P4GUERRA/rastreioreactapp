import axios from 'axios';

const api = axios.create({
  // VERSÃO FINAL E CORRETA: Apenas a URL base, SEM /api no final
  baseURL: process.env.REACT_APP_API_URL,
});

// O interceptor adiciona os cabeçalhos em CADA requisição
api.interceptors.request.use(
  (config) => {
    // Pega o token de login do localStorage
    const token = localStorage.getItem('authToken');
    
    // Pega a chave de API fixa das variáveis de ambiente do React
    const apiKey = process.env.REACT_APP_API_KEY;

    // Adiciona o cabeçalho do Token de Login, se ele existir
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Adiciona o cabeçalho da Chave de API, se ela existir
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }

    return config; // Retorna a configuração com os novos cabeçalhos
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;