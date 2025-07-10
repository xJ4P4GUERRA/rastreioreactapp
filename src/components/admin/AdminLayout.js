import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header'; // Vamos criar este novo componente
import { lightTheme, darkTheme } from '../../theme';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body};
  transition: background-color 0.3s ease;
`;

const ContentArea = styled.main`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 60px; /* Espaço para o Header fixo */
  }
`;

const AdminLayout = () => {
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lógica para persistir o tema no localStorage
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <DashboardContainer>
        <Sidebar isOpen={isMobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} />
        <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
          <Header 
            toggleTheme={toggleTheme} 
            theme={theme}
            toggleMenu={() => setMobileMenuOpen(!isMobileMenuOpen)}
          />
          <ContentArea>
            <Outlet />
          </ContentArea>
        </div>
      </DashboardContainer>
    </ThemeProvider>
  );
};

export default AdminLayout;