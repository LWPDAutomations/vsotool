import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClients, deleteClient } from '../services/supabase';
import { Client } from '../types/client.types';
import { useNotification } from '../context/NotificationContext';
import ClientForm from '../components/client/ClientForm';
import ClientList from '../components/client/ClientList';
import Button from '../components/ui/Button';

const ClientPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addNotification } = useNotification();

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const data = await getClients();
      // Toon alleen de 5 meest recente cliënten
      const recentClients = data.slice(0, 5);
      setClients(recentClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      addNotification('error', 'Er is een fout opgetreden bij het ophalen van cliënten');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      // Update de client lijst na verwijderen
      setClients(clients.filter(client => client.id !== clientId));
      addNotification('success', 'Cliënt succesvol verwijderd');
    } catch (error) {
      console.error('Error deleting client:', error);
      addNotification('error', 'Er is een fout opgetreden bij het verwijderen van de cliënt');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cliëntbeheer</h1>
        <Link to="/clients/database">
          <Button variant="primary">
            Naar cliëntendatabase
          </Button>
        </Link>
      </div>
      
      <ClientForm onClientCreated={fetchClients} />
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent toegevoegde cliënten</h2>
          <Link to="/clients/database" className="text-nab-orange hover:underline">
            Bekijk alle cliënten
          </Link>
        </div>
        
        <ClientList 
          clients={clients} 
          isLoading={isLoading}
          onDeleteClient={handleDeleteClient}
        />
      </div>
    </div>
  );
};

export default ClientPage;