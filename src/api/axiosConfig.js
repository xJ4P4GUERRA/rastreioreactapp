// src/api/axiosConfig.js

import axios from 'axios';

// Cria uma instância do Axios com a URL base do seu backend.
// Esta URL vem das variáveis de ambiente da Netlify.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// A lógica que adicionava o token de autenticação foi completamente removida
// para evitar erros de build.

export default api;
