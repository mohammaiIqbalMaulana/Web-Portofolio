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
  const disableAnimations = reducedMotion || isMobile;
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6);
  const featuredProject = visibleProjects.find((project) => project.featured) || visibleProjects[0];
  const restProjects = visibleProjects.filter((project) => project !== featuredProject);

  if (loading) {
    return (
      <section id="projects" className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_26%),linear-gradient(180deg,rgba(250,250,250,0.92),rgba(244,244,245,1))] px-4 py-24 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.09),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,1))]">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-secondary-600 dark:text-secondary-300">{t('projects.loading', { defaultValue: 'Loading projects...' })}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_26%),linear-gradient(180deg,rgba(250,250,250,0.92),rgba(244,244,245,1))] px-4 py-24 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.09),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,1))]">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-rose-600 dark:text-rose-400">
            {t('projects.error', { defaultValue: 'Error loading projects' })}: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_26%),linear-gradient(180deg,rgba(250,250,250,0.92),rgba(244,244,245,1))] px-4 py-24 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.09),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,1))]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 dark:opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
          whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600 dark:text-violet-300">
            {t('projects.kicker', { defaultValue: 'Selected work' })}
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-secondary-950 sm:text-4xl lg:text-5xl dark:text-white">
            {t('projects.title')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary-600 dark:text-secondary-300 sm:text-lg">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {visibleProjects.length === 0 ? (
          <motion.div
            initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
            whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-secondary-200/80 bg-white/80 p-10 text-center shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-secondary-600 dark:text-secondary-300">{t('projects.noProjects')}</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {featuredProject && (
              <ProjectCard project={featuredProject} index={0} featured />
            )}

            {restProjects.length > 0 && (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {restProjects.map((project, index) => (
                  <ProjectCard key={project.id || index} project={project} index={index + 1} />
                ))}
              </div>
            )}
          </div>
        )}

        {projects.length > 6 && (
          <motion.div
            initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
            whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Button onClick={toggleShowAllProjects} variant="purple" icon={showAllProjects ? 'up' : 'down'}>
              {showAllProjects ? t('projects.showLess') : t('projects.showMore')}
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={disableAnimations ? {} : { opacity: 0, y: 20 }}
          whileInView={disableAnimations ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-secondary-200/80 bg-white/85 p-8 text-center shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
        >
          <p className="text-secondary-600 dark:text-secondary-300">{t('projects.cta')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export const ProjectsSection = memo(ProjectsSectionComponent);
