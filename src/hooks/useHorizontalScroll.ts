import { useState, useEffect } from 'react';

// Déclenche le chargement de nouvelles données lors du scroll horizontal
export const useHorizontalScroll = (
  getDataFunction,
  threshold,
  ref,
  hasMoreDataRef,
) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!ref || !hasMoreDataRef || isFetching) return;

    const handleScroll = event => {
      const { scrollLeft, clientWidth, scrollWidth } = event.currentTarget;
      if (
        scrollWidth - Math.ceil(scrollLeft + clientWidth) < threshold &&
        !isFetching
      ) {
        console.log('recharge !!!');

        setIsFetching(true);
        getDataFunction().then(() => {
          setIsFetching(false);
        });
      }
    };

    ref.addEventListener('scroll', handleScroll);

    return () => ref.removeEventListener('scroll', handleScroll);
  }, [isFetching, ref, hasMoreDataRef]);

  return [isFetching];
};
