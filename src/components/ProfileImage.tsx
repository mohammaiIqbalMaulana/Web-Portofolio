import React from 'react'
import { motion } from 'framer-motion'
import { useAnimation } from '../contexts/AnimationContext'

interface ProfileImageProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src = '/images/Iq.jpg',
  alt = 'Mohammad Iqbal - Full Stack Developer',
  size = 'xl',
  className = 'mx-auto',
}) => {
  const { reducedMotion } = useAnimation()

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={!reducedMotion ? {
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.3 }
      } : {}}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur-lg opacity-30 animate-pulse" />

      {/* Main image container */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-secondary-800 shadow-2xl">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          whileHover={!reducedMotion ? { scale: 1.1 } : {}}
          transition={{ duration: 0.5 }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Floating elements for decoration */}
      {!reducedMotion && (
        <>
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full opacity-60"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary-400 rounded-full opacity-50"
          />
        </>
      )}
    </motion.div>
  )
}

export default ProfileImage
