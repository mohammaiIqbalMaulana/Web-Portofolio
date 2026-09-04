import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import HamburgerMenu from '../HamburgerMenu';
import { useScroll } from '../../hooks/useScroll';
import { useAnimation } from '../../contexts/AnimationContext';

export const HeaderSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { isScrolled, scrollProgress, scrollToSection } = useScroll();
  const { canHover } = useAnimation();

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
    <header className={`fixed top-0 left-0 z-40 w-full border-b transition-all duration-300 ${
      isScrolled
        ? 'border-secondary-200/70 bg-white/70 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-secondary-950/70'
        : 'border-transparent bg-transparent'
    }`}>
      <motion.div
        className="h-[3px] bg-gradient-to-r from-sky-500 via-violet-500 to-rose-500"
        style={{ width: `${scrollProgress}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <motion.button
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-3"
            whileHover={canHover ? { y: -1 } : {}}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary-950 text-sm font-black text-white shadow-sm transition-transform group-hover:scale-105 dark:bg-white dark:text-secondary-950">
              MI
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-secondary-500 dark:text-secondary-400">Portfolio</p>
              <p className="text-base font-black text-secondary-950 dark:text-white">Iqbal</p>
            </div>
          </motion.button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-secondary-950 dark:text-secondary-300 dark:hover:bg-white/5 dark:hover:text-white"
                whileHover={canHover ? { y: -1 } : {}}
                whileTap={{ scale: 0.96 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={canHover ? { scale: 1.04 } : {}}
              whileTap={{ scale: 0.96 }}
              onClick={toggleLanguage}
              className="hidden items-center gap-2 rounded-full border border-secondary-200 bg-white/80 px-4 py-2 text-sm font-semibold text-secondary-700 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-secondary-200 dark:hover:bg-white/10 lg:flex"
              title={`Switch to ${i18n.language === 'en' ? 'ID' : 'EN'} language`}
            >
              <Languages size={16} />
              <span>{i18n.language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              whileHover={canHover ? { rotate: 180 } : {}}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="rounded-full border border-secondary-200 bg-white/80 p-2.5 text-secondary-700 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-secondary-200 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>

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
