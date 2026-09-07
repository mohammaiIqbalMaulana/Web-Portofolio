import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { useAnimation } from '../contexts/AnimationContext';

interface AnimatedLogoProps {
  className?: string;
  /** Badge size in pixels. Defaults to 36 (matches the header's h-9 w-9). */
  size?: number;
}

/**
 * Small logo badge — a code glyph over a slowly rotating, colour-shifting
 * conic gradient, with a bright dot continuously orbiting the edge. The
 * gradient rotation alone read as "just changing colour"; the orbiting dot
 * is what actually looks like something is perpetually *moving*, not just
 * shifting hue. Respects prefers-reduced-motion (falls back to a static
 * gradient with no motion at all).
 */
const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', size = 36 }) => {
  const { reducedMotion } = useAnimation();
  const iconSize = Math.round(size * 0.47);
  const dotSize = Math.max(4, Math.round(size * 0.042) + 4);

  return (
    <div className={`relative shrink-0 ${className}`} style={{ height: size, width: size }}>
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
          <Code2 size={iconSize} strokeWidth={2.5} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
        </div>

        {/* A little comet that keeps orbiting the badge forever — the part
            that actually reads as "berjalan terus" rather than a static
            icon sitting on top of a colour animation. */}
        {!reducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <span
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.85)]"
              style={{ height: dotSize, width: dotSize }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnimatedLogo;

