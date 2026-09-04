import React from 'react';

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
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
  placeholder = 'Select an option',
  error,
  required = false,
  disabled = false,
  options,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-secondary-700 dark:text-secondary-300">
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
        className={`w-full appearance-none rounded-xl border bg-white/90 px-4 py-3 pr-10 text-secondary-900 shadow-sm backdrop-blur-sm transition-all duration-300 dark:bg-secondary-800/70 dark:text-white ${
          error
            ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500'
            : 'border-secondary-300/80 focus:border-sky-400 focus:ring-sky-500 dark:border-secondary-700'
        } focus:ring-2 ${value ? 'text-secondary-900 dark:text-white' : 'text-secondary-400 dark:text-secondary-500'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
};
