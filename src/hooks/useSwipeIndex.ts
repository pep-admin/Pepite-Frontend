import { useState, useRef, useCallback } from 'react';

const useSwipeZIndex = initialDirection => {
  const [zIndexes, setZIndexes] = useState({
    current: 3,
    previous: 1,
    next: 2,
  });
  const dragDirectionRef = useRef(initialDirection);

  const setZIndexForSwipe = useCallback(direction => {
    if (dragDirectionRef.current !== direction) {
      dragDirectionRef.current = direction;
      setZIndexes({
        current: 3,
        previous: direction === 'right' ? 1 : 2,
        next: direction === 'right' ? 2 : 1,
      });
    }
  }, []);

  return { zIndexes, dragDirectionRef, setZIndexForSwipe };
};

export default useSwipeZIndex;
