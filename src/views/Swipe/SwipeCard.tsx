// Import des libs externes
import {
  Alert,
  Skeleton,
  Stack,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { animated as a } from 'react-spring';
import { useRef } from 'react';
import confetti from 'canvas-confetti';

// Import des composants internes
import SwipePoster from './SwipePoster';
import SwipeContent from './SwipeContent';

// Import de la fonction pour ajouter un film / série dans les souhaits
import {
  addWantedMovie,
  removeWantedMovie,
} from '@utils/request/swipe/fetchData';

// Import du contexte
import { useData } from '@hooks/DataContext';

const SwipeCard = ({
  id,
  Item,
  movies,
  setMovies,
  movieDetail,
  generalRatings,
  error,
  loading,
  index,
  currentMovieIndex,
  setCurrentMovieIndex,
  setSwipeDirection,
  cardProps,
  certification,
}) => {
  const AnimatedCard = a(Item);

  const { displayType } = useData();

  const isMovieWantedRef = useRef(false);
  const buttonRef = useRef(null);

  function explodeConfetti() {
    if (buttonRef.current) {
      // Récupère les coordonnées du bouton "je veux le voir"
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    }
  }

  const addToWantedList = () => {
    if (!isMovieWantedRef.current && !movies[index].is_wanted) {
      addWantedMovie(movieDetail.id, displayType);
      isMovieWantedRef.current = true;
      explodeConfetti();
    } else {
      removeWantedMovie(movieDetail.id, displayType);
      isMovieWantedRef.current = false;
    }
    // Trouve l'objet du film correspondant dans le tableau movies
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieDetail.id) {
        return { ...movie, is_wanted: isMovieWantedRef.current };
      }
      return movie;
    });
    // Met à jour le tableau movies avec la nouvelle valeur
    setMovies(updatedMovies);
    console.log('film ajouté dans les souhaits');
  };

  return (
    <AnimatedCard
      id={id}
      customheight="100%"
      style={cardProps}
      sx={{ position: 'absolute', width: '100%', boxShadow: 'none' }}
    >
      {error.error !== null ? (
        <Alert
          severity="error"
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {error.message}
        </Alert>
      ) : (
        <>
          <Stack
            direction="row"
            sx={{
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid #EBEBEB',
              position: 'relative',
            }}
          >
            {loading.movies || loading.details ? (
              <Skeleton animation={false} height={10} width="100px" />
            ) : (
              <>
                <Typography
                  variant="h2"
                  sx={{
                    color: '#0E6666',
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                    maxWidth: '70%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {movies.length > 0 && index >= 0 && displayType === 'movie'
                    ? movies[index].title
                    : movies.length > 0 && index >= 0 && displayType === 'tv'
                    ? movies[index].name
                    : null}
                </Typography>
                <img
                  src={certification.imgUrl}
                  alt={certification.alt}
                  style={{
                    position: 'absolute',
                    right: '15px',
                  }}
                />
              </>
            )}
          </Stack>
          <Box padding="10px 0" height="calc(100% - 35px)">
            {loading.movies || loading.details ? (
              <Card
                sx={{
                  boxShadow: 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Skeleton
                  sx={{
                    height: 'calc(65% - 16.5px)',
                    width: 'calc(100% - 170px)',
                  }}
                  animation="wave"
                  variant="rectangular"
                />
                <Stack
                  direction="row"
                  height="calc(35% - 10px)"
                  width="100%"
                  justifyContent="space-evenly"
                >
                  <Box
                    width="30%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                  >
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                  </Box>
                  <Box
                    width="55%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                  >
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                    <Skeleton
                      animation={false}
                      variant="text"
                      sx={{ fontSize: '0.3em' }}
                      width={'100%'}
                    />
                  </Box>
                </Stack>
                <Stack>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height="33px"
                    width="125px"
                  />
                </Stack>
              </Card>
            ) : (
              movies[index] && (
                <Card
                  sx={{
                    boxShadow: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <SwipePoster
                    loading={loading}
                    movies={movies}
                    setMovies={setMovies}
                    movieDetail={movieDetail}
                    index={index}
                    currentMovieIndex={currentMovieIndex}
                    setCurrentMovieIndex={setCurrentMovieIndex}
                    generalRatings={generalRatings}
                    setSwipeDirection={setSwipeDirection}
                  />
                  <CardContent
                    sx={{
                      height: 'calc(35% - 16.5px)',
                      width: '100%',
                      padding: '10px 16px',
                      alignItems: 'flex-end',
                    }}
                  >
                    <SwipeContent
                      movieDetail={movieDetail}
                      movies={movies}
                      index={index}
                    />
                  </CardContent>
                  <CardActions
                    sx={{
                      height: '33px',
                      justifyContent: 'center',
                      padding: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <Stack
                      direction="column"
                      gap="33px"
                      sx={{
                        transition: 'transform 300ms ease-in-out',
                        transform:
                          // Si le film est vu mais que l'utilisateur le supprime : possibilité de le noter
                          movies[index].is_already_seen &&
                          movies[index].is_deleted
                            ? 'translateY(66px)'
                            : // Si le film n'est pas vu et que l'utilisateur le supprime : le film ne sera plus proposé
                            !movies[index].is_already_seen &&
                              movies[index].is_deleted
                            ? 'translateY(-66px)'
                            : // Si le film est vu et que l'utilisateur ne le supprime pas : possibilité de le noter
                            movies[index].is_already_seen &&
                              !movies[index].is_deleted
                            ? 'translateY(66px)'
                            : 'translateY(0px)',
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          maxHeight: '33px',
                          width: '150px',
                          margin: 'auto',
                          padding: '0 15px',
                          fontSize: '0.9em',
                        }}
                      >
                        {'Noter ce film'}
                      </Button>
                      <Button
                        ref={buttonRef}
                        variant="contained"
                        color="success"
                        sx={{
                          color: '#fff',
                          maxHeight: '33px',
                          width: '150px',
                          margin: 'auto',
                          padding: '0 15px',
                          fontSize: '0.9em',
                        }}
                        onClick={() => addToWantedList()}
                      >
                        {!movies[index].is_wanted
                          ? 'Je veux le voir !'
                          : 'Ajouté !'}
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          maxHeight: '33px',
                          width: '150px',
                          margin: 'auto',
                          padding: '0 15px',
                          fontSize: '0.9em',
                          backgroundColor: '#4f4f4f !important',
                        }}
                      >
                        {displayType === 'movie'
                          ? 'Film supprimé'
                          : 'Série supprimée'}
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              )
            )}
          </Box>
        </>
      )}
    </AnimatedCard>
  );
};

SwipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  Item: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
  setMovies: PropTypes.func.isRequired,
  movieDetail: PropTypes.object.isRequired,
  generalRatings: PropTypes.number.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
  cardProps: PropTypes.object.isRequired,
  certification: PropTypes.object.isRequired,
};

export default SwipeCard;
