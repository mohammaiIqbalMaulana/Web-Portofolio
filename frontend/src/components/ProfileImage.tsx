import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { useAnimation } from '../contexts/AnimationContext'

interface ProfileImageProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src = '/images/Iqmal.jpg',
  alt = 'Mohammad Iqbal Maulana portrait',
  size = 'xl',
  className = 'mx-auto',
}) => {
  const { reducedMotion } = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48',
    md: 'w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56',
    lg: 'w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64',
    xl: 'w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-[22rem] lg:h-[22rem]'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-br from-primary-500/30 via-sky-500/15 to-transparent blur-lg sm:-inset-3 sm:blur-2xl" />
      <div className="absolute inset-0 rounded-[2rem] border border-white/50 dark:border-white/10 bg-white/30 dark:bg-secondary-900/20 backdrop-blur-md" />

      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10">
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          animate={reducedMotion ? {} : { scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        <div className="absolute inset-0 hidden bg-gradient-to-t from-secondary-950/35 via-transparent to-transparent lg:block" />

        <div className="absolute left-4 top-4 hidden items-center gap-2 rounded-full border border-white/35 bg-white/70 px-3 py-1 text-[11px] font-medium text-secondary-800 shadow-sm backdrop-blur-md lg:flex dark:border-white/10 dark:bg-secondary-950/50 dark:text-secondary-100">
          <Camera size={14} />
          <span>Portrait</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 hidden items-end justify-between gap-3 lg:flex">
          <div className="max-w-[65%] rounded-2xl border border-white/25 bg-secondary-950/55 px-3 py-2 text-left backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Now</p>
            <p className="mt-1 text-sm font-semibold text-white">Building calm, responsive interfaces</p>
          </div>

          <div className="rounded-full border border-white/25 bg-white/80 px-3 py-2 text-[11px] font-medium text-secondary-700 shadow-sm backdrop-blur-md dark:bg-secondary-950/70 dark:text-secondary-100">
            Semarang
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileImage
