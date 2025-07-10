const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conexão com o Banco de Dados
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  dbName: 'rastreio_app' // Verifique se este é o nome correto do seu DB no Atlas
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err.message));


const app = express();

// --- CONFIGURAÇÃO DE CORS CORRIGIDA ---
// Lista de URLs que têm permissão para acessar sua API
const allowedOrigins = [
  'http://localhost:3000', // Para seu ambiente de desenvolvimento
  'https://rastreioreactapp.vercel.app' // Sua URL de produção na Vercel
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (como apps mobile ou Postman) ou se a origem estiver na lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido por CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// --- ROTAS DA API ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/packageRoutes'));
app.use('/api', require('./routes/clientRoutes'));


// --- SERVIR O FRONTEND (se um dia você unir tudo) ---
// Esta parte é para um cenário diferente, mas não tem problema mantê-la.
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build'); // Caminho para a build do frontend
  
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    if (!req.originalUrl.startsWith('/api')) {
      res.sendFile(path.join(buildPath, 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));