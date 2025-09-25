import React, { useState } from 'react'
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
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52',
    md: 'w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56',
    lg: 'w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64',
    xl: 'w-44 h-44 sm:w-52 sm:h-52 md:w-52 md:h-52 lg:w-80 lg:h-80'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      whileHover={!reducedMotion ? {
        scale: 1.1,
        rotate: 5,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
    >
      {/* Smooth glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur-lg opacity-30"
        animate={!reducedMotion ? {
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered ? 0.5 : 0.3
        } : {}}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Main image container */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-secondary-800 shadow-2xl">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          animate={!reducedMotion ? {
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? "brightness(1.15) contrast(1.1) saturate(1.15)" : "brightness(1) contrast(1) saturate(1)"
          } : {}}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        />

        {/* Smooth overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Smooth shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
          animate={{
            x: isHovered ? '100%' : '-100%',
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Smooth floating elements */}
      {!reducedMotion && (
        <>
          <motion.div
            animate={{
              y: isHovered ? [-6, 10, -6] : [-6, 6, -6],
              rotate: isHovered ? [0, 8, 0] : [0, 5, 0],
              scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1]
            }}
            transition={{
              duration: isHovered ? 1.5 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full opacity-60 shadow-lg"
          />
          <motion.div
            animate={{
              y: isHovered ? [6, -8, 6] : [6, -6, 6],
              rotate: isHovered ? [0, -6, 0] : [0, -4, 0],
              scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1]
            }}
            transition={{
              duration: isHovered ? 1.2 : 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500 rounded-full opacity-50 shadow-lg"
          />
        </>
      )}

      {/* Smooth ripple effects */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-400"
            animate={isHovered ? {
              scale: [1, 1.2, 1.4],
              opacity: [0, 0.4, 0]
            } : { scale: 1, opacity: 0 }}
            transition={{
              duration: 1.2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeOut"
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-full border border-primary-300"
            animate={isHovered ? {
              scale: [1, 1.3, 1.5],
              opacity: [0, 0.2, 0]
            } : { scale: 1, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "easeOut",
              delay: 0.2
            }}
          />
        </>
      )}
    </motion.div>
  )
}

export default ProfileImage
