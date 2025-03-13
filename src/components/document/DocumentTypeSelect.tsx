import React from 'react';
import { DocumentType } from '../../types/document.types';
import Select from '../ui/Select';

interface DocumentTypeSelectProps {
  value: DocumentType;
  onChange: (value: DocumentType) => void;
  error?: string;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({
  value,
  onChange,
  error,
}) => {
  const documentTypeOptions = [
    { value: 'VSO', label: 'Vaststellingsovereenkomst (VSO)' },
    { value: 'Arbeidsovereenkomst', label: 'Arbeidsovereenkomst' },
    { value: 'Loonstrook', label: 'Loonstrook' },
    { value: 'Identiteitsbewijs', label: 'Identiteitsbewijs' },
    { value: 'Overig', label: 'Overig document' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as DocumentType);
  };

  return (
    <Select
      label="Document type"
      options={documentTypeOptions}
      value={value}
      onChange={handleChange}
      error={error}
      required
    />
  );
};

export default DocumentTypeSelect;