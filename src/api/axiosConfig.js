import axios from 'axios';

// A URL da API agora é lida de uma forma que o Vercel entende de forma consistente.
const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

// O interceptor continua o mesmo, está correto.
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