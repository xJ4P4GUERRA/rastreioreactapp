const express = require('express');
const router = express.Router();
const { 
  registerAdmin, 
  loginAdmin,
  getAllAdmins,  // <-- Importa as novas funções
  deleteAdmin 
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware'); // O protetor antigo de API Key
const { protectWithToken } = require('../middleware/jwtAuth'); // O novo protetor de Token

// Rota para fazer login (pública)
router.post('/login', loginAdmin);

// Rota para registrar um novo admin.
// Continua protegida pela API Key principal, para que só o "super admin" crie contas.
router.post('/register', protect, registerAdmin);

// Rota para listar todos os usuários. Protegida por Token.
router.get('/users', protectWithToken, getAllAdmins);

// Rota para deletar um usuário. Protegida por Token.
router.delete('/users/:id', protectWithToken, deleteAdmin);


module.exports = router;