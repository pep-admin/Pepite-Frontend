import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Badge, Box, Snackbar, Stack, SwipeableDrawer } from '@mui/material';
import SwipeCard2 from './SwipeCard2';
import Header from '@utils/components/Header';
import { CustomButton } from './CustomBtn';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SwipeFilter2 from './SwipeFilter2';

const SwipeComponent2 = ({
  movies,
  setCurrentIndex,
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
}) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [currentIndexSwipe, setCurrentIndexSwipe] = useState(0); // Index du film actuel
  const [direction, setDirection] = useState('left'); // Suivre la direction du swipe

  const currentMovie = movies[currentIndexSwipe];
  const nextMovie =
    direction === 'left'
      ? movies[currentIndexSwipe + 1] || null // Swipe vers la gauche, on affiche le film suivant
      : movies[currentIndexSwipe] || null; // Swipe vers la droite, on affiche le film courant

  const previousMovie =
    direction === 'right'
      ? movies[currentIndexSwipe - 1] || null // Swipe vers la droite, on affiche le film précédent
      : null;

  const handleSwipe = (direction) => {
    if (isSwiping) return;    
    console.log(direction);
    
    
    // Vérification des limites
    if (direction === 'left' && currentIndexSwipe >= movies.length - 1) {
      return; // Ne pas swiper à gauche si on est déjà sur le dernier film
    }

    if (direction === 'right' && currentIndexSwipe <= 0) {
      return; // Ne pas swiper à droite si on est déjà sur le premier film
    }

    setIsSwiping(true);
    setDirection(direction); // Met à jour la direction du swipe

    if (direction === 'left' && currentIndexSwipe < movies.length - 1) {
      // Swipe vers la gauche : aller au film suivant
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setCurrentIndexSwipe((prevIndex) => prevIndex + 1);
        setIsSwiping(false);
      }, 300); // Durée de l'animation
    } else if (direction === 'right' && currentIndexSwipe > 0) {
      // Swipe vers la droite : revenir au film précédent
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex - 1);
        setCurrentIndexSwipe((prevIndex) => prevIndex - 1);
        setIsSwiping(false);
      }, 300); // Durée de l'animation
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const toggleFilters = useCallback(
    (open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setAreFiltersOpen(open);
    },
    []
  );

  const memoizedSetOpenSnackbar = useCallback((message) => {
    setOpenSnackbar(message);
  }, []);

  const cardTransition = {
    duration: 0.3,
    ease: 'easeInOut',
  };

  return (
    <>
      <Header page={'swipe'} />
      <Box
        {...handlers}
        sx={{
          overflow: 'hidden',
          height: '100vh',
          width: '100vw',
          position: 'relative',
          backgroundColor: '#011212',
        }}
      >
        <Stack position="absolute" top="75px" right="6%" zIndex="1000">
          <Badge
            badgeContent={0}
            showZero
            overlap="circular"
            sx={{
              '& .MuiBadge-badge': {
                color: '#000',
                backgroundColor: 'secondary.main',
              },
            }}
          >
            <CustomButton btntype={'filter'} onClick={toggleFilters(true)}>
              <TuneOutlinedIcon fontSize="medium" />
            </CustomButton>
          </Badge>
          {areFiltersOpen && (
            <SwipeableDrawer
              anchor="left"
              open={areFiltersOpen}
              onClose={toggleFilters(false)}
              onOpen={toggleFilters(true)}
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
              <SwipeFilter2
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
              />
            </SwipeableDrawer>
          )}
        </Stack>
        <Box sx={{ display: 'flex', height: '100%', width: '100%', position: 'relative' }}>
          {/* Carte précédente (chargée à gauche si elle existe) */}
          {previousMovie && direction === 'right' && (
            <motion.div
              key={previousMovie.id}
              initial={{ x: '-100vw', opacity: 1 }}
              animate={{ x: isSwiping ? '0vw' : '-100vw', opacity: 1 }}
              transition={cardTransition}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <SwipeCard2
                movie={previousMovie}
                typeChosen={typeChosen}
                openSnackbar={memoizedSetOpenSnackbar}
                setOpenSnackbar={setOpenSnackbar}
              />
            </motion.div>
          )}

          {/* Carte actuelle */}
          <motion.div
            key={currentMovie.id}
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x: isSwiping
                ? direction === 'left'
                  ? '-100vw'
                  : '100vw'
                : 0,
              opacity: isSwiping ? 0 : 1,
            }}
            transition={cardTransition}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <SwipeCard2
              movie={currentMovie}
              typeChosen={typeChosen}
              openSnackbar={memoizedSetOpenSnackbar}
              setOpenSnackbar={setOpenSnackbar}
            />
          </motion.div>

          {/* Carte suivante (préchargée à droite) */}
          {nextMovie && direction === 'left' && (
            <motion.div
              key={nextMovie.id}
              initial={{ x: '100vw', opacity: 0 }}
              animate={{
                x: isSwiping ? '0vw' : '100vw',
                opacity: 1,
              }}
              transition={cardTransition}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <SwipeCard2
                movie={nextMovie}
                typeChosen={typeChosen}
                openSnackbar={memoizedSetOpenSnackbar}
                setOpenSnackbar={setOpenSnackbar}
              />
            </motion.div>
          )}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(openSnackbar)}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(null)}
        message={openSnackbar}
      />
    </>
  );
};

export default SwipeComponent2;