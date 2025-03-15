import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Client } from '../types/client.types';
import { DocumentUpload as DocumentUploadType, JuristName } from '../types/document.types';
import { getClients, getClientById } from '../services/supabase';
import { submitAssessment } from '../services/webhookService';
import { useNotification } from '../context/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ClientSelectField from '../components/client/ClientSelectField';
import DocumentUpload from '../components/document/DocumentUpload';
import DocumentList from '../components/document/DocumentList';
import JuristSelect from '../components/document/JuristSelect';

const DocumentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState<boolean>(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [documents, setDocuments] = useState<DocumentUploadType[]>([]);
  const [selectedJurist, setSelectedJurist] = useState<JuristName | ''>('');
  const [juristError, setJuristError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [clientSelectError, setClientSelectError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchClients = async () => {
      setIsLoadingClients(true);
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        addNotification('error', 'Er is een fout opgetreden bij het ophalen van cliënten');
      } finally {
        setIsLoadingClients(false);
      }
    };

    fetchClients();
    
    // Check if clientId is in URL
    const params = new URLSearchParams(location.search);
    const clientId = params.get('clientId');
    if (clientId) {
      setSelectedClientId(clientId);
    }
  }, [location, addNotification]);
  
  useEffect(() => {
    const fetchClient = async () => {
      if (selectedClientId) {
        try {
          const client = await getClientById(selectedClientId);
          setSelectedClient(client);
          setClientSelectError(null);
        } catch (error) {
          console.error('Error fetching client:', error);
          addNotification('error', 'Er is een fout opgetreden bij het ophalen van de cliëntgegevens');
          setSelectedClient(null);
        }
      } else {
        setSelectedClient(null);
      }
    };

    fetchClient();
  }, [selectedClientId, addNotification]);

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    
    // Update URL
    navigate(`/documents?clientId=${clientId}`);
  };

  const handleDeselectClient = () => {
    setSelectedClientId(null);
    setSelectedClient(null);
    setDocuments([]);
    setSelectedJurist('');
    setJuristError(null);
    
    // Update URL to remove clientId parameter
    navigate('/documents');
  };

  const handleDocumentAdded = (document: DocumentUploadType) => {
    // Gebruik functionele update voor state om racecondities te voorkomen
    setDocuments(prevDocuments => [...prevDocuments, document]);
    
    console.log('Document toegevoegd:', document);
    addNotification('success', 'Document succesvol toegevoegd');
  };

  const handleDocumentRemoved = (index: number) => {
    // Gebruik functionele update voor state
    setDocuments(prevDocuments => {
      const updatedDocuments = [...prevDocuments];
      updatedDocuments.splice(index, 1);
      return updatedDocuments;
    });
    
    addNotification('info', 'Document verwijderd');
  };

  const handleJuristChange = (jurist: JuristName) => {
    setSelectedJurist(jurist);
    setJuristError(null);
  };

  const handleSubmit = async () => {
    // Validatie
    let hasError = false;

    if (!selectedClient) {
      setClientSelectError('Selecteer eerst een cliënt');
      hasError = true;
    }
    
    if (documents.length === 0) {
      addNotification('error', 'Voeg ten minste één document toe');
      hasError = true;
    }

    if (!selectedJurist) {
      setJuristError('Selecteer een jurist voor de beoordeling');
      hasError = true;
    }

    if (hasError) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await submitAssessment(selectedClient!, {
        clientId: selectedClient!.id,
        documents: documents,
        jurist: selectedJurist as JuristName
      });
      
      if (success) {
        addNotification('success', `Beoordeling succesvol aangevraagd en toegewezen aan ${selectedJurist}. U ontvangt de resultaten binnen 5 minuten in uw e-mail.`);
        setDocuments([]);
        setSelectedJurist('');
      } else {
        addNotification('error', 'Er is een fout opgetreden bij het aanvragen van de beoordeling');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      addNotification('error', 'Er is een fout opgetreden bij het aanvragen van de beoordeling');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">VSO Beoordeling</h1>
      
      {!selectedClient ? (
        <Card title="Selecteer een cliënt">
          <ClientSelectField
            clients={clients}
            selectedClientId={selectedClientId}
            onChange={handleClientChange}
            isLoading={isLoadingClients}
            error={clientSelectError || undefined}
          />
        </Card>
      ) : (
        <>
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Geselecteerde cliënt</h2>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleDeselectClient}
              >
                Andere cliënt kiezen
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Cliëntgegevens</h3>
                <p className="mb-1"><span className="font-medium">Naam:</span> {selectedClient.aanhef} {selectedClient.voornaam} {selectedClient.achternaam}</p>
                <p className="mb-1"><span className="font-medium">Referentie:</span> {selectedClient.referentienummer}</p>
                <p className="mb-1"><span className="font-medium">E-mail:</span> {selectedClient.email}</p>
                <p className="mb-1"><span className="font-medium">Adres:</span> {selectedClient.adres}</p>
                <p><span className="font-medium">Postcode & Plaats:</span> {selectedClient.postcode}, {selectedClient.woonplaats}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Werkgevergegevens</h3>
                <p className="mb-1"><span className="font-medium">Naam:</span> {selectedClient.werkgever.naam}</p>
                <p className="mb-1"><span className="font-medium">Contactpersoon:</span> {selectedClient.werkgever.contactpersoon.aanhef} {selectedClient.werkgever.contactpersoon.voornaam} {selectedClient.werkgever.contactpersoon.achternaam}</p>
                <p className="mb-1"><span className="font-medium">E-mail contactpersoon:</span> {selectedClient.werkgever.contactpersoon.email}</p>
                <p className="mb-1"><span className="font-medium">Adres:</span> {selectedClient.werkgever.adres}</p>
                <p><span className="font-medium">Postcode & Plaats:</span> {selectedClient.werkgever.postcode}, {selectedClient.werkgever.plaats}</p>
              </div>
            </div>
          </Card>

          <DocumentUpload onDocumentAdded={handleDocumentAdded} />
          
          <DocumentList 
            documents={documents} 
            onRemove={handleDocumentRemoved} 
          />
          
          {documents.length > 0 && (
            <Card title="Jurist toewijzen" className="bg-blue-50 border border-blue-200">
              <div className="mb-4">
                <p className="text-blue-800 mb-2">
                  <strong>Belangrijk:</strong> Selecteer de jurist die deze documenten gaat beoordelen.
                </p>
                <JuristSelect
                  value={selectedJurist}
                  onChange={handleJuristChange}
                  error={juristError || undefined}
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button 
                  onClick={handleSubmit} 
                  isLoading={isSubmitting}
                >
                  Beoordeling aanvragen
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default DocumentPage;