import React from 'react';

interface TextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 resize-none ${
          error
            ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
            : 'border-secondary-300 dark:border-secondary-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        required={required}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
