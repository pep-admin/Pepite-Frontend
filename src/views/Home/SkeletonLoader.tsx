import { Box, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';

const SkeletonLoader = ({
  containerWidth,
  containerHeight,
  cardWidth = 200,
  cardHeight = 300,
}) => {
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    if (containerWidth && containerHeight) {
      const cardsPerRow = Math.floor(containerWidth / cardWidth);
      const rowsVisible = Math.floor(containerHeight / cardHeight);
      setSkeletonCount(cardsPerRow * rowsVisible); // Calcul du nombre de cards factices
    }
  }, [containerWidth, containerHeight, cardWidth, cardHeight]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
      {[...Array(skeletonCount)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width={cardWidth}
          height={cardHeight}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Box>
  );
};

export default SkeletonLoader;
