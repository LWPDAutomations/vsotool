import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ 
  label, 
  options, 
  error, 
  required = false,
  className = '',
  ...rest 
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label className={`form-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <select 
        className={`select ${error ? 'border-red-500 focus:ring-red-300' : ''} ${className}`}
        ref={ref}
        {...rest}
      >
        <option value="">Select an option ...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;