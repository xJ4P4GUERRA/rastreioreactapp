const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- MODELOS DO BANCO DE DADOS ---
// Modelo para Clientes
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String },
  phone: { type: String },
}, { timestamps: true });
const Client = mongoose.model('Client', clientSchema);

// Modelo para Pacotes de Rastreio
const packageSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  status: { type: String, default: 'Confirmado' },
  previsaoEntrega: { type: String },
  history: [{
    status: String,
    local: String,
    date: { type: Date, default: Date.now },
  }],
}, { timestamps: true });
const Package = mongoose.model('Package', packageSchema);


// --- INICIALIZAÇÃO DA APLICAÇÃO ---
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

// Middleware de autenticação (desativado, mas mantido para não quebrar a estrutura)
const jwtAuth = (req, res, next) => {
  // A verificação foi removida, a requisição passa diretamente.
  next();
};


// --- ROTAS E LÓGICA DA API ---

// Rota para obter todos os clientes
// Acede via: GET /admin/clients
app.get('/admin/clients', jwtAuth, async (req, res) => {
  try {
    const clients = await Client.find().sort({ name: 1 });
    res.status(200).json(clients);
  } catch (err) {
    console.error('Erro ao obter clientes:', err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Rota para criar um novo cliente
// Acede via: POST /admin/clients
app.post('/admin/clients', jwtAuth, async (req, res) => {
  const { name, cpf, phone } = req.body;
  try {
    const newClient = new Client({ name, cpf, phone });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error('Erro ao criar cliente:', err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Rota para apagar um cliente
// Acede via: DELETE /admin/clients/:id
app.delete('/admin/clients/:id', jwtAuth, async (req, res) => {
  try {
    const clientId = req.params.id;
    await Package.deleteMany({ client: clientId });
    await Client.findByIdAndDelete(clientId);
    res.status(200).json({ msg: 'Cliente e pacotes associados foram removidos' });
  } catch (err) {
    console.error('Erro ao apagar cliente:', err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Rota para obter todos os pacotes
// Acede via: GET /admin/packages
app.get('/admin/packages', jwtAuth, async (req, res) => {
    try {
        const packages = await Package.find().populate('client', 'name').sort({ createdAt: -1 });
        res.json(packages);
    } catch (err) {
        res.status(500).send('Erro no Servidor');
    }
});

// Rota para criar um novo pacote
// Acede via: POST /admin/packages
app.post('/admin/packages', jwtAuth, async (req, res) => {
    const { code, previsaoEntrega, clientId } = req.body;
    try {
        const newPackage = new Package({
            code,
            previsaoEntrega,
            client: clientId,
            history: [{ status: 'Confirmado', local: 'Origem' }]
        });
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(500).send('Erro no Servidor');
    }
});

// Rota para atualizar um pacote
// Acede via: PUT /admin/packages/:code/update
app.put('/admin/packages/:code/update', jwtAuth, async (req, res) => {
    const { status, local } = req.body;
    try {
        const updatedPackage = await Package.findOneAndUpdate(
            { code: req.params.code },
            { $set: { status }, $push: { history: { status, local } } },
            { new: true }
        );
        res.json(updatedPackage);
    } catch (err) {
        res.status(500).send('Erro no Servidor');
    }
});

// Rota para apagar um pacote
// Acede via: DELETE /admin/packages/:id
app.delete('/admin/packages/:id', jwtAuth, async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Pacote removido' });
    } catch (err) {
        res.status(500).send('Erro no Servidor');
    }
});

// Rota pública para rastreio do cliente final
// Acede via: GET /client/track/:code
app.get('/client/track/:code', async (req, res) => {
    try {
        const pkg = await Package.findOne({ code: req.params.code });
        if (!pkg) {
            return res.status(404).json({ message: 'Código de rastreio não encontrado.' });
        }
        res.json(pkg);
    } catch (err) {
        res.status(500).send('Erro no Servidor');
    }
});


// --- CONEXÃO COM O BANCO DE DADOS E INICIALIZAÇÃO DO SERVIDOR ---
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
