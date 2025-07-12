const express = require('express');
const cors = require('cors');

console.log("--- INICIANDO SERVIDOR DE TESTE FINAL ---");

const app = express();

const corsOptions = {
  origin: 'https://rastreioreactapp.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Rota de verificação de status (GET)
app.get('/', (req, res) => {
  console.log(">>> ROTA RAIZ '/' ATINGIDA <<<");
  res.status(200).send("Servidor de teste final está online!");
});

// A ÚNICA ROTA POST, AGORA SIMPLIFICADA
app.post('/login', (req, res) => {
  console.log('>>> ROTA DE LOGIN SIMPLIFICADA ATINGIDA! SUCESSO! <<<');
  res.status(200).json({ success: true, token: 'teste_final_ok' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`--- SERVIDOR DE TESTE FINAL RODANDO NA PORTA ${PORT} ---`));