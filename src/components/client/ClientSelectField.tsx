import React from 'react';
import { Client } from '../../types/client.types';
import Select from '../ui/Select';

interface ClientSelectFieldProps {
  clients: Client[];
  selectedClientId: string | null;
  onChange: (clientId: string) => void;
  isLoading: boolean;
  error?: string;
}

const ClientSelectField: React.FC<ClientSelectFieldProps> = ({
  clients,
  selectedClientId,
  onChange,
  isLoading,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const clientOptions = clients.map(client => ({
    value: client.id,
    label: `${client.aanhef} ${client.voornaam} ${client.achternaam} - ${client.referentienummer}`
  }));

  return (
    <div className="mb-6">
      <Select
        label="Selecteer een cliënt"
        options={clientOptions}
        value={selectedClientId || ''}
        onChange={handleChange}
        disabled={isLoading}
        error={error}
        required
      />
      {isLoading && (
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <div className="w-4 h-4 border-2 border-nab-orange border-t-transparent rounded-full animate-spin mr-2"></div>
          <span>Cliënten laden...</span>
        </div>
      )}
    </div>
  );
};

export default ClientSelectField;