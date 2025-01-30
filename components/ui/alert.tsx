// src/components/ui/alert.tsx

import React from 'react';

interface AlertProps {
  variant?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ variant = 'info', title, description, onClose }) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className={`p-4 rounded-md shadow-md ${variantClasses[variant]} flex items-start`}>
      <div className="flex-1">
        <strong className="font-semibold">{title}</strong>
        <p>{description}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;