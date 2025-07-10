import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from './globalStyles';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
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
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas de Admin Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="clients" element={<AdminClientsPage />} />
              <Route path="new-tracking" element={<AdminNewTrackingPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

// Exportamos o App diretamente, sem o Wrapper
export default App;