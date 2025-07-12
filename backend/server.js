const express = require('express');
const cors = require('cors');

console.log("--- INICIANDO SERVIDOR DE TESTE MÍNIMO V2 ---");

const app = express();

const corsOptions = {
  origin: 'https://rastreioreactapp.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Rota de verificação de status (GET, pode ser acessada no navegador)
app.get('/', (req, res) => {
  console.log(">>> ROTA RAIZ '/' ATINGIDA <<<");
  res.status(200).send("Servidor de teste mínimo está online!");
});

// A ÚNICA ROTA POST QUE VAI EXISTIR
app.post('/api/auth/login', (req, res) => {
  console.log('>>> ROTA DE LOGIN MÍNIMA ATINGIDA! SUCESSO! <<<');
  res.status(200).json({ success: true, token: 'teste_minimo_ok' });
});

// Nenhuma outra rota ou conexão com banco de dados será feita.

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`--- SERVIDOR DE TESTE MÍNIMO V2 RODANDO NA PORTA ${PORT} ---`));