import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api/axiosConfig';

// --- Styled Components (similares aos da página de login) ---
const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #111827;
`;
const RegisterCard = styled.div`
  background-color: #1F2937;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #374151;
`;
const Title = styled.h1`
  font-size: 1.8rem;
  color: #F9FAFB;
  margin-bottom: 2rem;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Input = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #4B5563;
  background-color: #374151;
  color: #F9FAFB;
  font-size: 1rem;
`;
const RegisterButton = styled.button`
  background-color: #10B981;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;
const Message = styled.p`
  color: #9CA3AF;
  text-align: center;
  margin-top: 1rem;
`;
// --- Fim dos Styled Components ---

const RegisterAdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('A registar...');
    try {
      // A rota de registo no seu backend
      const response = await api.post('/admin/register', {
        username: username.toLowerCase(),
        password
      });
      setMessage(`Sucesso! Utilizador '${response.data.username}' criado. Já pode remover esta página.`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Falha ao registar. O utilizador pode já existir.');
      console.error("Falha no registo:", err);
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterCard>
        <Title>Registar Primeiro Administrador</Title>
        <p style={{color: '#FBBF24', textAlign: 'center', marginBottom: '1rem'}}>
          AVISO: Esta página é apenas para uso único. Remova-a após o registo.
        </p>
        <Form onSubmit={handleRegister}>
          <Input 
            type="text" 
            placeholder="Novo usuário (ex: japaen)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input 
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <RegisterButton type="submit">Registar</RegisterButton>
          {message && <Message>{message}</Message>}
        </Form>
      </RegisterCard>
    </RegisterPageContainer>
  );
};

export default RegisterAdminPage;
