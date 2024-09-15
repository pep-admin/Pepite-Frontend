// Import des libs externes
import React, {
  MutableRefObject,
  FC,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Card } from '@mui/material';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import PropTypes from 'prop-types';

// Import des composants internes
import SwipeContent2 from '@views/Swipe/SwipeContent2';

// Import des variables d'environnement
import { assetsBaseUrl } from '@utils/request/config';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  is_rated: boolean;
  is_unwanted: boolean;
  is_wanted: boolean;
  is_watched: boolean;
  is_gold_nugget: boolean;
  is_turnip: boolean;
  user_rating: number | null;
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

interface ErrorState {
  state: boolean | null;
  message: string | null;
}

interface SwipeCard3Props {
  movie: Movie;
  typeChosen: string;
  isCurrent: boolean;
  onSwipeComplete: (direction: string) => void;
  isFirstCard: boolean;
  zIndex: number;
  dragDirectionRef: MutableRefObject<string | null>;
  setZIndexForSwipe: (direction: string) => void;
  showTrailer: boolean;
  setShowTrailer: Dispatch<SetStateAction<boolean>>;
  isTrailerFullscreen: boolean;
  setIsTrailerFullscreen: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<ErrorState>>;
}

const SwipeCard3: FC<SwipeCard3Props> = React.memo(
  ({
    movie,
    typeChosen,
    isCurrent,
    onSwipeComplete,
    isFirstCard,
    zIndex,
    dragDirectionRef,
    setZIndexForSwipe,
    showTrailer,
    setShowTrailer,
    isTrailerFullscreen,
    setIsTrailerFullscreen,
    setError,
  }) => {
    console.log('swipe card');

    const [showMovieInfos, setShowMovieInfos] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);

    const motionValue = useMotionValue(0); // Initialisation de l'animation à 0
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]); // Tous les 200px sur l'axe des x, 50deg de rotation
    const opacityValue = useTransform(
      motionValue,
      [-200, -150, 0, 150, 200],
      [0, 0.8, 1, 0.8, 0],
    ); // 0 d'opacité sur 200px sur l'axe des x

    const swipeThreshold = 150; // Seuil à partir duquel on valide le swipe

    return (
      <motion.div
        style={{
          x: motionValue,
          rotate: rotateValue,
          opacity: opacityValue,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: zIndex, // zIndex qui change en fonction du sens de swipe
          willChange: 'transform',
        }}
        onAnimationStart={() => setIsSwiping(true)}
        onAnimationEnd={() => setIsSwiping(false)}
        drag={isCurrent || !isSwiping ? 'x' : false}
        dragElastic={0.3} // Réduire l'élasticité pour que le swipe soit plus naturel
        onDrag={(_, info) => {
          if ((isFirstCard && info.offset.x > 0) || showMovieInfos) {
            motionValue.set(0); // Empêche le swipe à gauche si c'est la première carte
            return;
          }
          if (info.offset.x < 0) {
            setZIndexForSwipe('right'); // L'utilisateur souhaite voir le film suivant
          } else {
            setZIndexForSwipe('left'); // L'utilisateur souhaite revoir le film précédent
          }
        }}
        onDragEnd={(_, info) => {
          if ((isFirstCard && info.offset.x > 0) || showMovieInfos) {
            return;
          }
        
          // Si le swipe est validé
          if (Math.abs(info.offset.x) > swipeThreshold) {
            onSwipeComplete(info.offset.x < 0 ? 'left' : 'right');
            dragDirectionRef.current = null;
          } else {
            // Animation de retour plus douce et naturelle
            animate(motionValue, 0, {
              type: 'spring',
              stiffness: 100, 
              damping: 30, 
              mass: 1.5, 
            });
            animate(rotateValue, 0, {
              type: 'spring',
              stiffness: 100,
              damping: 30,
              mass: 1.5,
            });
            animate(opacityValue, 1, {
              type: 'spring',
              stiffness: 100,
              damping: 30,
              mass: 1.5,
            });
          }
        }}
        
      >
        <Card
          elevation={0}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            backgroundImage: `linear-gradient(
            to top,
            ${
              !showMovieInfos
                ? 'rgba(1, 18, 18, 1) 0%, rgba(1, 18, 18, 1) 20%, rgba(1, 18, 18, 0.6) 50%, rgba(1, 18, 18, 0) 100%'
                : 'rgba(1, 18, 18, 1) 0%, rgba(1, 18, 18, 0.97) 30%, rgba(1, 18, 18, 0.5) 85%, rgba(1, 18, 18, 0) 100%'
            }
          ), url(${
            movie.poster_path !== null
              ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              : `${assetsBaseUrl}/images/no_poster.jpg`
          })`,
            backgroundColor: '#011212',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '0 6vw',
            borderRadius: 0,
          }}
        >
          <SwipeContent2
            movie={movie}
            typeChosen={typeChosen}
            showMovieInfos={showMovieInfos}
            setShowMovieInfos={setShowMovieInfos}
            showTrailer={showTrailer}
            setShowTrailer={setShowTrailer}
            isTrailerFullscreen={isTrailerFullscreen}
            setIsTrailerFullscreen={setIsTrailerFullscreen}
            setError={setError}
          />
        </Card>
      </motion.div>
    );
  },
);

SwipeCard3.propTypes = {
  // movie: PropTypes.object,
  typeChosen: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onSwipeComplete: PropTypes.func.isRequired,
  isFirstCard: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
  setZIndexForSwipe: PropTypes.func.isRequired,
  // dragDirectionRef: PropTypes.string,
  showTrailer: PropTypes.bool,
  setShowTrailer: PropTypes.func,
  isTrailerFullscreen: PropTypes.bool,
  setIsTrailerFullscreen: PropTypes.func,
  // setError: PropTypes.object
};

export default SwipeCard3;
