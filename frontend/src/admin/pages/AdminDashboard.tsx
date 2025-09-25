import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Save,
  X,
  ExternalLink,
  Github,
  Loader2,
  AlertCircle,
  Upload,
  Minus
} from 'lucide-react';
import { apiService, Project } from '../../services/api';

interface ProjectForm {
  title: string;
  description: string;
  title_en: string;
  description_en: string;
  technologies: string;
  github_url: string;
  live_url: string;
  image_url: string;
}

interface LinkItem {
  type: 'github' | 'colab' | 'demo' | 'other';
  url: string;
  label: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState<ProjectForm>({
    title: '',
    description: '',
    title_en: '',
    description_en: '',
    technologies: '',
    github_url: '',
    live_url: '',
    image_url: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<ProjectForm>>({});

  // New form state for enhanced features
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Translation state
  const [isTranslating, setIsTranslating] = useState(false);
  const translateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Translation function
  const translateText = useCallback(async (text: string, from: 'id' | 'en', to: 'id' | 'en') => {
    if (!text.trim()) return '';

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.responseData?.translatedText || '';
    } catch (error) {
      console.error('Translation error:', error);
      return '';
    }
  }, []);

  // Load projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiService.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin/login'); // Force redirect even if logout fails
    }
  };

  // Form handling
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      title_en: '',
      description_en: '',
      technologies: '',
      github_url: '',
      live_url: '',
      image_url: ''
    });
    setFormErrors({});
    setEditingProject(null);
    setLinks([]);
    setSelectedImages([]);
    setSelectedFiles([]);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    const formData = {
      title: project.title,
      description: project.description,
      title_en: project.title_en || '',
      description_en: project.description_en || '',
      technologies: project.tech.join(', '),
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      image_url: project.image_url || ''
    };

    // Populate links if they exist
    if (project.links && Array.isArray(project.links)) {
      setLinks(project.links.map(link => ({
        type: link.type as LinkItem['type'],
        url: link.url,
        label: link.label
      })));
    } else {
      setLinks([]);
    }

    // Note: For editing, we don't populate selectedImages and selectedFiles
    // as they represent new files to upload, not existing ones
    setSelectedImages([]);
    setSelectedFiles([]);

    // Auto-translate missing fields
    const autoTranslate = async () => {
      setIsTranslating(true);
      try {
        if (!formData.title_en && formData.title) {
          const translated = await translateText(formData.title, 'id', 'en');
          if (translated) formData.title_en = translated;
        }
        if (!formData.description_en && formData.description) {
          const translated = await translateText(formData.description, 'id', 'en');
          if (translated) formData.description_en = translated;
        }
        if (!formData.title && formData.title_en) {
          const translated = await translateText(formData.title_en, 'en', 'id');
          if (translated) formData.title = translated;
        }
        if (!formData.description && formData.description_en) {
          const translated = await translateText(formData.description_en, 'en', 'id');
          if (translated) formData.description = translated;
        }
      } catch (error) {
        console.error('Auto-translation failed:', error);
      } finally {
        setIsTranslating(false);
      }
    };

    setFormData(formData);
    setShowModal(true);

    // Auto-translate after modal opens
    autoTranslate();
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name as keyof ProjectForm]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Auto-translation logic
    if (translateTimerRef.current) {
      clearTimeout(translateTimerRef.current);
    }

    if (value.trim()) {
      translateTimerRef.current = setTimeout(async () => {
        setIsTranslating(true);
        try {
          if (name === 'title' && !formData.title_en.trim()) {
            const translated = await translateText(value, 'id', 'en');
            if (translated) {
              setFormData(prev => ({ ...prev, title_en: translated }));
            }
          } else if (name === 'description' && !formData.description_en.trim()) {
            const translated = await translateText(value, 'id', 'en');
            if (translated) {
              setFormData(prev => ({ ...prev, description_en: translated }));
            }
          } else if (name === 'title_en' && !formData.title.trim()) {
            const translated = await translateText(value, 'en', 'id');
            if (translated) {
              setFormData(prev => ({ ...prev, title: translated }));
            }
          } else if (name === 'description_en' && !formData.description.trim()) {
            const translated = await translateText(value, 'en', 'id');
            if (translated) {
              setFormData(prev => ({ ...prev, description: translated }));
            }
          }
        } catch (error) {
          console.error('Auto-translation failed:', error);
        } finally {
          setIsTranslating(false);
        }
      }, 200); // 200ms debounce
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ProjectForm> = {};

    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.technologies.trim()) errors.technologies = 'Technologies are required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-translate missing fields before validation
    setIsTranslating(true);
    try {
      const updates: Partial<ProjectForm> = {};
      if (formData.title && !formData.title_en) {
        const translated = await translateText(formData.title, 'id', 'en');
        if (translated) updates.title_en = translated;
      }
      if (formData.description && !formData.description_en) {
        const translated = await translateText(formData.description, 'id', 'en');
        if (translated) updates.description_en = translated;
      }
      if (formData.title_en && !formData.title) {
        const translated = await translateText(formData.title_en, 'en', 'id');
        if (translated) updates.title = translated;
      }
      if (formData.description_en && !formData.description) {
        const translated = await translateText(formData.description_en, 'en', 'id');
        if (translated) updates.description = translated;
      }
      if (Object.keys(updates).length > 0) {
        setFormData(prev => ({ ...prev, ...updates }));
      }
    } catch (error) {
      console.error('Translation failed on submit:', error);
    } finally {
      setIsTranslating(false);
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const projectData = {
        ...formData,
        tech: formData.technologies.split(',').map(t => t.trim()),
        links: links.filter(link => link.url.trim() && link.label.trim())
      };

      // Check if we have files to upload
      const hasFiles = selectedImages.length > 0 || selectedFiles.length > 0;

      if (hasFiles) {
        // Use FormData for file uploads
        const formDataToSend = new FormData();

        // Add project data as JSON string
        formDataToSend.append('data', JSON.stringify(projectData));

        // Add images
        selectedImages.forEach((file) => {
          formDataToSend.append(`images`, file);
        });

        // Add files
        selectedFiles.forEach((file) => {
          formDataToSend.append(`files`, file);
        });

        if (editingProject) {
          await apiService.updateProjectWithFiles(editingProject.id, formDataToSend);
        } else {
          await apiService.createProjectWithFiles(formDataToSend);
        }
      } else {
        // Use regular JSON API
        if (editingProject) {
          await apiService.updateProject(editingProject.id, projectData);
        } else {
          await apiService.createProject(projectData);
        }
      }

      await fetchProjects();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    try {
      await apiService.deleteProject(project.id);
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center space-x-2"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your portfolio projects</p>
          </div>

          <motion.button
            onClick={openCreateModal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </motion.button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              {/* Project Image */}
              {project.image_url && (
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200/6366f1/ffffff?text=No+Image';
                    }}
                  />
                </div>
              )}

              {/* Project Info */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {(Array.isArray(project.tech) ? project.tech : []).slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {(Array.isArray(project.tech) ? project.tech : []).length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    +{(Array.isArray(project.tech) ? project.tech : []).length - 3}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center space-x-2 mb-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(project)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(project)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get started by creating your first project</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Add Project
            </button>
          </div>
        )}
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={closeModal}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Title (ID) *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter project title in Indonesian"
                    />
                    {formErrors.title && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description (ID) *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none ${
                        formErrors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Describe your project in Indonesian"
                    />
                    {formErrors.description && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Title EN */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Title (EN)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="title_en"
                        value={formData.title_en}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter project title in English"
                      />
                      {isTranslating && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description EN */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description (EN)
                    </label>
                    <div className="relative">
                      <textarea
                        name="description_en"
                        value={formData.description_en}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
                        placeholder="Describe your project in English"
                      />
                      {isTranslating && (
                        <div className="absolute right-3 top-3">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Technologies *
                    </label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        formErrors.technologies ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="React, Node.js, TypeScript (comma separated)"
                    />
                    {formErrors.technologies && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.technologies}</p>
                    )}
                  </div>

                  {/* URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        name="github_url"
                        value={formData.github_url}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Live URL
                      </label>
                      <input
                        type="url"
                        name="live_url"
                        value={formData.live_url}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Additional Links */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Links
                    </label>
                    <div className="space-y-2">
                      {links.map((link, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <select
                            value={link.type}
                            onChange={(e) => {
                              const newLinks = [...links];
                              newLinks[index].type = e.target.value as LinkItem['type'];
                              setLinks(newLinks);
                            }}
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white text-sm"
                          >
                            <option value="github">GitHub</option>
                            <option value="colab">Colab</option>
                            <option value="demo">Demo</option>
                            <option value="other">Other</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Label"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = [...links];
                              newLinks[index].label = e.target.value;
                              setLinks(newLinks);
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white text-sm"
                          />
                          <input
                            type="url"
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...links];
                              newLinks[index].url = e.target.value;
                              setLinks(newLinks);
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setLinks(links.filter((_, i) => i !== index))}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setLinks([...links, { type: 'other', url: '', label: '' }])}
                        className="flex items-center space-x-2 px-3 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Link</span>
                      </button>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setSelectedImages([...selectedImages, ...files]);
                        }}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload images
                        </span>
                      </label>
                      {selectedImages.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {selectedImages.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-2">
                              <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Files
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setSelectedFiles([...selectedFiles, ...files]);
                        }}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload files
                        </span>
                      </label>
                      {selectedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-2">
                              <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-lg transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>{editingProject ? 'Update' : 'Create'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
