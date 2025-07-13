const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- MODELOS DO BANCO DE DADOS ---
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String },
  phone: { type: String },
}, { timestamps: true });
const Client = mongoose.model('Client', clientSchema);

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


// --- MIDDLEWARES ---
// A configuração de CORS foi simplificada para permitir as requisições do seu frontend.
app.use(cors()); 
app.use(express.json());

const jwtAuth = (req, res, next) => {
  next();
};


// --- ROTAS E LÓGICA DA API ---
app.get('/', (req, res) => {
  res.send('API do Sistema de Rastreio está online!');
});

// ... (O restante das suas rotas de /admin/clients, /admin/packages, etc. continua igual)
app.get('/admin/clients', jwtAuth, async (req, res) => {
  try {
    const clients = await Client.find().sort({ name: 1 });
    res.status(200).json(clients);
  } catch (err) {
    console.error('Erro ao obter clientes:', err.message);
    res.status(500).send('Erro no Servidor');
  }
});

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

app.get('/admin/packages', jwtAuth, async (req, res) => {
    try {
        const packages = await Package.find().populate('client', 'name').sort({ createdAt: -1 });
        res.json(packages);
    } catch (err) {
        res.status(500).send('Erro no Servidor');
    }
});

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

app.delete('/admin/packages/:id', jwtAuth, async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Pacote removido' });
    } catch (err) {
        res.status(500).send('Erro no Servidor');
    }
});

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
    process.exit(1); 
  });