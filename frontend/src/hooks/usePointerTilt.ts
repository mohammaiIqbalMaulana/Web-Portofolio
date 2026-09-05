import { useCallback, useMemo, type PointerEvent as ReactPointerEvent } from 'react';
import { useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useAnimation } from '../contexts/AnimationContext';

interface PointerTiltOptions {
  /** Max tilt rotation in degrees. */
  maxTilt?: number;
  /** Max parallax shift in px. */
  maxShift?: number;
  /** Scale applied while hovered. */
  scale?: number;
  disabled?: boolean;
}

/**
 * Smooth, spring-driven 3D pointer tilt.
 *
 * Unlike a naive version that stores rotation in React state (which snaps the
 * card straight to the cursor on every mousemove and feels stiff/jittery),
 * this tracks raw pointer position in Framer Motion motion values and runs
 * them through a spring. Motion values update outside React's render cycle
 * via requestAnimationFrame, so the card eases and trails the cursor with
 * real inertia instead of teleporting — which is what actually reads as
 * "3D" rather than a flat rotation snapping around.
 */
export const usePointerTilt = ({
  maxTilt = 16,
  maxShift = 18,
  scale = 1.05,
  disabled = false,
}: PointerTiltOptions = {}) => {
  const { reducedMotion, isMobile, canHover } = useAnimation();
  const isDisabled = disabled || reducedMotion || isMobile || !canHover;

  // Raw normalized pointer position within the element, range -0.5..0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // 0 = idle, 1 = hovered — springs itself so scale/glare fade in and out smoothly too.
  const hovered = useMotionValue(0);

  const followSpring = { stiffness: 200, damping: 22, mass: 0.7 };
  const fadeSpring = { stiffness: 220, damping: 26 };

  const springX = useSpring(px, followSpring);
  const springY = useSpring(py, followSpring);
  const springHover = useSpring(hovered, fadeSpring);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-maxShift, maxShift]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-maxShift, maxShift]);
  const scaleValue = useTransform(springHover, [0, 1], [1, scale]);

  // A soft light sheen that glides across the surface, following the cursor —
  // this is what sells the "glass catching the light" 3D feel.
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useTransform(springHover, [0, 1], [0, 0.55]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.85), transparent 45%)`;

  // Ambient drop shadow that shifts opposite the tilt, as if a light source
  // were fixed above the card while the card itself leans toward the cursor.
  const shadowX = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const shadowBlur = useTransform(springHover, [0, 1], [40, 70]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(15, 23, 42, 0.22)`;

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (isDisabled || event.pointerType === 'touch') return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [isDisabled, px, py]
  );

  const handlePointerEnter = useCallback(() => {
    if (isDisabled) return;
    hovered.set(1);
  }, [isDisabled, hovered]);

  const handlePointerLeave = useCallback(() => {
    hovered.set(0);
    px.set(0);
    py.set(0);
  }, [hovered, px, py]);

  const bind = useMemo(
    () => ({
      onPointerMove: handlePointerMove,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    }),
    [handlePointerMove, handlePointerEnter, handlePointerLeave]
  );

  return {
    bind,
    isDisabled,
    /** Spread onto the tilting card's `style` prop. */
    cardStyle: {
      rotateX,
      rotateY,
      x: translateX,
      y: translateY,
      scale: scaleValue,
      boxShadow,
    },
    /** Spread onto an absolutely-positioned overlay `div` inside the card for the light sheen. */
    glareStyle: {
      background: glareBackground,
      opacity: glareOpacity,
    },
  };
};
