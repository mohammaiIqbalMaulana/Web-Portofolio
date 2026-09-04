import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, FileText, ExternalLink, Layers3, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Project, BACKEND_URL } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { useAnimation } from '../../contexts/AnimationContext';
import { usePointerTilt } from '../../hooks/usePointerTilt';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const ProjectCardComponent: React.FC<ProjectCardProps> = ({ project, index, featured = false }) => {
  const { t } = useTranslation();
  const { reducedMotion, isMobile, canHover } = useAnimation();
  const { tilt, bind, isDisabled } = usePointerTilt({
    maxTilt: featured ? 7 : 5,
    maxShift: featured ? 12 : 8,
    scale: featured ? 1.01 : 1.005,
  });

  const getFullUrl = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `${BACKEND_URL}${path}`;
  };

  const coverImage = project.image_url || project.images?.[0] || '';
  const galleryImages = project.images?.filter((image) => image !== coverImage).slice(0, 3) || [];
  const techStack = project.tech?.slice(0, featured ? 6 : 4) || [];
  const highlights = project.highlights && project.highlights.length > 0 ? project.highlights.slice(0, 3) : techStack.slice(0, 3);
  const year = project.year || new Date(project.created_at).getFullYear().toString();
  const role = project.role || t('projects.roleFallback', { defaultValue: 'Full stack build' });
  const status = project.status || (project.live_url ? t('projects.statusLive', { defaultValue: 'Live' }) : t('projects.statusBuild', { defaultValue: 'Build' }));

  const linkItems = [
    ...(project.github_url ? [{ type: 'github' as const, label: t('projects.viewCode', { defaultValue: 'Code' }), href: project.github_url }] : []),
    ...(project.live_url ? [{ type: 'demo' as const, label: t('projects.viewLive', { defaultValue: 'Live site' }), href: project.live_url }] : []),
    ...(project.links || []).map((link) => ({
      type: link.type,
      label: link.label,
      href: link.url,
    })),
  ];

  const linkStyles: Record<string, string> = {
    github: 'bg-secondary-900 text-white hover:bg-secondary-800 dark:bg-white dark:text-secondary-950 dark:hover:bg-secondary-100',
    demo: 'bg-sky-600 text-white hover:bg-sky-500',
    colab: 'bg-amber-600 text-white hover:bg-amber-500',
    other: 'bg-violet-600 text-white hover:bg-violet-500',
  };

  return (
    <motion.article
      initial={reducedMotion ? {} : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 120,
        damping: 16,
      }}
      viewport={{ once: true, margin: '-80px' }}
      className={`group relative h-full ${featured ? 'lg:col-span-2' : ''}`}
    >
      <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-sky-400/20 via-violet-400/15 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      <motion.div
        {...bind}
        animate={isDisabled ? {} : {
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          x: tilt.x,
          y: tilt.y,
          scale: tilt.scale,
        }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative h-full overflow-hidden rounded-[2rem] border border-secondary-200/80 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-secondary-950/75 ${featured ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr]' : ''}`}
      >
        <div className={`relative overflow-hidden ${featured ? 'min-h-[18rem] lg:min-h-[28rem]' : 'aspect-[16/10]'}`}>
          {coverImage ? (
            <img
              src={getFullUrl(coverImage)}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.28),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.22),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,1))]">
              <div className="text-center text-white">
                <Layers3 className="mx-auto mb-3 h-10 w-10 text-white/80" />
                <p className="text-sm uppercase tracking-[0.26em] text-white/60">{t('projects.noCover', { defaultValue: 'No cover image' })}</p>
                <p className="mt-2 text-lg font-semibold">{project.title}</p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/85 via-secondary-950/25 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-20" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-secondary-900 shadow-sm backdrop-blur-md">
                <Sparkles size={12} className="text-amber-500" />
                {t('projects.featuredLabel', { defaultValue: 'Featured' })}
              </span>
            )}
            <span className="rounded-full bg-secondary-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {year}
            </span>
            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-secondary-800 backdrop-blur-md">
              {status}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-xs text-white/90">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">{role}</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">{techStack[0] || 'UI'}</span>
            {project.images?.length ? (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
                {project.images.length} {t('projects.media', { defaultValue: 'media' })}
              </span>
            ) : null}
          </div>
        </div>

        <div className={`flex h-full flex-col ${featured ? 'p-5 sm:p-7 lg:p-8' : 'p-5 sm:p-6'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary-500 dark:text-secondary-400">
                {t('projects.caseStudyLabel', { defaultValue: 'Case study' })}
              </p>
              <h3 className={`mt-3 font-black tracking-tight text-secondary-950 dark:text-white ${featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                {project.title}
              </h3>
            </div>
            <div className="rounded-2xl border border-secondary-200 bg-secondary-50 px-3 py-2 text-right dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
                {t('projects.statusLabel', { defaultValue: 'Status' })}
              </p>
              <p className="mt-1 text-sm font-semibold text-secondary-900 dark:text-white">{status}</p>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary-600 dark:text-secondary-300 sm:text-[15px]">
            {project.description}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
                {t('projects.roleLabel', { defaultValue: 'Role' })}
              </p>
              <p className="mt-2 text-sm font-semibold text-secondary-900 dark:text-white">{role}</p>
            </div>
            <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
                {t('projects.yearLabel', { defaultValue: 'Year' })}
              </p>
              <p className="mt-2 text-sm font-semibold text-secondary-900 dark:text-white">{year}</p>
            </div>
            <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
                {t('projects.stackLabel', { defaultValue: 'Stack' })}
              </p>
              <p className="mt-2 text-sm font-semibold text-secondary-900 dark:text-white">{techStack.slice(0, 2).join(' • ') || 'Frontend'}</p>
            </div>
          </div>

          {highlights.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-full border border-secondary-200 bg-white px-3 py-1 text-xs font-medium text-secondary-700 dark:border-white/10 dark:bg-white/5 dark:text-secondary-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gradient-to-r from-sky-50 to-violet-50 px-3 py-1 text-xs font-medium text-secondary-700 ring-1 ring-inset ring-sky-100 dark:from-sky-950/40 dark:to-violet-950/40 dark:text-sky-100 dark:ring-white/10"
              >
                {tech.trim()}
              </span>
            ))}
          </div>

          <div className={`mt-6 grid gap-4 ${featured ? 'lg:grid-cols-[1fr_auto]' : 'sm:grid-cols-[1fr_auto]'}`}>
            <div className="flex flex-wrap gap-2">
              {linkItems.map((link) => {
                const Icon = link.type === 'github' ? Github : link.type === 'demo' ? Globe : link.type === 'colab' ? FileText : ExternalLink;
                return (
                  <motion.a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={canHover && !reducedMotion && !isMobile ? { y: -2 } : {}}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors ${linkStyles[link.type] || linkStyles.other}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon size={14} />
                    <span>{link.label}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-sm text-secondary-500 dark:text-secondary-400">
              <ImageIcon size={15} />
              <span>
                {galleryImages.length || 0} {t('projects.previewLabel', { defaultValue: 'preview images' })}
              </span>
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-2">
              {galleryImages.map((image, imgIndex) => (
                <a
                  key={imgIndex}
                  href={getFullUrl(image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/image relative aspect-[4/3] overflow-hidden rounded-2xl border border-secondary-200 bg-secondary-100 dark:border-white/10 dark:bg-white/5"
                >
                  <img
                    src={getFullUrl(image)}
                    alt={`${project.title} preview ${imgIndex + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-secondary-950/0 transition-colors duration-300 group-hover/image:bg-secondary-950/15" />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
};

export const ProjectCard = memo(ProjectCardComponent);
