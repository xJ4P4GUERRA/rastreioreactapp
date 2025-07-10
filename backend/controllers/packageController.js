const Package = require('../models/Package');

// Busca um pacote e inclui os dados do cliente
exports.getTrackingInfo = async (req, res) => {
  try {
    const trackingCode = req.params.trackingCode.toUpperCase();
    // .populate() busca os dados do cliente associado e os inclui na resposta
    const packageData = await Package.findOne({ code: trackingCode }).populate('client', 'name cpf phone');

    if (!packageData) {
      return res.status(404).json({ message: 'Pacote não encontrado.' });
    }
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

// Cria um pacote, agora exigindo o ID do cliente
exports.createPackage = async (req, res) => {
  try {
    // Agora esperamos também o clientId
    const { code, previsaoEntrega, clientId } = req.body;

    if (!code || !previsaoEntrega || !clientId) {
      return res.status(400).json({ message: 'Código, previsão de entrega e ID do cliente são obrigatórios.' });
    }

    const newPackage = new Package({
      code,
      previsaoEntrega,
      client: clientId, // Associa o pacote ao cliente
      history: [{ status: 'Pedido Criado', local: 'Sistema' }]
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Este código de rastreio já existe.' });
    }
    res.status(500).json({ message: 'Erro ao criar o pacote.', error: error.message });
  }
};

// Adiciona um evento ao histórico de um pacote
exports.addHistoryEvent = async (req, res) => {
  try {
    const trackingCode = req.params.code.toUpperCase();
    const { status, local } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'O campo status é obrigatório.' });
    }
    
    const updatedPackage = await Package.findOneAndUpdate(
      { code: trackingCode },
      { 
        $push: { history: { status, local } },
        $set: { status: status }
      },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Pacote não encontrado para atualização.' });
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o pacote.', error: error.message });
  }
};

// Busca todos os pacotes e inclui os dados dos clientes
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({})
      .sort({ createdAt: -1 })
      .populate('client', 'name'); // Para cada pacote, busca o nome do cliente associado

    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os pacotes.', error: error.message });
  }
};

// --- FUNÇÃO NOVA ADICIONADA ---
// ADMIN: Deleta um pacote pelo seu ID
exports.deletePackage = async (req, res) => {
  try {
    const packageToDelete = await Package.findByIdAndDelete(req.params.id);

    if (!packageToDelete) {
      return res.status(404).json({ message: 'Pacote não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Pacote excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o pacote.', error: error.message });
  }
};