const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  local: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PackageSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  // --- NOVO CAMPO PARA ASSOCIAR O CLIENTE ---
  client: {
    type: mongoose.Schema.Types.ObjectId, // Armazena o ID do cliente
    ref: 'Client', // Refere-se ao modelo 'Client' que criamos
    required: true,
  },
  status: {
    type: String,
    default: 'Confirmado',
  },
  previsaoEntrega: {
    type: String,
    required: true,
  },
  history: [HistorySchema],
  createdAt: { // Adicionado para ordenação
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', PackageSchema);