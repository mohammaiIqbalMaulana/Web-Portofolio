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
        <label className="mb-2 block text-sm font-medium text-secondary-700 dark:text-secondary-300">
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
        className={`w-full resize-none rounded-xl border bg-white/90 px-4 py-3 text-secondary-900 shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-secondary-400 dark:bg-secondary-800/70 dark:text-white dark:placeholder:text-secondary-500 ${
          error
            ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500'
            : 'border-secondary-300/80 focus:border-sky-400 focus:ring-sky-500 dark:border-secondary-700'
        } focus:ring-2 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        required={required}
      />
      {error && (
        <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
};
