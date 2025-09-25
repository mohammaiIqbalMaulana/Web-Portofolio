import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService, Project } from '../services/api';

export const useProjects = () => {
  const { i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProjects = await apiService.getProjects(i18n.language);
        setProjects(fetchedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [i18n.language]);

  const toggleShowAllProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      // Store current scroll position and calculate relative position within projects section
      const currentScrollTop = window.pageYOffset;
      const projectsTop = projectsSection.offsetTop;
      const projectsHeight = projectsSection.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how far down the user has scrolled into the projects section
      const scrollIntoProjects = currentScrollTop - projectsTop;
      const maxScrollIntoProjects = projectsHeight - viewportHeight;

      // Calculate the scroll progress as a ratio (0 to 1)
      const scrollProgress = maxScrollIntoProjects > 0 ? Math.min(scrollIntoProjects / maxScrollIntoProjects, 1) : 0;

      // Toggle the state
      setShowAllProjects(!showAllProjects);

      // Use setTimeout to ensure the DOM has updated before scrolling
      setTimeout(() => {
        const updatedProjectsSection = document.getElementById('projects');
        if (updatedProjectsSection) {
          const newProjectsTop = updatedProjectsSection.offsetTop;
          const newProjectsHeight = updatedProjectsSection.offsetHeight;
          const newMaxScrollIntoProjects = newProjectsHeight - viewportHeight;

          // Calculate target scroll position based on the same scroll progress
          let targetScrollTop;

          if (showAllProjects) {
            // Going from all projects to limited - maintain scroll progress
            targetScrollTop = newProjectsTop + (scrollProgress * newMaxScrollIntoProjects);
          } else {
            // Going from limited to all projects - maintain scroll progress
            targetScrollTop = newProjectsTop + (scrollProgress * newMaxScrollIntoProjects);
          }

          // Ensure the target position is within reasonable bounds
          targetScrollTop = Math.max(
            newProjectsTop,
            Math.min(targetScrollTop, newProjectsTop + newMaxScrollIntoProjects)
          );

          // Only scroll if the new position would be significantly different
          if (Math.abs(targetScrollTop - currentScrollTop) > 20) {
            window.scrollTo({
              top: Math.max(0, targetScrollTop),
              behavior: 'smooth'
            });
          }
        }
      }, 200); // Increased timeout to ensure DOM updates are complete
    } else {
      // Fallback to simple toggle if projects section not found
      setShowAllProjects(!showAllProjects);
    }
  };

  return {
    projects,
    loading,
    error,
    showAllProjects,
    toggleShowAllProjects
  };
};
