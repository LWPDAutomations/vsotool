import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import LoginPage from './pages/LoginPage';
import ClientPage from './pages/ClientPage';
import ClientDatabasePage from './pages/ClientDatabasePage';
import DocumentPage from './pages/DocumentPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route 
                path="/clients" 
                element={
                  <Layout>
                    <ClientPage />
                  </Layout>
                } 
              />
              <Route 
                path="/clients/database" 
                element={
                  <Layout>
                    <ClientDatabasePage />
                  </Layout>
                } 
              />
              <Route 
                path="/documents" 
                element={
                  <Layout>
                    <DocumentPage />
                  </Layout>
                } 
              />
              <Route 
                path="/help" 
                element={
                  <Layout>
                    <HelpPage />
                  </Layout>
                } 
              />
            </Route>
            
            <Route path="/" element={<Navigate to="/clients" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;