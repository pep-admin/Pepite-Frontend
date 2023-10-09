// Import des libs externes
import { styled, Paper, Container, Stack, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSpring } from 'react-spring';
import { useState } from 'react';

// Import des composants internes
import Header from '@utils/Header';
import SearchBar from '@utils/SearchBar';
import SwipeFilter from '@views/Swipe/SwipeFilter';
import SwipeCard from '@views/Swipe/SwipeCard';

type ItemProps = {
  customheight?: string;
};

// Item pour les conteneurs principaux
const Item = styled(Paper)<ItemProps>(({ theme, customheight }) => ({
  height: customheight || 'auto',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  borderRadius: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SwipeComponent = ({
  movies,
  movieDetail,
  generalRatings,
  error,
  loading,
  currentMovieIndex,
  setCurrentMovieIndex,
  setSwipeDirection,
}) => {
  // Bibilothèque react-spring pour gérer les animations
  const [firstCardProps, setFirstCardProps] = useSpring(() => ({
    opacity: 1,
    transform: 'translateX(-100%)',
    config: { duration: 300 },
  }));
  const [secondCardProps, setSecondCardProps] = useSpring(() => ({
    transform: 'translateX(0%)',
    opacity: 1,
    config: { duration: 300 },
  }));
  const [thirdCardProps, setThirdCardProps] = useSpring(() => ({
    transform: 'translateX(100%)',
    opacity: 1,
    config: { duration: 300 },
  }));

  // Définition des 3 cards
  const [cards, setCards] = useState([
    {
      id: 'card1',
      index: -1,
      cardProps: firstCardProps,
      setCardProps: setFirstCardProps,
    },
    {
      id: 'card2',
      index: 0,
      cardProps: secondCardProps,
      setCardProps: setSecondCardProps,
    },
    {
      id: 'card3',
      index: 1,
      cardProps: thirdCardProps,
      setCardProps: setThirdCardProps,
    },
  ]);

  const handleSwipe = direction => {
    if (direction === 'right') {
      setCurrentMovieIndex(prevIndex => prevIndex + 1);

      cards[0].setCardProps.start({
        transform: 'translateX(100%)',
        config: { duration: 0 },
      }); // Card de gauche => part tout à droite sans transition et sans effet
      cards[1].setCardProps.start({
        transform: 'translateX(-100%)',
        opacity: 0.0,
        config: { duration: 300 },
      }); // Card du milieu => part sur la gauche
      cards[2].setCardProps.start({
        transform: 'translateX(0%)',
        opacity: 1,
        config: { duration: 300 },
      }); // Card de droite => part au milieu

      // Repositionne la première card à la fin du tableau
      setCards(prevCards => {
        const newCards = [...prevCards];
        const firstCard = newCards.shift();
        const lastCard = newCards.slice(-1);
        newCards.push(firstCard);
        firstCard.index = lastCard[0].index + 1;

        return newCards;
      });
    }

    if (direction === 'left') {
      setCurrentMovieIndex(prevIndex => prevIndex - 1);

      cards[0].setCardProps.start({
        transform: 'translateX(0%)',
        opacity: 1,
        config: { duration: 300 },
      }); // Card de gauche => part au milieu
      cards[1].setCardProps.start({
        transform: 'translateX(100%)',
        opacity: 0.0,
        config: { duration: 300 },
      }); // Card du milieu => part sur la droite
      cards[2].setCardProps.start({
        transform: 'translateX(-100%)',
        config: { duration: 0 },
      }); // Card de droite => part tout à gauche sans transition

      // Repositionne la dernière card au début du tableau
      setCards(prevCards => {
        const newCards = [...prevCards];
        const lastCard = newCards.slice(-1);
        newCards.unshift(lastCard[0]);
        newCards.pop();
        lastCard[0].index = prevCards[0].index - 1;

        return newCards;
      });
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          padding: '0 2%',
          backgroundColor: '#F4F4F4',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Stack spacing={1} sx={{ height: '100%', padding: '6px 0' }}>
          <SearchBar Item={Item} />
          <Box>
            <SwipeFilter Item={Item} />
          </Box>
          <Stack
            direction="row"
            height="calc(100% - 92px)"
            position="relative"
            overflow="hidden"
            borderRadius="10px"
            boxShadow="0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"
          >
            {cards.map(card => (
              <SwipeCard
                key={card.id}
                id={card.id}
                Item={Item}
                movies={movies}
                movieDetail={movieDetail}
                generalRatings={generalRatings}
                error={error}
                loading={loading}
                index={card.index}
                currentMovieIndex={currentMovieIndex}
                setSwipeDirection={setSwipeDirection}
                handleSwipe={handleSwipe}
                cardProps={card.cardProps}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

SwipeComponent.propTypes = {
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.array.isRequired,
  generalRatings: PropTypes.number.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    error: PropTypes.object,
  }).isRequired,
  loading: PropTypes.shape({
    movies: PropTypes.bool,
    details: PropTypes.bool,
  }).isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

export default SwipeComponent;
