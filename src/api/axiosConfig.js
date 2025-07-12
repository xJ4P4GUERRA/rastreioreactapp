const jwt = require('jsonwebtoken');

// A função de middleware foi alterada para não fazer nada e
// simplesmente passar para a próxima etapa (next()).
// Isto desativa a proteção de todas as rotas que a usam.
module.exports = function (req, res, next) {
  
  // A lógica de verificação de token foi removida.
  // A requisição agora passa diretamente.
  next();

  /*
  // --- CÓDIGO ANTIGO (AGORA DESATIVADO) ---
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido' });
  }
  */
};
