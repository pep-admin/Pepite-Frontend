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

// Import des composants internes
import SwipePoster from './SwipePoster';
import SwipeContent from './SwipeContent';

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
}) => {
  const AnimatedCard = a(Item);

  const { displayType } = useData();

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
            }}
          >
            {loading.movies || loading.details ? (
              <Skeleton animation={false} height={10} width="100px" />
            ) : (
              <Typography
                variant="h2"
                sx={{
                  color: '#0E6666',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                }}
              >
                {movies.length > 0 && index >= 0 && displayType === 'movie'
                  ? movies[index].title
                  : movies.length > 0 && index >= 0 && displayType === 'tv'
                  ? movies[index].name
                  : null}
              </Typography>
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
                        transform: movies[index].is_already_seen
                          ? 'translateY(33px)'
                          : 'translateY(-33px)',
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          maxHeight: '33px',
                          padding: '0 15px',
                          fontSize: '0.9em',
                        }}
                      >
                        Noter ce film
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          maxHeight: '33px',
                          padding: '0 15px',
                          fontSize: '0.9em',
                        }}
                      >
                        Je veux le voir !
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

const SwipeCardPropTypes = {
  id: PropTypes.string.isRequired,
  Item: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
  setMovies: PropTypes.func.isRequired,
  movieDetail: PropTypes.array.isRequired,
  generalRatings: PropTypes.number.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
  cardProps: PropTypes.object.isRequired,
};

SwipeCard.propTypes = SwipeCardPropTypes;

export default SwipeCard;
