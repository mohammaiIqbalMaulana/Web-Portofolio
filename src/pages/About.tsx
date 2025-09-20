import React from 'react'
import { motion } from 'framer-motion'

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
            About Me
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              This is the About page. More content will be added here.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
