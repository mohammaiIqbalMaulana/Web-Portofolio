import React from 'react';

interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  focusRingColor?: 'red' | 'blue';
}

const focusRingStyles: Record<NonNullable<InputProps['focusRingColor']>, string> = {
  red: 'focus:ring-rose-500 focus:border-rose-400',
  blue: 'focus:ring-sky-500 focus:border-sky-400',
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
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
  className = '',
  focusRingColor = 'red'
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label} {required && '*'}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl border bg-white/90 px-4 py-3 text-secondary-900 shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-secondary-400 dark:bg-secondary-800/70 dark:text-white dark:placeholder:text-secondary-500 ${
          error
            ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-500'
            : 'border-secondary-300/80 focus:border-sky-400 dark:border-secondary-700'
        } ${focusRingStyles[focusRingColor]} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        required={required}
      />
      {error && (
        <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
};
