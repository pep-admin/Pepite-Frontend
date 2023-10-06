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
import { useEffect } from 'react';

// Import des composants internes
import SwipePoster from './SwipePoster';
import SwipeContent from './SwipeContent';

const SwipeCard = ({
  id,
  Item,
  movies,
  movieDetail,
  generalRatings,
  error,
  loading,
  index,
  currentMovieIndex,
  setSwipeDirection,
  handleSwipe,
  cardProps
}) => {

  const AnimatedCard = a(Item);

  useEffect(() => {
    console.log(id, index);
    
  }, [index])

  if(index === -1) {
    return null;
  } else {
    return (
      <AnimatedCard id={id} customheight="100%" style={cardProps} sx={{position: 'absolute', width: '100%', boxShadow: 'none'}}>
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
                  {movies.length > 0 ? movies[index].title : null}
                  {' ' + id}
                </Typography>
              )}
            </Stack>
            <Box padding="10px 0" height="calc(100% - 35px)">
              {movies[index] && (
                <Card
                  sx={{
                    boxShadow: 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {loading.movies || loading.details ? (
                    <Skeleton
                      sx={{
                        height: 'calc(65% - 16.5px)',
                        width: 'calc(100% - 170px)',
                      }}
                      animation="wave"
                      variant="rectangular"
                    />
                  ) : (
                    <SwipePoster
                      loading={loading}
                      movies={movies}
                      index={index}
                      currentMovieIndex={currentMovieIndex}
                      generalRatings={generalRatings}
                      setSwipeDirection={setSwipeDirection}
                      handleSwipe={handleSwipe}
                    />
                  )}
                  {loading.movies || loading.details ? (
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
                  ) : (
                    <CardContent
                      sx={{
                        height: 'calc(35% - 16.5px)',
                        width: '100%',
                        padding: '10px 16px',
                      }}
                    >
                      <SwipeContent
                        movieDetail={movieDetail}
                        movies={movies}
                        index={index}
                      />
                    </CardContent>
                  )}
                  <CardActions
                    sx={{ height: '33px', justifyContent: 'center', padding: 0 }}
                  >
                    {loading.movies || loading.details ? (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height="33px"
                        width="125px"
                      />
                    ) : (
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
                    )}
                  </CardActions>
                </Card>
              )}
            </Box>
          </>
        )}
      </AnimatedCard>
    );
  }

  
};

const SwipeCardPropTypes = {
  Item: PropTypes.elementType.isRequired,
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.array.isRequired,
  generalRatings: PropTypes.number.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setSwipeDirection: PropTypes.func.isRequired,
};

SwipeCard.propTypes = SwipeCardPropTypes;

export default SwipeCard;
