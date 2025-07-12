import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import api from '../api/axiosConfig'; // <-- ALTERADO
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';

// ... (Todos os `styled-components` continuam iguais)
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
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  vertical-align: middle;
`;
const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const ActionButton = styled.button`
  background-color: #3b82f6;
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
  &:hover { background-color: #2563eb; }
`;
const DeleteButton = styled(ActionButton)`
  background-color: #EF4444;
  &:hover { background-color: #DC2626; }
`;
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
`;
const Select = styled.select`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;
const ModalTitle = styled.h2`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
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
const ConfirmButton = styled(ActionButton)`
  background-color: #DC2626;
  &:hover { background-color: #B91C1C; }
`;
const CancelButton = styled(ActionButton)`
  background-color: #6B7281;
  &:hover { background-color: #4B5563; }
`;

const statusOptions = ['Confirmado', 'Preparação', 'Em Trânsito', 'Em Rota', 'Entregue'];

Modal.setAppElement('#root');

const AdminDashboardPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [packageToDeleteId, setPackageToDeleteId] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [newStatus, setNewStatus] = useState(statusOptions[0]);
  const [newLocal, setNewLocal] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  // A chave de API agora é adicionada automaticamente pelo axiosConfig

  const fetchPackages = async () => {
    try {
      setLoading(true);
      // ALTERADO: Usa 'api' e a URL relativa
      const response = await api.get('/admin/packages');
      setPackages(response.data);
    } catch (err) {
      setError('Falha ao carregar os pacotes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []); // apiKey removido das dependências

  const openUpdateModal = (pkg) => {
    setSelectedPackage(pkg);
    const currentIndex = statusOptions.indexOf(pkg.status);
    const nextStatus = (currentIndex > -1 && currentIndex < statusOptions.length - 1) ? statusOptions[currentIndex + 1] : statusOptions[0];
    setNewStatus(nextStatus);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPackage(null);
    setNewStatus(statusOptions[0]);
    setNewLocal('');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedPackage) return;
    try {
      // ALTERADO: Usa 'api' e a URL relativa
      await api.put(
        `/admin/packages/${selectedPackage.code}/update`,
        { status: newStatus, local: newLocal }
      );
      closeUpdateModal();
      fetchPackages();
    } catch (err) {
      alert('Erro ao atualizar o status.');
    }
  };

  const openConfirmDeleteModal = (id) => {
    setPackageToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setPackageToDeleteId(null);
  };

  const handleDeletePackage = async () => {
    if (!packageToDeleteId) return;
    try {
      // ALTERADO: Usa 'api' e a URL relativa
      await api.delete(`/admin/packages/${packageToDeleteId}`);
      fetchPackages();
      closeConfirmDeleteModal();
    } catch (err) {
      alert('Erro ao excluir o pacote.');
    }
  };

  const customModalStyles = {
    content: {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.cardBg,
      border: `1px solid ${theme.border}`,
      borderRadius: '16px', padding: '2rem', color: theme.text,
      maxWidth: '500px', width: '90%',
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }
  };

  if (loading) return <Title>Carregando pacotes...</Title>;
  if (error) return <Title style={{ color: '#EF4444' }}>{error}</Title>;

  return (
    <>
      <Header>
        <Title>Visão Geral dos Rastreios</Title>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>Cliente</Th>
            <Th>Status Atual</Th>
            <Th>Previsão de Entrega</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <tr key={pkg._id}>
                <Td>{pkg.code}</Td>
                <Td>{pkg.client?.name || 'Não vinculado'}</Td>
                <Td>{pkg.status}</Td>
                <Td>{pkg.previsaoEntrega}</Td>
                <Td>
                  <ActionsContainer>
                    <ActionButton onClick={() => openUpdateModal(pkg)}>
                      Atualizar Status
                    </ActionButton>
                    <DeleteButton onClick={() => openConfirmDeleteModal(pkg._id)}>
                      <FaTrash />
                    </DeleteButton>
                  </ActionsContainer>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="5" style={{ textAlign: 'center' }}>Nenhum pacote cadastrado ainda.</Td>
            </tr>
          )}
        </tbody>
      </Table>
      
      <Modal isOpen={isUpdateModalOpen} onRequestClose={closeUpdateModal} style={customModalStyles} contentLabel="Atualizar Status do Pacote">
        <ModalTitle>Atualizar Rastreio: {selectedPackage?.code}</ModalTitle>
        <Form onSubmit={handleUpdateStatus}>
          <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            {statusOptions.map(option => (<option key={option} value={option}>{option}</option>))}
          </Select>
          <Input type="text" placeholder="Local da Atualização (ex: Centro de Distribuição/SP)" value={newLocal} onChange={(e) => setNewLocal(e.target.value)} required />
          <ActionButton as="button" type="submit" style={{alignSelf: 'flex-start'}}>Salvar Atualização</ActionButton>
        </Form>
      </Modal>

      <Modal isOpen={isConfirmDeleteModalOpen} onRequestClose={closeConfirmDeleteModal} style={customModalStyles} contentLabel="Confirmar Exclusão">
        <ConfirmModalContent>
          <WarningIcon />
          <ModalTitle>Confirmar Exclusão</ModalTitle>
          <p>Tem certeza que deseja excluir este rastreio? Esta ação não pode ser desfeita.</p>
          <ConfirmButtons>
            <CancelButton onClick={closeConfirmDeleteModal}>Cancelar</CancelButton>
            <ConfirmButton onClick={handleDeletePackage}>Sim, Excluir</ConfirmButton>
          </ConfirmButtons>
        </ConfirmModalContent>
      </Modal>
    </>
  );
};

export default AdminDashboardPage;