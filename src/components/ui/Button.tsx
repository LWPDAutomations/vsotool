import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className = '',
  disabled,
  ...rest 
}) => {
  // Base classes
  const baseClasses = 'btn';
  
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };
  
  // Loading state
  const loadingClass = isLoading ? 'opacity-70 cursor-wait' : '';
  
  // Disabled state
  const disabledClass = (disabled || isLoading) ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;