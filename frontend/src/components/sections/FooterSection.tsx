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
    <footer className="relative overflow-hidden bg-secondary-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-secondary-950">
                MI
              </div>
              <div>
                <p className="text-sm font-medium text-white/60">{t('footer.brand')}</p>
                <h3 className="text-xl font-black text-white">Mohammad Iqbal Maulana</h3>
              </div>
            </div>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              {t('footer.description')}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  colorClass="hover:text-white hover:bg-white/10"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white">{t('footer.quickLinksTitle')}</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="inline-flex rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white">{t('footer.servicesTitle')}</h3>
            <ul className="mt-5 space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="text-sm text-white/70"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          viewport={{ once: true }}
          className="mt-14 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-lg font-bold text-white">{t('footer.newsletterTitle')}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {t('footer.newsletterDescription')}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
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
                size="md"
                className="sm:min-w-40"
              >
                {newsletterStatus === 'loading' ? '...' : t('footer.newsletterButton')}
              </Button>
            </form>

            {newsletterMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 text-sm ${newsletterStatus === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}
              >
                {newsletterMessage}
              </motion.p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row"
        >
          <div>{t('footer.copyright', { year: new Date().getFullYear() })}</div>
          <div>{t('footer.madeWith')}</div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: 20, rotate: 180, transition: { duration: 0.5, ease: 'easeInOut' } }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 rounded-full bg-white p-3 text-secondary-950 shadow-[0_20px_40px_rgba(15,23,42,0.25)] transition-colors hover:bg-secondary-100 dark:bg-secondary-100 dark:hover:bg-white"
            aria-label="Scroll to top"
          >
            <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowUp size={20} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
