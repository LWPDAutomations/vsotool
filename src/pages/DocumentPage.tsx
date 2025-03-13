import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Client } from '../types/client.types';
import { DocumentUpload as DocumentUploadType } from '../types/document.types';
import { getClients, getClientById } from '../services/supabase';
import { submitAssessment } from '../services/webhookService';
import { useNotification } from '../context/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ClientSelectField from '../components/client/ClientSelectField';
import DocumentUpload from '../components/document/DocumentUpload';
import DocumentList from '../components/document/DocumentList';

const DocumentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState<boolean>(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [documents, setDocuments] = useState<DocumentUploadType[]>([]);
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
  }, [location]);
  
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
  }, [selectedClientId]);

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    
    // Update URL
    navigate(`/documents?clientId=${clientId}`);
  };

  const handleDocumentAdded = (document: DocumentUploadType) => {
    setDocuments([...documents, document]);
    addNotification('success', 'Document succesvol toegevoegd');
  };

  const handleDocumentRemoved = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
    addNotification('info', 'Document verwijderd');
  };

  const handleSubmit = async () => {
    // Validatie
    if (!selectedClient) {
      setClientSelectError('Selecteer eerst een cliënt');
      return;
    }
    
    if (documents.length === 0) {
      addNotification('error', 'Voeg ten minste één document toe');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await submitAssessment(selectedClient, {
        clientId: selectedClient.id,
        documents: documents
      });
      
      if (success) {
        addNotification('success', 'Beoordeling succesvol aangevraagd. U ontvangt de resultaten binnen 5 minuten in uw e-mail.');
        setDocuments([]);
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
      <h1 className="text-2xl font-bold">Documentbeoordeling</h1>
      
      <Card title="Selecteer een cliënt">
        <ClientSelectField
          clients={clients}
          selectedClientId={selectedClientId}
          onChange={handleClientChange}
          isLoading={isLoadingClients}
          error={clientSelectError || undefined}
        />
      </Card>
      
      {selectedClient && (
        <>
          <DocumentUpload onDocumentAdded={handleDocumentAdded} />
          
          <DocumentList 
            documents={documents} 
            onRemove={handleDocumentRemoved} 
          />
          
          {documents.length > 0 && (
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit} 
                isLoading={isSubmitting}
              >
                Beoordeling aanvragen
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DocumentPage;