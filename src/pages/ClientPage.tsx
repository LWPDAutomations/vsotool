import React, { useState, useEffect } from 'react';
import { getClients } from '../services/supabase';
import { Client } from '../types/client.types';
import { useNotification } from '../context/NotificationContext';
import ClientForm from '../components/client/ClientForm';
import ClientList from '../components/client/ClientList';

const ClientPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addNotification } = useNotification();

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const data = await getClients();
      setClients(data);
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

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Cliëntbeheer</h1>
      
      <ClientForm onClientCreated={fetchClients} />
      
      <ClientList 
        clients={clients} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default ClientPage;