// Import des libs externes
import {
  CardMedia,
  Stack,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import { useSpring, animated as a } from 'react-spring';

// Import des icônes
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';

// Import des variables d'environnement
import { assetsBaseUrl } from '@utils/request/config';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  is_already_seen: boolean;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface LastCardProps {
  Item: React.ElementType;
  type: string;
  movies: Array<Movie>;
  currentMovieIndex: number;
  setCurrentMovieIndex: (prevIndex) => number;
  setSwipeAction: any;
  displayType: string;
  countryChosen: string;
}

interface LastCardHandle {
  animateLastCard: (direction: string) => void;
}

const LastCard = forwardRef<LastCardHandle, LastCardProps>(
  (
    {
      Item,
      type,
      movies,
      setSwipeAction,
      currentMovieIndex,
      setCurrentMovieIndex,
      displayType,
      countryChosen,
    },
    ref,
  ) => {
    const [style, setStyle] = useSpring(() => ({
      opacity: 0,
      transform: 'translateX(100%)',
    }));

    // Cette méthode est exposée au parent via `useImperativeHandle`
    useImperativeHandle(ref, () => ({
      animateLastCard: direction => {
        if (direction === 'left') {
          setStyle.start({
            opacity: 1,
            transform: 'translateX(0%)',
            config: { duration: 300 },
          });
        }
        if (direction === 'right') {
          setStyle.start({
            opacity: 0,
            transform: 'translateX(100%)',
            config: { duration: 300 },
          });
        }
        if (direction === 'null') {
          setStyle.start({
            opacity: 0,
            transform: 'translateX(100%)',
            config: { duration: 0 },
          });
        }
      },
    }));

    const AnimatedCard = a(Item);

    return (
      <AnimatedCard
        ref={ref}
        style={style}
        customheight="100%"
        sx={{ position: 'absolute', width: '100%', boxShadow: 'none' }}
      >
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
          <Typography
            variant="h2"
            sx={{
              color: '#0E6666',
              fontSize: '1.2em',
              fontWeight: 'bold',
            }}
          >
            {type === 'no-movies-anymore'
              ? "C'est terminé !"
              : 'Aucun film trouvé'}
          </Typography>
        </Stack>
        <Box padding="10px 0" height="calc(100% - 35px)">
          <Card
            sx={{
              boxShadow: 'none',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              sx={{
                height: 'calc(65% - 16.5px)',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '65px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SwipeLeftIcon
                  color="error"
                  sx={{
                    height: '1.3em',
                    width: '1.3em',
                    color: type === 'no-movies-anymore' ? '#0E6666' : '#CCCCCC',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (type === 'no-movies-anymore') {
                      setSwipeAction({direction: 'left', from: 'normal'});
                      if (currentMovieIndex === -1) {
                        setCurrentMovieIndex(movies.length - 1);
                      }
                    }
                  }}
                />
              </Box>
              <Box
                width="calc(100% - 130px)"
                height="100%"
                display="flex"
                justifyContent="center"
                position="relative"
              >
                <CardMedia
                  component="img"
                  alt={
                    type === 'no-movies-anymore'
                      ? 'Plus aucun film à parcourir'
                      : 'Aucun film trouvé'
                  }
                  image={
                    type === 'no-movies-anymore'
                      ? `${assetsBaseUrl}/images/no_more_movies.jpg`
                      : `${assetsBaseUrl}/images/no_movies.jpg`
                  }
                  sx={{
                    height: '100%',
                    objectFit: 'contain',
                    boxShadow: '8px 7px 12px 0px rgba(0,0,0,0.24)',
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '65px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SwipeRightIcon
                  sx={{
                    height: '1.3em',
                    width: '1.3em',
                    color: '#CCCCCC',
                    cursor: 'pointer',
                  }}
                />
              </Box>
            </Stack>
            <CardContent
              sx={{
                height: 'calc(35% - 16.5px)',
                width: '100%',
                padding: '10px 16px',
                alignItems: 'flex-end',
              }}
            >
              <Stack
                height="100%"
                direction="column"
                justifyContent="space-evenly"
              >
                <Stack direction="row" columnGap="5px">
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#0E6666',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Type sélectionné :'}
                  </Typography>
                  <Typography variant="body2">
                    {displayType === 'movie' ? 'Films' : 'Séries'}
                  </Typography>
                </Stack>
                <Stack direction="row" columnGap="5px">
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#0E6666',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Pays :'}
                  </Typography>
                  <Typography variant="body2">{countryChosen}</Typography>
                </Stack>
                <Stack direction="row" columnGap="5px">
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#0E6666',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Genre sélectionné :'}
                  </Typography>
                  <Typography variant="body2">
                    {'Le genre sélectionné'}
                  </Typography>
                </Stack>
                <Stack direction="row" columnGap="5px">
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#0E6666',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Note sélectionnée :'}
                  </Typography>
                  <Typography variant="body2">
                    {'La note sélectionnée'}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                height: '33px',
                justifyContent: 'center',
                padding: 0,
                overflow: 'hidden',
              }}
            >
              <Stack>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    maxHeight: '33px',
                    padding: '0 15px',
                    fontSize: '0.9em',
                  }}
                >
                  {'Réinitialiser le swipe'}
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Box>
      </AnimatedCard>
    );
  },
);

LastCard.displayName = 'LastCard';

export default LastCard;
