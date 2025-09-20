import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:your.email@example.com',
      icon: Mail,
    },
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-secondary-100 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl text-secondary-900 dark:text-secondary-100">
                Portfolio
              </span>
            </Link>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4 max-w-md">
              Full Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-secondary-200 dark:bg-secondary-700 rounded-lg text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Contact
            </h3>
            <div className="space-y-2 text-secondary-600 dark:text-secondary-400">
              <p>Jakarta, Indonesia</p>
              <a
                href="mailto:your.email@example.com"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                your.email@example.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-200 dark:border-secondary-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-secondary-600 dark:text-secondary-400 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart size={16} className="mx-1 text-red-500" /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
