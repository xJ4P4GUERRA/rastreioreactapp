const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa o pacote CORS
require('dotenv').config();

// Importa suas rotas
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const packageRoutes = require('./routes/packageRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// --- CONFIGURAÇÃO DO CORS ---
// Lista de origens (domínios) que têm permissão para acessar seu backend.
const allowedOrigins = [
  'http://localhost:3000', // Para desenvolvimento local
  'https://seurastreioexactapp.netlify.app' // Seu site em produção
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (ex: Postman, apps mobile) ou se a origem estiver na lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // Para compatibilidade com navegadores mais antigos
};

// --- MIDDLEWARES ---
app.use(cors(corsOptions)); // Habilita o CORS com as opções definidas
app.use(express.json());   // Permite que o servidor entenda JSON

// --- ROTAS DA API ---
// Define os prefixos para cada conjunto de rotas
app.use('/admin', authRoutes); // Rotas de autenticação e gerenciamento de admin
app.use('/admin', clientRoutes); // Rotas de gerenciamento de clientes
app.use('/admin', packageRoutes); // Rotas de gerenciamento de pacotes

// Rota pública para o cliente final rastrear
// Note que ela tem um prefixo diferente para não conflitar com as rotas de admin
app.use('/client', packageRoutes); 

// Conexão com o Banco de Dados (MongoDB)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso.');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Rota raiz para verificar se o servidor está online
app.get('/', (req, res) => {
  res.send('API do Sistema de Rastreio está online!');
});
