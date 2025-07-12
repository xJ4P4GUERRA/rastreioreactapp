import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

// ... (Todos os `styled-components` continuam exatamente iguais)
const LoginPageContainer = styled.div` /* ... */ `;
const LoginCard = styled.div` /* ... */ `;
const Title = styled.h1` /* ... */ `;
const Form = styled.form` /* ... */ `;
const Input = styled.input` /* ... */ `;
const LoginButton = styled.button` /* ... */ `;
const ErrorMessage = styled.p` /* ... */ `;


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // CORREÇÃO: Chamando a rota simplificada /login
      const response = await api.post('/login', {
        username: username.toLowerCase(),
        password
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        // Se o teste funcionar, ele vai te levar para o dashboard
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