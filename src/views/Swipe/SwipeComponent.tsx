// Import des libs externes
import { Badge, Box, Stack, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Import des composants internes
import Header2 from '@utils/components/Header/Header2';
import SwipeCard from '@views/Swipe/SwipeCard';
import SwipeFilter from '@views/Swipe/SwipeFilter';
import { CustomButton } from '@views/Swipe/CustomBtn';

// Import de l'icône du filtre
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

// Import de la fonction pour compter les filtres actifs
import { countActiveFiltersSwipe } from '@utils/functions/countActiveFiltersSwipe';

// Import des requêtes
import useSwipeZIndex from '@hooks/useSwipeIndex';
import SwipeActionBtns from './SwipeActionBtns';

const SwipeComponent = ({
  movies,
  currentIndex,
  setCurrentIndex,
  showMovieInfos,
  setShowMovieInfos,
  movieDetails,
  typeChosen,
  setTypeChosen,
  countryChosen,
  setCountryChosen,
  genreChosen,
  setGenreChosen,
  ratingChosen,
  setRatingChosen,
  periodChosen,
  setPeriodChosen,
  setIsFilterValidated,
}) => {
  console.log('rendu swipe component !');

  const { zIndexes, dragDirectionRef, setZIndexForSwipe } =
    useSwipeZIndex('right');

  // Clés uniques pour chaque carte
  const [currentCardKey, setCurrentCardKey] = useState(uuidv4());
  const [previousCardKey, setPreviousCardKey] = useState(uuidv4());
  const [nextCardKey, setNextCardKey] = useState(uuidv4());

  // Gestion de l'ouverture du panneau des filtres
  const [areFiltersOpened, setAreFiltersOpened] = useState(false);

  // Gestion de la bande-annonce
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [isTrailerFullscreen, setIsTrailerFullscreen] = useState(false);

  const currentMovie = movies[currentIndex];
  const nextMovie =
    currentIndex < movies.length - 1 ? movies[currentIndex + 1] : null;
  const previousMovie = currentIndex > 0 ? movies[currentIndex - 1] : null;

  // Gère l'index selon le sens du swipe
  const onSwipeComplete = direction => {
    if (direction === 'left' && currentIndex < movies.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }

    // Générer de nouvelles clés pour chaque carte
    setCurrentCardKey(uuidv4());
    setPreviousCardKey(uuidv4());
    setNextCardKey(uuidv4());
  };

  return (
    <>
      <Header2 page={'Swipe'} isTrailerFullscreen={isTrailerFullscreen} />
      <Box
        sx={{
          overflow: 'hidden',
          height: '100vh',
          width: '100vw',
          position: 'relative',
          backgroundColor: '#011212',
        }}
      >
        {movies.length > 0 && (
          <Stack
            position="absolute"
            top="75px"
            right="6%"
            zIndex="1000"
            visibility={isTrailerFullscreen ? 'hidden' : 'visible'}
          >
            <Badge
              badgeContent={countActiveFiltersSwipe(
                typeChosen,
                countryChosen,
                genreChosen,
                ratingChosen,
                periodChosen,
              )}
              showZero
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  color: '#000',
                  backgroundColor: 'secondary.main',
                  fontWeight: '600',
                },
              }}
            >
              <CustomButton
                btntype={'filter'}
                onClick={() => setAreFiltersOpened(!areFiltersOpened)}
              >
                <TuneOutlinedIcon fontSize="medium" />
              </CustomButton>
            </Badge>
            {areFiltersOpened && (
              <SwipeableDrawer
                anchor="left"
                open={areFiltersOpened}
                onClose={() => setAreFiltersOpened(false)}
                onOpen={() => setAreFiltersOpened(true)}
                sx={{
                  '& .MuiDrawer-paper': {
                    height: 'calc(100% - 50px)',
                    width: '35vw',
                    bgcolor: '#101010',
                    top: 'auto',
                    bottom: '0',
                  },
                }}
              >
                <SwipeFilter
                  typeChosen={typeChosen}
                  setTypeChosen={setTypeChosen}
                  countryChosen={countryChosen}
                  setCountryChosen={setCountryChosen}
                  genreChosen={genreChosen}
                  setGenreChosen={setGenreChosen}
                  ratingChosen={ratingChosen}
                  setRatingChosen={setRatingChosen}
                  periodChosen={periodChosen}
                  setPeriodChosen={setPeriodChosen}
                  setIsFilterValidated={setIsFilterValidated}
                  setAreFiltersOpened={setAreFiltersOpened}
                />
              </SwipeableDrawer>
            )}
          </Stack>
        )}
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Carte Précédente */}
          {previousMovie && (
            <SwipeCard
              key={previousCardKey} // Utilisation d'une clé unique pour la carte précédente
              movie={previousMovie}
              movieDetails={null}
              isCurrent={false}
              zIndex={zIndexes.previous}
              onSwipeComplete={onSwipeComplete}
              isFirstCard={false}
              dragDirectionRef={dragDirectionRef}
              setZIndexForSwipe={setZIndexForSwipe}
              showMovieInfos={null}
              setShowMovieInfos={null}
              showTrailer={null}
              setShowTrailer={null}
              isTrailerFullscreen={isTrailerFullscreen}
              setIsTrailerFullscreen={null}
            />
          )}

          {/* Carte Courante */}
          {movies.length > 0 && (
            <SwipeCard
              key={currentCardKey} // Utilisation d'une clé unique pour la carte courante
              movie={currentMovie}
              movieDetails={movieDetails}
              isCurrent={true}
              zIndex={zIndexes.current}
              onSwipeComplete={onSwipeComplete}
              isFirstCard={currentIndex === 0}
              dragDirectionRef={dragDirectionRef}
              setZIndexForSwipe={setZIndexForSwipe}
              showMovieInfos={showMovieInfos}
              setShowMovieInfos={setShowMovieInfos}
              showTrailer={showTrailer}
              setShowTrailer={setShowTrailer}
              isTrailerFullscreen={isTrailerFullscreen}
              setIsTrailerFullscreen={setIsTrailerFullscreen}
            />
          )}

          {/* Carte Suivante */}
          {nextMovie && (
            <SwipeCard
              key={nextCardKey} // Utilisation d'une clé unique pour la carte suivante
              movie={nextMovie}
              movieDetails={null}
              isCurrent={false}
              zIndex={zIndexes.next}
              onSwipeComplete={onSwipeComplete}
              isFirstCard={false}
              dragDirectionRef={dragDirectionRef}
              setZIndexForSwipe={setZIndexForSwipe}
              showMovieInfos={null}
              setShowMovieInfos={null}
              showTrailer={null}
              setShowTrailer={null}
              isTrailerFullscreen={isTrailerFullscreen}
              setIsTrailerFullscreen={null}
            />
          )}
        </Box>
        {movies.length > 0 && (
          <SwipeActionBtns
            showTrailer={showTrailer}
            currentMovie={currentMovie}
          />
        )}
      </Box>
    </>
  );
};

export default SwipeComponent;
