import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaBox, FaTruck, FaMapMarkedAlt, FaHome } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// --- Nenhuma alteração nos Estilos ---
const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin: 40px 0;
  width: 100%;
  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; margin: 20px 0; }
`;
const Step = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { flex-direction: row; align-items: center; text-align: left; width: 100%; margin-bottom: 20px; }
`;
// Adicionamos um novo prop 'status' para mais controle de estilo
const IconWrapper = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ status }) => (status === 'upcoming' ? '#374151' : '#FBBF24')};
  color: ${({ status }) => (status === 'upcoming' ? '#9CA3AF' : '#111827')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 10px;
  border: 3px solid ${({ status }) => (status === 'upcoming' ? '#374151' : '#FBBF24')};
  transition: all 0.4s ease;
  flex-shrink: 0;
  @media (max-width: 768px) { margin-bottom: 0; margin-right: 1rem; width: 40px; height: 40px; font-size: 1.2rem; }
`;
const StepLabel = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ status }) => (status === 'upcoming' ? '#9CA3AF' : '#F9FAFB')};
`;
const ProgressBar = styled.div`
  position: absolute;
  top: 24px;
  left: 10%;
  right: 10%;
  height: 4px;
  background-color: #374151;
  z-index: 1;
  @media (max-width: 768px) { left: 19px; top: 40px; width: 4px; height: calc(100% - 40px); right: auto; }
`;
const Progress = styled(motion.div)`
  height: 100%;
  background-color: #FBBF24;
  @media (max-width: 768px) { width: 100%; }
`;

const steps = [
    { label: 'Confirmado', icon: <FaCheck /> },
    { label: 'Preparação', icon: <FaBox /> },
    { label: 'Em Trânsito', icon: <FaTruck /> },
    { label: 'Em Rota', icon: <FaMapMarkedAlt /> },
    { label: 'Entregue', icon: <FaHome /> },
];

const checkMarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const TrackingStatus = ({ currentStatus }) => {
    // A lógica de encontrar o índice continua a mesma, mas a usaremos de forma mais inteligente
    const activeIndex = steps.findIndex(step => step.label.toLowerCase() === currentStatus.toLowerCase());
    const progressPercentage = activeIndex >= 0 ? (activeIndex / (steps.length - 1)) * 100 : 0;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const progressAnimate = isMobile 
      ? { height: `${progressPercentage}%` } 
      : { width: `${progressPercentage}%` };

    return (
        <>
        <StatusContainer>
            <ProgressBar>
              <Progress
                  initial={isMobile ? { height: 0 } : { width: 0 }}
                  animate={progressAnimate}
                  transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </ProgressBar>
            {steps.map((step, index) => {
              // --- LÓGICA DE STATUS REFINADA ---
              const isCompleted = index < activeIndex;
              const isCurrent = index === activeIndex;
              const stepStatus = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

              return (
                <Step key={index}>
                <IconWrapper status={stepStatus}>
                    <AnimatePresence>
                      {/* Mostra o check apenas se estiver completo */}
                      {isCompleted ? (
                          <motion.div variants={checkMarkVariants} initial="hidden" animate="visible">
                            <FaCheck />
                          </motion.div>
                      ) : (
                          // Mostra o ícone original para o passo atual e os futuros
                          step.icon
                      )}
                    </AnimatePresence>
                </IconWrapper>
                <StepLabel status={stepStatus}>{step.label}</StepLabel>
                </Step>
              );
            })}
        </StatusContainer>
        </>
    );
};

export default TrackingStatus;