import React, { useState } from 'react';
import { DocumentType, DocumentUpload as DocumentUploadType } from '../../types/document.types';
import DocumentTypeSelect from './DocumentTypeSelect';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface DocumentUploadProps {
  onDocumentAdded: (document: DocumentUploadType) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDocumentAdded }) => {
  const [documentType, setDocumentType] = useState<DocumentType>('VSO');
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Voeg nieuwe bestanden toe aan de bestaande lijst in plaats van te vervangen
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setError(null);
    }
  };

  const clearSelectedFiles = () => {
    setFiles([]);
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
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
    setDocumentType('VSO');
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
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-nab-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
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