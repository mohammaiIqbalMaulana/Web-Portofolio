import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const Icon = skill.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        type: 'spring',
        stiffness: 110,
        damping: 16
      }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group relative h-full"
    >
      <div className={`absolute -inset-px rounded-[1.6rem] bg-gradient-to-br ${skill.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-25`} />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-secondary-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start justify-between gap-4">
          <div className={`rounded-2xl bg-gradient-to-br ${skill.color} p-3 text-white shadow-lg`}>
            <Icon size={22} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
              {skill.category}
            </p>
            <p className="mt-1 text-sm font-semibold text-secondary-900 dark:text-white">{skill.level}%</p>
          </div>
        </div>

        <h3 className="mt-5 text-lg font-black text-secondary-950 transition-colors group-hover:text-secondary-700 dark:text-white dark:group-hover:text-secondary-200">
          {skill.name}
        </h3>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary-100 dark:bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.05, ease: 'easeOut' }}
            className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
          />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-secondary-600 dark:text-secondary-300">
          {skill.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-secondary-200 bg-secondary-50 px-3 py-1 text-xs font-medium text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300">
            {skill.category}
          </span>
          <span className="rounded-full border border-secondary-200 bg-secondary-50 px-3 py-1 text-xs font-medium text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300">
            {skill.level}% proficiency
          </span>
        </div>
      </div>
    </motion.article>
  );
};
