import { Box } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import RatingComponent from '@views/Rating/RatingComponent';
import RatingNav from '@views/Rating/RatingNav';
import { useState } from 'react';

const RatingContainer = () => {

  const [ratingSectionIndex, setRatingSectionIndex] = useState(0);

  return (
    <Box
        height='auto'
        minHeight='100vh' 
        width='100vw' 
        bgcolor='#011212'
      >
        <Box bgcolor='#052525' >
          <Header2 page={'Mon profil'} isTrailerFullscreen={null} />
          <RatingNav ratingSectionIndex={ratingSectionIndex} setRatingSectionIndex={setRatingSectionIndex} />
        </Box>
        <RatingComponent ratingSectionIndex={ratingSectionIndex} />
    </Box>
  );
};

export default RatingContainer;