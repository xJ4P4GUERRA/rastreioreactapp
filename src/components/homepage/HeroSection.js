import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTruck, FaSearch } from 'react-icons/fa';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 90vh;
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const TextContainer = styled(motion.div)`
  max-width: 500px;
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  color: #F9FAFB;
  line-height: 1.2;
  margin-bottom: 1rem;
  span {
    color: #FBBF24;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #D1D5DB;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DeliveryMan = styled(motion.img)`
  max-width: 350px;
  height: auto;
  
  @media (max-width: 768px) {
    max-width: 250px;
  }
`;

// --- INÍCIO DAS MUDANÇAS DE ESTILO ---

const TrackingForm = styled(motion.form)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 450px;
  background-color: #1F2937;
  border-radius: 100px; /* <-- BORDAS BEM ARREDONDADAS */
  border: 1px solid #374151;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #FBBF24;
  }
`;

const FormIcon = styled(FaSearch)`
  position: absolute;
  left: 1.2rem;
  font-size: 1.2rem;
  color: #6B7281;
`;

const TrackingInput = styled.input`
  width: 100%;
  /* Padding direito aumentado para não passar por baixo do botão/ícone */
  padding: 1.2rem 130px 1.2rem 3.5rem; 
  border-radius: 100px; /* <-- BORDAS BEM ARREDONDADAS */
  border: none;
  font-size: 1rem;
  background-color: transparent;
  color: #F9FAFB;
  caret-color: #FBBF24;

  &::placeholder {
    color: #6B7281; /* Cor do placeholder como na imagem */
  }

  &:focus {
    outline: none;
  }
`;

const ActionContainer = styled.div`
  position: absolute;
  right: 0.5rem;
  height: 80%;
  width: 120px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrackButton = styled(motion.button)`
  width: 100%;
  height: 100%;
  border-radius: 100px; /* <-- BORDAS BEM ARREDONDADAS */
  border: none;
  background-color: #FBBF24;
  color: #111827;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const TruckIcon = styled(motion.div)`
  font-size: 1.8rem;
  color: #6B7281; /* Cor do ícone como na imagem */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

// --- FIM DAS MUDANÇAS ---

const HeroSection = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  const isCodeLongEnough = trackingCode.length >= 10;

  const handleTrackPackage = (e) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      navigate(`/rastreio/${trackingCode.trim()}`);
    }
  };

  const animationProps = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  };

  return (
    <HeroContainer>
      <HeroContent>
        <TextContainer>
          <Title>Rastreamento inteligente em <span>tempo real.</span></Title>
          <Subtitle>Visibilidade total da sua entrega, do ponto de partida ao destino final, com precisão e segurança.</Subtitle>
          
          <TrackingForm onSubmit={handleTrackPackage}>
            <FormIcon />
            <TrackingInput
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              placeholder="Digite seu código de rastreio"
            />
            <ActionContainer>
              <AnimatePresence mode="wait">
                {isCodeLongEnough ? (
                  <TrackButton
                    key="button"
                    type="submit"
                    {...animationProps}
                  >
                    Rastrear
                  </TrackButton>
                ) : (
                  <TruckIcon
                    key="icon"
                    {...animationProps}
                  >
                    <FaTruck />
                  </TruckIcon>
                )}
              </AnimatePresence>
            </ActionContainer>
          </TrackingForm>

        </TextContainer>
        <DeliveryMan
          src="/images/delivery-man.png"
          alt="Entregador"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;