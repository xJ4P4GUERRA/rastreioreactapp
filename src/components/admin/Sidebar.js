// src/components/admin/Sidebar.js

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaCog } from 'react-icons/fa';

const SidebarContainer = styled.aside`
  width: 250px;
  flex-shrink: 0;
  background-color: #1F2937; // Cor do card
  border-right: 1px solid #374151; // Cor da borda
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #F9FAFB; // Cor do texto principal
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  color: #9CA3AF; // Cor do subtexto
  text-decoration: none;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
  border-right: 3px solid transparent;

  &.active,
  &:hover {
    color: #FBBF24; // Cor de destaque (accent)
    background-color: #111827; // Cor de fundo do corpo
    border-right: 3px solid #FBBF24;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>Painel de Controlo</Logo>
      <Nav>
        <StyledNavLink to="/admin/dashboard">
          <FaTachometerAlt /> Dashboard
        </StyledNavLink>
        <StyledNavLink to="/admin/clients">
          <FaUsers /> Clientes
        </StyledNavLink>
        <StyledNavLink to="/admin/new-tracking">
          <FaBoxOpen /> Novo Rastreio
        </StyledNavLink>
        <StyledNavLink to="/admin/settings">
          <FaCog /> Configurações
        </StyledNavLink>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
