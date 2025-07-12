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

// Configuração de CORS
const corsOptions = {
  origin: 'https://rastreioreactapp.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());


// --- ROTA DE TESTE DIRETA PARA O LOGIN ---
// Temporariamente colocada aqui para depuração
app.post('/api/auth/login', (req, res) => {
  // Apenas para teste, não faz login de verdade
  console.log('>>> ROTA DE LOGIN DIRETA NO SERVER.JS FOI ATINGIDA <<<');
  res.status(200).json({ success: true, token: 'teste123', message: 'Login de teste bem-sucedido!' });
});
// --- FIM DA ROTA DE TESTE ---


// As rotas antigas ficam aqui, mas a de login será interceptada primeiro pelo teste acima
// app.use('/api/auth', require('./routes/authRoutes')); // Temporariamente desabilitada para o teste
app.use('/api', require('./routes/packageRoutes'));
app.use('/api', require('./routes/clientRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));