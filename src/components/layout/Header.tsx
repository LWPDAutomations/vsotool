import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
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
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex space-x-1 mr-6">
            <Link 
              to="/clients" 
              className={`px-3 py-2 rounded-md ${
                isActivePath('/clients') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
            >
              Cliënt toevoegen
            </Link>
            
            <Link 
              to="/clients/database" 
              className={`px-3 py-2 rounded-md ${
                isActivePath('/clients/database') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
            >
              Cliëntendatabase
            </Link>
            
            <Link 
              to="/documents" 
              className={`px-3 py-2 rounded-md ${
                isActivePath('/documents') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
            >
              VSO Beoordelen
            </Link>
            
            <Link 
              to="/help" 
              className={`px-3 py-2 rounded-md ${
                isActivePath('/help') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Handleiding
              </div>
            </Link>
          </div>
          
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleLogout}
          >
            Uitloggen
          </Button>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <Link 
              to="/clients" 
              className={`block px-3 py-2 rounded-md ${
                isActivePath('/clients') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Cliënt toevoegen
            </Link>
            
            <Link 
              to="/clients/database" 
              className={`block px-3 py-2 rounded-md ${
                isActivePath('/clients/database') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Cliëntendatabase
            </Link>
            
            <Link 
              to="/documents" 
              className={`block px-3 py-2 rounded-md ${
                isActivePath('/documents') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              VSO Beoordelen
            </Link>
            
            <Link 
              to="/help" 
              className={`block px-3 py-2 rounded-md ${
                isActivePath('/help') 
                  ? 'bg-gray-100 text-nab-orange' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-nab-orange'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Handleiding
              </div>
            </Link>
            
            <div className="pt-2 pb-1">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleLogout}
                className="w-full justify-center"
              >
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;