import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom'; // Importa o useNavigate
import { FaTachometerAlt, FaUsers, FaPlusCircle, FaSignOutAlt, FaTruck, FaCog } from 'react-icons/fa'; // Adiciona FaCog

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme.cardBg};
  border-right: 1px solid ${({ theme }) => theme.border};
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 3rem;
  padding: 0 0.5rem;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ theme }) => theme.subtext};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &.active, &:hover {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.accent};
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 99;
  }
`;

const Sidebar = ({ isOpen, closeMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Limpa o token de login
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <LogoContainer>
          <FaTruck />
          <span>Painel Admin</span>
        </LogoContainer>
        <NavList>
          <StyledNavLink to="/admin/dashboard" onClick={closeMenu}><FaTachometerAlt /> Dashboard</StyledNavLink>
          <StyledNavLink to="/admin/clients" onClick={closeMenu}><FaUsers /> Clientes</StyledNavLink>
          <StyledNavLink to="/admin/new-tracking" onClick={closeMenu}><FaPlusCircle /> Novo Rastreio</StyledNavLink>
          <StyledNavLink to="/admin/settings" onClick={closeMenu}><FaCog /> Configurações</StyledNavLink>
        </NavList>
        {/* O último link agora é um botão que chama handleLogout */}
        <StyledNavLink as="button" onClick={handleLogout}><FaSignOutAlt /> Sair</StyledNavLink>
      </SidebarContainer>
      <Overlay isOpen={isOpen} onClick={closeMenu} />
    </>
  );
};

export default Sidebar;