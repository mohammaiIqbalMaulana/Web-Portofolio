import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ProjectCard } from '../ui/ProjectCard';
import { Button } from '../ui/Button';
import { useProjects } from '../../hooks/useProjects';
import { useAnimation } from '../../contexts/AnimationContext';

const ProjectsSectionComponent: React.FC = () => {
  const { t } = useTranslation();
  const { projects, loading, error, showAllProjects, toggleShowAllProjects } = useProjects();
  const { reducedMotion, isMobile } = useAnimation();

  // Disable animations on mobile for better performance
  const disableAnimations = reducedMotion || isMobile;

  if (loading) {
    return (
      <section id="projects" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-violet-50 via-purple-50/20 to-fuchsia-50/30 dark:from-secondary-900 dark:via-violet-900/5 dark:to-fuchsia-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
            <p className="mt-4 text-secondary-600 dark:text-secondary-400">{t('projects.loading', { defaultValue: 'Loading projects...' })}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-violet-50 via-purple-50/20 to-fuchsia-50/30 dark:from-secondary-900 dark:via-violet-900/5 dark:to-fuchsia-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{t('projects.error', { defaultValue: 'Error loading projects' })}: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-violet-50 via-purple-50/20 to-fuchsia-50/30 dark:from-secondary-900 dark:via-violet-900/5 dark:to-fuchsia-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
      {/* Enhanced Background Effects - Purple Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-transparent to-fuchsia-50/30 dark:from-violet-900/15 dark:via-transparent dark:to-fuchsia-900/10"></div>
      {/* Static background elements for better performance */}
      <div className="absolute top-14 left-20 w-80 h-80 bg-violet-400/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-26 right-18 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/6 right-1/7 w-96 h-96 bg-fuchsia-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-violet-300/10 rounded-full blur-3xl"></div>
      <div className="absolute top-2/3 right-1/5 w-56 h-56 bg-purple-300/12 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
          whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
            whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-secondary-600 dark:text-secondary-400">{t('projects.noProjects')}</p>
          </motion.div>
        ) : (
          <motion.div
            key={showAllProjects ? 'all' : 'limited'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {projects.slice(0, showAllProjects ? undefined : 6).map((project, index) => (
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Show More Button */}
        {projects.length > 6 && (
          <motion.div
            initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
            whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <Button
              onClick={toggleShowAllProjects}
              variant="purple"
              icon={showAllProjects ? 'up' : 'down'}
            >
              {showAllProjects ? t('projects.showLess') : t('projects.showMore')}
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
          whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            {t('projects.cta')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export const ProjectsSection = memo(ProjectsSectionComponent);
