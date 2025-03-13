import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;  // Toegevoegd id prop
}

const Card: React.FC<CardProps> = ({ title, children, className = '', id }) => {
  return (
    <div className={`card ${className}`} id={id}>
      {title && <h2 className="mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;