import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <h1 className="text-4xl font-bold text-nab-blue mb-2">404</h1>
      <h2 className="text-2xl mb-6">Pagina niet gevonden</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        De pagina die u probeert te bezoeken bestaat niet of is verplaatst.
      </p>
      <Link to="/">
        <Button>Terug naar de hoofdpagina</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;