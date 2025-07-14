import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaCog, FaTimes } from 'react-icons/fa';
import ThemeToggleButton from '../ThemeToggleButton'; // Importa o botão

const SidebarContainer = styled.aside`
  width: 250px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.cardBg};
  border-right: 1px solid ${({ theme }) => theme.border};
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  margin-bottom: 3rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Faz a navegação ocupar o espaço disponível */
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.subtext};
  text-decoration: none;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
  border-right: 3px solid transparent;

  &.active,
  &:hover {
    color: ${({ theme }) => theme.accent};
    background-color: ${({ theme }) => theme.body};
    border-right-color: ${({ theme }) => theme.accent};
  }
`;

const SidebarFooter = styled.div`
  padding: 1rem 2rem;
  margin-top: auto; /* Empurra para o final */
  @media (max-width: 768px) {
    display: none; /* Esconde no mobile pois já temos no header */
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;


const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <LogoContainer>
          <Logo>Painel</Logo>
          <CloseButton onClick={() => setIsOpen(false)}>
            <FaTimes />
          </CloseButton>
        </LogoContainer>
        <Nav>
          <StyledNavLink to="/admin/dashboard" onClick={() => setIsOpen(false)}>
            <FaTachometerAlt /> Dashboard
          </StyledNavLink>
          <StyledNavLink to="/admin/clients" onClick={() => setIsOpen(false)}>
            <FaUsers /> Clientes
          </StyledNavLink>
          <StyledNavLink to="/admin/new-tracking" onClick={() => setIsOpen(false)}>
            <FaBoxOpen /> Novo Rastreio
          </StyledNavLink>
          <StyledNavLink to="/admin/settings" onClick={() => setIsOpen(false)}>
            <FaCog /> Configurações
          </StyledNavLink>
        </Nav>
        <SidebarFooter>
          <ThemeToggleButton />
        </SidebarFooter>
      </SidebarContainer>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default Sidebar;