const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Carrega as variáveis de ambiente
dotenv.config();

// Conexão com o Banco de Dados
mongoose.connect(process.env.MONGO_URI, { dbName: 'rastreio_app' })
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err.message));

const app = express();

// Configuração de CORS correta
const corsOptions = {
  origin: 'https://rastreioreactapp.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// --- ROTAS DA API ---
// Todas as rotas são carregadas normalmente
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/packageRoutes'));
app.use('/api', require('./routes/clientRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor na versão final rodando na porta ${PORT}`));