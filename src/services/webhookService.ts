import axios from 'axios';
import { Client } from '../types/client.types';
import { DocumentSubmission, ProcessedDocument } from '../types/document.types';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

interface WebhookPayload {
  client: Client;
  documents: ProcessedDocument[];
}

export const submitAssessment = async (
  client: Client, 
  documentSubmission: DocumentSubmission
): Promise<boolean> => {
  try {
    // Verwerk de documenten - lees bestandsinhoud en hernoem
    const processedDocuments: ProcessedDocument[] = [];
    const typeCountMap: Record<string, number> = {};
    
    for (const docUpload of documentSubmission.documents) {
      for (const file of docUpload.files) {
        // Base64-encodering van het bestand
        const fileContent = await readFileAsBase64(file);
        
        // Bepaal de bestandsnaam op basis van type
        const count = typeCountMap[docUpload.type] || 0;
        typeCountMap[docUpload.type] = count + 1;
        
        const name = count === 0 
          ? `${docUpload.type}` 
          : `${docUpload.type} (${count})`;
        
        processedDocuments.push({
          name,
          originalName: file.name,
          type: docUpload.type,
          mimeType: file.type, // Add MIME type from the file object
          fileContent
        });
      }
    }
    
    // Stuur gegevens naar webhook
    const payload: WebhookPayload = {
      client,
      documents: processedDocuments
    };
    
    await axios.post(WEBHOOK_URL, payload);
    return true;
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return false;
  }
};

// Helper functie om bestand om te zetten naar base64
const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        // Verwijder prefix zoals "data:application/pdf;base64," voor het opslaan
        const base64String = reader.result.toString();
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      } else {
        reject(new Error('Error reading file'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};