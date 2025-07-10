import React from 'react';
import styled from 'styled-components';
import { FaBars, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa o Link
import ThemeToggle from '../ui/ThemeToggle';

const HeaderContainer = styled.header`
  padding: 0 2rem;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    position: fixed;
    width: 100%;
  }
`;

const LeftSection = styled.div``;
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button`
  display: none; /* Só aparece no mobile */
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

// NOVO: Estilo para o botão de configurações ser um link
const SettingsButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.subtext};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;


const Header = ({ toggleTheme, theme, toggleMenu }) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>
      </LeftSection>
      <RightSection>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        {/* O ícone de engrenagem agora é um link para a nova página */}
        <SettingsButton to="/admin/settings">
          <FaCog />
        </SettingsButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;