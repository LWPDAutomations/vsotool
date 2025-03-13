import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/assets/logo.svg" 
            alt="De Nationale Adviesbalie" 
            className="h-10 mr-4"
          />
          <h1 className="text-xl font-semibold text-nab-blue">
            VSO Document Systeem
          </h1>
        </div>
        
        <nav className="flex items-center">
          <Link 
            to="/clients" 
            className="text-gray-700 hover:text-nab-orange mr-4"
          >
            Cliënten
          </Link>
          <Link 
            to="/documents" 
            className="text-gray-700 hover:text-nab-orange mr-6"
          >
            Documenten
          </Link>
          
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleLogout}
          >
            Uitloggen
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;