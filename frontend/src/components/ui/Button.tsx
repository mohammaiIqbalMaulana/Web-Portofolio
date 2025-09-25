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
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 group shadow-sm hover:shadow-lg relative overflow-hidden";

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white",
    secondary: "bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white",
    green: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white",
    red: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white",
    purple: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white",
    outline: "border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    outlinered: "border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  const IconComponent =
    icon === "arrow"
      ? ArrowRight
      : icon === "download"
      ? Download
      : icon === "down"
      ? ArrowDown
      : icon === "up"
      ? ArrowUp
      : null;
      
  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      {IconComponent && (
        <IconComponent className={`ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10 ${icon === 'download' ? 'group-hover:translate-y-[-2px]' : ''} ${disabled ? 'group-hover:translate-x-0 group-hover:-translate-y-0' : ''}`} />
      )}

      {/* Enhanced Background Effects */}
      {!disabled && variant === 'primary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </>
      )}

      {!disabled && variant === 'secondary' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </>
      )}

      {!disabled && variant === 'green' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </>
      )}

      {!disabled && variant === 'outline' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-400/20 to-transparent"></div>
        </>
      )}

      {!disabled && variant === 'outlinered' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-red-200/30 dark:via-red-400/20 to-transparent"></div>
        </>
      )}

      {!disabled && variant === 'red' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </>
      )}

      {!disabled && variant === 'purple' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </>
      )}
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : {
      scale: 1.05,
      y: -3,
      boxShadow: variant === 'primary'
        ? "0 20px 40px rgba(59, 130, 246, 0.4)"
        : variant === 'secondary'
        ? "0 20px 40px rgba(139, 92, 246, 0.4)"
        : variant === 'green'
        ? "0 20px 40px rgba(34, 197, 94, 0.4)"
        : variant === 'red'
        ? "0 20px 40px rgba(248, 113, 113, 0.4)"
        : variant === 'purple'
        ? "0 10px 30px rgba(139, 92, 280, 0.2)"
        : variant === 'outline'
        ? "0 20px 40px rgba(59, 130, 246, 0.3)"
        : variant === 'outlinered'
        ? "0 20px 40px rgba(248, 113, 113, 0.3)"
        : "none"
    },
    whileTap: disabled ? {} : { scale: 0.95 }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
};
