import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Network, Cpu, ServerCog } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SkillCard } from '../ui/SkillCard';
import { Skill } from '../../types';

export const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  const skillsData = [
    { name: 'Laravel', key: 'laravel', level: 90, categoryKey: 2, icon: ServerCog, color: 'from-orange-500 to-red-500' },
    { name: 'Tailwind CSS', key: 'tailwind', level: 95, categoryKey: 1, icon: Palette, color: 'from-sky-500 to-blue-600' },
    { name: 'JavaScript', key: 'javascript', level: 85, categoryKey: 3, icon: Code, color: 'from-amber-400 to-yellow-600' },
    { name: 'React', key: 'react', level: 80, categoryKey: 1, icon: Code, color: 'from-cyan-400 to-sky-500' },
    { name: 'Node.js', key: 'nodejs', level: 100, categoryKey: 2, icon: Cpu, color: 'from-emerald-500 to-green-600' },
    { name: 'Express.js', key: 'express', level: 95, categoryKey: 2, icon: Network, color: 'from-red-500 to-rose-600' },
    { name: 'MySQL', key: 'mysql', level: 90, categoryKey: 4, icon: Database, color: 'from-indigo-500 to-blue-600' },
    { name: 'TypeScript', key: 'typescript', level: 85, categoryKey: 3, icon: Code, color: 'from-sky-600 to-indigo-600' },
    { name: 'Java', key: 'java', level: 90, categoryKey: 3, icon: Code, color: 'from-orange-600 to-red-500' },
    { name: 'Prisma', key: 'prisma', level: 70, categoryKey: 4, icon: Database, color: 'from-violet-600 to-indigo-600' },
    { name: 'Python', key: 'python', level: 90, categoryKey: 3, icon: Code, color: 'from-yellow-500 to-sky-600' },
  ];

  const skills: Skill[] = skillsData.map((skill) => ({
    ...skill,
    category: t(`skills.categories.${skill.categoryKey}`),
    description: t(`skills.skills.${skill.key}`)
  }));

  const categories = t('skills.categories', { returnObjects: true }) as string[];

  return (
    <section id="skills" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.13),transparent_26%),linear-gradient(180deg,rgba(250,250,250,0.94),rgba(244,244,245,1))] px-4 py-24 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,1))]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35 dark:opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600 dark:text-amber-300">
            {t('skills.kicker', { defaultValue: 'What I use' })}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-secondary-950 sm:text-4xl lg:text-5xl dark:text-white">
            {t('skills.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-600 dark:text-secondary-300 sm:text-lg">
            {t('skills.description')}
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-secondary-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8 xl:w-[22rem]"
          >
            <h3 className="text-xl font-black text-secondary-950 dark:text-white">{t('skills.sidebarTitle', { defaultValue: 'Tool belt' })}</h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-600 dark:text-secondary-300">
              {t('skills.alwaysLearning')}
            </p>

            <div className="mt-6 space-y-4">
              {categories.slice(1).map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-secondary-200 bg-secondary-50 px-4 py-3 text-sm font-medium text-secondary-800 dark:border-white/10 dark:bg-white/5 dark:text-secondary-200"
                >
                  {category}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
