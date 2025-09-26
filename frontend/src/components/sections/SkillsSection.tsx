import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Network, Cpu, ServerCog } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SkillCard } from '../ui/SkillCard';
import { Skill } from '../../types';

export const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  const skillsData = [
    {
      name: 'Laravel',
      key: 'laravel',
      level: 90,
      categoryKey: 2, // Backend (1: Frontend, 2: Backend, 3: Programming Language, 4: Database)
      icon: ServerCog,
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Tailwind CSS',
      key: 'tailwind',
      level: 95,
      categoryKey: 1, // Frontend
      icon: Palette,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'JavaScript',
      key: 'javascript',
      level: 85,
      categoryKey: 3, // Programming Language
      icon: Code,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'React',
      key: 'react',
      level: 80,
      categoryKey: 1, // Frontend
      icon: Code,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Node.js',
      key: 'nodejs',
      level: 100,
      categoryKey: 2, // Backend
      icon: Cpu,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Express.js',
      key: 'express',
      level: 95,
      categoryKey: 2, // Backend
      icon: Network,
      color: 'from-red-600 to-red-700'
    },
    {
      name: 'MySQL',
      key: 'mysql',
      level: 90,
      categoryKey: 4, // Database
      icon: Database,
      color: 'from-green-600 to-green-700'
    },
    {
      name: 'TypeScript',
      key: 'typescript',
      level: 85,
      categoryKey: 3, // Programming Language
      icon: Code,
      color: 'from-orange-600 to-red-600'
    },
    {
      name: 'Java',
      key: 'java',
      level: 90,
      categoryKey: 3, // Programming Language
      icon: Code,
      color: 'from-red-600 to-white-600'
    },
    {
      name: 'Prisma',
      key: 'prisma',
      level: 70,
      categoryKey: 4, // Database
      icon: Database,
      color: 'from-blue-600 to-blue-600'
    },
    {
      name: 'Python',
      key: 'python',
      level: 90,
      categoryKey: 3, // Programming Language
      icon: Code,
      color: 'from-yellow-400 to-blue-600'
    },
  ];

  const skills: Skill[] = skillsData.map(skill => ({
    ...skill,
    category: t(`skills.categories.${skill.categoryKey}`),
    description: t(`skills.skills.${skill.key}`)
  }));

  const categories = t('skills.categories', { returnObjects: true }) as string[];

  return (
    <section id="skills" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-amber-50 via-orange-50/20 to-yellow-50/30 dark:from-secondary-900 dark:via-amber-900/5 dark:to-yellow-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
      {/* Enhanced Background Effects - Orange Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-yellow-50/30 dark:from-amber-900/15 dark:via-transparent dark:to-yellow-900/10"></div>
      <div className="absolute top-12 left-24 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-28 right-24 w-64 h-64 bg-orange-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/5 right-1/6 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/2 left-1/6 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-orange-300/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            {t('skills.alwaysLearning')}
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.slice(1).map((category, index) => (
              <motion.span
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 text-amber-800 dark:text-amber-200 text-sm rounded-full border border-amber-200 dark:border-amber-800"
              >
                {category}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
