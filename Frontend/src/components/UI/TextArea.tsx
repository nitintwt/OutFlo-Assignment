import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helpText,
  className = '',
  ...props
}) => {
  const id = props.id || props.name;
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`
          w-full rounded-md border-gray-300 shadow-sm
          focus:border-primary-500 focus:ring-primary-500
          ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
          ${className}
        `}
        style={{ borderWidth: '1px', padding: '0.5rem 0.75rem' }}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
};

export default TextArea;