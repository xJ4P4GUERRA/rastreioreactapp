const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const jwtAuth = require('../middleware/authMiddleware'); // O middleware que desativámos

// Rota para obter todos os clientes
// Acede via: GET /admin/clients
router.get('/clients', jwtAuth, clientController.getAllClients);

// Rota para criar um novo cliente
// Acede via: POST /admin/clients
router.post('/clients', jwtAuth, clientController.createClient);

// Rota para apagar um cliente
// Acede via: DELETE /admin/clients/:id
router.delete('/clients/:id', jwtAuth, clientController.deleteClient);

module.exports = router;
