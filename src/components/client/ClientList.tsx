import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../../types/client.types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ClientListProps {
  clients: Client[];
  isLoading: boolean;
  onDeleteClient: (id: string) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, isLoading, onDeleteClient }) => {
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

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

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setDeletingClientId(clientToDelete.id);
      onDeleteClient(clientToDelete.id);
      setShowConfirmDialog(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setClientToDelete(null);
  };

  return (
    <>
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
                    <div className="flex justify-center space-x-2">
                      <Link to={`/documents?clientId=${client.id}`}>
                        <Button variant="primary" size="sm">
                          Documenten
                        </Button>
                      </Link>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleDeleteClick(client)}
                        isLoading={deletingClientId === client.id}
                      >
                        Verwijderen
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bevestigingsdialoog voor het verwijderen */}
      {showConfirmDialog && clientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cliënt verwijderen</h3>
            <p className="mb-6 text-gray-700">
              Weet je zeker dat je de cliënt <span className="font-medium">{clientToDelete.aanhef} {clientToDelete.voornaam} {clientToDelete.achternaam}</span> wilt verwijderen? 
              Deze actie kan niet ongedaan worden gemaakt.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={cancelDelete}>
                Annuleren
              </Button>
              <Button variant="primary" onClick={confirmDelete}>
                Verwijderen
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientList;