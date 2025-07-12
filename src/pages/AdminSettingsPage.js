import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import api from '../api/axiosConfig';
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
const CreateButton = styled.button`
  background-color: #10B981;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover { background-color: #059669; }
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
`;
const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
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
const ConfirmModalContent = styled.div` /* ... */ `;
const WarningIcon = styled(FaExclamationTriangle)` /* ... */ `;
const ConfirmButtons = styled.div` /* ... */ `;
const ConfirmButton = styled(DeleteButton)` /* ... */ `;
const CancelButton = styled(CreateButton)` /* ... */ `;

Modal.setAppElement('#root');

const AdminSettingsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [adminToDeleteId, setAdminToDeleteId] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      // CORREÇÃO: Adicionado /api/
      const response = await api.get('/api/auth/users');
      setAdmins(response.data.data);
    } catch (err) {
      setError('Falha ao carregar administradores. Você tem permissão?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setUsername('');
    setPassword('');
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      // CORREÇÃO: Adicionado /api/. A chave de API já é enviada pelo interceptor.
      await api.post('/api/auth/register', { username, password });
      closeCreateModal();
      fetchAdmins(); 
    } catch (err) {
      alert('Erro ao criar admin. Verifique se o usuário já existe.');
    }
  };

  const openConfirmDeleteModal = (id) => {
    setAdminToDeleteId(id);
    setIsConfirmDeleteModalOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setAdminToDeleteId(null);
  };

  const handleDeleteAdmin = async () => {
    if (!adminToDeleteId) return;
    try {
      // CORREÇÃO: Adicionado /api/
      await api.delete(`/api/auth/users/${adminToDeleteId}`);
      fetchAdmins();
      closeConfirmDeleteModal();
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao excluir o administrador.');
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

  if (loading) return <Title>Carregando...</Title>;
  if (error) return <Title style={{color: '#EF4444'}}>{error}</Title>;

  return (
    <>
      <Header>
        <Title>Gerenciamento de Administradores</Title>
        <CreateButton onClick={openCreateModal}>Adicionar Admin</CreateButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>Usuário</Th>
            <Th>ID do Usuário</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <Td>{admin.username}</Td>
              <Td>{admin._id}</Td>
              <Td>
                <ActionsContainer>
                  <DeleteButton onClick={() => openConfirmDeleteModal(admin._id)}>
                    <FaTrash />
                  </DeleteButton>
                </ActionsContainer>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal isOpen={isCreateModalOpen} onRequestClose={closeCreateModal} style={customModalStyles}>
        <ModalTitle>Adicionar Novo Administrador</ModalTitle>
        <Form onSubmit={handleCreateAdmin}>
          <Input type="text" placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          <CreateButton type="submit">Criar Administrador</CreateButton>
        </Form>
      </Modal>

      <Modal isOpen={isConfirmDeleteModalOpen} onRequestClose={closeConfirmDeleteModal} style={customModalStyles}>
        {/* ... O conteúdo do modal de confirmação permanece o mesmo ... */}
      </Modal>
    </>
  );
};

export default AdminSettingsPage;