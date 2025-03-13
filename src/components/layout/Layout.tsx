import React, { ReactNode } from 'react';
import Header from './Header';
import Notification from '../ui/Notification';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-nab-blue text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} De Nationale Adviesbalie</p>
        </div>
      </footer>
      <Notification />
    </div>
  );
};

export default Layout;