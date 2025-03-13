import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClients, deleteClient } from '../services/supabase';
import { Client } from '../types/client.types';
import { useNotification } from '../context/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ClientDatabasePage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<string>('achternaam');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { addNotification } = useNotification();
  
  const clientsPerPage = 10;

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const data = await getClients();
      setClients(data);
      setFilteredClients(data);
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

  useEffect(() => {
    // Filter clients when search term changes
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = clients.filter(
        client => 
          client.voornaam.toLowerCase().includes(lowercaseSearch) ||
          client.achternaam.toLowerCase().includes(lowercaseSearch) ||
          client.referentienummer.toLowerCase().includes(lowercaseSearch) ||
          client.email.toLowerCase().includes(lowercaseSearch) ||
          client.werkgever.naam.toLowerCase().includes(lowercaseSearch)
      );
      setFilteredClients(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, clients]);
  
  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (clientToDelete) {
      setDeletingClientId(clientToDelete.id);
      try {
        await deleteClient(clientToDelete.id);
        setClients(prev => prev.filter(client => client.id !== clientToDelete.id));
        addNotification('success', 'Cliënt succesvol verwijderd');
      } catch (error) {
        console.error('Error deleting client:', error);
        addNotification('error', 'Er is een fout opgetreden bij het verwijderen van de cliënt');
      } finally {
        setDeletingClientId(null);
        setShowConfirmDialog(false);
        setClientToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setClientToDelete(null);
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedClients = () => {
    return [...filteredClients].sort((a, b) => {
      let valA, valB;
      
      // Handle nested fields
      if (sortField === 'werkgever') {
        valA = a.werkgever.naam.toLowerCase();
        valB = b.werkgever.naam.toLowerCase();
      } else if (sortField === 'naam') {
        valA = `${a.achternaam} ${a.voornaam}`.toLowerCase();
        valB = `${b.achternaam} ${b.voornaam}`.toLowerCase();
      } else {
        // @ts-ignore - we know these fields exist
        valA = a[sortField]?.toString().toLowerCase();
        // @ts-ignore
        valB = b[sortField]?.toString().toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  };

  const sortedClients = getSortedClients();
  
  // Get current page clients
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = sortedClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(sortedClients.length / clientsPerPage);

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <span className="ml-1">↑</span> 
      : <span className="ml-1">↓</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cliëntendatabase</h1>
        <Link to="/clients">
          <Button variant="primary" size="sm">
            Naar cliënt toevoegen
          </Button>
        </Link>
      </div>

      <Card>
        <div className="mb-6">
          <Input
            label="Zoeken"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek op naam, referentie, e-mail of werkgever..."
            className="max-w-md"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="w-8 h-8 border-4 border-nab-orange border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2">Cliënten laden...</span>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Geen cliënten gevonden</p>
            {searchTerm && (
              <p className="text-gray-500">Probeer een andere zoekopdracht</p>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th 
                      className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('naam')}
                    >
                      <div className="flex items-center">
                        Naam {renderSortIcon('naam')}
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('referentienummer')}
                    >
                      <div className="flex items-center">
                        Referentie {renderSortIcon('referentienummer')}
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center">
                        E-mail {renderSortIcon('email')}
                      </div>
                    </th>
                    <th 
                      className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSort('werkgever')}
                    >
                      <div className="flex items-center">
                        Werkgever {renderSortIcon('werkgever')}
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentClients.map((client) => (
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Toon {indexOfFirstClient + 1} - {Math.min(indexOfLastClient, filteredClients.length)} van {filteredClients.length} cliënten
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Vorige
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show 5 pages max with current in middle
                      let pageToShow;
                      if (totalPages <= 5) {
                        pageToShow = i + 1;
                      } else {
                        const startPage = Math.max(1, currentPage - 2);
                        const endPage = Math.min(totalPages, startPage + 4);
                        pageToShow = startPage + i;
                        if (pageToShow > endPage) return null;
                      }
                      
                      return (
                        <button
                          key={pageToShow}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === pageToShow 
                              ? 'bg-nab-blue text-white' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          onClick={() => setCurrentPage(pageToShow)}
                        >
                          {pageToShow}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-1">...</span>
                        <button
                          className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Volgende
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
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
    </div>
  );
};

export default ClientDatabasePage;