import React from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../../types/client.types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ClientListProps {
  clients: Client[];
  isLoading: boolean;
}

const ClientList: React.FC<ClientListProps> = ({ clients, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center items-center p-8">
          <div className="w-8 h-8 border-4 border-nab-orange border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Cliënten laden...</span>
        </div>
      </Card>
    );
  }

  if (clients.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Geen cliënten gevonden</p>
          <p className="text-gray-500">Voeg een nieuwe cliënt toe om te beginnen.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Cliënten">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Naam</th>
              <th className="py-3 px-4 text-left">Referentie</th>
              <th className="py-3 px-4 text-left">E-mail</th>
              <th className="py-3 px-4 text-left">Werkgever</th>
              <th className="py-3 px-4 text-center">Acties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  {client.aanhef} {client.voornaam} {client.achternaam}
                </td>
                <td className="py-3 px-4">{client.referentienummer}</td>
                <td className="py-3 px-4">{client.email}</td>
                <td className="py-3 px-4">{client.werkgever.naam}</td>
                <td className="py-3 px-4 text-center">
                  <Link to={`/documents?clientId=${client.id}`}>
                    <Button variant="primary" size="sm">
                      Documenten
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ClientList;