// Importa os pacotes necessários
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Carrega as variáveis de ambiente do ficheiro .env

// Importa o modelo de Administrador
const Admin = require('./models/Admin');

// --- DADOS DO PRIMEIRO ADMINISTRADOR ---
// Altere estes valores se desejar
const ADMIN_USERNAME = 'japaen';
const ADMIN_PASSWORD = '123456';

const seedAdmin = async () => {
  try {
    // Conecta-se ao banco de dados MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB para o script de seed...');

    // 1. Verifica se já existe um administrador com este nome de utilizador
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });

    if (existingAdmin) {
      console.log('O utilizador administrador já existe. Nenhuma ação foi tomada.');
      return; // Termina o script se o utilizador já existir
    }

    // 2. Se não existir, cria um novo
    console.log('A criar um novo utilizador administrador...');
    const newAdmin = new Admin({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD, // A senha será encriptada pelo 'pre-save' hook no modelo
    });

    // 3. Encripta a senha manualmente (garante que funciona mesmo sem o hook)
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // 4. Guarda o novo administrador no banco de dados
    await newAdmin.save();
    console.log('Utilizador administrador criado com sucesso!');
    console.log(`Username: ${newAdmin.username}`);

  } catch (error) {
    console.error('Ocorreu um erro durante a execução do script de seed:', error);
  } finally {
    // 5. Desconecta-se do banco de dados em qualquer caso (sucesso ou erro)
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');
  }
};

// Executa a função principal do script
seedAdmin();
