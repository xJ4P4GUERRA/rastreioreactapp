import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBoxOpen, FaTruckLoading, FaRoute, FaClipboardCheck, FaFileAlt } from 'react-icons/fa';
import { format } from 'date-fns'; // <-- Importa a função de formatação
import { ptBR } from 'date-fns/locale'; // <-- Importa o local para português

const HistoryContainer = styled.div`
  margin-top: 2.5rem;
  width: 100%;
`;
const HistoryTitle = styled.h3`
  margin-bottom: 1rem;
  border-bottom: 1px solid #374151;
  padding-bottom: 0.5rem;
  color: #F9FAFB;
  font-size: 1.4rem;
`;
const HistoryList = styled(motion.ul)`
  list-style: none;
  padding: 0;
`;
const HistoryItem = styled(motion.li)`
  background-color: #1F2937;
  padding: 1.2rem 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #FBBF24;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: background-color 0.3s ease;
`;
const HistoryIcon = styled.div`
  font-size: 1.8rem;
  color: #FBBF24;
`;

const HistoryDetails = styled.div`
  display: flex;
  flex-direction: column; /* Organiza status e data um em cima do outro */
`;

const Status = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  color: #F9FAFB;
  margin-bottom: 4px;
`;
// Estilo ajustado para a data
const DateLocation = styled.p`
  font-size: 0.95rem; /* Fonte um pouco maior */
  color: #D1D5DB; /* Cor mais clara para melhor leitura */
`;

const listVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

const getIconForStatus = (status) => {
    const s = status.toLowerCase();
    if (s.includes('entregue')) return <FaClipboardCheck />;
    if (s.includes('saiu para entrega') || s.includes('em rota')) return <FaRoute />;
    if (s.includes('transferência') || s.includes('em trânsito')) return <FaTruckLoading />;
    if (s.includes('coletado')) return <FaBoxOpen />;
    if (s.includes('recebido') || s.includes('confirmado') || s.includes('criado')) return <FaCheckCircle />;
    return <FaFileAlt />;
}

const TrackingHistory = ({ history }) => {
    return (
        <HistoryContainer>
        <HistoryTitle>Histórico de Movimentação</HistoryTitle>
        <HistoryList variants={listVariants} initial="hidden" animate="visible">
            {history.map((item, index) => {
              // --- FORMATAÇÃO DA DATA ACONTECE AQUI ---
              const formattedDate = format(
                new Date(item.date),
                "dd 'de' MMMM 'de' yyyy, 'às' HH:mm", // Ex: 03 de Julho de 2025, às 23:13
                { locale: ptBR }
              );

              return (
                <HistoryItem 
                    key={index} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: '#374151' }}
                >
                    <HistoryIcon>{getIconForStatus(item.status)}</HistoryIcon>
                    <HistoryDetails>
                      <Status>{item.status}</Status>
                      {/* Renderiza a data já formatada */}
                      <DateLocation>{formattedDate} {item.local && `- Local: ${item.local}`}</DateLocation>
                    </HistoryDetails>
                </HistoryItem>
              )
            })}
        </HistoryList>
        </HistoryContainer>
    );
};

export default TrackingHistory;