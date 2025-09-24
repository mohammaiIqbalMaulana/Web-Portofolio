import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { Github, Linkedin, Instagram, Moon, Sun } from 'lucide-react'
import '../styles/hamburger.css'

interface HamburgerMenuProps {
  isOpen: boolean
  onToggle: () => void
  onNavigate: (sectionId: string) => void
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onToggle, onNavigate }) => {
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mohammaiIqbalMaulana', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/kikezukata._/', label: 'Instagram' },

  ]

  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <button
        id="hamburger"
        name="hamburger"
        type="button"
        onClick={onToggle}
        className={`fixed right-4 top-4 block lg:hidden z-[45] p-2 rounded-lg bg-white/20 dark:bg-secondary-900/20 backdrop-blur-md border border-white/30 dark:border-secondary-700/30 shadow-lg transition-all duration-300 ${isOpen ? 'hamburger-active' : ''}`}
        aria-label="Toggle menu"
        style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <span className="hamburger-line-new"></span>
        <span className="hamburger-line-new"></span>
        <span className="hamburger-line-new"></span>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Menu Panel - Slide down from top right */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 z-[44] w-full max-w-[280px] h-auto bg-secondary-50/70 dark:bg-secondary-900/70 backdrop-blur-md shadow-2xl lg:hidden rounded-bl-lg border-l border-secondary-200/30 dark:border-secondary-700/30"
              style={{
                top: 'calc(64px + env(safe-area-inset-top, 0px))',
                maxHeight: 'calc(100vh - 120px - env(safe-area-inset-top, 0px))'
              }}
              data-menu-panel
            >
              <div className="flex flex-col">
                {/* Navigation Links */}
                <nav className="px-4 py-6">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1}}
                      >
                        <motion.button
                          onClick={() => {
                            onNavigate(item.id)
                            onToggle()
                          }}
                          whileHover={{ scale: 1.05, x: 10 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full flex items-center px-4 py-3 text-left text-base font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-100 dark:hover:from-primary-900/20 dark:hover:to-secondary-800 rounded-lg transition-all duration-0"
                        >
                          {item.label}
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Theme Toggle & Social Links */}
                <div className="px-4 py-4 border-t border-secondary-200 dark:border-secondary-800">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Theme</span>
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                    >
                      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    </button>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, y: -4, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 text-secondary-600 dark:text-secondary-400 rounded-xl hover:text-primary-600 dark:hover:text-primary-400 hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-900/30 dark:hover:to-primary-800/30 transition-all duration-0 shadow-md hover:shadow-lg"
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