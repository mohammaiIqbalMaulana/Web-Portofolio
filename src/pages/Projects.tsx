import React from 'react'
import { motion } from 'framer-motion'

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
            My Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                Project 1
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                This is a sample project. More projects will be added here.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects
