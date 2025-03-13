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
      setFiles(Array.from(e.target.files));
      setError(null);
    } else {
      setFiles([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Selecteer minimaal één bestand');
      return;
    }

    onDocumentAdded({
      type: documentType,
      files: files,
    });

    // Reset form
    setDocumentType('VSO');
    setFiles([]);
    setError(null);
    
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <Card>
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
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-100 file:text-gray-700
                  hover:file:bg-gray-200"
                required
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              
              {files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">
                    {files.length} {files.length === 1 ? 'bestand' : 'bestanden'} geselecteerd
                  </p>
                  <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button type="submit">
            Document toevoegen
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DocumentUpload;