import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Notification from '../ui/Notification';
import SessionTimeoutWarning from '../auth/SessionTimeoutWarning';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { resetSessionTimer } = useAuth();
  
  // Reset session timer on initial render
  useEffect(() => {
    resetSessionTimer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-nab-blue text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} PromptGorillas</p>
        </div>
      </footer>
      <Notification />
      <SessionTimeoutWarning />
    </div>
  );
};

export default Layout;