import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail, ChevronUp, Moon, Sun } from 'lucide-react'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { AnimationProvider } from '../contexts/AnimationContext'
import TypingAnimation from '../components/TypingAnimation'
import ProfileImage from '../components/ProfileImage'
import HamburgerMenu from '../components/HamburgerMenu'
import SocialIcon from '../components/SocialIcon'
import '../styles/hamburger.css'

const SinglePageAppContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Handle scroll to show/hide scroll-to-top button and header styling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Handle click outside hamburger menu
  const handleClickOutside = (event: MouseEvent) => {
    const hamburger = document.getElementById('hamburger')
    const menuPanel = document.querySelector('[data-menu-panel]')

    if (isMenuOpen && hamburger && menuPanel) {
      const target = event.target as Element
      if (!hamburger.contains(target) && !menuPanel.contains(target)) {
        setIsMenuOpen(false)
      }
    }
  }

  // Add click outside listener
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-300">
          {/* Fixed Header */}
          <header className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-secondary-50/95 dark:bg-secondary-900/95 backdrop-blur-lg border-b border-secondary-200/50 dark:border-secondary-800/50'
              : 'bg-transparent border-b-0'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <motion.button
                  onClick={() => scrollToSection('home')}
                  className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <span className="font-bold text-lg sm:text-xl text-secondary-900 dark:text-secondary-100">
                    Portfolio
                  </span>
                </motion.button>

                {/* Desktop Navigation - Hidden on mobile/tablet */}
                <nav className="hidden lg:flex items-center space-x-8">
                  {[
                    { id: 'home', label: 'Home' },
                    { id: 'about', label: 'About' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'contact', label: 'Contact' },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="px-3 py-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative group"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </motion.button>
                  ))}
                </nav>

                {/* Theme Toggle & Hamburger Menu - Right side */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Theme Toggle - Hidden on mobile/tablet when hamburger menu is visible */}
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className="hidden lg:flex p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-200 shadow-sm"
                    aria-label="Toggle theme"
                  >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </motion.button>

                  {/* Hamburger Menu - Only visible on mobile/tablet */}
                  <HamburgerMenu
                    isOpen={isMenuOpen}
                    onToggle={() => setIsMenuOpen(!isMenuOpen)}
                    onNavigate={scrollToSection}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <section id="home" className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
                  {/* Left Column - Profile Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                    className="flex justify-center lg:justify-end order-1 lg:order-1"
                  >
                  <ProfileImage
                    size="xl"
                    className="mx-auto max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] hover:scale-105 transition-transform duration-300 -mt-4 md:-mt-1 lg:-mt-24"
                  />
                  </motion.div>

                  {/* Right Column - Name and Description */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                    className="text-center lg:text-left order-2 lg:order-2"
                  >
                    {/* Name with typing animation */}
                    <div className="mb-4 sm:mb-6">
                      <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-2 leading-tight">
                        Hi, My Name{' '}
                        <TypingAnimation
                          texts={['Mohammad Iqbal']}
                          speed={150}
                          className="text-primary-600 dark:text-primary-400"
                          cursorClassName="bg-primary-600 dark:bg-primary-400"
                          stopAfterComplete={true}
                        />
                      </h1>
                    </div>

                    {/* Description with typing animation */}
                    <div className="mb-6 sm:mb-8">
                      <TypingAnimation
                        texts={['Full Stack Developer', 'UI/UX Designer', 'Problem Solver']}
                        speed={100}
                        delay={2000}
                        className="text-lg sm:text-xl md:text-xl lg:text-3xl text-secondary-600 dark:text-secondary-400 block"
                        cursorClassName="bg-secondary-600 dark:bg-secondary-500"
                      />
                    </div>

                    {/* Additional description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 mb-8 sm:mb-12 leading-relaxed"
                    >
                      I create beautiful, functional, and user-centered digital experiences.
                      Passionate about clean code, innovative solutions, and bringing ideas to life.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-8 sm:mb-12"
                    >
                      <motion.button
                        onClick={() => scrollToSection('projects')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-200 group shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View My Work
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>

                      <motion.button
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 font-medium rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-all duration-200 group shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="mr-2 w-4 h-4 group-hover:translate-y-[-1px] transition-transform" />
                        Download CV
                      </motion.button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="flex justify-center lg:justify-start items-center gap-4 sm:gap-6"
                    >
                      {[
                        { icon: Github, href: 'https://github.com', label: 'GitHub' },
                        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                        { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
                      ].map((social) => {
                        const Icon = social.icon
                        return (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 sm:p-3 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 rounded-lg hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                            aria-label={social.label}
                          >
                            <Icon size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                          </motion.a>
                        )
                      })}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-8 sm:py-12 md:py-16 bg-secondary-50 dark:bg-secondary-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    About Me
                  </h2>
                  <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                    Get to know more about my journey, skills, and what drives me to create amazing digital experiences.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                      Passionate Full Stack Developer
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
                      With over 5 years of experience in web development, I specialize in creating
                      modern, responsive, and user-friendly applications. I love turning complex
                      problems into simple, beautiful, and intuitive solutions.
                    </p>
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      Learn more about my work
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4 sm:gap-6"
                  >
                    {[
                      { number: '50+', label: 'Projects Completed' },
                      { number: '5+', label: 'Years Experience' },
                      { number: '20+', label: 'Happy Clients' },
                      { number: '100%', label: 'Client Satisfaction' },
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 sm:p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-sm">
                        <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className="py-8 sm:py-12 md:py-16 bg-white dark:bg-secondary-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Skills & Technologies
                  </h2>
                  <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                    I work with modern technologies and frameworks to build robust and scalable applications.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {[
                    { name: 'React', level: 95 },
                    { name: 'TypeScript', level: 90 },
                    { name: 'Node.js', level: 85 },
                    { name: 'Python', level: 80 },
                    { name: 'Next.js', level: 88 },
                    { name: 'Tailwind CSS', level: 92 },
                    { name: 'PostgreSQL', level: 82 },
                    { name: 'AWS', level: 75 },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="mb-4">
                        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-primary-500 h-2 rounded-full"
                          />
                        </div>
                        <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                          {skill.name}
                        </div>
                        <div className="text-xs text-secondary-600 dark:text-secondary-400">
                          {skill.level}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-8 sm:py-12 md:py-16 bg-secondary-50 dark:bg-secondary-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    My Projects
                  </h2>
                  <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
                    Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {[
                    {
                      title: 'E-Commerce Platform',
                      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL.',
                      tech: ['React', 'Node.js', 'PostgreSQL']
                    },
                    {
                      title: 'Task Management App',
                      description: 'A collaborative task management application with real-time updates.',
                      tech: ['React', 'TypeScript', 'Firebase']
                    },
                    {
                      title: 'Weather Dashboard',
                      description: 'A responsive weather dashboard with location-based forecasts.',
                      tech: ['React', 'Tailwind CSS', 'OpenWeather API']
                    }
                  ].map((project, index) => (
                    <motion.div
                      key={index}
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
                        transition: { duration: 0.10, type: "spring", stiffness: 400, damping: 20 }
                      }}
                      className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
                    >
                      <div className="h-full flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400 mb-4 flex-grow leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tech.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: index * 0.1 + techIndex * 0.05 }}
                              viewport={{ once: true }}
                              className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs sm:text-sm rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-8 sm:py-12 md:py-16 bg-white dark:bg-secondary-800">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                    Get In Touch
                  </h2>
                  <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400">
                    Ready to work together? Let's create something amazing.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
                      Let's Start a Conversation
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
                      I'm always interested in new opportunities and exciting projects.
                      Whether you have a question or just want to say hi, I'll do my best
                      to get back to you!
                    </p>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
                          your.email@example.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
                          📍
                        </span>
                        <span className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
                          Bandung, Indonesia
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <form className="space-y-4 sm:space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm sm:text-base transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 focus:shadow-lg"
                          placeholder="Your name"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm sm:text-base transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 focus:shadow-lg"
                          placeholder="your.email@example.com"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm sm:text-base transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 focus:shadow-lg resize-none"
                          placeholder="Your message..."
                        />
                      </motion.div>
                      <motion.button
                        type="submit"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 sm:px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </section>
          </main>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: showScrollTop ? 1 : 0,
              scale: showScrollTop ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-2 sm:p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} className="sm:w-6 sm:h-6" />
          </motion.button>

          {/* Footer */}
          <footer className="bg-secondary-900 dark:bg-secondary-950 py-8 sm:py-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <motion.div
                      className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-white font-bold text-lg">P</span>
                    </motion.div>
                    <span className="font-bold text-lg sm:text-xl text-white">Portfolio</span>
                  </div>
                  <p className="text-secondary-400 text-sm sm:text-base leading-relaxed">
                    Creating beautiful, functional, and user-centered digital experiences.
                    Passionate about clean code, innovative solutions, and bringing ideas to life.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {[
                      { id: 'home', label: 'Home' },
                      { id: 'about', label: 'About' },
                      { id: 'projects', label: 'Projects' },
                      { id: 'contact', label: 'Contact' },
                    ].map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className="text-secondary-400 hover:text-primary-400 transition-colors text-sm sm:text-base flex items-center group"
                        >
                          <span className="w-1 h-1 bg-primary-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {item.label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Connect</h3>
                  <div className="flex space-x-3 sm:space-x-4">
                    {[
                      { icon: Github, href: 'https://github.com', label: 'GitHub' },
                      { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                      { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
                    ].map((social, index) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-secondary-800 text-secondary-400 hover:text-primary-400 hover:bg-secondary-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          aria-label={social.label}
                        >
                          <Icon size={18} className="sm:w-5 sm:h-5" />
                        </motion.a>
                      )
                    })}
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="border-t border-secondary-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-secondary-400 text-sm sm:text-base">
                  © 2024 Mohammad Iqbal. All rights reserved.
                </p>
              </motion.div>
            </div>
          </footer>
        </div>
  )
}

const SinglePageApp: React.FC = () => {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <SinglePageAppContent />
      </AnimationProvider>
    </ThemeProvider>
  )
}

export default SinglePageApp
