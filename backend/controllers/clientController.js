const Client = require('../models/Client');
const Package = require('../models/Package');

// Controlador para obter todos os clientes
exports.getAllClients = async (req, res) => {
  try {
    // Procura todos os clientes e ordena-os por nome
    const clients = await Client.find().sort({ name: 1 });
    res.status(200).json(clients);
  } catch (err) {
    console.error('Erro ao obter clientes:', err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// Controlador para criar um novo cliente
exports.createClient = async (req, res) => {
  const { name, cpf, phone } = req.body;
  try {
    const newClient = new Client({ name, cpf, phone });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error('Erro ao criar cliente:', err.message);
    res.status(500).send('Erro no Servidor');
  }
};

// Controlador para apagar um cliente
exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ msg: 'Cliente não encontrado' });
    }

    // Apaga todos os pacotes associados a este cliente
    await Package.deleteMany({ client: clientId });
    
    // Apaga o próprio cliente
    await Client.findByIdAndDelete(clientId);

    res.status(200).json({ msg: 'Cliente e pacotes associados foram removidos com sucesso' });
  } catch (err) {
    console.error('Erro ao apagar cliente:', err.message);
    res.status(500).send('Erro no Servidor');
  }
};
