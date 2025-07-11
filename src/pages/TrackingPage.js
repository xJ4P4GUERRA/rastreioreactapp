import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosConfig'; // A importação continua a mesma
import TrackingStatus from '../components/TrackingStatus';
import TrackingHistory from '../components/TrackingHistory';
import TrackingPageSkeleton from '../components/TrackingPageSkeleton';
import { FaCalendarAlt } from 'react-icons/fa';

// ... (Todos os styled-components continuam exatamente iguais)
const pageVariants = {
  initial: { opacity: 0, scale: 0.99 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.99 }
};
const PageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(-45deg, #111827, #1F2937, #111827, #374151);
  background-size: 400% 400%;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
    align-items: flex-start;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
`;
const TrackingCard = styled(motion.div)`
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  border: 1px solid #374151;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #374151;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
const Title = styled.h2`
  color: #F9FAFB;
`;
const TrackingCode = styled.span`
  background-color: #FBBF24;
  color: #111827;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
`;
const NewQueryButton = styled.button`
  background-color: #374151;
  color: #F9FAFB;
  border: 1px solid #4B5563;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #4B5563;
    border-color: #6B7281;
  }
`;
const SummaryCard = styled(motion.div)`
  background-color: #111827;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #374151;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
const SummaryItem = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    text-align: left;
  }
`;
const SummaryLabel = styled.p`
  font-size: 0.9rem;
  color: #9CA3AF;
  margin-bottom: 5px;
`;
const SummaryValue = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #FBBF24;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ErrorText = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  padding: 40px;
  color: #FCA5A5;
  background: #374151;
  border-radius: 12px;
`;
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};


const TrackingPage = () => {
  const { trackingCode } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // --- MUDANÇA PRINCIPAL AQUI ---
    // Construímos a URL completa e absoluta, usando a variável de ambiente do Vercel.
    // Isso remove qualquer ambiguidade para o navegador do celular.
    const apiUrl = `${process.env.REACT_APP_API_URL}/track/${trackingCode}`;
    // --- FIM DA MUDANÇA ---

    // O resto da chamada continua igual, usando a instância 'api'
    api.get(apiUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        // Mensagem de erro melhorada para depuração
        console.error("Erro detalhado da API:", err);
        setError(err.response?.data?.message || 'Erro ao procurar o rastreio.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [trackingCode]);

  return (
    <PageContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
    >
      <ContentWrapper>
        <AnimatePresence mode="wait">
          {loading && <TrackingPageSkeleton key="skeleton" />}
          {error && <ErrorText key="error">{error}</ErrorText>}
          {data && (
            <TrackingCard
              key="card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Header>
                <Title>
                  Detalhes do Rastreio <br />
                  <TrackingCode>{data.code}</TrackingCode>
                </Title>
                <NewQueryButton onClick={() => navigate('/')}>
                  Nova Consulta
                </NewQueryButton>
              </Header>
              <SummaryCard>
                <SummaryItem>
                  <SummaryLabel>Status Atual</SummaryLabel>
                  <SummaryValue>{data.status}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Previsão de Entrega</SummaryLabel>
                  <SummaryValue><FaCalendarAlt /> {data.previsaoEntrega}</SummaryValue>
                </SummaryItem>
              </SummaryCard>
              <TrackingStatus currentStatus={data.status} />
              <TrackingHistory history={data.history} />
            </TrackingCard>
          )}
        </AnimatePresence>
      </ContentWrapper>
    </PageContainer>
  );
};

export default TrackingPage;