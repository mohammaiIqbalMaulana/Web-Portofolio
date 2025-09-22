import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'
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
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ]

  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <button
        id="hamburger"
        name="hamburger"
        type="button"
        onClick={onToggle}
        className={`fixed right-4 top-4 block lg:hidden z-[45] p-2 rounded-lg bg-white/20 dark:bg-secondary-900/20 backdrop-blur-md border border-white/30 dark:border-secondary-700/30 shadow-lg transition-all duration-200 ${isOpen ? 'hamburger-active' : ''}`}
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
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 z-[44] w-full max-w-[280px] h-auto bg-white dark:bg-secondary-900 shadow-lg lg:hidden rounded-bl-lg"
              data-menu-panel
            >
              <div className="flex flex-col">
                {/* Navigation Links */}
                <nav className="px-4 py-6">
                  <ul className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => {
                            onNavigate(item.id)
                            onToggle()
                          }}
                          className="w-full flex items-center px-4 py-3 text-left text-base font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors"
                        >
                          {item.label}
                        </button>
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
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 rounded-lg hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                          aria-label={social.label}
                        >
                          <Icon size={16} />
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
