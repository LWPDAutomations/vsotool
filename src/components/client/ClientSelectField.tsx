import React, { useState, useEffect, useRef } from 'react';
import { Client } from '../../types/client.types';
import Select from '../ui/Select';
import Input from '../ui/Input';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter clients when search term changes or clients list changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = clients.filter(
        client => 
          `${client.voornaam} ${client.achternaam}`.toLowerCase().includes(lowerCaseSearch) ||
          client.referentienummer.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  // Setup click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Toon dropdown alleen als er iets getypt is
    setShowDropdown(e.target.value.trim() !== '');
  };

  const handleInputFocus = () => {
    // Toon dropdown alleen als er al iets ingevuld is
    if (searchTerm.trim() !== '') {
      setShowDropdown(true);
    }
  };

  const handleClientSelect = (clientId: string) => {
    onChange(clientId);
    
    // Vind de geselecteerde cliënt en zet de zoekterm naar zijn naam
    const selectedClient = clients.find(client => client.id === clientId);
    if (selectedClient) {
      setSearchTerm(`${selectedClient.voornaam} ${selectedClient.achternaam}`);
    }
    
    setShowDropdown(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    
    // Vind de geselecteerde cliënt en zet de zoekterm naar zijn naam
    if (e.target.value) {
      const selectedClient = clients.find(client => client.id === e.target.value);
      if (selectedClient) {
        setSearchTerm(`${selectedClient.voornaam} ${selectedClient.achternaam}`);
      }
    } else {
      setSearchTerm('');
    }
  };

  // Update search term when selectedClientId changes
  useEffect(() => {
    if (selectedClientId) {
      const selectedClient = clients.find(client => client.id === selectedClientId);
      if (selectedClient) {
        setSearchTerm(`${selectedClient.voornaam} ${selectedClient.achternaam}`);
      }
    } else {
      setSearchTerm('');
    }
  }, [selectedClientId, clients]);

  return (
    <div>
      <div className="mb-4">
        <label className="form-label required">Selecteer een cliënt</label>
        <div className="relative">
          <Input
            placeholder="Zoek op naam of referentienummer..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleInputFocus}
            className="mb-0"
            ref={inputRef}
          />
          
          {showDropdown && (
            <div 
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
              ref={dropdownRef}
            >
              {isLoading ? (
                <div className="flex items-center p-3 text-gray-500">
                  <div className="w-4 h-4 border-2 border-nab-orange border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Cliënten laden...</span>
                </div>
              ) : filteredClients.length === 0 ? (
                <div className="p-3 text-gray-500">Geen cliënten gevonden</div>
              ) : (
                <ul>
                  {filteredClients.map(client => (
                    <li 
                      key={client.id}
                      className={`p-3 cursor-pointer hover:bg-gray-100 ${
                        selectedClientId === client.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => handleClientSelect(client.id)}
                    >
                      <div className="font-medium">{client.aanhef} {client.voornaam} {client.achternaam}</div>
                      <div className="text-sm text-gray-500">
                        Ref: {client.referentienummer} | {client.werkgever.naam}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        Of selecteer uit de lijst:
      </div>
      
      <Select
        options={clients.map(client => ({
          value: client.id,
          label: `${client.aanhef} ${client.voornaam} ${client.achternaam} - ${client.referentienummer}`
        }))}
        value={selectedClientId || ''}
        onChange={handleSelectChange}
        disabled={isLoading}
        error={undefined}
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