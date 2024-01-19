// Import des libs externes
import { Container, Stack, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSpring } from 'react-spring';
import { useState, useEffect, useRef } from 'react';

// Import des composants internes
import Header from '@utils/Header';
import { Item } from '@utils/styledComponent';
import SearchBar from '@utils/SearchBar';
import SwipeFilter from '@views/Swipe/SwipeFilter';
import SwipeCard from '@views/Swipe/SwipeCard';
import LastCard from './LastCard';

// Import du contexte
import { useData } from '@hooks/DataContext';

const SwipeComponent = ({
  movies,
  movieDetail,
  generalRatings,
  error,
  loading,
  currentMovieIndex,
  setCurrentMovieIndex,
  swipeDirection,
  setSwipeDirection,
  countryChosen,
  setCountryChosen,
  isoCountry,
  hasMoreMovies,
  genreChosen,
  setGenreChosen,
  certification,
  moviesStatusUpdated,
  setMoviesStatusUpdated,
}) => {
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );

  const { displayType } = useData();
  const prevDisplayTypeRef = useRef('movie');
  const lastCardRef = useRef(null);
  const isPepiteCardReached = useRef(false);

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
  const initialCards = [
    {
      id: 'card1',
      index: currentMovieIndex - 1,
      cardProps: firstCardProps,
      setCardProps: setFirstCardProps,
    },
    {
      id: 'card2',
      index: currentMovieIndex,
      cardProps: secondCardProps,
      setCardProps: setSecondCardProps,
    },
    {
      id: 'card3',
      index:
        movies.length === 1 ? currentMovieIndex - 1 : currentMovieIndex + 1,
      cardProps: thirdCardProps,
      setCardProps: setThirdCardProps,
    },
  ];

  function reinitCards() {
    setCards(initialCards);
    setFirstCardProps.start({
      opacity: 1,
      transform: 'translateX(-100%)',
      config: { duration: 0 },
      reset: true,
    });
    setSecondCardProps.start({
      opacity: 1,
      transform: 'translateX(0%)',
      config: { duration: 0 },
      reset: true,
    });
    setThirdCardProps.start({
      opacity: 1,
      transform: 'translateX(100%)',
      config: { duration: 0 },
      reset: true,
    });
  }

  function swipeRightAnim() {
    cards[0].setCardProps.start({
      // Card de gauche => part tout à droite sans transition et sans effet
      transform: 'translateX(100%)',
      config: { duration: 0 },
    });
    cards[1].setCardProps.start({
      // Card du milieu => part sur la gauche
      transform: 'translateX(-100%)',
      opacity: 0.0,
      config: { duration: 300 },
    });
    cards[2].setCardProps.start({
      // Card de droite => part au milieu
      transform: 'translateX(0%)',
      opacity: 1,
      config: { duration: 300 },
    });
  }

  function swipeLeftAnim() {
    cards[0].setCardProps.start({
      // Card de gauche => part au milieu
      transform: 'translateX(0%)',
      opacity: 1,
      config: { duration: 300 },
    });
    cards[1].setCardProps.start({
      // Card du milieu => part sur la droite
      transform: 'translateX(100%)',
      opacity: 0.0,
      config: { duration: 300 },
    });
    cards[2].setCardProps.start({
      // Card de droite => part tout à gauche sans transition
      transform: 'translateX(-100%)',
      config: { duration: 0 },
    });
  }

  const [cards, setCards] = useState(initialCards);

  // Si l'utilisateur change de film à série et inversement, on reset les animations
  useEffect(() => {
    if (prevDisplayTypeRef.current !== displayType) {
      reinitCards();
    }

    if (currentMovieIndex === 0) {
      prevDisplayTypeRef.current = displayType;
    }
  }, [displayType, currentMovieIndex]);

  useEffect(() => {
    if (loading.movies) {
      lastCardRef.current?.animateLastCard?.('null');
      reinitCards();
      return;
    } else {
      // Si il n'y a aucun film / série à proposer
      if (movies.length === 0) {
        lastCardRef.current?.animateLastCard?.('left');
      }
    }
  }, [movies, loading.movies]);

  // ********** GESTION DU TABLEAU DES 3 CARDS + GESTION DES ANIMATIONS ********** //
  useEffect(() => {
    if (swipeDirection === 'right') {
      swipeRightAnim();

      setCards(prevCards => {
        const newCards = [...prevCards]; // On récupère les dernières cards
        const firstCard = newCards.shift(); // On retire la première card et on la renvoie à firstCard
        const lastCard = newCards.slice(-1); // On prend la deuxième card et on la place au milieu
        newCards.push(firstCard); // On prend la card de gauche et on la place à droite

        /* Lorsqu'on arrive à la dernière card du tableau movies il reste 2 cards. On a besoin de définir la 3ème card(qui n'existe pas).
          On attribue alors un index de -1 à la card de droite qui permettra de faire apparaitre la card "plus de films".
        */
        if (currentMovieIndex === movies.length - 1) {
          firstCard.index = -1;
        }
        // Si ce n'est pas l'avant dernière card on incrémente normalement
        else {
          firstCard.index = lastCard[0].index + 1;
        }
        // Si le dernier film vient d'être vu et que l'utilisateur swipe à droite
        if (currentMovieIndex === -1) {
          isPepiteCardReached.current = true; //La card 'plus aucun film' a été atteinte
          lastCardRef.current?.animateLastCard?.('left'); //On fait apparaitre la card 'plus aucun film'
          firstCard.index = movies.length - 2; // On attribue à la card de droite l'index de l'avant dernière card
        }

        return newCards;
      });
    }

    if (swipeDirection === 'left') {
      swipeLeftAnim();

      if (isPepiteCardReached.current) {
        lastCardRef.current?.animateLastCard?.('right'); //La card 'plus aucun film' part sur la droite

        cards[0].setCardProps.start({
          // Card de gauche => part au milieu
          transform: 'translateX(0%)',
          opacity: 1,
          config: { duration: 300 },
        });
      }

      // Si l'index courant n'est pas égal à 0
      if (currentMovieIndex !== 0) {
        setCards(prevCards => {
          const newCards = [...prevCards]; //On récupère les dernières cards
          const lastCard = newCards.slice(-1); // On retire la dernière card et on la renvoie à lastCard
          newCards.unshift(lastCard[0]); // On place la dernière card au début du tableau
          newCards.pop(); //Supprime la dernière card en trop
          lastCard[0].index = prevCards[0].index - 1;

          return newCards;
        });

        if (currentMovieIndex !== -1) {
          isPepiteCardReached.current = false;
        }
        // Si l'index courant est égal à 0, on réinitialise les cards
      } else {
        setCards(initialCards);
      }
    }
  }, [currentMovieIndex, swipeDirection]);

  return (
    <>
      <Header userInfos={userInfos} setUserInfos={setUserInfos} />
      <Container
        maxWidth="xl"
        sx={{
          padding: '0 2%',
          backgroundColor: '#F4F4F4',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Stack spacing={1} sx={{ height: '100%', padding: '6px 0' }}>
          <SearchBar
            Item={Item}
            page={'swipe'}
            userInfos={userInfos}
            chosenUser={null}
            handlePoster={null}
          />
          <Box>
            <SwipeFilter
              Item={Item}
              countryChosen={countryChosen}
              setCountryChosen={setCountryChosen}
              isoCountry={isoCountry}
              genreChosen={genreChosen}
              setGenreChosen={setGenreChosen}
            />
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
                // nextMovieIndex={nextMovieIndex}
                setCurrentMovieIndex={setCurrentMovieIndex}
                // setNextMovieIndex={setNextMovieIndex}
                setSwipeDirection={setSwipeDirection}
                cardProps={card.cardProps}
                certification={certification}
                moviesStatusUpdated={moviesStatusUpdated}
                setMoviesStatusUpdated={setMoviesStatusUpdated}
              />
            ))}
            {!hasMoreMovies && movies.length > 0 ? (
              <LastCard
                ref={lastCardRef}
                type={'no-movies-anymore'}
                Item={Item}
                movies={movies}
                currentMovieIndex={currentMovieIndex}
                setCurrentMovieIndex={setCurrentMovieIndex}
                setSwipeDirection={setSwipeDirection}
                displayType={displayType}
                countryChosen={countryChosen}
              />
            ) : !hasMoreMovies && movies.length === 0 ? (
              <LastCard
                ref={lastCardRef}
                type={'no-movies'}
                Item={Item}
                movies={movies}
                currentMovieIndex={currentMovieIndex}
                setCurrentMovieIndex={setCurrentMovieIndex}
                setSwipeDirection={null}
                displayType={displayType}
                countryChosen={countryChosen}
              />
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

SwipeComponent.propTypes = {
  movies: PropTypes.array.isRequired,
  moviesStatusUpdated: PropTypes.array.isRequired,
  setMoviesStatusUpdated: PropTypes.func.isRequired,
  movieDetail: PropTypes.object.isRequired,
  nextMovieDetail: PropTypes.object.isRequired,
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
  swipeDirection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  setSwipeDirection: PropTypes.func.isRequired,
  isoCountry: PropTypes.string.isRequired,
  countryChosen: PropTypes.string.isRequired,
  setCountryChosen: PropTypes.func.isRequired,
  hasMoreMovies: PropTypes.bool.isRequired,
  genreChosen: PropTypes.object.isRequired,
  setGenreChosen: PropTypes.func.isRequired,
  certification: PropTypes.object.isRequired,
};

export default SwipeComponent;
