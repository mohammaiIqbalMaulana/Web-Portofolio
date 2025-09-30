import { useState, useEffect } from 'react';

export function useTouchToggle() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  useEffect(() => {
    if (!isTouchDevice) return;

    const handleOutsideClick = () => {
      setShowContent(false);
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isTouchDevice]);

  const toggleContent = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      e.stopPropagation();
      setShowContent(!showContent);
    }
  };

  return { isTouchDevice, showContent, toggleContent };
}
