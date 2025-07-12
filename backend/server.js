const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const listEndpoints = require('express-list-endpoints'); // <-- Pacote de debug

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { dbName: 'rastreio_app' })
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err.message));

const app = express();

const corsOptions = {
  origin: 'https://seurastreioreactapp.netlify.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// --- ROTAS DA API ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/packageRoutes'));
app.use('/api', require('./routes/clientRoutes'));

// --- ROTA DE DEBUG ---
app.get('/debug-routes', (req, res) => {
  console.log("ROTA DE DEBUG ACESSADA");
  res.status(200).send(listEndpoints(app));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Servidor de diagnóstico rodando na porta ${PORT}`));