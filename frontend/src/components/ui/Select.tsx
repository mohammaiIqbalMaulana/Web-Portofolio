import React from 'react';

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  options: { value: string; label: string }[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  error,
  required = false,
  disabled = false,
  options,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        className={`relative custom-select w-full pl-4 pr-10 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 appearance-none ${
          error
            ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
            : 'border-secondary-300 dark:border-secondary-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${value ? 'has-value' : ''}`}
        required={required}
      >
        <option value="">Pilih Layanan</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
