const Client = require('../models/Client');
const Package = require('../models/Package'); // Precisamos do modelo de Pacote também

// --- FUNÇÃO CORRIGIDA ---
// Criar um novo cliente
exports.createClient = async (req, res) => {
  const { name, cpf, phone } = req.body;

  // Validação básica para garantir que o nome foi enviado
  if (!name) {
    return res.status(400).json({ message: 'O nome do cliente é obrigatório.' });
  }

  try {
    // Verifica se já existe um cliente com o mesmo CPF, caso o CPF tenha sido fornecido
    if (cpf) {
      const clientExists = await Client.findOne({ cpf });
      if (clientExists) {
        return res.status(400).json({ message: 'Já existe um cliente com este CPF.' });
      }
    }

    const client = await Client.create({ name, cpf, phone });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o cliente.', error: error.message });
  }
};

// --- FUNÇÃO CORRIGIDA ---
// Obter todos os clientes
exports.getAllClients = async (req, res) => {
  try {
    // Busca todos os clientes no banco de dados, ordenando por nome
    const clients = await Client.find({}).sort({ name: 'asc' });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os clientes.', error: error.message });
  }
};

// --- SUA FUNÇÃO EXISTENTE (CORRETA) ---
// Deleta um cliente E todos os rastreios associados a ele
exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientToDelete = await Client.findById(clientId);

    if (!clientToDelete) {
      return res.status(404).json({ message: 'Cliente não encontrado para exclusão.' });
    }

    // Ação em cascata: deleta todos os pacotes associados a este cliente
    await Package.deleteMany({ client: clientId });

    // Agora, deleta o cliente
    await Client.findByIdAndDelete(clientId);

    res.status(200).json({ message: 'Cliente e todos os seus rastreios foram excluídos com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o cliente.', error: error.message });
  }
};