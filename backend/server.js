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

// --- MUDANÇA AQUI: Deixando o CORS totalmente aberto para teste ---
app.use(cors()); 

app.use(express.json());

// --- ROTAS DA API ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/packageRoutes'));
app.use('/api',require('./routes/clientRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));