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
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        rotateX: 5,
        scale: window.innerWidth < 640 ? 1.02 : 1.05,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      className="group relative"
    >
      {/* Skill Card */}
      <div className="relative bg-white dark:bg-secondary-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-secondary-200 dark:border-secondary-700 overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

        <div className="relative z-10">
          {/* Icon and Name */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={window.innerWidth < 640 ? 20 : 24} />
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wide">
                {skill.category}
              </div>
              <div className="text-xs text-secondary-400 dark:text-secondary-500">
                {skill.level}%
              </div>
            </div>
          </div>

          {/* Skill Name */}
          <h3 className="text-base sm:text-lg font-bold text-secondary-900 dark:text-secondary-100 mb-2 sm:mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {skill.name}
          </h3>

          {/* Circular Progress */}
          <div className="relative mb-3 sm:mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Circle */}
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-secondary-200 dark:text-secondary-700"
                />
                {/* Progress Circle */}
                <motion.path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: skill.level / 100 }}
                  transition={{ duration: 2, delay: index * 0.1, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="drop-shadow-sm"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xs font-bold text-secondary-600 dark:text-secondary-400">
                  {skill.level}%
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <motion.p
            className="text-xs text-secondary-600 dark:text-secondary-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {skill.description}
          </motion.p>

          {/* Floating Particles */}
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 h-1 bg-gradient-to-r ${skill.color} rounded-full`}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
