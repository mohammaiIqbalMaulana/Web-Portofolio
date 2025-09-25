import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import HamburgerMenu from '../HamburgerMenu';
import { useScroll } from '../../hooks/useScroll';

export const HeaderSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isScrolled, isHeaderVisible, scrollProgress, scrollToSection } = useScroll();

  // Handle click outside hamburger menu
  const handleClickOutside = (event: MouseEvent) => {
    const hamburger = document.getElementById('hamburger');
    const menuPanel = document.querySelector('[data-menu-panel]');

    if (isMenuOpen && hamburger && menuPanel) {
      const target = event.target as Element;
      if (!hamburger.contains(target) && !menuPanel.contains(target)) {
        setIsMenuOpen(false);
      }
    }
  };

  // Add click outside listener
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
      isScrolled
        ? 'bg-secondary-50/70 dark:bg-secondary-900/70 backdrop-blur-md border-b border-secondary-200/30 dark:border-secondary-800/30 shadow-md'
        : 'bg-transparent border-b-0'
    } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden"
        style={{ width: `${scrollProgress}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-all duration-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-secondary-900 dark:text-secondary-100">
              Portfolio
            </span>
          </motion.button>

          {/* Enhanced Desktop Navigation - Hidden on mobile/tablet */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-0 relative group overflow-hidden"
                whileHover={{
                  y: -2,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="relative z-10">{item.label}</span>
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  whileHover={{ height: "2px" }}
                  transition={{ duration: 0.2 }}
                />
                {/* Magnetic effect background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Theme Toggle & Hamburger Menu - Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Enhanced Theme Toggle - Hidden on mobile/tablet when hamburger menu is visible */}
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 180,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="hidden lg:flex p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-0 shadow-sm hover:shadow-lg relative overflow-hidden group"
              aria-label="Toggle theme"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>

              {/* Enhanced background effects */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-0 rounded-lg"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>

            {/* Hamburger Menu - Only visible on mobile/tablet */}
            <HamburgerMenu
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              onNavigate={scrollToSection}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
