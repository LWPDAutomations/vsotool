import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
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
      <input 
        className={`input ${error ? 'border-red-500 focus:ring-red-300' : ''} ${className}`}
        ref={ref}
        {...rest} 
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;