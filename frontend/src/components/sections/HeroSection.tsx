import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Github, Instagram, Linkedin, MapPin, Music2, Sparkles, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TypingAnimation from '../TypingAnimation';
import ProfileImage from '../ProfileImage';
import { Button } from '../ui/Button';
import { SocialLink } from '../ui/SocialLink';
import { useScroll } from '../../hooks/useScroll';
import { useAnimation } from '../../contexts/AnimationContext';
import { usePointerTilt } from '../../hooks/usePointerTilt';

const HeroSectionComponent: React.FC = () => {
  const { t } = useTranslation();
  const { scrollToSection } = useScroll();
  const { reducedMotion, isMobile, canHover } = useAnimation();
  const disableAnimations = reducedMotion || isMobile;
  const roles = t('hero.roles', { returnObjects: true }) as string[];
  const { bind, isDisabled, cardStyle, glareStyle } = usePointerTilt({ maxTilt: 14, maxShift: 16, scale: 1.035 });

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

  const details = [
    {
      icon: Sparkles,
      label: t('hero.currentFocusLabel', { defaultValue: 'Current focus' }),
      value: t('hero.currentFocus', { defaultValue: 'Building responsive websites, UI systems, and content-led experiences.' }),
    },
    {
      icon: MapPin,
      label: t('hero.locationLabel', { defaultValue: 'Location' }),
      value: t('hero.location', { defaultValue: 'Semarang, Indonesia' }),
    },
    {
      icon: Code2,
      label: t('hero.stackLabel', { defaultValue: 'Core stack' }),
      value: t('hero.stack', { defaultValue: 'React, Node.js, Tailwind, TypeScript' }),
    },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.11),transparent_28%),linear-gradient(180deg,rgba(248,250,252,0.92),rgba(241,245,249,0.98))] px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32 dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(15,23,42,1))]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 dark:opacity-15" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <motion.div
          initial={disableAnimations ? {} : { opacity: 0, y: 24 }}
          animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-black tracking-tight text-secondary-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
            <span className="block text-secondary-700 dark:text-secondary-300">{t('hero.greeting')}</span>
            <span className="mt-2 block leading-[0.95]">
              <TypingAnimation
                texts={['Mohammad Iqbal Maulana']}
                speed={140}
                className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent"
                cursorClassName="bg-sky-600"
                stopAfterComplete={true}
              />
            </span>
          </h1>

          <div className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary-600 sm:text-xl dark:text-secondary-300">
            <TypingAnimation
              texts={roles}
              speed={90}
              delay={1600}
              className="inline-block font-medium text-secondary-800 dark:text-secondary-100"
              cursorClassName="bg-secondary-700 dark:bg-secondary-200"
            />
            <p className="mt-4 text-base sm:text-lg">{t('hero.description')}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-sky-200/80 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-200">
              {t('hero.currentFocusLabel', { defaultValue: 'Current focus' })}
            </span>
            <span className="rounded-full border border-violet-200/80 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/30 dark:text-violet-200">
              UI systems
            </span>
            <span className="rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200">
              Content creation
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {details.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-400">
                    <Icon size={14} className="text-sky-500" />
                    <span>{detail.label}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-800 dark:text-secondary-100">{detail.value}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button onClick={() => scrollToSection('projects')} variant="primary" icon="arrow" className="w-full sm:w-auto">
              {t('hero.viewWork')}
            </Button>
            <Button onClick={handleDownloadCV} variant="outline" icon="download" className="w-full sm:w-auto">
              {t('hero.downloadCV')}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-secondary-500 dark:text-secondary-400">
            <span>{t('hero.connect', { defaultValue: 'Connect with me:' })}</span>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.label} icon={social.icon} href={social.href} label={social.label} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={disableAnimations ? {} : { opacity: 0, y: 30 }}
          animate={disableAnimations ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="relative"
          style={{ perspective: 1400 }}
        >
          <motion.div
            {...bind}
            style={{
              transformStyle: 'preserve-3d',
              ...(isDisabled ? {} : cardStyle),
            }}
            className="relative rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl will-change-transform dark:border-white/10 dark:bg-white/5 lg:p-6"
          >
            {/* Moving light sheen that glides across the glass as the pointer moves —
                this, plus the layered translateZ depths below, is what actually
                reads as "3D" instead of a flat card snapping around. */}
            {!isDisabled && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-soft-light"
                style={glareStyle}
              />
            )}
            <div
              className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_30%)] opacity-90"
              style={{ transform: 'translateZ(-24px)' }}
            />
            <div className="relative grid gap-5" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative" style={{ transform: 'translateZ(64px)' }}>
                <ProfileImage size="xl" className="mx-auto" />
              </div>

              <div className="grid gap-3 sm:grid-cols-3" style={{ transform: 'translateZ(32px)' }}>
                {details.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <motion.div
                      key={detail.label}
                      whileHover={canHover ? { y: -4 } : {}}
                      className="rounded-2xl border border-white/60 bg-white/85 p-4 shadow-sm dark:border-white/10 dark:bg-secondary-900/70"
                    >
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-400">
                        <Icon size={13} className="text-sky-500" />
                        <span>{detail.label}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-secondary-800 dark:text-secondary-100">{detail.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(20px)' }}>
                {roles.slice(0, 4).map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-secondary-200/80 bg-white/85 px-3 py-1 text-xs font-medium text-secondary-700 dark:border-white/10 dark:bg-secondary-950/60 dark:text-secondary-200"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={disableAnimations ? {} : { opacity: 0, x: 20 }}
            animate={disableAnimations ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="absolute -left-4 top-8 hidden max-w-52 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lg backdrop-blur-md lg:block dark:border-white/10 dark:bg-secondary-950/70"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">Now</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary-800 dark:text-secondary-100">
              {t('hero.nowCard', {
                defaultValue: 'Refining portfolio interactions with calmer motion, stronger hierarchy, and more visual project storytelling.',
              })}
            </p>
          </motion.div>

          <motion.div
            initial={disableAnimations ? {} : { opacity: 0, x: -20 }}
            animate={disableAnimations ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="absolute -bottom-4 right-4 hidden rounded-2xl border border-white/70 bg-secondary-950/90 px-4 py-3 text-sm text-white shadow-lg lg:block"
          >
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/60">
              <ArrowUpRight size={14} />
              Collaboration
            </p>
            <p className="mt-1 font-medium">Open for freelance & internship ideas</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const HeroSection = memo(HeroSectionComponent);
