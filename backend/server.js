const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

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

// --- CONFIGURAÇÃO DE CORS ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://rastreioreactapp.vercel.app' // Sua URL de produção na Vercel
];

const corsOptions = {
  origin: function (origin, callback) {
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


// A PORTA ONDE O SERVIDOR VAI RODAR
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));