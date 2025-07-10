import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api/axiosConfig'; // <-- ALTERADO
import { useNavigate } from 'react-router-dom';

// ... (Todos os `styled-components` continuam iguais)
const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #111827; /* Cor de fundo fixa */
`;

const LoginCard = styled.div`
  background-color: #1F2937; /* Cor do card fixa */
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid #374151;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #F9FAFB;
  text-align: center;
  margin-bottom: 2rem;
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
  background-color: #111827;
  color: #F9FAFB;
  font-size: 1rem;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #FBBF24;
    box-shadow: 0 0 0 3px #FBBF2433;
  }
`;

const LoginButton = styled.button`
  background-color: #FBBF24;
  color: #111827;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1rem;
  &:hover { 
    background-color: #F59E0B;
  }
`;

const ErrorMessage = styled.p`
  color: #FCA5A5;
  text-align: center;
  min-height: 1rem; /* Garante espaço mesmo quando não há erro */
  margin-top: 1rem;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // ALTERADO: Usa 'api' e a URL relativa
      const response = await api.post('/auth/login', {
        username: username.toLowerCase(),
        password
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Usuário ou senha inválidos.');
      console.error(err);
    }
  };

  return (
    <LoginPageContainer>
      <LoginCard>
        <Title>Login do Administrador</Title>
        <Form onSubmit={handleLogin}>
          <Input 
            type="text" 
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input 
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoginButton type="submit">Entrar</LoginButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default LoginPage;