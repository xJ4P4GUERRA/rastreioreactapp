import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/admin/Sidebar';
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import ThemeToggleButton from '../components/ThemeToggleButton';

const AppLayout = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.body};
`;

const MainContent = styled.main`
  flex-grow: 1;
  margin-left: 280px; /* Largura da sidebar + um pouco de espaço */
  padding: 2.5rem;
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1.5rem;
  }
`;

const MobileHeader = styled.header`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.cardBg};
    padding: 1rem 1.5rem;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001; /* Para ficar acima do overlay */
`;

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppLayout>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MobileHeader>
          <HamburgerButton onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </HamburgerButton>
          <ThemeToggleButton />
        </MobileHeader>
        <MainContent>
          <Outlet /> {/* O conteúdo da rota (dashboard, clientes, etc.) será renderizado aqui */}
        </MainContent>
      </div>
    </AppLayout>
  );
};

export default AdminLayout;