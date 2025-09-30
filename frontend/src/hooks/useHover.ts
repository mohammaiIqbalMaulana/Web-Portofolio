import { useState } from 'react';

export const useHover = () => {
  const [hover, setHover] = useState(false);

  const onHoverStart = () => setHover(true);
  const onHoverEnd = () => setHover(false);

  return { hover, onHoverStart, onHoverEnd };
};
