import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Este interceptor adiciona os cabeçalhos em CADA requisição feita pelo 'api'
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