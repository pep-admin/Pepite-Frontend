import { Container } from '@mui/material';
import RatingSearch from './RatingSearch';
import { useState } from 'react';
import RatingStars from './RatingStars';
import RatingMovieSelected from './RatingMovieSelected';
import RatingReview from './RatingReview';
import RatingPublish from './RatingPublish';

const RatingComponent = () => {

  const [movieSelected, setMovieSelected] = useState(null);
  const [movieRating, setMovieRating] = useState(null);
  const [criticText, setCriticText] = useState(null);
  const [isGoldNugget, setIsGoldNugget] = useState(false);
  const [isTurnip, setIsTurnip] = useState(false);

  return (
    <Container
      sx={{
        padding: '0 5vw',
        height: 'calc(100vh - 109px)',
        overflow: 'auto',
      }}
    >
      <RatingSearch 
        movieSelected={movieSelected}
        setMovieSelected={setMovieSelected}
      />
      {
        movieSelected &&
        <>
          <RatingMovieSelected movie={movieSelected} />
          <RatingStars 
            isGoldNugget={isGoldNugget}
            setIsGoldNugget={setIsGoldNugget}
            isTurnip={isTurnip}
            setIsTurnip={setIsTurnip}
            movieRating={movieRating} 
            setMovieRating={setMovieRating} 
          />
          <RatingReview movie={movieSelected} criticText={criticText} setCriticText={setCriticText} />
          <RatingPublish 
            movie={movieSelected} 
            isGoldNugget={isGoldNugget}
            isTurnip={isTurnip}
            movieRating={movieRating}
            criticText={criticText}  
          />
        </>
      }
    </Container>
  );
};

export default RatingComponent;