const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { dbName: 'rastreio_app' })
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err.message));

const app = express();

const corsOptions = {
  origin: 'https://rastreioreactapp.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/packageRoutes'));
app.use('/api', require('./routes/clientRoutes'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Servidor na versão final rodando na porta ${PORT}`));