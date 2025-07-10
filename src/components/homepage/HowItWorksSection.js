import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled(motion.section)`
  padding: 6rem 2rem;
  text-align: center;
  background-color: #111827;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: #F9FAFB;
`;

const StepsContainer = styled.div`
  position: relative; /* Necessário para posicionar a barra de progresso */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alinhado ao topo para a barra ficar atrás dos números */
  gap: 2rem;
  flex-wrap: wrap;
`;

// --- NOVO: BARRA DE PROGRESSO ---
const ProgressBarContainer = styled.div`
  position: absolute;
  top: 30px; /* Alinha verticalmente com o centro dos círculos */
  left: 15%; /* Espaçamento nas laterais */
  right: 15%;
  height: 4px;
  background-color: #374151;
  border-radius: 2px;
  z-index: 0;
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background-color: #FBBF24;
  border-radius: 2px;
`;
// --- FIM DO NOVO ---

const StepCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px;
  z-index: 1; /* Garante que os cards fiquem na frente da barra */
  background-color: #111827; /* Fundo para cobrir a barra atrás do texto */
  padding: 0 1rem;
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #FBBF24;
  color: #111827;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 4px solid #111827; /* Borda para separar do fundo */
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  color: #F9FAFB;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #D1D5DB;
`;

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.3 
    } 
  }
};

// Variantes para a animação da barra
const progressBarVariants = {
  hidden: { width: "0%" },
  visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } }
}

const HowItWorksSection = () => {
  return (
    <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={sectionVariants}>
      <Title>Simples como 1, 2, 3</Title>
      <StepsContainer>
        <ProgressBarContainer>
          <ProgressBarFill variants={progressBarVariants} />
        </ProgressBarContainer>

        <StepCard variants={sectionVariants}>
          <StepNumber>1</StepNumber>
          <StepTitle>Receba seu Código</StepTitle>
          <StepDescription>Após a confirmação, seu código de rastreio único é gerado.</StepDescription>
        </StepCard>
        <StepCard variants={sectionVariants}>
          <StepNumber>2</StepNumber>
          <StepTitle>Insira na Plataforma</StepTitle>
          <StepDescription>Use o campo no topo da página para inserir seu código.</StepDescription>
        </StepCard>
        <StepCard variants={sectionVariants}>
          <StepNumber>3</StepNumber>
          <StepTitle>Acompanhe a Magia</StepTitle>
          <StepDescription>Veja em tempo real cada etapa da sua entrega até chegar a você.</StepDescription>
        </StepCard>
      </StepsContainer>
    </Section>
  );
};

export default HowItWorksSection;