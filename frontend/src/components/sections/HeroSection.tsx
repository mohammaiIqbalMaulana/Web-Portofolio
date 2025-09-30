import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Youtube, Music2, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TypingAnimation from '../TypingAnimation';
import ProfileImage from '../ProfileImage';
import { Button } from '../ui/Button';
import { SocialLink } from '../ui/SocialLink';
import { useScroll } from '../../hooks/useScroll';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { scrollToSection } = useScroll();

  const handleDownloadCV = () => {
    const cvPath = '/CV_Mohammad Iqbal Maulana.pdf';
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'CV_Mohammad Iqbal Maulana.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mohammaiIqbalMaulana', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/kikezukata._/', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@zukataofficial4484?si=rcinKfCG38z7o4eI', label: 'YouTube' },
    { icon: Music2, href: 'https://www.tiktok.com/@kikezukata_kun', label: 'TikTok' },
  ];

  return (
    <section
      id="home"
      className="pt-8 sm:pt-12 md:pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-secondary-900 dark:via-blue-900/5 dark:to-indigo-900/10 relative overflow-hidden"
      style={{ transition: 'none' }}
    >
      {/* Enhanced Background Effects - Blue Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/30 dark:from-blue-900/15 dark:via-transparent dark:to-indigo-900/10"></div>
      <div className="absolute top-10 left-16 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-28 right-12 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-indigo-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute top-1/3 left-1/6 w-80 h-80 sm:w-96 sm:h-96 md:w-96 md:h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '4s' }}
      ></div>
      <div
        className="absolute top-1/4 right-1/4 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-indigo-300/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-2/3 left-1/3 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-blue-300/12 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '3s' }}
      ></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex justify-center lg:justify-end order-1 lg:order-1 mb-6 sm:mb-8 md:mb-10"
          >
            <ProfileImage
              size="xl"
              className="mx-auto hover:scale-105 transition-transform duration-0 -mt-4 md:-mt-1 lg:-mt-24"
            />
          </motion.div>

          {/* Right Column - Name and Description */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
            className="text-center lg:text-left order-2 lg:order-2 px-2 sm:px-4 md:px-6"
          >
            {/* Name with typing animation */}
            <div className="mb-3 sm:mb-4 md:mb-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-1 leading-tight">
                {t('hero.greeting')}{' '}
                <TypingAnimation
                  texts={['Mohammad Iqbal M']}
                  speed={150}
                  className="text-primary-600 dark:text-primary-400"
                  cursorClassName="bg-primary-600 dark:bg-primary-400"
                  stopAfterComplete={true}
                />
              </h1>
            </div>

            {/* Description with typing animation */}
            <div className="mb-4 sm:mb-6 md:mb-7">
              <TypingAnimation
                texts={t('hero.roles', { returnObjects: true }) as string[]}
                speed={100}
                delay={2000}
                className="text-base sm:text-lg md:text-xl lg:text-3xl text-secondary-600 dark:text-secondary-400 block"
                cursorClassName="bg-secondary-600 dark:bg-secondary-500"
              />
            </div>

            {/* Additional description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm sm:text-base md:text-lg text-secondary-600 dark:text-secondary-400 mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-6 sm:mb-8 md:mb-10 w-full max-w-md mx-auto lg:mx-0"
            >
              <Button onClick={() => scrollToSection('projects')} variant="primary" icon="arrow" className="w-full sm:w-auto">
                {t('hero.viewWork')}
              </Button>

              <Button onClick={handleDownloadCV} variant="outline" icon="download" className="w-full sm:w-auto">
                {t('hero.downloadCV')}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center lg:justify-start items-center gap-3 sm:gap-4 md:gap-6 mt-4"
            >
              {socialLinks.map((social) => (
                <SocialLink key={social.label} icon={social.icon} href={social.href} label={social.label} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
