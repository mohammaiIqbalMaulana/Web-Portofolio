import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import HamburgerMenu from '../HamburgerMenu';
import { useScroll } from '../../hooks/useScroll';

export const HeaderSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { id: 'home', label: t('common.home') },
    { id: 'about', label: t('common.about') },
    { id: 'skills', label: t('common.skills') },
    { id: 'projects', label: t('common.projects') },
    { id: 'contact', label: t('common.contact') },
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
              Portofolio
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

          {/* Language Toggle, Theme Toggle & Hamburger Menu - Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Toggle - Now visible on all screens, smaller on mobile */}
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="hidden lg:flex flex-col items-center p-2 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 text-secondary-700 dark:text-secondary-300 hover:from-indigo-100 hover:to-blue-100 dark:hover:from-indigo-800 dark:hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden group border border-indigo-200/50 dark:border-indigo-800/50"
              title={`Switch to ${i18n.language === 'en' ? 'ID' : 'EN'} language`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={i18n.language}
                  initial={{ scale: 0.8, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.8, rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  className="relative z-10 mb-1"
                >
                  <Languages size={18} className="transition-colors duration-300" />
                </motion.div>
              </AnimatePresence>

              {/* Language Label */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={i18n.language}
                  className="text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400"
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {i18n.language.toUpperCase()}
                </motion.span>
              </AnimatePresence>

              {/* Enhanced background effects */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 rounded-xl"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

              {/* Active state indicator */}
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full opacity-0"
                animate={{ opacity: i18n.language === 'en' ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>

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
