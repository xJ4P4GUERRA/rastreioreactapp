const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- IMPORTAÇÃO DAS ROTAS ---
// Garante que todos os ficheiros de rotas são importados
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const packageRoutes = require('./routes/packageRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// --- CONFIGURAÇÃO DO CORS ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://seurastreioexactapp.netlify.app'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

// --- MIDDLEWARES ---
app.use(cors(corsOptions));
app.use(express.json());

// --- ROTAS DA API ---
// Define os prefixos para cada conjunto de rotas
app.use('/admin', authRoutes);
app.use('/admin', clientRoutes); // Garante que as rotas de cliente são montadas
app.use('/admin', packageRoutes);
app.use('/client', packageRoutes); // Rota pública para rastreio

// --- CONEXÃO COM O BANCO DE DADOS ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso.');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor a correr na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Rota raiz para verificação
app.get('/', (req, res) => {
  res.send('API do Sistema de Rastreio está online!');
});
