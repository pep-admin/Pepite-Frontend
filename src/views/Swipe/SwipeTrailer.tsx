// Import des libs externes
import { CircularProgress, LinearProgress, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// Import des icônes
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// Import des requêtes
import { getVideo } from '@utils/request/critics/getVideo';

const SwipeTrailer = ({
  movie,
  showTrailer,
  isTrailerFullscreen,
  setIsTrailerFullscreen,
}) => {

  const [videoId, setVideoId] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const overlayRef = useRef(null);
  const progressBarRef = useRef(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0, // Masque les contrôles de YouTube
      modestbranding: 1, // Réduit le branding YouTube
      rel: 0, // Empêche l'affichage des vidéos suggérées à la fin
    },
  };

  const getCountryFlagUrl = (countryCode) => `https://flagsapi.com/${countryCode}/shiny/24.png`;

  const fetchTrailerUrl = async () => {
    if (!isLoading) return;

    const movieOrSerie = 'release_date' in movie ? 'movie' : 'tv';

    try {
      setIsLoading(true);

      const response = await getVideo(movieOrSerie, movie.id);
      const data = response.data;
      if (data.results.length === 0) {
        setVideoId('no-video');
        return;
      }

      const trailer = data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube',
      );
      console.log('trailer', trailer);
      

      if (trailer) {
        setVideoId(trailer.key);
        setTrailer(trailer);
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération de la bande-annonce :',
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      player.getPlayerState().then(state => {
        if (state === 1) {
          // Si la vidéo est en lecture (1 = PLAYING)
          player.pauseVideo();
          setIsPaused(true);
        } else {
          // Sinon, on la joue
          player.playVideo();
          setIsPaused(false);
        }
      });
    }
  };

  const toggleFullscreen = event => {
    event.stopPropagation();

    setIsTrailerFullscreen(!isTrailerFullscreen);
  };

  const updateProgress = () => {
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      player.getDuration().then(duration => {
        player.getCurrentTime().then(currentTime => {
          const newProgress = (currentTime / duration) * 100;
          setProgress(newProgress); // Mise à jour de la progression
        });
      });
    }
  };

  // Fonction pour sauter à un moment spécifique de la vidéo en fonction du clic
  const handleProgressClick = event => {
    event.stopPropagation();

    if (playerRef.current && progressBarRef.current) {
      const player = playerRef.current.getInternalPlayer();
      const progressBar = progressBarRef.current;
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left; // Position du clic par rapport à la barre
      const barWidth = rect.width;

      player.getDuration().then(duration => {
        const newTime = (clickX / barWidth) * duration; // Calcul du nouveau temps
        player.seekTo(newTime, true); // Avance la vidéo au moment cliqué
        updateProgress(); // Mise à jour de la barre
      });
    }
  };

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        updateProgress();
      }, 1000); // Mise à jour chaque seconde
    }
    return () => clearInterval(interval); // Nettoyage de l'intervalle lorsque la vidéo est en pause
  }, [isPaused]);

  useEffect(() => {
    if (showTrailer) {
      fetchTrailerUrl();
    }
  }, [showTrailer]);

  useEffect(() => {
    console.log('plein écran ? =>', isTrailerFullscreen);
    
  }, [isTrailerFullscreen])

  return (
    <Stack spacing={2} height='100%' >
      <Stack direction='row' spacing={2} display={ isTrailerFullscreen ? 'none' : 'flex' }>
        <Typography color="secondary" fontWeight="500" whiteSpace="nowrap">
            {'Bande-annonce :'}
        </Typography>
        <Stack direction='row' spacing={1} alignItems='center' >
          {
            trailer ?
            <>
              <img
                src={getCountryFlagUrl(`${trailer.iso_3166_1}`)}
                alt={`Drapeau de france`}
              />
              <Typography
                color="primary"
                fontWeight="400"
                whiteSpace="nowrap"
              >
                {`${trailer.iso_3166_1}`}
              </Typography>
            </>
            :
            <Skeleton
              variant="text"
              width="46px"
              sx={{ fontSize: '1em', bgcolor: 'rgb(56 56 56)' }}
            />
          }
          
        </Stack>
      </Stack>
      <Stack
        ref={containerRef}
        height={ isTrailerFullscreen ? '100%' : '250px' } 
        width={ isTrailerFullscreen ? '100%' : '88vw' }
        flexShrink="0"
        marginTop={ isTrailerFullscreen ? '0 !important' : '12px' }
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {videoId !== null && !isLoading ? (
            <>
              <YouTube
                ref={playerRef}
                videoId={videoId}
                opts={opts}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                onPause={() => setIsPaused(true)}
                onPlay={() => setIsPaused(false)}
              />
              {/* Overlay pour les icônes en plein écran */}
              <Stack
                ref={overlayRef}
                justifyContent="flex-end"
                style={{
                  position: 'absolute',
                  zIndex: 9999, // Positionne l'overlay au-dessus de tout
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: isPaused
                    ? 'rgba(0, 0, 0, 0.5)'
                    : 'rgba(0, 0, 0, 0)',
                }}
                onClick={handlePlayPause}
              >
                <Stack 
                  direction='row' 
                  alignItems='center' 
                  height='50px' 
                  bgcolor={ isTrailerFullscreen && !isPaused ? 'transparent' : '#000' }
                >
                  <PlayArrowIcon
                    onClick={handlePlayPause}
                    style={{
                      fontSize: '32px',
                      color: 'white',
                      margin: '0 10px',
                    }}
                  />
                  {/* Barre de progression cliquable */}
                  <LinearProgress
                    ref={progressBarRef}
                    variant="determinate"
                    value={progress}
                    onClick={handleProgressClick} // Ajout du gestionnaire de clic
                    sx={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer', // Ajout d'un curseur pour indiquer que c'est cliquable
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#E7AE1A',
                      },
                    }}
                  />
                  <FullscreenIcon
                    onClick={e => toggleFullscreen(e)}
                    style={{
                      fontSize: '32px',
                      color: 'white',
                      margin: '0 10px',
                    }}
                  />
                </Stack>
              </Stack>
            </>
          ) : (
            <CircularProgress sx={{ color: '#E7AE1A' }} />
          )}
        </Stack>
      </Stack>
    </Stack>
    
  );
};

SwipeTrailer.propTypes = {
  movie: PropTypes.object.isRequired,
  showTrailer: PropTypes.bool,
  isTrailerFullscreen: PropTypes.bool,
  setIsTrailerFullscreen: PropTypes.func,
};

export default SwipeTrailer;
