import React from 'react';

interface BadgeProps {
  status: 'active' | 'inactive' | 'draft' | 'completed';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const statusStyles = {
    active: 'bg-success-100 text-success-800',
    inactive: 'bg-gray-100 text-gray-800',
    draft: 'bg-warning-100 text-warning-800',
    completed: 'bg-accent-100 text-accent-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default Badge;