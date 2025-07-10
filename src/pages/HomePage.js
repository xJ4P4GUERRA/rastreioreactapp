import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import HeroSection from '../components/homepage/HeroSection';
import FeaturesSection from '../components/homepage/FeaturesSection';
import HowItWorksSection from '../components/homepage/HowItWorksSection';
import Footer from '../components/homepage/Footer';
import StreetAnimation from '../components/homepage/StreetAnimation';

// Variantes para a animação da página inteira
const pageVariants = {
  initial: { opacity: 0, scale: 0.99 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.99 }
};

const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Adicionado "motion." ao PageWrapper para que ele possa ser animado
const PageWrapper = styled(motion.div)`
  background: linear-gradient(-45deg, #111827, #1F2937, #111827, #374151);
  background-size: 400% 400%;
  animation: ${animatedGradient} 15s ease infinite;
  color: #F9FAFB;
  position: relative;
  overflow-x: hidden;
`;

const HomePage = () => {
  return (
    <PageWrapper
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StreetAnimation />
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;