const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protectWithToken = async (req, res, next) => {
  let token;

  // Verifica se o token foi enviado no cabeçalho 'Authorization'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Coloca os dados do admin logado no objeto da requisição para uso futuro
    req.admin = await Admin.findById(decoded.id);

    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token inválido ou expirado.' });
  }
};