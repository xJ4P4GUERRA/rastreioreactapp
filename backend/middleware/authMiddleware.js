exports.protect = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ message: 'Acesso negado. Nenhuma chave de API fornecida.' });
  }

  if (apiKey !== process.env.API_SECRET_KEY) {
    return res.status(403).json({ message: 'Acesso proibido. Chave de API inválida.' });
  }

  // Se a chave estiver correta, permite que a requisição continue
  next();
};