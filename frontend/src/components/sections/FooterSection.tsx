import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Youtube, Music2, Linkedin, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '../ui/SocialLink';
import { useScroll } from '../../hooks/useScroll';
import { useNewsletter } from '../../hooks/useNewsletter';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const FooterSection: React.FC = () => {
  const { t } = useTranslation();
  const { showScrollTop, scrollToTop } = useScroll();
  const {
    newsletterData,
    newsletterStatus,
    newsletterMessage,
    handleNewsletterChange,
    handleNewsletterSubmit
  } = useNewsletter();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mohammaiIqbalMaulana', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/kikezukata._/', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@zukataofficial4484?si=rcinKfCG38z7o4eI', label: 'YouTube' },
    { icon: Music2, href: 'https://www.tiktok.com/@kikezukata_kun', label: 'TikTok' },
  ];

  const quickLinks = [
    { name: t('common.home'), href: '#home' },
    { name: t('common.about'), href: '#about' },
    { name: t('common.skills'), href: '#skills' },
    { name: t('common.projects'), href: '#projects' },
    { name: t('common.contact'), href: '#contact' },
  ];

  const services = t('footer.services', { returnObjects: true }) as string[];

  return (
    <footer className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl">{t('footer.brand')}</span>
            </div>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  colorClass="hover:text-blue-400 hover:bg-blue-900/20"
                />
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinksTitle')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-secondary-300 hover:text-blue-400 hover:bg-blue-900/20 rounded px-2 py-1 transition-all duration-300 transform hover:scale-105"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-secondary-300"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-secondary-700"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">{t('footer.newsletterTitle')}</h3>
            <p className="text-secondary-300 mb-4">
              {t('footer.newsletterDescription')}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                name="email"
                value={newsletterData.email}
                onChange={handleNewsletterChange}
                placeholder={t('footer.newsletterPlaceholder')}
                className="flex-1"
                focusRingColor="blue"
                disabled={newsletterStatus === 'loading'}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={newsletterStatus === 'loading' || !newsletterData.email.trim()}
                size="sm"
              >
                {newsletterStatus === 'loading' ? '...' : t('footer.newsletterButton')}
              </Button>
            </form>

            {newsletterMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-2 text-sm ${
                  newsletterStatus === 'success'
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {newsletterMessage}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-secondary-700 flex flex-col sm:flex-row justify-between items-center"
        >
          <div className="text-secondary-400 text-sm mb-4 sm:mb-0">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>

          <div className="flex items-center text-secondary-400 text-sm">
            {t('footer.madeWith')}
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: 20, rotate: 180, transition: { duration: 0.5, ease: "easeInOut" } }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
