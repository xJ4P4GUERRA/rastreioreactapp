const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// --- ROTA DE REGISTO ---
// Rota: POST /admin/register
// Descrição: Cria um novo utilizador administrador.
router.post('/register', authController.register);


// --- ROTA DE LOGIN ---
// Rota: POST /admin/login
// Descrição: Autentica um utilizador e retorna um token.
router.post('/login', authController.login);


module.exports = router;
