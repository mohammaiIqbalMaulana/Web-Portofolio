import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { useScroll } from '../../hooks/useScroll';
import { useAnimation } from '../../contexts/AnimationContext';
import { Briefcase, GraduationCap, Sparkles, Users } from 'lucide-react';

const AboutSectionComponent: React.FC = () => {
  const { t } = useTranslation();
  const { scrollToSection } = useScroll();
  const { reducedMotion, canHover } = useAnimation();

  const snapshots = [
    {
      icon: GraduationCap,
      title: t('about.snapshots.studyTitle', { defaultValue: 'Study' }),
      text: t('about.snapshots.studyText', { defaultValue: 'Learning software foundations while sharpening problem solving and product thinking.' }),
    },
    {
      icon: Briefcase,
      title: t('about.snapshots.workTitle', { defaultValue: 'Work' }),
      text: t('about.snapshots.workText', { defaultValue: 'Building full-stack web projects with Node.js, React, and practical UI systems.' }),
    },
    {
      icon: Users,
      title: t('about.snapshots.contentTitle', { defaultValue: 'Audience' }),
      text: t('about.snapshots.contentText', { defaultValue: 'Sharing ideas through content creation, which strengthens communication and clarity.' }),
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: t('about.timeline.startTitle', { defaultValue: 'Started university' }),
      text: t('about.timeline.startText', { defaultValue: 'Built a foundation in Java and algorithmic thinking.' }),
    },
    {
      year: '2024',
      title: t('about.timeline.internTitle', { defaultValue: 'Internship projects' }),
      text: t('about.timeline.internText', { defaultValue: 'Worked on web-based projects that connected backend logic with polished frontend experiences.' }),
    },
    {
      year: 'Now',
      title: t('about.timeline.nowTitle', { defaultValue: 'Refining style' }),
      text: t('about.timeline.nowText', { defaultValue: 'Focused on stronger design taste, responsive layouts, and more memorable portfolio storytelling.' }),
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%),linear-gradient(180deg,rgba(250,250,250,0.94),rgba(244,244,245,1))] px-4 py-24 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,1))]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35 dark:opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-300">
            {t('about.kicker', { defaultValue: 'Who I am' })}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-secondary-950 sm:text-4xl lg:text-5xl dark:text-white">
            {t('about.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-600 dark:text-secondary-300 sm:text-lg">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -24 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-secondary-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200">
              <Sparkles size={14} />
              <span>{t('about.passion')}</span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-secondary-600 dark:text-secondary-300 sm:text-lg">
              {t('about.description')}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {snapshots.map((snapshot) => {
                const Icon = snapshot.icon;
                return (
                  <motion.div
                    key={snapshot.title}
                    whileHover={canHover ? { y: -4 } : {}}
                    className="rounded-2xl border border-secondary-200 bg-secondary-50 p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-400">
                      <Icon size={14} className="text-emerald-500" />
                      <span>{snapshot.title}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-secondary-700 dark:text-secondary-200">{snapshot.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button onClick={() => scrollToSection('projects')} variant="green" icon="arrow">
                {t('about.learnMore')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: 24 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-secondary-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary-500 dark:text-secondary-400">
                  {t('about.timelineLabel', { defaultValue: 'Timeline' })}
                </p>
                <h3 className="mt-2 text-2xl font-black text-secondary-950 dark:text-white">{t('about.storyTitle', { defaultValue: 'A quick look at the path so far' })}</h3>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {timeline.map((entry, index) => (
                <motion.div
                  key={entry.year}
                  initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                  whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="grid gap-4 rounded-2xl border border-secondary-200 bg-secondary-50 p-5 dark:border-white/10 dark:bg-white/5 sm:grid-cols-[5rem_1fr]"
                >
                  <div className="flex items-center justify-center rounded-2xl bg-secondary-950 px-4 py-4 text-lg font-black text-white dark:bg-white dark:text-secondary-950">
                    {entry.year}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-secondary-950 dark:text-white">{entry.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-secondary-600 dark:text-secondary-300">{entry.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-5 text-center dark:border-white/10 dark:bg-white/5">
                <p className="text-3xl font-black text-secondary-950 dark:text-white">10+</p>
                <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">{t('about.stats.projects')}</p>
              </div>
              <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-5 text-center dark:border-white/10 dark:bg-white/5">
                <p className="text-3xl font-black text-secondary-950 dark:text-white">1+</p>
                <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">{t('about.stats.experience')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const AboutSection = memo(AboutSectionComponent);
