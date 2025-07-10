import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Verifica se o token existe no localStorage
  const token = localStorage.getItem('authToken');

  // Se o token existe, renderiza a página de admin solicitada (usando o <Outlet />).
  // Se não, redireciona para a página de login.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;