import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaCheckCircle, FaCopy } from 'react-icons/fa';

// ... (Todos os `styled-components` continuam iguais)
const PageWrapper = styled.div``;
const FormCard = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.border};
`;
const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.subtext};
`;
const Select = styled.select`
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;
const Input = styled.input`
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;
const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => (theme.body === '#ffffff' ? '#ffffff' : '#111827')};
  border: none;
  border-radius: 8px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;
  margin-top: 1rem;
`;
const SuccessModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const SuccessIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #10B981;
  margin-bottom: 1rem;
`;
const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;
const ModalSubtitle = styled.p`
  color: ${({ theme }) => theme.subtext};
`;
const CodeDisplay = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.subtext};
  cursor: pointer;
  font-size: 1.2rem;
`;
const CloseButton = styled(SubmitButton)`
  margin-top: 1.5rem;
  align-self: center;
`;

Modal.setAppElement('#root');

const AdminNewTrackingPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [previsaoEntrega, setPrevisaoEntrega] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [lastCreatedCode, setLastCreatedCode] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  
  const navigate = useNavigate();
  const theme = useTheme();

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // CORREÇÃO: Adicionado /api/
        const response = await api.get('/api/admin/clients');
        setClients(response.data);
        if (response.data.length > 0) {
          setSelectedClient(response.data[0]._id);
        }
      } catch (err) {
        console.error("Falha ao carregar clientes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleCreateTracking = async (e) => {
    e.preventDefault();
    if (!selectedClient) {
      alert('Por favor, cadastre um cliente primeiro ou selecione um cliente existente.');
      return;
    }
    const newCode = generateRandomCode();

    try {
      // CORREÇÃO: Adicionado /api/
      await api.post('/api/admin/packages', 
        {
          code: newCode,
          previsaoEntrega,
          clientId: selectedClient
        }
      );
      setLastCreatedCode(newCode);
      setSuccessModalOpen(true);
    } catch (err) {
      alert('Erro ao criar o rastreio.');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(lastCreatedCode);
    setCopySuccess('Copiado!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const closeModalAndNavigate = () => {
    setSuccessModalOpen(false);
    navigate('/admin/dashboard');
  };

  const customModalStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.cardBg,
      border: `1px solid ${theme.border}`,
      borderRadius: '16px', padding: '2.5rem',
      maxWidth: '500px', width: '90%',
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1000 }
  };

  if (loading) return <Title>Carregando...</Title>;

  return (
    <PageWrapper>
      <FormCard>
        <Title>Cadastrar Novo Rastreio</Title>
        <Form onSubmit={handleCreateTracking}>
          <FormGroup>
            <Label htmlFor="client-select">Selecione o Cliente</Label>
            <Select 
              id="client-select" 
              value={selectedClient} 
              onChange={e => setSelectedClient(e.target.value)}
            >
              {clients.length > 0 ? (
                clients.map(client => (<option key={client._id} value={client._id}>{client.name}</option>))
              ) : (
                <option disabled>Nenhum cliente cadastrado</option>
              )}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="delivery-date">Previsão de Entrega</Label>
            <Input 
              id="delivery-date" 
              type="text" 
              placeholder="dd/mm/aaaa" 
              value={previsaoEntrega} 
              onChange={e => setPrevisaoEntrega(e.target.value)} 
              required 
            />
          </FormGroup>
          <SubmitButton type="submit">Gerar e Salvar Rastreio</SubmitButton>
        </Form>
      </FormCard>

      <Modal isOpen={isSuccessModalOpen} onRequestClose={closeModalAndNavigate} style={customModalStyles} contentLabel="Sucesso">
        <SuccessModalContent>
          <SuccessIcon />
          <ModalTitle>Rastreio Criado com Sucesso!</ModalTitle>
          <ModalSubtitle>Código gerado para o cliente:</ModalSubtitle>
          <CodeDisplay>
            {lastCreatedCode}
            <CopyButton onClick={handleCopyToClipboard} title="Copiar código">
              <FaCopy />
            </CopyButton>
          </CodeDisplay>
          {copySuccess && <p style={{color: '#10B981', fontSize: '0.9rem', height: '1rem'}}>{copySuccess}</p>}
          <CloseButton onClick={closeModalAndNavigate}>Fechar</CloseButton>
        </SuccessModalContent>
      </Modal>
    </PageWrapper>
  );
};

export default AdminNewTrackingPage;