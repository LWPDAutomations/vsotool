import React, { useState } from 'react';
import { DocumentType, DocumentUpload as DocumentUploadType } from '../../types/document.types';
import DocumentTypeSelect from './DocumentTypeSelect';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface DocumentUploadProps {
  onDocumentAdded: (document: DocumentUploadType) => void;
}

// Toegestane bestandsformaten
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Gebruiksvriendelijke extensies voor foutmeldingen
const ALLOWED_EXTENSIONS = '.jpg, .jpeg, .png, .pdf, .doc, .docx';

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDocumentAdded }) => {
  // Update the initial state to use the new default document type
  const [documentType, setDocumentType] = useState<DocumentType>('Vaststellingsovereenkomst');
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFileType = (file: File): boolean => {
    return ALLOWED_FILE_TYPES.includes(file.type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Controleer bestandstypen
      const invalidFiles = newFiles.filter(file => !validateFileType(file));
      
      if (invalidFiles.length > 0) {
        // Er zijn ongeldige bestanden
        const invalidFileNames = invalidFiles.map(f => f.name).join(', ');
        
        setError(
          `De volgende bestanden hebben een niet-ondersteund formaat: ${invalidFileNames}. 
          Alleen ${ALLOWED_EXTENSIONS} bestanden zijn toegestaan.`
        );
        
        // Voeg alleen geldige bestanden toe
        const validFiles = newFiles.filter(file => validateFileType(file));
        if (validFiles.length > 0) {
          setFiles(prevFiles => [...prevFiles, ...validFiles]);
        }
      } else {
        // Alle bestanden zijn geldig
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        setError(null);
      }
    }
  };

  const clearSelectedFiles = () => {
    setFiles([]);
    setError(null);
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else if (['doc', 'docx'].includes(extension || '')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Selecteer minimaal één bestand');
      return;
    }

    // Creëer een nieuw document object met de geselecteerde bestanden
    const newDocument: DocumentUploadType = {
      type: documentType,
      files: [...files], // Maak een kopie van de files array
    };

    // Stuur document naar de parent component
    onDocumentAdded(newDocument);

    // Reset formulier
    setDocumentType('Vaststellingsovereenkomst');
    clearSelectedFiles();
    setError(null);
  };

  return (
    <Card title="Document toevoegen">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <DocumentTypeSelect
              value={documentType}
              onChange={setDocumentType}
            />
          </div>
          
          <div className="md:col-span-1">
            <div className="form-group">
              <label htmlFor="file-upload" className="form-label required">
                Documenten
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-100 file:text-gray-700
                  hover:file:bg-gray-200"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
              
              <p className="text-xs text-gray-500 mt-1">
                Toegestane bestandsformaten: {ALLOWED_EXTENSIONS}
              </p>
              
              {error && (
                <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {files.length > 0 && (
                <div className="mt-4 mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      {files.length} {files.length === 1 ? 'bestand' : 'bestanden'} geselecteerd:
                    </p>
                    <button
                      type="button"
                      onClick={clearSelectedFiles}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Wis alle bestanden
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <ul className="text-sm text-gray-600">
                      {files.map((file, index) => (
                        <li key={index} className="mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            {getFileIcon(file.name)}
                            <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                            title="Verwijder dit bestand"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-1">
                Klik meerdere keren op "Bestand kiezen" om meerdere bestanden toe te voegen aan de selectie.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={files.length === 0}>
            Document toevoegen
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DocumentUpload;