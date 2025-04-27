import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-card p-6 
        ${hoverable ? 'transition-shadow duration-300 hover:shadow-card-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;