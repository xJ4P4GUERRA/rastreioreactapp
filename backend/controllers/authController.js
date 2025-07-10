const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrar um novo Admin
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.create({ username, password });
    res.status(201).json({ success: true, message: `Admin ${admin.username} criado com sucesso.` });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Fazer Login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Por favor, forneça usuário e senha.' });
  }

  try {
    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar todos os Admins
exports.getAllAdmins = async (req, res) => {
  try {
    // .select('-password') garante que a senha criptografada nunca seja enviada
    const admins = await Admin.find().select('-password');
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Deletar um Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    if (req.admin.id === adminId) {
      return res.status(400).json({ success: false, error: 'Você não pode excluir sua própria conta.' });
    }

    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, error: 'Admin não encontrado.' });
    }
    res.status(200).json({ success: true, message: 'Admin excluído com sucesso.' });
  } catch (error) { // Chaves corrigidas aqui
    res.status(500).json({ success: false, error: error.message });
  }
};