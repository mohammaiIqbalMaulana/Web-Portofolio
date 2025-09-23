import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download, Github, Instagram, Youtube, Music2, Linkedin, Mail, ChevronUp, Moon, Sun, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { AnimationProvider } from '../contexts/AnimationContext'
import TypingAnimation from '../components/TypingAnimation'
import ProfileImage from '../components/ProfileImage'
import HamburgerMenu from '../components/HamburgerMenu'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs'
import '../styles/hamburger.css'

const SinglePageAppContent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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

  // Handle CV download
  const handleDownloadCV = () => {
    const cvPath = '/CV_Mohammad Iqbal Maulana.pdf'
    const link = document.createElement('a')
    link.href = cvPath
    link.download = 'CV_Mohammad Iqbal Maulana.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Toggle show all projects with smooth scroll preservation
  const toggleShowAllProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      // Store current scroll position and calculate relative position within projects section
      const currentScrollTop = window.pageYOffset
      const projectsTop = projectsSection.offsetTop
      const projectsHeight = projectsSection.offsetHeight
      const viewportHeight = window.innerHeight

      // Calculate how far down the user has scrolled into the projects section
      const scrollIntoProjects = currentScrollTop - projectsTop
      const maxScrollIntoProjects = projectsHeight - viewportHeight

      // Calculate the scroll progress as a ratio (0 to 1)
      const scrollProgress = maxScrollIntoProjects > 0 ? Math.min(scrollIntoProjects / maxScrollIntoProjects, 1) : 0

      // Toggle the state
      setShowAllProjects(!showAllProjects)

      // Use setTimeout to ensure the DOM has updated before scrolling
      setTimeout(() => {
        const updatedProjectsSection = document.getElementById('projects')
        if (updatedProjectsSection) {
          const newProjectsTop = updatedProjectsSection.offsetTop
          const newProjectsHeight = updatedProjectsSection.offsetHeight
          const newMaxScrollIntoProjects = newProjectsHeight - viewportHeight

          // Calculate target scroll position based on the same scroll progress
          let targetScrollTop

          if (showAllProjects) {
            // Going from all projects to limited - maintain scroll progress
            targetScrollTop = newProjectsTop + (scrollProgress * newMaxScrollIntoProjects)
          } else {
            // Going from limited to all projects - maintain scroll progress
            targetScrollTop = newProjectsTop + (scrollProgress * newMaxScrollIntoProjects)
          }

          // Ensure the target position is within reasonable bounds
          targetScrollTop = Math.max(
            newProjectsTop,
            Math.min(targetScrollTop, newProjectsTop + newMaxScrollIntoProjects)
          )

          // Only scroll if the new position would be significantly different
          if (Math.abs(targetScrollTop - currentScrollTop) > 20) {
            window.scrollTo({
              top: Math.max(0, targetScrollTop),
              behavior: 'smooth'
            })
          }
        }
      }, 200) // Increased timeout to ensure DOM updates are complete
    } else {
      // Fallback to simple toggle if projects section not found
      setShowAllProjects(!showAllProjects)
    }
  }

  // Form handling functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Check if EmailJS credentials are configured
      const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG

      // Prepare email template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Mohammad Iqbal',
        to_email: 'iqbalmaulana14042005@gmail.com',
        subject: `Portfolio Contact: ${formData.name}`,
        message: `
          Name: ${formData.name}
          Email: ${formData.email}
          WhatsApp: ${formData.whatsapp || 'Not Filled'}
          Message:
          ${formData.message}
        `,
        reply_to: formData.email,
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', whatsapp: '', subject: '', message: '' })

      // Auto-dismiss success message after 10 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 1000)
    } catch (error: any) {
      console.error('❌ EmailJS Error Details:', {
        error: error,
        message: error?.message,
        status: error?.status,
        text: error?.text,
        name: error?.name
      })

      // Auto-dismiss error message after 10 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 1000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
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
                        texts={['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Influencer']}
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
                        onClick={handleDownloadCV}
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
                        { icon: Github, href: 'https://github.com/mohammaiIqbalMaulana', label: 'GitHub' },
                        { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/', label: 'LinkedIn' },
                        { icon: Instagram, href: 'https://www.instagram.com/kikezukata._/', label: 'Instagram' },
                        { icon: Youtube, href: 'https://youtube.com/@zukataofficial4484?si=rcinKfCG38z7o4eI', label: 'YouTube' },
                        { icon: Music2, href: 'https://www.tiktok.com/@kikezukata_kun', label: 'TikTok' },
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
                      Passionate 
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
                      I have been studying at Muhammadiyah University of Semarang since 2023. During my studies, I gained a foundation in Java programming and have worked on various programs using both Java and Python. Outside of class, I also deepened my skills as a full-stack developer using Node.js, including completing two web-based projects during my internship. This combined experience has given me a foundation in building applications from the backend to the frontend, while also developing a broader understanding of programming concepts. In addition to academics and technology, I am also active as an influencer on TikTok and YouTube, further honing my communication skills, content creativity, and engagement with digital audiences.
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
                      { number: '10+', label: 'Projects Completed' },
                      { number: '2+', label: 'Years Experience' },
                      { number: '5+', label: 'Happy Clients' },
                      { number: '90%', label: 'Client Satisfaction' },
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
                    { name: 'React', level: 85 },
                    { name: 'TypeScript', level: 70 },
                    { name: 'Node.js', level: 100 },
                    { name: 'Python', level: 85 },
                    { name: 'Tailwind CSS', level: 92 },
                    { name: 'MySQL', level: 93 },
                    { name: 'Java', level: 90 },
                    { name: 'Figma', level: 80 }
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

                <motion.div
                  key={showAllProjects ? 'all' : 'limited'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  {[
                    {
                      title: 'System Information App',
                      description: 'The System Information App is a full-stack web-based application built with Node.js (Express.js), MySQL, and Bootstrap 5 to support issue monitoring and news report management. This application features management of leaders and OPDs, CRUD staff reports, input of priority/special/virality issues for leaders, and an interactive dashboard with filters and data visualization. The system also supports uploading, downloading, clustering, and centralized storage with user authentication so that previously manual processes are now faster, safer, and more efficient.',
                      tech: ['Node.js', 'Express.js', 'Bootstrap' , 'CKEditor', 'MySQL']
                    },
                    {
                      title: 'System Development Tracking Social Media Account',
                      description: 'The Social Media Account Development Tracking System is a website used to comprehensively manage TikTok account data. Its main features include CRUD posting, follower count updates, target input, and automatic Engagement Rate (ER) calculations using predetermined formulas. The system also provides reports in PDF and Excel formats, as well as visualization of account growth through interactive charts.',
                      tech: ['Node.js', 'Express.js', 'Bootstrap', 'SweetAlert', 'AJAX', 'MySQL']
                    },
                    {
                      title: 'Hospital Management System (Java GUI)',
                      description: 'A simple Java GUI-based application with CRUD features for managing hospital data, including medications, drug prices, doctor names, and patient names. This system is designed to simplify and practically manage hospital data.',
                      tech: ['Java', 'Swing', 'JDBC', 'MySQL']
                    },
                    {
                      title: 'Object Scanner with YOLO (Real-time Detection)',
                      description: 'This project leverages YOLOv8 to perform real-time object detection through a camera. The system is capable of recognizing surrounding objects, including specialized variants such as face detection (YOLOv8_FACE) and mobile phone detection (YOLOv8_HANDPHONE). This application demonstrates a fast and accurate implementation of modern computer vision with deep learning.',
                      tech: ['Python', 'YOLOv8', 'OpenCV', 'NumPy']
                    },
                    {
                      title: 'Personal Portfolio Website',
                      description: 'A personal portfolio website built with React and Tailwind CSS to showcase my projects, skills, and experience. The website features a modern design, responsive layout, and smooth animations to provide an engaging user experience.',
                      tech: ['React', 'Node.js', 'Tailwind CSS', 'TypeScript']
                    },
                    {
                      title: 'Rock Paper Scissors Classification (CNN)',
                      description: 'An image classification project uses a Convolutional Neural Network (CNN) to recognize the hand symbols rock, paper, and scissors. The dataset is processed using a simple CNN architecture until the model can make accurate predictions. This project demonstrates the application of deep learning to a classic game using an image classification approach.',
                      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy']
                    },
                    {
                      title: 'Streamlit Web App',
                      description: 'A Streamlit-based project for creating interactive web applications from machine learning or data analysis models. Its main feature is a simple interface that allows users to test models directly without the need for re-coding. This project serves as an example of implementing ML model deployment into a web-based application.',
                      tech: ['Python', 'Streamlit', 'Pandas', 'NumPy']
                    },
                    {
                      title: 'Python Fundamentals & Praktikum (CLI/Notebook Projects)',
                      description: 'In addition to large projects, there are also exercises and practicals focused on Python fundamentals, such as a CLI system for payroll validation, data processing, and experiments in Google Colab. These practicals reinforce programming fundamentals, explore popular libraries, and apply them to simple case studies.',
                      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
                    },
                    {
                      title: 'Template Matching (Image Detection)',
                      description: 'This project uses template matching with OpenCV to detect specific objects in images. The system works by matching template patterns to the main image to locate the desired object. This project demonstrates the basic application of computer vision in digital image processing.',
                      tech: ['Python', 'OpenCV', 'NumPy']
                    },
                    {
                      title: 'Cropping Makhluk Hidup (Image Processing)',
                      description: 'A simple program for cropping specific portions of images of living things. This project emphasizes image manipulation with Python as a first step in further processing, while also developing an understanding of using image processing libraries.',
                      tech: ['Python', 'Pillow', 'NumPy']
                    },
                    {
                      title: 'Analisis Kompleksitas Algoritma',
                      description: 'This notebook focuses on time complexity analysis for evaluating algorithm efficiency. Containing simple function implementations and performance experiments, this project trains program efficiency analysis skills in various scenarios.',
                      tech: ['Python', 'Jupyter Notebook']
                    },
                    {
                      title: 'Image Classification with CNN',
                      description: 'This project builds a Convolutional Neural Network (CNN) model for image classification using TensorFlow and Keras. The dataset is processed using augmentation techniques, then the model is trained to produce an evaluation in the form of a confusion matrix and a classification report. This project demonstrates the application of deep learning to computer vision using a simple yet effective CNN architecture.',
                      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy']
                    },
                    {
                      title: 'Payroll System (Perhitungan Gaji)',
                      description: 'This project creates an OOP-based payroll calculation system in Python. The program allows employee data input, bonus settings, and deductions, as well as displaying payslips in tabular format using PrettyTable. This system demonstrates the application of class concepts, methods, and data validation to manage employee payroll calculations in an organized manner.',
                      tech: ['Python', 'OOP', 'PrettyTable']
                    },
                    {
                      title: 'Hospital Payroll Management System',
                      description: 'A simple application for a hospital payroll system created in an interactive notebook. The system allows for adding employee data, calculating monthly salaries, and displaying reports. The program features input validation and a class-based management structure. This project combines OOP implementation and practical data management in a hospital system simulation.',
                      tech: ['Python', 'OOP', 'Pandas']
                    }
                  ].slice(0, showAllProjects ? undefined : 7).map((project, index) => (
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
                </motion.div>
              </div>
                    {/* Show More Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="text-center mt-8 sm:mt-12"
                    >
                      <motion.button
                        onClick={toggleShowAllProjects}
                        className="inline-flex items-center px-6 sm:px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl group"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {showAllProjects ? 'Show Less' : 'Show More Projects'}
                        <ArrowRight className={`ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 ${showAllProjects ? 'rotate-180' : ''}`} />
                      </motion.button>
                    </motion.div>
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
                          iqbalmaulana14042005@gmail.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
                          📍
                        </span>
                        <span className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
                          Semarang, Indonesia
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
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      {/* Submit Status Messages */}
                      <AnimatePresence>
                        {submitStatus && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-lg flex items-center space-x-3 ${
                              submitStatus === 'success'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                            }`}
                          >
                            {submitStatus === 'success' ? (
                              <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            )}
                            <span className="text-sm">
                              {submitStatus === 'success'
                                ? 'Message sent successfully! I\'ll get back to you soon.'
                                : 'Failed to send message. Please try again.'}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm sm:text-base transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 focus:shadow-lg ${
                            formErrors.name
                              ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                              : 'border-secondary-300 dark:border-secondary-600'
                          }`}
                          placeholder="Your name"
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm sm:text-base transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 focus:shadow-lg ${
                            formErrors.email
                              ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                              : 'border-secondary-300 dark:border-secondary-600'
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus('whatsapp')}
                          onBlur={handleBlur}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm sm:text-base transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 focus:shadow-lg ${
                            formErrors.whatsapp
                              ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                              : 'border-secondary-300 dark:border-secondary-600'
                          }`}
                          placeholder="Your WhatsApp number"
                        />
                        {formErrors.whatsapp && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.whatsapp}</p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                          Message *
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 text-sm sm:text-base transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 focus:shadow-lg resize-none ${
                            formErrors.message
                              ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                              : 'border-secondary-300 dark:border-secondary-600'
                          }`}
                          placeholder="Your message..."
                        />
                        {formErrors.message && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.message}</p>
                        )}
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className={`w-full px-6 sm:px-8 py-3 font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base flex items-center justify-center space-x-2 ${
                          isSubmitting
                            ? 'bg-secondary-400 dark:bg-secondary-600 text-secondary-600 dark:text-secondary-400 cursor-not-allowed'
                            : 'bg-primary-500 hover:bg-primary-600 text-white'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
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
                        { icon: Github, href: 'https://github.com/mohammaiIqbalMaulana', label: 'GitHub' },
                        { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/', label: 'LinkedIn' },
                        { icon: Instagram, href: 'https://www.instagram.com/kikezukata._/', label: 'Instagram' },
                        { icon: Youtube, href: 'https://youtube.com/@zukataofficial4484?si=rcinKfCG38z7o4eI', label: 'YouTube' },
                        { icon: Music2, href: 'https://www.tiktok.com/@kikezukata_kun', label: 'TikTok' },
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
                  © 2025 Mohammad Iqbal. All rights reserved.
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