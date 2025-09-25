import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Youtube, Music2, Linkedin } from 'lucide-react';
import TypingAnimation from '../TypingAnimation';
import ProfileImage from '../ProfileImage';
import { Button } from '../ui/Button';
import { SocialLink } from '../ui/SocialLink';
import { useScroll } from '../../hooks/useScroll';

export const HeroSection: React.FC = () => {
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
    <section id="home" className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-secondary-900 dark:via-blue-900/5 dark:to-indigo-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
      {/* Enhanced Background Effects - Blue Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/30 dark:from-blue-900/15 dark:via-transparent dark:to-indigo-900/10"></div>
      <div className="absolute top-10 left-20 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-64 h-64 bg-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-2/3 left-1/3 w-56 h-56 bg-blue-300/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex justify-center lg:justify-end order-1 lg:order-1"
          >
            <ProfileImage
              size="xl"
              className="mx-auto max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] hover:scale-105 transition-transform duration-0 -mt-4 md:-mt-1 lg:-mt-24"
            />
          </motion.div>

          {/* Right Column - Name and Description */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            className="text-center lg:text-left order-2 lg:order-2"
          >
            {/* Name with typing animation */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-2 leading-tight">
                Halo, Nama Saya{' '}
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
            <div className="mb-6 sm:mb-8">
              <TypingAnimation
                texts={['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Influencer']}
                speed={100}
                delay={2000}
                className="text-lg sm:text-xl md:text-xl lg:text-3xl text-secondary-600 dark:text-secondary-400 block"
                cursorClassName="bg-secondary-600 dark:bg-secondary-500"
              />
            </div>

            {/* Additional description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 mb-8 sm:mb-12 leading-relaxed"
            >
              Saya sedang belajar dan mengembangkan diri di bidang teknologi informasi, khususnya dalam pengembangan web dan desain UI/UX dan sekaligus sebagai pembuat konten. Sekarang sangat bersemangat untuk menciptakan solusi digital yang inovatif dan memberikan dampak positif.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-8 sm:mb-12"
            >
              <Button
                onClick={() => scrollToSection('projects')}
                variant="primary"
                icon="arrow"
              >
                View My Work
              </Button>

              <Button
                onClick={handleDownloadCV}
                variant="outline"
                icon="download"
              >
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center lg:justify-start items-center gap-4 sm:gap-6"
            >
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
