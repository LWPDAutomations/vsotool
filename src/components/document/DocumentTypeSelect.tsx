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
    { value: 'Vaststellingsovereenkomst', label: 'Vaststellingsovereenkomst (VSO)' },
    { value: 'Begeleidend schrijven wg bij vso', label: 'Begeleidend schrijven werkgever bij VSO' },
    { value: 'Aangeleverde info van werknemer', label: 'Aangeleverde info van werknemer' },
    { value: 'Arbeidsovereenkomst', label: 'Arbeidsovereenkomst' },
    { value: 'Loonstrook', label: 'Loonstrook' },
    { value: 'CAO', label: 'CAO' },
    { value: 'Personeelshandboek', label: 'Personeelshandboek' },
    { value: 'Telefoonnotitie n.a.v. intake', label: 'Telefoonnotitie n.a.v. intake' },
    { value: 'Rapport bedrijfsarts', label: 'Rapport bedrijfsarts' },
    { value: 'WIA-beschikking', label: 'WIA-beschikking' },
    { value: 'Bonusregeling', label: 'Bonusregeling' },
    { value: 'Autoregeling', label: 'Autoregeling' },
    { value: 'Sociaal plan', label: 'Sociaal plan' },
    { value: 'Correspondentie tussen wg-wn', label: 'Correspondentie tussen werkgever-werknemer' },
    { value: 'Beoordelings/functioneringsverslag', label: 'Beoordelings/functioneringsverslag' },
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