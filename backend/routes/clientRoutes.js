const express = require('express');
const router = express.Router();
const { createClient, getAllClients, deleteClient } = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

// Rotas para /api/admin/clients
router.route('/admin/clients')
  .post(protect, createClient)
  .get(protect, getAllClients);

// Nova rota para deletar um cliente específico pelo ID
router.route('/admin/clients/:id')
  .delete(protect, deleteClient);

module.exports = router;