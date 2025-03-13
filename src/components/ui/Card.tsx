import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;