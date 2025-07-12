import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api/axiosConfig'; // A configuração do Axios já tem a URL base correta
import { useNavigate } from 'react-router-dom';

// --- Styled Components (sem alterações) ---
const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #111827;
`;
const LoginCard = styled.div`
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
  &:focus {
    outline: none;
    border-color: #FBBF24;
    box-shadow: 0 0 0 2px #fbbd244c;
  }
`;
const LoginButton = styled.button`
  background-color: #FBBF24;
  color: #111827;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #F59E0B;
  }
`;
const ErrorMessage = styled.p`
  color: #FCA5A5;
  text-align: center;
  margin-top: 1rem;
`;
// --- Fim dos Styled Components ---

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // --- ESTA É A LINHA CORRIGIDA E FINAL ---
      // A chamada agora inclui o caminho completo '/admin/login'
      const response = await api.post('/admin/login', {
        username: username.toLowerCase(),
        password
      });

      // O token de autenticação é salvo no localStorage para ser usado em outras requisições
      localStorage.setItem('authToken', response.data.token);
      
      // Redireciona para o painel de controle após o login
      navigate('/admin/dashboard');

    } catch (err) {
      // Define uma mensagem de erro genérica para o usuário
      setError('Usuário ou senha inválidos.');
      // Loga o erro detalhado no console para depuração
      console.error("Falha no login:", err);
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
