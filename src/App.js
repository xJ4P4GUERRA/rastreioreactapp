import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CustomThemeProvider } from './context/ThemeContext'; // <-- MUDANÇA
import GlobalStyles from './globalStyles';

// Importa as suas páginas
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import AdminLayout from './layouts/AdminLayout'; // <-- MUDANÇA
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminClientsPage from './pages/AdminClientsPage';
import AdminNewTrackingPage from './pages/AdminNewTrackingPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

function App() {
  const location = useLocation();

  return (
    <CustomThemeProvider> {/* <-- MUDANÇA */}
      <GlobalStyles />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/rastreio/:trackingCode" element={<TrackingPage />} />
          
          {/* O AdminLayout agora envolve todas as rotas de admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} /> 
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="clients" element={<AdminClientsPage />} />
            <Route path="new-tracking" element={<AdminNewTrackingPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </CustomThemeProvider>
  );
}

export default App;