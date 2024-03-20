// Import des libs externes
import { Container, Stack } from '@mui/material';
import { useSpring } from 'react-spring';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import Header from '@utils/components/Header';
import { Item } from '@utils/components/styledComponent';
import LastCard from './LastCard';

// Import du contexte
import { useData } from '@hooks/DataContext';
import SwipeCard from './SwipeCard';

const SwipeComponent = ({
  movies,
  movieDetail,
  error,
  loading,
  currentMovieIndex,
  setCurrentMovieIndex,
  swipeAction,
  setSwipeAction,
  countryChosen,
  setCountryChosen,
  hasMoreMovies,
  genreChosen,
  setGenreChosen,
  moviesStatusUpdated,
  setMoviesStatusUpdated,
  ratingChosen,
  setRatingChosen,
  periodChosen,
  setPeriodChosen,
  setIsFilterValidated,
  swipeType,
  setSwipeType,
}) => {
  const { displayType } = useData(); // Le choix de préférence de contenu qu'à choisi l'utilisateur (défault : 'all')

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

  // Définition des 3 cards (précédente, courante, suivante)
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

  const [cards, setCards] = useState(initialCards);

  // Réinitialisation des 3 cards
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

  // *** SWIPE VERS LA DROITE *** //

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

  const swipeToTheRight = () => {
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
  };

  // *** SWIPE VERS LA GAUCHE *** //

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

  const swipeToTheLeft = () => {
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
  };

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

  useEffect(() => {
    // On bloque si l'utilisateur a cliqué sur un des boutons de choix
    if (!swipeAction?.direction || swipeAction?.from === 'choice') return;

    if (swipeAction.direction === 'right') {
      swipeToTheRight();
    }

    if (swipeAction.direction === 'left') {
      swipeToTheLeft();
    }
  }, [swipeAction]);

  // useEffect(() => {
  //   console.log('les cards', cards);
  // }, [cards]);

  return (
    <>
      <Header page={'swipe'} />
      <Container
        maxWidth="xl"
        sx={{
          padding: '0',
          backgroundColor: '#101010',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Stack
          direction="row"
          height="100%"
          position="relative"
          overflow="hidden"
        >
          {cards.map(card => (
            <SwipeCard
              key={card.id}
              id={card.id}
              movies={movies}
              movieDetail={movieDetail}
              error={error}
              index={card.index}
              currentMovieIndex={currentMovieIndex}
              setCurrentMovieIndex={setCurrentMovieIndex}
              setSwipeAction={setSwipeAction}
              cardProps={card.cardProps}
              moviesStatusUpdated={moviesStatusUpdated}
              setMoviesStatusUpdated={setMoviesStatusUpdated}
              swipeToTheRight={swipeToTheRight}
              countryChosen={countryChosen}
              setCountryChosen={setCountryChosen}
              genreChosen={genreChosen}
              setGenreChosen={setGenreChosen}
              ratingChosen={ratingChosen}
              setRatingChosen={setRatingChosen}
              periodChosen={periodChosen}
              setPeriodChosen={setPeriodChosen}
              setIsFilterValidated={setIsFilterValidated}
              swipeType={swipeType}
              setSwipeType={setSwipeType}
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
              setSwipeAction={setSwipeAction}
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
              setSwipeAction={null}
              displayType={displayType}
              countryChosen={countryChosen}
            />
          ) : null}
        </Stack>
      </Container>
    </>
  );
};

SwipeComponent.propTypes = {
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.object.isRequired,
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
  swipeAction: PropTypes.object.isRequired,
  setSwipeAction: PropTypes.func.isRequired,
  countryChosen: PropTypes.object.isRequired,
  setCountryChosen: PropTypes.func.isRequired,
  hasMoreMovies: PropTypes.bool.isRequired,
  genreChosen: PropTypes.object.isRequired,
  setGenreChosen: PropTypes.func.isRequired,
  moviesStatusUpdated: PropTypes.array.isRequired,
  setMoviesStatusUpdated: PropTypes.func.isRequired,
  ratingChosen: PropTypes.object,
  setRatingChosen: PropTypes.func.isRequired,
  setIsFilterValidated: PropTypes.func.isRequired,
  swipeType: PropTypes.string.isRequired,
  setSwipeType: PropTypes.func.isRequired,
  periodChosen: PropTypes.string.isRequired,
  setPeriodChosen: PropTypes.func.isRequired,
};

export default React.memo(SwipeComponent);
