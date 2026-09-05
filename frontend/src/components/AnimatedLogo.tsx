import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../contexts/AnimationContext';

interface AnimatedLogoProps {
  className?: string;
}

/**
 * Small monogram badge with a slowly rotating, colour-shifting conic
 * gradient behind it — reads as "alive" without being distracting, and
 * respects prefers-reduced-motion (falls back to a static gradient).
 */
const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '' }) => {
  const { reducedMotion } = useAnimation();

  return (
    <div className={`relative h-9 w-9 shrink-0 ${className}`}>
      {/* Soft ambient glow, breathing gently behind the badge. */}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-2xl bg-[conic-gradient(from_0deg,#38bdf8,#a855f7,#f472b6,#38bdf8)] opacity-60 blur-md"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        {/* The gradient itself continuously rotates underneath the clipped
            rounded square, so the colours visibly cycle/shift over time. */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-3 bg-[conic-gradient(from_0deg,#38bdf8,#a855f7,#f472b6,#fb923c,#38bdf8)]"
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">MI</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
