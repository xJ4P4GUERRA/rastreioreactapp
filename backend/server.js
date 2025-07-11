const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conexão com o Banco de Dados
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  dbName: 'rastreio_app' 
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err.message));

const app = express();

// Configuração de CORS
const allowedOrigins = [
  'https://rastreioreactapp.vercel.app'
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
app.use(cors(corsOptions));

app.use(express.json());

// --- ROTA DE TESTE PÚBLICA ---
app.get('/test-mobile', (req, res) => {
  console.log('>>> REQUISIÇÃO DE TESTE DO /test-mobile RECEBIDA! <<<');
  res.status(200).json({ message: 'Conexão com o servidor OK!' });
});
// --- FIM DA ROTA DE TESTE ---

// --- ROTAS DA API ---
// ATENÇÃO: A rota de teste tem que vir ANTES desta linha
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/packageRoutes'));
app.use('/api',require('./routes/clientRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));