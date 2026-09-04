import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ArrowDown, ArrowUp } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'green' | 'red' | 'purple' | 'outlinered';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'arrow' | 'download' | 'down' | 'up';
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = '',
  href,
  target,
  rel,
  type = 'button'
}) => {
  const baseClasses = 'group inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 ease-out relative overflow-hidden border border-transparent shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-400 disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-secondary-900 text-white hover:bg-secondary-800 dark:bg-secondary-100 dark:text-secondary-950 dark:hover:bg-white',
    secondary: 'bg-primary-600 text-white hover:bg-primary-500',
    green: 'bg-emerald-600 text-white hover:bg-emerald-500',
    red: 'bg-rose-600 text-white hover:bg-rose-500',
    purple: 'bg-violet-600 text-white hover:bg-violet-500',
    outline: 'border-secondary-300 bg-white/75 text-secondary-800 hover:border-secondary-400 hover:bg-white dark:border-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-100 dark:hover:bg-secondary-900',
    outlinered: 'border-rose-300 bg-rose-50 text-rose-700 hover:border-rose-400 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-200'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm sm:text-base',
    lg: 'px-7 py-4 text-base sm:text-lg'
  };

  const IconComponent =
    icon === 'arrow'
      ? ArrowRight
      : icon === 'download'
      ? Download
      : icon === 'down'
      ? ArrowDown
      : icon === 'up'
      ? ArrowUp
      : null;

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      {IconComponent && (
        <IconComponent
          className={`relative z-10 w-4 h-4 transition-transform duration-300 ${disabled ? '' : 'group-hover:translate-x-1'} ${icon === 'download' && !disabled ? 'group-hover:-translate-y-0.5' : ''}`}
        />
      )}

      <span className="absolute inset-0 -translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
      <span className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );

  const motionProps = {
    whileHover: disabled
      ? {}
      : {
          scale: 1.02,
          y: -1,
        },
    whileTap: disabled ? {} : { scale: 0.98 }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
};
