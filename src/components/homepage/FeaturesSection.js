import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBroadcastTower, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const Section = styled(motion.section)`
  padding: 6rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #F9FAFB;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #D1D5DB;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// O grid já é responsivo, então não precisa de mudanças
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// ... (Resto do componente não precisa de alterações)
const FeatureCard = styled(motion.div)`
  background: #1F2937;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #374151;
`;
const IconWrapper = styled.div`
  font-size: 3rem;
  color: #FBBF24;
  margin-bottom: 1rem;
`;
const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #F9FAFB;
  margin-bottom: 0.5rem;
`;
const CardDescription = styled.p`
  color: #D1D5DB;
`;

const features = [
  { icon: <FaBroadcastTower />, title: "Rastreio em Tempo Real", description: "Nossa tecnologia de ponta atualiza a localização do seu pacote a cada segundo." },
  { icon: <FaShieldAlt />, title: "Seguro e Confiável", description: "Seus dados de rastreio são criptografados e protegidos. A confiança é nossa prioridade." },
  { icon: <FaHeadset />, title: "Suporte 24/7", description: "Nossa equipe de suporte está sempre disponível para ajudar com qualquer dúvida sobre sua entrega." },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } }
};

const FeaturesSection = () => {
  return (
    <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
      <Title>Tudo que você precisa</Title>
      <Subtitle>Criamos uma plataforma completa para que você tenha a melhor experiência de rastreio, do início ao fim.</Subtitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index} whileHover={{ y: -10, scale: 1.03 }} variants={sectionVariants}>
            <IconWrapper>{feature.icon}</IconWrapper>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Section>
  );
};

export default FeaturesSection;