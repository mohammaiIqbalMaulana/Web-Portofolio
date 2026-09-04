import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Instagram, Moon, Sun } from 'lucide-react'
import '../styles/hamburger.css'

interface HamburgerMenuProps {
  isOpen: boolean
  onToggle: () => void
  onNavigate: (sectionId: string) => void
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onToggle, onNavigate }) => {
  const { theme, toggleTheme } = useTheme()
  const { i18n, t } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en'
    i18n.changeLanguage(newLang)
  }

  const navItems = [
    { id: 'home', label: t('common.home') },
    { id: 'about', label: t('common.about') },
    { id: 'skills', label: t('common.skills') },
    { id: 'projects', label: t('common.projects') },
    { id: 'contact', label: t('common.contact') },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mohammaiIqbalMaulana', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/kikezukata._/', label: 'Instagram' },
  ]

  return (
    <>
      <button
        id="hamburger"
        name="hamburger"
        type="button"
        onClick={onToggle}
        className={`fixed right-4 top-4 z-[45] block rounded-full border border-secondary-200 bg-white/80 p-2.5 shadow-sm backdrop-blur-md transition-all duration-300 lg:hidden dark:border-white/10 dark:bg-secondary-950/70 ${isOpen ? 'hamburger-active' : ''}`}
        aria-label="Toggle menu"
        style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <span className="hamburger-line-new"></span>
        <span className="hamburger-line-new"></span>
        <span className="hamburger-line-new"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="fixed right-0 top-0 z-[55] w-full max-w-[320px] rounded-bl-[1.75rem] border-l border-secondary-200/70 bg-white/90 shadow-2xl backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-secondary-950/85"
              style={{
                top: 'calc(4rem + 0.25rem + env(safe-area-inset-top, 0px))',
                maxHeight: 'calc(100vh - 7rem - env(safe-area-inset-top, 0px))'
              }}
              data-menu-panel
            >
              <div className="flex flex-col p-5">
                <div className="mb-5 rounded-2xl border border-secondary-200 bg-secondary-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
                    {t('hero.eyebrow', { defaultValue: 'Built to feel human, not template-shaped.' })}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-secondary-700 dark:text-secondary-200">
                    {t('hero.currentFocus', { defaultValue: 'Building responsive websites, UI systems, and content-led experiences.' })}
                  </p>
                </div>

                <nav>
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <motion.button
                          onClick={() => {
                            onNavigate(item.id)
                            onToggle()
                          }}
                          whileHover={{ x: 6 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex w-full items-center justify-between rounded-2xl border border-transparent bg-secondary-50 px-4 py-3 text-left text-base font-semibold text-secondary-800 transition-colors hover:border-secondary-200 hover:bg-white dark:bg-white/5 dark:text-secondary-100 dark:hover:border-white/10 dark:hover:bg-white/10"
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-secondary-400">0{index + 1}</span>
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-6 border-t border-secondary-200 pt-5 dark:border-white/10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Theme</span>
                    <motion.button
                      onClick={toggleTheme}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full border border-secondary-200 bg-white p-2.5 text-secondary-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-secondary-200"
                    >
                      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    </motion.button>
                  </div>

                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Language</span>
                    <motion.button
                      onClick={toggleLanguage}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full border border-secondary-200 bg-white px-3 py-2 text-xs font-bold text-secondary-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-secondary-200"
                    >
                      {i18n.language.toUpperCase()}
                    </motion.button>
                  </div>

                  <div className="flex justify-center gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -3, scale: 1.05 }}
                          whileTap={{ scale: 0.92 }}
                          className="rounded-2xl border border-secondary-200 bg-white p-3 text-secondary-600 shadow-sm transition-colors hover:text-secondary-950 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300 dark:hover:text-white"
                          aria-label={social.label}
                        >
                          <Icon size={18} />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default HamburgerMenu
