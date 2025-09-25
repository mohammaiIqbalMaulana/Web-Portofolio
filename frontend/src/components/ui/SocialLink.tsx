import React from 'react';
import { motion } from 'framer-motion';

interface SocialLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
  colorClass?: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label, colorClass = 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20' }) => {
  return (
    <motion.div className="relative">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          scale: 1.15,
          y: -4,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.4, type: "spring", stiffness: 300 }
        }}
        whileTap={{ scale: 0.9 }}
        className={`p-2 sm:p-3 bg-secondary-800/50 text-secondary-400 rounded-lg ${colorClass} transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-lg`}
        aria-label={label}
      >
        <Icon size={18} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />

        {/* Enhanced background effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-secondary-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20"
          initial={{ y: 5, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-secondary-900"></div>
        </motion.div>
      </motion.a>
    </motion.div>
  );
};
