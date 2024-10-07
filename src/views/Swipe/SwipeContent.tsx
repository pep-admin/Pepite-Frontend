// Import des libs externes
import { Stack, Typography, Divider, CardContent, Box, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Import des composants internes
import AcquaintancesRatings from '@views/Swipe/AcquaintancesRatings';
import SwipeCredits from '@views/Swipe/SwipeCredits';
import SwipeTrailer from '@views/Swipe/SwipeTrailer';

// Import des fonctions utilitaires
import { convertRating } from '@utils/functions/convertRating';
import { getShortGenres, getYear } from '@utils/functions/getSwipeMovieInfos';

// Import des icônes
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';

// Import des requêtes
import { getMovieDetailsRequest } from '@utils/request/getMovieDetailsRequest';

const SwipeContent = ({
  movie,
  typeChosen,
  showMovieInfos,
  setShowMovieInfos,
  showTrailer,
  setShowTrailer,
  isTrailerFullscreen,
  setIsTrailerFullscreen,
  setError,
}) => {
  // console.log('rendu SwipeContent !', movie);
  const theme = useTheme();

  const [movieDetails, setMovieDetails] = useState(null); // Les noms du réal, des acteurs...

  const swiperRef = useRef(null);
  const firstSlideRef = useRef(null);
  const secondSlideRef = useRef(null);

  const getTitle = () => {
    if ('title' in movie) {
      return movie.title;
    }
    if ('name' in movie) {
      return movie.name;
    }
  };

  // Récupère les détails d'un film (genre, année...)
  const fetchMovieDetails = async movieId => {
    try {
      const details = await getMovieDetailsRequest(typeChosen, movieId);

      setMovieDetails(details);
    } catch (err) {
      setError({
        state: true,
        message: 'Erreur dans la récupération des détails du film.',
      });
    }
  };

  useEffect(() => {
    if (showMovieInfos) {
      fetchMovieDetails(movie.id);
    }
  }, [showMovieInfos]);

  useEffect(() => {
    console.log('plein écran ?? =>', isTrailerFullscreen);
  }, [isTrailerFullscreen]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.allowTouchMove = !isTrailerFullscreen;
      swiperRef.current.swiper.update();
    }
  }, [isTrailerFullscreen]);

  return (
    <>
      <CardContent
        sx={{
          height: 'auto',
          width: '100%',
          padding: '0 !important',
          // marginBottom: '100px',
        }}
      >
        <Stack>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                component="h1"
                fontSize={
                  getTitle().length > 30
                    ? '5.5vh'
                    : getTitle().length > 35
                    ? '5vh'
                    : '6.5vh'
                } // Taille de la police ajustée en fonction de la longueur du titre
                fontFamily="League Spartan"
                fontWeight="700"
                color={theme.palette.text.primary}
                lineHeight="1.1"
                maxWidth="85%"
                letterSpacing="-1px"
                sx={{
                  WebkitTextStroke: '1px black',
                }}
              >
                {getTitle()}
              </Typography>
              <Typography
                component="p"
                fontSize="7.5vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color={theme.palette.text.primary}
                lineHeight="0.9"
                position="relative"
                top="5px"
                onClick={() => {
                  setShowMovieInfos(!showMovieInfos);
                  setShowTrailer(false);
                }}
              >
                {!showMovieInfos ? '+' : '-'}
              </Typography>
            </Stack>
            <Stack direction="row" whiteSpace="nowrap">
              <Typography
                fontSize="2.2vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color="secondary.main"
              >
                {'release_date' in movie ? 'Film' : 'Série'}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center',
                }}
              />
              <Typography
                fontSize="2.2vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color="secondary.main"
                maxWidth="150px"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {getShortGenres(movie)}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center',
                }}
              />
              <Typography
                fontSize="2.2vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color="secondary.main"
              >
                {getYear(movie)}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center',
                }}
              />
              <Stack direction="row">
                <StarIcon
                  fontSize="small"
                  sx={{ color: 'secondary.main', marginRight: '5px' }}
                />
                <Typography
                  fontSize="2.2vh"
                  fontFamily="League Spartan"
                  fontWeight="500"
                  color="secondary.main"
                >
                  {convertRating(movie.vote_average)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            height={!showMovieInfos ? '10vh' : '5vh'}
            direction={!showMovieInfos ? 'row' : 'column'}
            justifyContent="space-between"
            padding={!showMovieInfos ? '23px 0' : '0'}
            marginBottom={!showMovieInfos ? '115px' : '0'}
          >
            {!showMovieInfos && !showTrailer ? (
              <AcquaintancesRatings />
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                flexBasis="100%"
                columnGap="5px"
              >
                <CircleIcon
                  sx={{
                    fontSize: '1vh',
                    color: !showTrailer ? 'orange' : '#fff',
                  }}
                />
                <CircleIcon
                  sx={{
                    fontSize: '1vh',
                    color: showTrailer ? 'orange' : '#fff',
                  }}
                />
              </Stack>
            )}
          </Stack>
          {!showMovieInfos ? null : (
            <Box
              // minHeight="250px"
              width="100%"
              overflow="hidden"
              sx={{
                position: isTrailerFullscreen ? 'absolute' : 'static',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Swiper
                ref={swiperRef}
                spaceBetween={6 * (window.innerWidth / 100)} // Espace entre les slides, ici 6vw
                slidesPerView={1} // Affiche une seule slide à la fois en pleine largeur
                centeredSlides={false} // Les slides ne sont pas centrés
                onSlideChange={swiper => {
                  if (swiper.activeIndex === 1) {
                    setShowTrailer(true);
                  } else {
                    setShowTrailer(false);
                  }
                }}
                allowTouchMove={!isTrailerFullscreen}
                style={{ height: '100%', width: '100%' }}
              >
                <SwiperSlide style={{ width: '88vw' }}>
                  <div ref={firstSlideRef}>
                    <SwipeCredits movie={movie} movieDetails={movieDetails} />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  style={{
                    height: isTrailerFullscreen ? '100%' : 'auto',
                    minHeight: '250px',
                    width: isTrailerFullscreen ? '100%' : '88vw',
                  }}
                >
                  <div
                    ref={secondSlideRef}
                    style={{ height: '100%', minHeight: '300px' }}
                  >
                    <SwipeTrailer
                      movie={movie}
                      showTrailer={showTrailer}
                      isTrailerFullscreen={isTrailerFullscreen}
                      setIsTrailerFullscreen={setIsTrailerFullscreen}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </Box>
          )}
        </Stack>
      </CardContent>
    </>
  );
};

export default SwipeContent;
