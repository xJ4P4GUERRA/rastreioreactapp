import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import api from '../api/axiosConfig';
import Modal from 'react-modal';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';

// ... (Header, Title, CreateButton continuam iguais)
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
`;
const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.success};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover { background-color: ${({ theme }) => theme.successHover}; }
`;
// ... (outros styled-components)

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  @media (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;

    thead {
      display: none;
    }
  }
`;

const Th = styled.th`
  padding: 1rem;
  background-color: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.subtext};
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.body};
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border};
    overflow: hidden;
    background-color: ${({ theme }) => theme.cardBg} !important;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};

  ${Tr}:last-child & {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    text-align: right;
    position: relative;
    padding-left: 50%;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    
    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: attr(data-label);
      position: absolute;
      left: 10px;
      width: calc(50% - 20px);
      text-align: left;
      font-weight: bold;
      color: ${({ theme }) => theme.subtext};
    }
  }
`;

// ... (Restante do arquivo, incluindo a lógica do componente React, continua igual)
// ... (Só precisamos ajustar o JSX para usar os novos componentes Tr e Td com data-label)

// O restante do arquivo (Form, Input, ModalTitle, etc.) pode continuar o mesmo
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Input = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #10B981;
    box-shadow: 0 0 0 2px #a7f3d0;
  }
`;
const ModalTitle = styled.h2`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;
const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;
const DeleteButton = styled.button`
  background-color: #EF4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
  &:hover { background-color: #DC2626; }
`;
const ConfirmModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const WarningIcon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #F59E0B;
  margin-bottom: 1rem;
`;
const ConfirmButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;
const ConfirmButton = styled(DeleteButton)`
  background-color: #DC2626;
  &:hover { background-color: #B91C1C; }
`;
const CancelButton = styled(CreateButton)`
  background-color: #6B7281;
  &:hover { background-color: #4B5563; }
`;


Modal.setAppElement('#root');

const AdminClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [clientToDeleteId, setClientToDeleteId] = useState(null);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCpf, setNewClientCpf] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  
  const theme = useTheme();

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/clients');
      setClients(response.data);
    } catch (err) {
      setError('Falha ao carregar os clientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setNewClientName('');
    setNewClientCpf('');
    setNewClientPhone('');
  }

  const handleCreateClient = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/clients', 
        { name: newClientName, cpf: newClientCpf, phone: newClientPhone }
      );
      closeCreateModal();
      fetchClients(); 
    } catch (err) {
      alert('Erro ao criar o cliente.');
    }
  };

  const openConfirmDeleteModal = (id) => {
    setClientToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setClientToDeleteId(null);
  };

  const handleDeleteClient = async () => {
    if (!clientToDeleteId) return;
    try {
      await api.delete(`/admin/clients/${clientToDeleteId}`);
      fetchClients();
      closeConfirmDeleteModal();
    } catch (err) {
      alert('Erro ao excluir o cliente.');
    }
  };

  const customModalStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto',
      marginRight: '-50%', transform: 'translate(-50%, -50%)',
      backgroundColor: theme.cardBg,
      border: `1px solid ${theme.border}`,
      borderRadius: '16px', padding: '2.5rem',
      maxWidth: '500px', width: '90%',
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1000 }
  };

  if (loading) return <Title>Carregando clientes...</Title>;
  if (error) return <Title style={{color: '#EF4444'}}>{error}</Title>;

  return (
    <>
      <Header>
        <Title>Gerenciamento de Clientes</Title>
        <CreateButton onClick={openCreateModal}>Cadastrar Cliente</CreateButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>CPF</Th>
            <Th>Telefone</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <Tr key={client._id}>
              <Td data-label="Nome">{client.name}</Td>
              <Td data-label="CPF">{client.cpf || 'N/A'}</Td>
              <Td data-label="Telefone">{client.phone || 'N/A'}</Td>
              <Td data-label="Ações">
                <ActionsContainer>
                  <DeleteButton onClick={() => openConfirmDeleteModal(client._id)}>
                    <FaTrash />
                  </DeleteButton>
                </ActionsContainer>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      
      <Modal isOpen={isCreateModalOpen} onRequestClose={closeCreateModal} style={customModalStyles}>
        <ModalTitle>Cadastrar Novo Cliente</ModalTitle>
        <Form onSubmit={handleCreateClient}>
          <Input type="text" placeholder="Nome Completo" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} required />
          <Input type="text" placeholder="CPF (opcional)" value={newClientCpf} onChange={(e) => setNewClientCpf(e.target.value)} />
          <Input type="text" placeholder="Telefone (opcional)" value={newClientPhone} onChange={(e) => setNewClientPhone(e.target.value)} />
          <CreateButton type="submit">Salvar Cliente</CreateButton>
        </Form>
      </Modal>

      <Modal isOpen={isConfirmDeleteModalOpen} onRequestClose={closeConfirmDeleteModal} style={customModalStyles}>
        <ConfirmModalContent>
          <WarningIcon />
          <ModalTitle>Confirmar Exclusão</ModalTitle>
          <p>Tem certeza que deseja excluir este cliente? Todos os rastreios associados a ele também serão excluídos.</p>
          <ConfirmButtons>
            <CancelButton onClick={closeConfirmDeleteModal}>Cancelar</CancelButton>
            <ConfirmButton onClick={handleDeleteClient}>Sim, Excluir</ConfirmButton>
          </ConfirmButtons>
        </ConfirmModalContent>
      </Modal>
    </>
  );
};

export default AdminClientsPage;