import React from 'react'
import { motion } from 'framer-motion'

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
            Contact Me
          </h1>
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-8">
            <p className="text-secondary-600 dark:text-secondary-400">
              Contact form will be implemented here.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
