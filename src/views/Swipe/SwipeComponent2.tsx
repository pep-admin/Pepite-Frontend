import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Badge, Box, Snackbar, Stack, SwipeableDrawer } from '@mui/material';
import SwipeCard2 from './SwipeCard2';
import Header from '@utils/components/Header';
import { CustomButton } from './CustomBtn';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const SwipeComponent2 = ({ movies, swipeType, currentIndex, setCurrentIndex }) => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(null);

  const handleSwipe = (offset) => {
    if (offset < -100 && currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (offset > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(-200), // forcer la navigation à gauche
    onSwipedRight: () => handleSwipe(200), // forcer la navigation à droite
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const toggleFilters = useCallback((open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAreFiltersOpen(open);
  }, []);

  const memoizedSetOpenSnackbar = useCallback((message) => {
    setOpenSnackbar(message);
  }, []);

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
              {/* Drawer content */}
            </SwipeableDrawer>
          )}
        </Stack>
        <motion.div
          style={{ display: 'flex', height: '100%', width: `${movies.length * 100}vw` }}
          animate={{ x: `-${currentIndex * 100}vw` }} // Déplacement selon l'index courant
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {movies.map((movie, index) => (
            <motion.div 
              key={index} 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => handleSwipe(info.offset.x)}
              style={{ width: '100vw', flexShrink: 0 }}
            >
              <SwipeCard2 
                movie={movie} 
                swipeType={swipeType}
                position={index === currentIndex ? 'center' : index < currentIndex ? 'left' : 'right'} 
                openSnackbar={memoizedSetOpenSnackbar}
                setOpenSnackbar={setOpenSnackbar}
              />
            </motion.div>
          ))}
        </motion.div>
      </Box>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={Boolean(openSnackbar)}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(null)}
        message={openSnackbar}
      />
    </>
  );
};

export default SwipeComponent2;
