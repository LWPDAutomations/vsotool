import React from 'react';
import { JuristName } from '../../types/document.types';
import Select from '../ui/Select';

interface JuristSelectProps {
  value: JuristName | '';
  onChange: (value: JuristName) => void;
  error?: string;
}

const JuristSelect: React.FC<JuristSelectProps> = ({
  value,
  onChange,
  error,
}) => {
  const juristOptions = [
    { value: 'Ilse Kers', label: 'Ilse Kers' },
    { value: 'Linda Lemckert', label: 'Linda Lemckert' },
    { value: 'Lars', label: 'Lars' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as JuristName);
  };

  return (
    <Select
      label="Selecteer jurist voor beoordeling"
      options={juristOptions}
      value={value}
      onChange={handleChange}
      error={error}
      required
    />
  );
};

export default JuristSelect;