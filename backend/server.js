const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Conexão com o Banco de Dados
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000, 
  dbName: 'rastreioDB'
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Falha ao conectar ao MongoDB:', err));


const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// Rota de Teste
app.get('/', (req, res) => {
  res.send('API do Site de Rastreio está funcionando!');
});

// Usando as rotas de autenticação (login/registro)
app.use('/api/auth', require('./routes/authRoutes'));

// Usando as rotas de pacotes
app.use('/api', require('./routes/packageRoutes'));

// Usando as rotas de clientes
app.use('/api', require('./routes/clientRoutes'));


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));