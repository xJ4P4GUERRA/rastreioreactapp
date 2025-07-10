import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 4rem 2rem;
  text-align: center;
  border-top: 1px solid #374151;
  position: relative;
  z-index: 2; /* Garante que o rodapé fique na frente da animação */
  background-color: #111827; /* Adiciona um fundo para cobrir o caminhão */
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;

  a {
    color: #9CA3AF;
    font-size: 1.5rem;
    transition: color 0.3s ease;
    &:hover {
      color: #FBBF24;
    }
  }
`;

const CopyrightText = styled.p`
  color: #6B7281;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </SocialLinks>
      <CopyrightText>© 2025 JadLogTransportadora. Todos os direitos reservados.</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;