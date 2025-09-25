import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';
import { Project, BACKEND_URL } from '../../services/api';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t } = useTranslation();
  const getFullUrl = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    return `${BACKEND_URL}${path}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -12,
        scale: 1.05,
        rotateX: 5,
        rotateY: 2,
        transition: { duration: 0.4, type: "spring", stiffness: 300 }
      }}
      className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-2xl transition-all duration-0 cursor-pointer group relative overflow-hidden border border-violet-100 dark:border-violet-800"
    >
      <div className="h-full flex flex-col">
        <h3 className="text-lg sm:text-xl font-semibold text-violet-900 dark:text-violet-100 mb-2">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-violet-600 dark:text-violet-400 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech?.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 * techIndex * 0.05 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgb(139 92 246)",
                color: "white",
                transition: { duration: 0.2 }
              }}
              className="px-2 sm:px-3 py-1 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 text-xs sm:text-sm rounded-full hover:bg-violet-200 dark:hover:bg-violet-700 transition-all duration-0 relative z-10"
            >
              {tech.trim()}
            </motion.span>
          ))}
        </div>

        {/* Project Links & Media - All appear on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-20"
        >
          {/* Links */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-violet-200/50 dark:border-violet-700/50 pb-3">
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md bg-gray-600 hover:bg-gray-700 text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
              >
                <Github size={14} />
                <span>GitHub</span>
              </motion.a>
            )}

            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md bg-blue-500 hover:bg-blue-600 text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Globe size={14} />
                <span>Live Demo</span>
              </motion.a>
            )}
          </div>

          {/* Images Section - Only if images exist */}
          {project.images && project.images.length > 0 && (
            <div className="pt-3 border-t border-violet-200/50 dark:border-violet-700/50 pb-3">
              <h4 className="text-sm font-medium text-violet-800 dark:text-violet-200 mb-2">{t('projects.images')}:</h4>
              <div className="flex flex-wrap gap-2">
                {project.images.slice(0, 3).map((image, imgIndex) => (
                  <motion.a
                    key={imgIndex}
                    href={getFullUrl(image)}
                    download
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 group"
                  >
                    <img
                      src={getFullUrl(image)}
                      alt={`${project.title} image ${imgIndex + 1}`}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        const parent = img.parentElement;
                        if (parent) {
                          img.style.display = 'none';
                          const errorDiv = parent.querySelector('.error-placeholder') as HTMLElement;
                          if (errorDiv) {
                            errorDiv.style.display = 'flex';
                          }
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <span className="text-white text-xs">{t('projects.see')}</span>
                    </div>
                      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center error-placeholder" style={{display: 'none'}}>
                        <span className="text-gray-600 dark:text-gray-400 text-xs">{t('projects.imageNotAvailable')}</span>
                      </div>
                  </motion.a>
                ))}
                {project.images.length > 3 && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400"
                  >
                    +{project.images.length - 3}
                  </motion.span>
                )}
              </div>
            </div>
          )}

          {/* Files Section - Only if files exist */}
          {project.files && project.files.length > 0 && (
            <div className="pt-3 border-t border-violet-200/50 dark:border-violet-700/50">
              <h4 className="text-sm font-medium text-violet-800 dark:text-violet-200 mb-2">{t('projects.files')}:</h4>
              <div className="space-y-1">
                {project.files.map((file, fileIndex) => (
                  <motion.a
                    key={fileIndex}
                    href={getFullUrl(file.path)}
                    download={file.label || `file-${fileIndex + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                    <span>{file.label || `${t('projects.file')} ${fileIndex + 1}`}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Enhanced Background Effects - Only active on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-fuchsia-400/10 dark:from-violet-600/20 dark:to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

        {/* Glow Effect - Only active on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

        {/* Shimmer Effect - Only active on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-violet-200/30 dark:via-violet-400/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100"></div>
      </div>
    </motion.div>
  );
};
