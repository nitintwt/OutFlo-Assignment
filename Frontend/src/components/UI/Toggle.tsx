import React, { useState } from 'react';

interface ToggleProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  isChecked,
  onChange,
  label,
  disabled = false,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = () => {
    if (disabled) return;
    
    const newValue = !checked;
    setChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleChange}
        className={`
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full 
          transition-colors ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          ${checked ? 'bg-primary-600' : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        disabled={disabled}
        aria-pressed={checked}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-300
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
      )}
    </div>
  );
};

export default Toggle;