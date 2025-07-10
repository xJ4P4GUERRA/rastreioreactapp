import React from 'react';
import styled, { keyframes } from 'styled-components';

// ... (keyframes não mudam)

const AnimationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  z-index: 1; 
  pointer-events: none;

  /* Desativa a animação em telas pequenas */
  @media (max-width: 768px) {
    display: none;
  }
`;

// ... (Resto do componente não precisa de alterações)
const driveAnimation = keyframes`
  from {
    transform: translateX(-200px);
  }
  to {
    transform: translateX(100vw);
  }
`;
const roadLineAnimation = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: -200px 0;
  }
`;
const Truck = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 150px;
  height: auto;
  animation: ${driveAnimation} 20s linear infinite;
  animation-delay: 2s;

  svg {
    width: 90%;
    height: auto;
  }
`;

const Road = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 10px;
  
  &:before {
    content: '';
    position: absolute;
    bottom: 2px;
    width: 100%;
    height: 4px;
    background-color: #374151;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background-image: linear-gradient(to right, #FBBF24 50%, transparent 50%);
    background-size: 40px 4px;
    animation: ${roadLineAnimation} 5s linear infinite;
  }
`;
const StreetAnimation = () => {
  return (
    <AnimationContainer>
      <Road />
      <Truck>
        <svg viewBox="0 0 128 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M110 56V44H116V56H110Z" fill="#FBBF24"/>
          <path d="M96 56V32H116V56H96Z" fill="#D1D5DB"/>
          <path d="M106 37H111V42H106V37Z" fill="#1F2937"/>
          <path d="M96 44H72V32H96V44Z" fill="#D1D5DB"/>
          <path d="M72 56V32H16V56H72Z" fill="#9CA3AF"/>
          <path d="M16 44H4V56H16V44Z" fill="#D1D5DB"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M84 64C88.4183 64 92 60.4183 92 56C92 51.5817 88.4183 48 84 48C79.5817 48 76 51.5817 76 56C76 60.4183 79.5817 64 84 64ZM84 60C86.2091 60 88 58.2091 88 56C88 53.7909 86.2091 52 84 52C81.7909 52 80 53.7909 80 56C80 58.2091 81.7909 60 84 60Z" fill="#111827"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M32 64C36.4183 64 40 60.4183 40 56C40 51.5817 36.4183 48 32 48C27.5817 48 24 51.5817 24 56C24 60.4183 27.5817 64 32 64ZM32 60C34.2091 60 36 58.2091 36 56C36 53.7909 34.2091 52 32 52C29.7909 52 28 53.7909 28 56C28 58.2091 29.7909 60 32 60Z" fill="#111827"/>
        </svg>
      </Truck>
    </AnimationContainer>
  );
};

export default StreetAnimation;