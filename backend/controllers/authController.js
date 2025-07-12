const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para REGISTAR um novo administrador
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se o nome de utilizador já existe
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ error: 'Este nome de utilizador já está a ser utilizado.' });
    }

    // Cria uma nova instância de Admin
    admin = new Admin({
      username,
      password,
    });

    // Encripta a senha antes de a guardar
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    // Guarda o novo administrador no banco de dados
    await admin.save();

    // Retorna uma resposta de sucesso
    res.status(201).json({ 
        message: 'Administrador registado com sucesso!',
        username: admin.username 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// Função para fazer LOGIN de um administrador
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Procura o administrador pelo nome de utilizador
    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com a senha encriptada no banco de dados
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Se as credenciais estiverem corretas, cria um token JWT
    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // A sua chave secreta do .env
      { expiresIn: '5h' }, // O token expira em 5 horas
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};
