import { Box } from '@mui/material';
import Header2 from '@utils/components/Header/Header2';
import { getAndStoreMovieDetails } from '@utils/functions/getAndStoreMovieDetails';
import { getMovieDetailsRequest } from '@utils/request/getMovieDetailsRequest';
import RatingComponent from '@views/Rating/RatingComponent';
import RatingNav from '@views/Rating/RatingNav';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RatingContainer = () => {

  const { type, id, action } = useParams();

  let defaultAction = 0;
  
  // Déterminer l'action par défaut (noter ou conseiller)
  if(action) {
    defaultAction = action !== 'review' ? 1 : 0;
  }

  const [ratingSectionIndex, setRatingSectionIndex] = useState(defaultAction);
  const [movieSelected, setMovieSelected] = useState(null);

  useEffect(() => {
    if(id) {
      getAndStoreMovieDetails(type, parseInt(id, 10), setMovieSelected);
    }
  }, [id]);

  return (
    <Box
        height='auto'
        minHeight='100vh' 
        width='100vw' 
        bgcolor='#011212'
      >
        <Box bgcolor='#052525' >
          <Header2 page={'Mon profil'} isTrailerFullscreen={null} />
          <RatingNav 
            ratingSectionIndex={ratingSectionIndex} 
            setRatingSectionIndex={setRatingSectionIndex}
          />
        </Box>
        <RatingComponent 
          ratingSectionIndex={ratingSectionIndex} 
          movieSelected={movieSelected}
          setMovieSelected={setMovieSelected}  
        />
    </Box>
  );
};

export default RatingContainer;