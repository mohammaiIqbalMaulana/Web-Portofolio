import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download, Github, Instagram, Youtube, Music2, Linkedin, Mail, ChevronUp, Moon, Sun, CheckCircle, AlertCircle, Loader2, Code, Database, Palette, Zap, Globe, Cpu, Layers, Sparkles } from 'lucide-react'
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { theme, toggleTheme } = useTheme()
  const [newsletterData, setNewsletterData] = useState({
    email: '',
    source: 'portfolio-footer'
  })
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  // Contact form state
const [formData, setFormData] = useState({
  name: '',
  email: '',
  whatsapp: '',
  location: '',
  expertise: '',
  message: ''
})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Handle scroll to show/hide scroll-to-top button and header styling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((currentScrollY / documentHeight) * 100, 100)

      setShowScrollTop(currentScrollY > 500)
      setIsScrolled(currentScrollY > 50)
      setScrollProgress(progress)

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Smooth scroll to section with header offset for all screen sizes
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64
      const elementPosition = element.offsetTop - headerHeight

      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
      })
    }
  }

  // Handle Newsletter Subscription
  const validateNewsletterEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletterData({
      ...newsletterData,
      email: e.target.value
    })
    // Clear status when user types
    if (newsletterStatus !== 'idle') {
      setNewsletterStatus('idle')
      setNewsletterMessage('')
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateNewsletterEmail(newsletterData.email)) {
      setNewsletterStatus('error')
      setNewsletterMessage('Please enter a valid email address')
      return
    }

    setNewsletterStatus('loading')

    try {
      console.log('Newsletter Config:', {
        SERVICE_ID: EMAILJS_CONFIG.SERVICE_ID,
        NEWSLETTER_TEMPLATE_ID: EMAILJS_CONFIG.NEWSLETTER_TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_CONFIG.PUBLIC_KEY ? 'EXISTS' : 'MISSING'
      })

      const templateParams = {
        subscriber_email: newsletterData.email,
        subscription_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: newsletterData.source,
        to_name: 'Mohammad Iqbal',
        to_email: 'iqbalmaulana14042005@gmail.com'
      }

      console.log('Newsletter templateParams:', templateParams)

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.NEWSLETTER_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      console.log('Newsletter success:', response)

      setNewsletterStatus('success')
      setNewsletterMessage('Thank you for subscribing! You\'ll receive updates about new projects.')
      setNewsletterData({ email: '', source: 'portfolio-footer' })

      setTimeout(() => {
        setNewsletterStatus('idle')
        setNewsletterMessage('')
      }, 8000)

    } catch (error: any) {
      console.error('Newsletter error details:', {
        error: error,
        message: error?.message,
        status: error?.status,
        text: error?.text
      })
      
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (error?.status === 400) {
        errorMessage = 'Invalid email format. Please check and try again.'
      } else if (error?.status === 401) {
        errorMessage = 'Service authentication failed. Please try again later.'
      } else if (error?.status === 404) {
        errorMessage = 'Service temporarily unavailable.'
      }
      
      setNewsletterStatus('error')
      setNewsletterMessage(errorMessage)
      
      setTimeout(() => {
        setNewsletterStatus('idle')
        setNewsletterMessage('')
      }, 8000)
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.expertise.trim()) {
      errors.expertise = 'Please select an expertise area'
    }

    if (!formData.message.trim()) {
      errors.message = 'Project details are required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Project details must be at least 10 characters long'
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
    const { SERVICE_ID, CONTACT_TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG

      // Prepare email template parameters
      const templateParams = {
        // Parameter untuk template EmailJS yang sesuai
        from_name: formData.name,
        from_email: formData.email,
        service_type: formData.expertise || 'General Inquiry',
        client_phone: formData.whatsapp || 'Not provided',
        client_location: formData.location || 'Not specified',
        project_details: formData.message,
        to_name: 'Mohammad Iqbal',
        to_email: 'iqbalmaulana14042005@gmail.com',
        reply_to: formData.email,
      }

      // Send email using EmailJS
      await emailjs.send(
        SERVICE_ID,
        CONTACT_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({ 
        name: '', 
        email: '', 
        whatsapp: '', 
        location: '',
        expertise: '',
        message: '' 
      })

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
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-0">
          {/* Enhanced Fixed Header */}
          <header className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-secondary-50/70 dark:bg-secondary-900/70 backdrop-blur-md border-b border-secondary-200/30 dark:border-secondary-800/30 shadow-md'
              : 'bg-transparent border-b-0'
          } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            {/* Scroll Progress Bar */}
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden"
              style={{ width: `${scrollProgress}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: scrollProgress / 100 }}
              transition={{ duration: 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <motion.button
                  onClick={() => scrollToSection('home')}
                  className="flex items-center space-x-2 hover:opacity-80 transition-all duration-0"
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

                {/* Enhanced Desktop Navigation - Hidden on mobile/tablet */}
                <nav className="hidden lg:flex items-center space-x-8">
                  {[
                    { id: 'home', label: 'Home' },
                    { id: 'about', label: 'About' },
                    { id: 'skills', label: 'Skills' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'contact', label: 'Contact' },
                  ].map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="px-3 py-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-0 relative group overflow-hidden"
                      whileHover={{
                        y: -2,
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.span
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        whileHover={{ height: "2px" }}
                        transition={{ duration: 0.2 }}
                      />
                      {/* Magnetic effect background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  ))}
                </nav>

                {/* Theme Toggle & Hamburger Menu - Right side */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Enhanced Theme Toggle - Hidden on mobile/tablet when hamburger menu is visible */}
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      rotate: 180,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className="hidden lg:flex p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-0 shadow-sm hover:shadow-lg relative overflow-hidden group"
                    aria-label="Toggle theme"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </motion.div>

                    {/* Enhanced background effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-0 rounded-lg"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
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
            <section id="home" className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-secondary-900 dark:via-blue-900/5 dark:to-indigo-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
              {/* Enhanced Background Effects - Blue Theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/30 dark:from-blue-900/15 dark:via-transparent dark:to-indigo-900/10"></div>
              <div className="absolute top-10 left-20 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-32 right-16 w-64 h-64 bg-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
              <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-2/3 left-1/3 w-56 h-56 bg-blue-300/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

              <div className="max-w-7xl mx-auto w-full relative z-10">
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
                    className="mx-auto max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] hover:scale-105 transition-transform duration-0 -mt-4 md:-mt-1 lg:-mt-24"
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
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-0 group shadow-lg hover:shadow-2xl relative overflow-hidden"
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">View My Work</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" />

                        {/* Enhanced Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-0"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 translate-y-full group-hover:translate-y-0 transition-transform duration-0"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </motion.button>

                      <motion.button
                        onClick={handleDownloadCV}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-0 group shadow-sm hover:shadow-lg relative overflow-hidden"
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          borderColor: "rgb(59 130 246)",
                          boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="mr-2 w-4 h-4 group-hover:translate-y-[-2px] group-hover:rotate-12 transition-all duration-300 relative z-20" />
                        <span className="relative z-20">Download CV</span>

                        {/* Enhanced Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-0"></div>

                        {/* Ripple Effect */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-blue-400/20 dark:bg-blue-600/20"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-400/20 to-transparent"></div>
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
                            whileHover={{
                              scale: 1.15,
                              y: -4,
                              rotate: [0, -5, 5, 0],
                              transition: { duration: 0.4, type: "spring", stiffness: 300 }
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/50 dark:hover:to-indigo-800/50 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-0 relative overflow-hidden group shadow-sm hover:shadow-lg"
                            aria-label={social.label}
                          >
                            <Icon size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" />

                            {/* Enhanced Background Effects */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 dark:from-blue-600/30 dark:to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-0 rounded-lg"></div>

                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-0"></div>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent rounded-lg"></div>
                          </motion.a>
                        )
                      })}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-green-50/20 to-teal-50/30 dark:from-secondary-900 dark:via-emerald-900/5 dark:to-teal-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
              {/* Enhanced Background Effects - Green Theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-transparent to-teal-50/30 dark:from-emerald-900/15 dark:via-transparent dark:to-teal-900/10"></div>
              <div className="absolute top-16 left-16 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-24 right-20 w-64 h-64 bg-teal-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/4 right-1/5 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
              <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-2/3 right-1/3 w-56 h-56 bg-emerald-300/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                      Passionate with Technologies & Building what matters
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
                      I have been studying at Muhammadiyah University of Semarang since 2023. During my studies, I gained a foundation in Java programming and have worked on various programs using both Java and Python. Outside of class, I also deepened my skills as a full-stack developer using Node.js, including completing two web-based projects during my internship. This combined experience has given me a foundation in building applications from the backend to the frontend, while also developing a broader understanding of programming concepts. In addition to academics and technology, I am also active as an influencer on TikTok and YouTube, further honing my communication skills, content creativity, and engagement with digital audiences.
                    </p>
                    <motion.button
                      onClick={() => scrollToSection('projects')}
                      className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 relative overflow-hidden group px-4 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-0"
                      whileHover={{
                        scale: 1.05,
                        x: 5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Learn more about my work</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-0.5 transition-all duration-0 relative z-10" />

                      {/* Enhanced Background Effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-0 rounded-lg"></div>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-emerald-200/40 dark:via-emerald-400/20 to-transparent rounded-lg"></div>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4 sm:gap-6"
                  >
                    {[
                      { number: '10', label: 'Projects Completed' },
                      { number: '2', label: 'Years Experience' },
                      { number: '5', label: 'Happy Clients' },
                      { number: '90%', label: 'Client Satisfaction' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg shadow-sm hover:shadow-xl transition-all duration-0 relative overflow-hidden group border border-emerald-100 dark:border-emerald-800"
                        whileHover={{
                          y: -8,
                          scale: 1.05,
                          rotateY: 5,
                          transition: { type: "spring", stiffness: 300 }
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors relative z-10">
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 relative z-10">
                          {stat.label}
                        </div>

                        {/* Enhanced Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 dark:from-emerald-600/20 dark:to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-0 rounded-lg"></div>

                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-0"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-emerald-200/30 dark:via-emerald-400/20 to-transparent rounded-lg"></div>

                        {/* Counter Animation */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-0"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-8 sm:py-12 md:py-16 bg-white dark:bg-secondary-800 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-transparent dark:from-primary-900/10 dark:to-transparent"></div>
              <div className="absolute top-16 left-16 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-24 right-20 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-primary-300/8 rounded-full blur-3xl"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12 sm:mb-16"
                >
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Skills & Technologies
                  </motion.h2>
                  <motion.p
                    className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    I work with modern technologies and frameworks to build robust and scalable applications.
                  </motion.p>
                </motion.div>

                {/* Skill Categories */}
                <div className="mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-8"
                  >
                    {[
                      { name: 'Frontend', icon: Globe, color: 'from-blue-500 to-cyan-500' },
                      { name: 'Backend', icon: Database, color: 'from-green-500 to-emerald-500' },
                      { name: 'Design', icon: Palette, color: 'from-purple-500 to-pink-500' }
                    ].map((category, index) => {
                      const Icon = category.icon
                      return (
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.8 * index * 0.1 }}
                          viewport={{ once: true }}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white shadow-lg`}
                        >
                          <Icon size={16} />
                          <span className="font-medium text-sm">{category.name}</span>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>

                {/* Enhanced Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {[
                    {
                      name: 'React',
                      level: 85,
                      category: 'Frontend',
                      icon: Code,
                      color: 'from-blue-500 to-cyan-500',
                      description: 'Building dynamic user interfaces with modern React patterns'
                    },
                    {
                      name: 'TypeScript',
                      level: 70,
                      category: 'Frontend',
                      icon: Layers,
                      color: 'from-blue-600 to-blue-400',
                      description: 'Type-safe JavaScript development for scalable applications'
                    },
                    {
                      name: 'Node.js',
                      level: 100,
                      category: 'Backend',
                      icon: Zap,
                      color: 'from-green-500 to-emerald-500',
                      description: 'High-performance server-side JavaScript runtime'
                    },
                    {
                      name: 'Python',
                      level: 85,
                      category: 'Backend',
                      icon: Cpu,
                      color: 'from-green-600 to-green-400',
                      description: 'Versatile programming for data science and web development'
                    },
                    {
                      name: 'Tailwind CSS',
                      level: 92,
                      category: 'Frontend',
                      icon: Sparkles,
                      color: 'from-cyan-500 to-teal-500',
                      description: 'Utility-first CSS framework for rapid UI development'
                    },
                    {
                      name: 'MySQL',
                      level: 93,
                      category: 'Backend',
                      icon: Database,
                      color: 'from-orange-500 to-red-500',
                      description: 'Relational database management and optimization'
                    },
                    {
                      name: 'Java',
                      level: 90,
                      category: 'Backend',
                      icon: Cpu,
                      color: 'from-red-500 to-orange-500',
                      description: 'Object-oriented programming and enterprise applications'
                    },
                    {
                      name: 'Figma',
                      level: 80,
                      category: 'Design',
                      icon: Palette,
                      color: 'from-purple-500 to-pink-500',
                      description: 'UI/UX design and prototyping for digital products'
                    }
                  ].map((skill, index) => {
                    const Icon = skill.icon
                    return (
                      <motion.div
                        key={skill.name}
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
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-violet-50 via-purple-50/20 to-fuchsia-50/30 dark:from-secondary-900 dark:via-violet-900/5 dark:to-fuchsia-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
              {/* Enhanced Background Effects - Purple Theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-transparent to-fuchsia-50/30 dark:from-violet-900/15 dark:via-transparent dark:to-fuchsia-900/10"></div>
              <div className="absolute top-12 left-12 w-80 h-80 bg-violet-400/15 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-28 right-24 w-64 h-64 bg-fuchsia-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/5 left-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
              <div className="absolute top-1/4 right-1/5 w-72 h-72 bg-fuchsia-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-3/4 left-1/3 w-56 h-56 bg-violet-300/12 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                      description: 'The System Information App is a full-stack web-based application built with Node.js (Express.js), MySQL, and Bootstrap 5 to support issue monitoring and news report management...',
                      tech: ['Node.js', 'Express.js', 'Bootstrap', 'CKEditor', 'MySQL'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/system-information-app',
                          label: 'View Code'
                        },
                        {
                          type: 'demo',
                          url: 'https://system-info-demo.vercel.app',
                          label: 'Live Demo'
                        }
                      ]
                    },
                    {
                      title: 'System Development Tracking Social Media Account',
                      description: 'The Social Media Account Development Tracking System is a website used to comprehensively manage TikTok account data...',
                      tech: ['Node.js', 'Express.js', 'Bootstrap', 'SweetAlert', 'AJAX', 'MySQL'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/social-media-tracker',
                          label: 'Source Code'
                        }
                      ]
                    },
                    {
                      title: 'Hospital Management System (Java GUI)',
                      description: 'A simple Java GUI-based application with CRUD features for managing hospital data...',
                      tech: ['Java', 'Swing', 'JDBC', 'MySQL'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/hospital-management-java',
                          label: 'GitHub Repo'
                        }
                      ]
                    },
                    {
                      title: 'Object Scanner with YOLO (Real-time Detection)',
                      description: 'This project leverages YOLOv8 to perform real-time object detection through a camera...',
                      tech: ['Python', 'YOLOv8', 'OpenCV', 'NumPy'],
                      links: [
                        {
                          type: 'colab',
                          url: 'https://colab.research.google.com/drive/your-notebook-id',
                          label: 'Open in Colab'
                        },
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/yolo-object-detection',
                          label: 'Source Code'
                        }
                      ]
                    },
                    {
                      title: 'Personal Portfolio Website',
                      description: 'A personal portfolio website built with React and Tailwind CSS...',
                      tech: ['React', 'Node.js', 'Tailwind CSS', 'TypeScript'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/portfolio',
                          label: 'Source Code'
                        },
                        {
                          type: 'demo',
                          url: 'https://iqbal-portfolio.vercel.app',
                          label: 'Live Site'
                        }
                      ]
                    },
                    {
                      title: 'Rock Paper Scissors Classification (CNN)',
                      description: 'An image classification project uses a Convolutional Neural Network (CNN)...',
                      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
                      links: [
                        {
                          type: 'colab',
                          url: 'https://colab.research.google.com/drive/your-rps-notebook-id',
                          label: 'Run in Colab'
                        }
                      ]
                    },
                    {
                      title: 'Streamlit Web App',
                      description: 'A Streamlit-based project for creating interactive web applications...',
                      tech: ['Python', 'Streamlit', 'Pandas', 'NumPy'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/streamlit-ml-app',
                          label: 'GitHub'
                        },
                        {
                          type: 'demo',
                          url: 'https://your-streamlit-app.streamlit.app',
                          label: 'Try App'
                        }
                      ]
                    },
                    {
                      title: 'Python Fundamentals & Praktikum (CLI/Notebook Projects)',
                      description: 'In addition to large projects, there are also exercises and practicals focused on Python fundamentals...',
                      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/python-fundamentals',
                          label: 'View Projects'
                        }
                      ]
                    },
                    {
                      title: 'Template Matching (Image Detection)',
                      description: 'This project uses template matching with OpenCV to detect specific objects in images...',
                      tech: ['Python', 'OpenCV', 'NumPy'],
                      links: [
                        {
                          type: 'colab',
                          url: 'https://colab.research.google.com/drive/your-template-matching-id',
                          label: 'Open Notebook'
                        }
                      ]
                    },
                    {
                      title: 'Cropping Makhluk Hidup (Image Processing)',
                      description: 'A simple program for cropping specific portions of images of living things...',
                      tech: ['Python', 'Pillow', 'NumPy'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/image-cropping',
                          label: 'Source'
                        }
                      ]
                    },
                    {
                      title: 'Analisis Kompleksitas Algoritma',
                      description: 'This notebook focuses on time complexity analysis for evaluating algorithm efficiency...',
                      tech: ['Python', 'Jupyter Notebook'],
                      links: [
                        {
                          type: 'colab',
                          url: 'https://colab.research.google.com/drive/algorithm-complexity-analysis',
                          label: 'View Analysis'
                        }
                      ]
                    },
                    {
                      title: 'Image Classification with CNN',
                      description: 'This project builds a Convolutional Neural Network (CNN) model for image classification...',
                      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
                      links: [
                        {
                          type: 'colab',
                          url: 'https://colab.research.google.com/drive/cnn-image-classification',
                          label: 'Training Notebook'
                        },
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/cnn-image-classification',
                          label: 'Complete Code'
                        }
                      ]
                    },
                    {
                      title: 'Payroll System (Perhitungan Gaji)',
                      description: 'This project creates an OOP-based payroll calculation system in Python...',
                      tech: ['Python', 'OOP', 'PrettyTable'],
                      links: [
                        {
                          type: 'github',
                          url: 'https://github.com/mohammaiIqbalMaulana/payroll-system',
                          label: 'Source Code'
                        }
                      ]
                    },
                    {
                      title: 'Hospital Payroll Management System',
                      description: 'A simple application for a hospital payroll system created in an interactive notebook...',
                      tech: ['Python', 'OOP', 'Pandas'],
                      links: [
                        {
                          type: 'colab',
                          url: 'https://colab.research.google.com/drive/hospital-payroll-system',
                          label: 'Interactive Demo'
                        }
                      ]
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
                        rotateY: 2,
                        transition: { duration: 0.4, type: "spring", stiffness: 300 }
                      }}
                      className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-2xl transition-all duration-0 cursor-pointer group relative overflow-hidden border border-violet-100 dark:border-violet-800"
                    >
                      <div className="h-full flex flex-col">
                        <h3 className="text-lg sm:text-xl font-semibold text-violet-900 dark:text-violet-100 mb-2 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors relative z-10">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-violet-600 dark:text-violet-400 mb-4 flex-grow leading-relaxed relative z-10">
                          {project.description}
                        </p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, techIndex) => (
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
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        {/* Project Links - Only show on hover */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-20"
                        >
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-violet-200/50 dark:border-violet-700/50">
                            {project.links?.map((link, linkIndex) => {
                              const getLinkIcon = (type: string) => {
                                switch(type) {
                                  case 'github':
                                    return <Github size={14} />
                                  case 'demo':
                                    return <Globe size={14} />
                                  case 'colab':
                                    return <Code size={14} />
                                  default:
                                    return <ArrowRight size={14} />
                                }
                              }

                              const getLinkStyle = (type: string) => {
                                switch(type) {
                                  case 'github':
                                    return 'bg-gray-600 hover:bg-gray-700 text-white'
                                  case 'demo':
                                    return 'bg-blue-500 hover:bg-blue-600 text-white'
                                  case 'colab':
                                    return 'bg-orange-500 hover:bg-orange-600 text-white'
                                  default:
                                    return 'bg-violet-500 hover:bg-violet-600 text-white'
                                }
                              }

                              return (
                                <motion.a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()} // Prevent card click interference
                                  whileHover={{ 
                                    scale: 1.05, 
                                    y: -2,
                                    transition: { duration: 0.2 } 
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md ${getLinkStyle(link.type)}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: linkIndex * 0.1 }}
                                >
                                  {getLinkIcon(link.type)}
                                  <span>{link.label}</span>
                                </motion.a>
                              )
                            })}
                          </div>
                        </motion.div>

                        {/* Enhanced Background Effects - Only active on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-fuchsia-400/10 dark:from-violet-600/20 dark:to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                        {/* Glow Effect - Only active on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                        {/* Shimmer Effect - Only active on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-violet-200/30 dark:via-violet-400/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100"></div>
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
                        className="inline-flex items-center px-6 sm:px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white font-medium rounded-lg transition-all duration-0 shadow-lg hover:shadow-2xl group relative overflow-hidden"
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">{showAllProjects ? 'Show Less' : 'Show More Projects'}</span>
                        <ArrowRight className={`ml-2 w-4 h-4 transition-all duration-0 group-hover:translate-x-2 group-hover:-translate-y-0.5 relative z-10 ${showAllProjects ? 'rotate-180' : ''}`} />

                        {/* Enhanced Background Effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-0"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-700 translate-y-full group-hover:translate-y-0 transition-transform duration-00"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        {/* Ripple Effect */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-violet-400/20"></div>
                      </motion.button>
                    </motion.div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-amber-50 via-orange-50/20 to-red-50/30 dark:from-secondary-900 dark:via-amber-900/5 dark:to-red-900/10 relative overflow-hidden" style={{ transition: 'none' }}>
              {/* Subtle Background Effects - Orange Theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-orange-50/15 dark:from-amber-900/8 dark:via-transparent dark:to-orange-900/5"></div>
              <div className="absolute top-32 left-16 w-64 h-64 bg-amber-300/8 rounded-full blur-3xl"></div>
              <div className="absolute bottom-32 right-16 w-72 h-72 bg-orange-300/8 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  {/* Left Column - Contact Info & Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                        Information
                      </h3>

                      {/* Contact Details */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-secondary-800/50 rounded-lg border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm">
                          <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xl">📞</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">Phone</h4>
                            <p className="text-secondary-600 dark:text-secondary-400">+62 881-6564-510</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-secondary-800/50 rounded-lg border border-orange-200/50 dark:border-orange-800/50 backdrop-blur-sm">
                          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">Email</h4>
                            <p className="text-secondary-600 dark:text-secondary-400">iqbalmaulana14042005@gmail.com</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-secondary-800/50 rounded-lg border border-red-200/50 dark:border-red-800/50 backdrop-blur-sm">
                          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xl">📍</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">Location</h4>
                            <p className="text-secondary-600 dark:text-secondary-400">Semarang, Indonesia</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Image Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                            Let's Work Together!
                          </h4>
                          <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                            I'm always excited to take on new challenges and collaborate on interesting projects.
                          </p>
                          <motion.button
                              onClick={() => window.open('https://wa.me/628816564510?text=Hi%20Mohammad%20Iqbal,%20I%20found%20your%20portfolio%20and%20interested%20in%20working%20together!', '_blank')}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              Let's Connect
                          </motion.button>
                        </div>

                        {/* Profile Image */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="flex justify-center"
                        >
                          <div className="relative">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-secondary-800 shadow-xl">
                              <img
                                src="/images/Iqbal.jpg"
                                alt="Mohammad Iqbal"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm">🙋🏻‍♂️</span>
                            </div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">💎</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right Column - Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                  <div className="bg-white/80 dark:bg-secondary-800/80 rounded-2xl p-6 sm:p-8 border border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm shadow-xl">
                    <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                      Send Me a Message
                    </h3>

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

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                          >
                            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('name')}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 ${
                                formErrors.name
                                  ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                                  : 'border-secondary-300 dark:border-secondary-600'
                              }`}
                              placeholder="Enter your full name"
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
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('email')}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 ${
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
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="whatsapp"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('whatsapp')}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 ${
                                formErrors.whatsapp
                                  ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                                  : 'border-secondary-300 dark:border-secondary-600'
                              }`}
                              placeholder="Your phone number"
                            />
                            {formErrors.whatsapp && (
                              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.whatsapp}</p>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('location')}
                              onBlur={handleBlur}
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 ${
                                formErrors.location
                                  ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                                  : 'border-secondary-300 dark:border-secondary-600'
                              }`}
                              placeholder="Your location"
                            />
                            {formErrors.location && (
                              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.locaion}</p>
                            )}
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                            What Expertise You're Interested In *
                          </label>
                          <select
                            name="expertise"
                            value={formData.expertise}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('expertise')}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 ${formErrors.expertise
                              ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                              : 'border-secondary-300 dark:border-secondary-600'
                            }`}
                          >
                            <option value="">Select a service</option>
                            <option value="Full Stack Development">Full Stack Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="API Development">API Development</option>
                            <option value="Consultation">Consultation</option>
                            <option value="Other">Other</option>
                          </select>
                          {formErrors.expertise && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.expertise}</p>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                            Tell Us About Your Project *
                          </label>
                          <textarea
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('message')}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white transition-all duration-300 resize-none ${
                              formErrors.message
                                ? 'border-red-500 dark:border-red-400 focus:ring-red-500'
                                : 'border-secondary-300 dark:border-secondary-600'
                            }`}
                            placeholder="Describe your project requirements, goals, and any specific details..."
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
                          transition={{ duration: 0.6, delay: 0.7 }}
                          viewport={{ once: true }}
                          whileHover={{
                            scale: isSubmitting ? 1 : 1.02,
                            y: isSubmitting ? 0 : -2,
                            transition: { duration: 0.2, ease: "easeOut" }
                          }}
                          whileTap={{
                            scale: isSubmitting ? 1 : 0.98,
                            transition: { duration: 0.1 }
                          }}
                          className={`relative w-full px-8 py-4 font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-base flex items-center justify-center space-x-2 overflow-hidden ${
                            isSubmitting
                              ? 'bg-secondary-400 dark:bg-secondary-600 text-secondary-600 dark:text-secondary-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5"
                              >
                                <Loader2 className="w-5 h-5" />
                              </motion.div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span className="relative z-10">Submit</span>
                              <ArrowRight className="w-5 h-5 relative z-10" />

                              {/* Enhanced background effects */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            </>
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

          </main>

          {/* Enhanced Scroll to Top Button */}
          <motion.div
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: showScrollTop ? 1 : 0,
              scale: showScrollTop ? 1 : 0,
              y: showScrollTop ? 0 : 20
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6
            }}
          >
            <motion.button
              onClick={scrollToTop}
              className="relative group cursor-pointer"
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.4, type: "spring", stiffness: 300 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              aria-label="Scroll to top"
            >
              {/* Progress Ring Background */}
              <div className="absolute inset-0 rounded-full">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary-300/30 dark:text-primary-700/30"
                  />
                  {/* Animated Progress Ring */}
                  <motion.path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#scrollProgressGradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: scrollProgress / 100 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="drop-shadow-sm"
                  />
                  <defs>
                    <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Main Button */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden group-hover:shadow-primary-500/25">

                {/* Animated Background Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  initial={{ scale: 0, opacity: 0.8 }}
                  whileTap={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Icon with Animation */}
                <motion.div
                  animate={{
                    y: [0, -2, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <ChevronUp size={20} className="sm:w-6 sm:h-6" />
                </motion.div>

                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 0.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                {/* Pulsing Ring */}
                <motion.div
                  className="absolute -inset-2 border-2 border-primary-400/50 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Tooltip */}
              <motion.div
                className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-secondary-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20"
                initial={{ y: 5, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                Back to top
                <div className="absolute top-full right-4 transform -translate-x-1/2 border-4 border-transparent border-t-secondary-900"></div>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Enhanced Footer */}
          <footer className="bg-secondary-900 dark:bg-secondary-950 py-8 sm:py-12 relative overflow-hidden">
            {/* Background decoration - Enhanced */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent"></div>
            <div className="absolute top-8 left-1/5 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-8 right-1/5 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-16 right-16 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-16 left-16 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-300/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Newsletter Subscription Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12 sm:mb-16"
              >
                <div className="bg-gradient-to-r from-primary-900/20 to-secondary-800/20 dark:from-primary-800/30 dark:to-secondary-700/30 rounded-2xl p-6 sm:p-8 border border-primary-800/30 dark:border-primary-700/30">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Stay Updated</h3>
                    <p className="text-secondary-300 text-sm sm:text-base">Subscribe to get notified about new projects and updates</p>
                  </div>

                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <div className="flex-1 relative">
                        <input
                          type="email"
                          value={newsletterData.email}
                          onChange={handleNewsletterChange}
                          placeholder="Enter your email"
                          disabled={newsletterStatus === 'loading'}
                          className={`w-full px-4 py-3 bg-secondary-800/50 border rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                            newsletterStatus === 'error' 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-secondary-700 focus:ring-primary-500'
                          } ${newsletterStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          required
                        />
                        
                        {/* Status indicator */}
                        {newsletterStatus === 'loading' && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full"
                            />
                          </div>
                        )}
                      </div>
                      
                      <motion.button
                        type="submit"
                        disabled={newsletterStatus === 'loading' || !newsletterData.email}
                        whileHover={newsletterStatus !== 'loading' ? { scale: 1.05, y: -2 } : {}}
                        whileTap={newsletterStatus !== 'loading' ? { scale: 0.95 } : {}}
                        className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 shadow-lg ${
                          newsletterStatus === 'loading' || !newsletterData.email
                            ? 'bg-secondary-600 text-secondary-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white hover:shadow-xl'
                        }`}
                      >
                        {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                      </motion.button>
                    </form>

                    {/* Status Message */}
                    <AnimatePresence>
                      {newsletterMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`mt-3 text-center text-sm ${
                            newsletterStatus === 'success' 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}
                        >
                          {newsletterMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span className="text-secondary-400 text-sm sm:text-base">
                        iqbalmaulana14042005@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-primary-400">
                        📍
                      </span>
                      <span className="text-secondary-400 text-sm sm:text-base">
                        Semarang, Indonesia
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-primary-400">
                        ⏰
                      </span>
                      <span className="text-secondary-400 text-sm sm:text-base">
                        Available for freelance
                      </span>
                    </div>
                  </div>
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
                      { id: 'skills', label: 'Skills' },
                      { id: 'projects', label: 'Projects' },
                      { id: 'contact', label: 'Contact' },
                    ].map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 * index * 0.05 }}
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
                        { icon: Github, href: 'https://github.com/mohammaiIqbalMaulana', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800' },
                        { icon: Linkedin, href: 'https://www.linkedin.com/in/mohammad-iqbalmaulana-93746a386/', label: 'LinkedIn', color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                        { icon: Instagram, href: 'https://www.instagram.com/kikezukata._/', label: 'Instagram', color: 'hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20' },
                        { icon: Youtube, href: 'https://youtube.com/@zukataofficial4484?si=rcinKfCG38z7o4eI', label: 'YouTube', color: 'hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' },
                        { icon: Music2, href: 'https://www.tiktok.com/@kikezukata_kun', label: 'TikTok', color: 'hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20' },
                    ].map((social, index) => {
                      const Icon = social.icon
                      return (
                          <motion.div
                            key={social.label}
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.a
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{
                                scale: 1.15,
                                y: -4,
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.4, type: "spring", stiffness: 300 }
                              }}
                              whileTap={{ scale: 0.9 }}
                              className={`p-2 sm:p-3 bg-secondary-800/50 text-secondary-400 rounded-lg ${social.color} transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-lg`}
                              aria-label={social.label}
                            >
                              <Icon size={18} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />

                              {/* Enhanced background effects */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />

                              {/* Glow effect */}
                              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                              {/* Tooltip */}
                              <motion.div
                                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-secondary-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20"
                                initial={{ y: 5, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {social.label}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-secondary-900"></div>
                              </motion.div>
                            </motion.a>
                          </motion.div>
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