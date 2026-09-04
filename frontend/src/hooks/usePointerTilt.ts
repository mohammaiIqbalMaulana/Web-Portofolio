import { useCallback, useMemo, useState, type PointerEventHandler } from 'react';
import { useAnimation } from '../contexts/AnimationContext';

interface PointerTiltState {
  rotateX: number;
  rotateY: number;
  x: number;
  y: number;
  scale: number;
  isActive: boolean;
}

interface PointerTiltOptions {
  maxTilt?: number;
  maxShift?: number;
  scale?: number;
  disabled?: boolean;
}

const createDefaultState = (scale: number): PointerTiltState => ({
  rotateX: 0,
  rotateY: 0,
  x: 0,
  y: 0,
  scale,
  isActive: false,
});

export const usePointerTilt = ({
  maxTilt = 10,
  maxShift = 10,
  scale = 1.03,
  disabled = false,
}: PointerTiltOptions = {}) => {
  const { reducedMotion, isMobile, canHover } = useAnimation();
  const isDisabled = disabled || reducedMotion || isMobile || !canHover;
  const [tilt, setTilt] = useState<PointerTiltState>(createDefaultState(scale));

  const handlePointerMove = useCallback<PointerEventHandler<HTMLElement>>(
    (event) => {
      if (isDisabled || event.pointerType === 'touch') return;

      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const normalizedX = offsetX / rect.width - 0.5;
      const normalizedY = offsetY / rect.height - 0.5;

      setTilt({
        rotateX: -normalizedY * maxTilt,
        rotateY: normalizedX * maxTilt,
        x: normalizedX * maxShift,
        y: normalizedY * maxShift,
        scale,
        isActive: true,
      });
    },
    [isDisabled, maxTilt, maxShift, scale]
  );

  const handlePointerEnter = useCallback(() => {
    if (isDisabled) return;
    setTilt((current) => ({ ...current, isActive: true }));
  }, [isDisabled]);

  const handlePointerLeave = useCallback(() => {
    setTilt(createDefaultState(scale));
  }, [scale]);

  const bind = useMemo(
    () => ({
      onPointerMove: handlePointerMove,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    }),
    [handlePointerEnter, handlePointerLeave, handlePointerMove]
  );

  return {
    tilt,
    bind,
    isDisabled,
  };
};
