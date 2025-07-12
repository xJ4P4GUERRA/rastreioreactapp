import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from './globalStyles';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminClientsPage from './pages/AdminClientsPage';
import AdminNewTrackingPage from './pages/AdminNewTrackingPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/rastreio/:trackingCode" element={<TrackingPage />} />
          
          {/* A rota de login foi removida */}

          {/* Rotas de Admin agora são públicas e diretas */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Redireciona /admin para /admin/dashboard */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} /> 
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="clients" element={<AdminClientsPage />} />
            <Route path="new-tracking" element={<AdminNewTrackingPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
