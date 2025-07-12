// src/components/admin/AdminLayout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // CORREÇÃO FINAL: Importa o componente com o nome correto
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #111827; // Cor de fundo do corpo
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem 3rem;
  width: 100%;
  overflow-y: auto;
`;

const AdminLayout = () => {
  // Esta versão do layout não contém mais nenhuma lógica de autenticação ou logout.
  // Ela simplesmente renderiza a barra lateral e o conteúdo principal da página.
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;