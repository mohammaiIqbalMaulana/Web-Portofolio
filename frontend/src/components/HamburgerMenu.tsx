import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Instagram } from 'lucide-react'
import '../styles/hamburger.css'

interface HamburgerMenuProps {
  isOpen: boolean
  onToggle: () => void
  onNavigate: (sectionId: string) => void
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onToggle, onNavigate }) => {
  const { i18n, t } = useTranslation()

  // Lock background scroll while the menu is open, and let Escape close it.
  useEffect(() => {
    if (!isOpen) return

    document.body.classList.add('mobile-menu-open')

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onToggle()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('mobile-menu-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onToggle])

  // If the viewport grows into the desktop layout while the menu is open
  // (e.g. rotating a tablet), close it so it doesn't get stuck open.
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && window.innerWidth >= 1024) onToggle()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, onToggle])

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
        className={`flex shrink-0 items-center justify-center rounded-full border border-secondary-200 bg-white/80 p-2.5 shadow-sm backdrop-blur-md transition-all duration-300 lg:hidden dark:border-white/10 dark:bg-secondary-950/70 ${isOpen ? 'hamburger-active' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="hamburger-line-new"></span>
        <span className="hamburger-line-new"></span>
        <span className="hamburger-line-new"></span>
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Full-screen dimming backdrop, starting BELOW the header so the
                  header bar (and the animated hamburger/close icon on it) stays
                  visible and clickable the whole time the menu is open.
                  Rendered via a portal straight into <body> — nesting this inside
                  the header meant that once the header gained backdrop-blur on
                  scroll, it became the containing block for these fixed elements
                  and silently broke their positioning. */}
              <motion.div
                key="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-x-0 bottom-0 z-[50] bg-secondary-950/60 backdrop-blur-sm lg:hidden"
                style={{ top: 'calc(4rem + env(safe-area-inset-top, 0px))' }}
                onClick={onToggle}
                aria-hidden="true"
              />

              <motion.div
                key="menu-panel"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed right-0 bottom-0 z-[55] flex w-[86%] max-w-[320px] flex-col border-l border-secondary-200/70 bg-white shadow-2xl lg:hidden dark:border-white/10 dark:bg-secondary-950"
                style={{ top: 'calc(4rem + env(safe-area-inset-top, 0px))' }}
                data-menu-panel
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
              >
                <div
                  className="flex flex-1 flex-col overflow-y-auto p-5"
                  style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
                >
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
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default HamburgerMenu
