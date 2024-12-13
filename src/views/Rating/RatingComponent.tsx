import { Container } from '@mui/material';
import RatingSearch from './RatingSearch';
import { useEffect, useState } from 'react';
import RatingStars from './RatingStars';
import RatingMovieSelected from './RatingMovieSelected';
import RatingReview from './RatingReview';
import RatingPublish from './RatingPublish';
import RatingFriendSelected from './RatingFriendSelected';

const RatingComponent = ({ ratingSectionIndex, movieSelected, setMovieSelected }) => {

  const [friendSelected, setFriendSelected] = useState(null);
  const [movieRating, setMovieRating] = useState(null);
  const [criticText, setCriticText] = useState(null);
  const [isGoldNugget, setIsGoldNugget] = useState(false);
  const [isTurnip, setIsTurnip] = useState(false);

  const [publicationChoice, setPublicationChoice] = useState('publique');

  // Reset si l'utilisateur sélectionne un nouveau film à noter
  useEffect(() => {
    console.log('film sélectionné ?', movieSelected);
    
    setMovieRating(null);
    setCriticText(null);
    setIsGoldNugget(false);
    setIsTurnip(false);
  }, [movieSelected]);

  useEffect(() => {
    if(ratingSectionIndex === 0) {
      setPublicationChoice('publique');
    } else {
      setPublicationChoice('privée');
    }
  }, [ratingSectionIndex])

  return (
    <Container
      sx={{
        padding: '0 5vw',
        height: 'calc(100vh - 109px)',
        overflow: 'auto',
      }}
    >
      <RatingSearch 
        searchType={'movie'}
        setMovieSelected={setMovieSelected}
        friendSelected={null}
        setFriendSelected={null}
      />
      {
        movieSelected &&
        <>
          <RatingMovieSelected movie={movieSelected} />
          { ratingSectionIndex === 1 && 
            <RatingSearch 
              searchType={'friend'} 
              setMovieSelected={null} 
              friendSelected={friendSelected}
              setFriendSelected={setFriendSelected}
            />
          }
          { ratingSectionIndex === 1 && friendSelected &&
            <RatingFriendSelected
              friendSelected={friendSelected}
              setFriendSelected={setFriendSelected}
              movieSelected={movieSelected}
            />
          }
          <RatingStars 
            ratingSectionIndex={ratingSectionIndex}
            isGoldNugget={isGoldNugget}
            setIsGoldNugget={setIsGoldNugget}
            isTurnip={isTurnip}
            setIsTurnip={setIsTurnip}
            movieRating={movieRating} 
            setMovieRating={setMovieRating} 
          />
          <RatingReview 
            ratingSectionIndex={ratingSectionIndex}
            movie={movieSelected} 
            criticText={criticText} 
            setCriticText={setCriticText}
            friendSelected={friendSelected}
          />
          <RatingPublish 
            ratingSectionIndex={ratingSectionIndex}
            publicationChoice={publicationChoice}
            setPublicationChoice={setPublicationChoice}
            isCriticOrAdvice={ratingSectionIndex === 0 ? 'critic' : 'advice'}
            movie={movieSelected} 
            isGoldNugget={isGoldNugget}
            isTurnip={isTurnip}
            movieRating={movieRating}
            criticText={criticText}  
            friendSelected={friendSelected}
            setMovieSelected={setMovieSelected}
          />
        </>
      }
    </Container>
  );
};

export default RatingComponent;