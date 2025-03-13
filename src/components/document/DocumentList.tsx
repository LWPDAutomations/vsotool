import React from 'react';
import { DocumentUpload as DocumentUploadType } from '../../types/document.types';
import Card from '../ui/Card';

interface DocumentListProps {
  documents: DocumentUploadType[];
  onRemove: (index: number) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onRemove }) => {
  if (documents.length === 0) {
    return null;
  }

  return (
    <Card title="Toegevoegde documenten">
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md flex justify-between items-start">
            <div>
              <h4 className="font-medium text-nab-blue">
                {doc.type}
              </h4>
              <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                {doc.files.map((file, fileIndex) => (
                  <li key={fileIndex}>{file.name}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700"
              title="Verwijderen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DocumentList;