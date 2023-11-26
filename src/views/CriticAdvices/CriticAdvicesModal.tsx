// Import des libs externes
import {
  CardMedia,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Box,
} from '@mui/material';
import { getVideo } from '@utils/request/critics/getVideo';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';

const CriticAdvicesModal = ({ showPoster, setShowPoster, criticInfos }) => {
  const { displayType } = useData();

  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const opts = {
    height: '100%',
    width: '100%',
  };

  // Récupère la bande annonce
  const fetchTrailerUrl = async () => {
    const movieId = criticInfos.id; // Assurez-vous que l'ID est correctement passé dans criticInfos

    try {
      const response = await getVideo(displayType, movieId);
      const data = response.data;
      console.log('les données', data);
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
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération de la bande-annonce:',
        error,
      );
    }
  };

  useEffect(() => {
    fetchTrailerUrl();
  }, []);

  return (
    <Modal
      open={showPoster}
      onClose={() => setShowPoster(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <>
        <Stack
          direction="row"
          justifyContent="flex-end"
          width="75vw"
          marginBottom="3px"
        >
          <Box
            height="30px"
            width="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: '#3b3b3b' }}
            onClick={() => setShowPoster(null)}
          >
            <CloseIcon sx={{ color: '#fff' }} />
          </Box>
        </Stack>
        {!showVideo ? (
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500/${criticInfos.poster_path}`}
            alt="green iguana"
            sx={{
              height: 'auto',
              width: '75vw',
              objectFit: 'contain',
            }}
          />
        ) : showVideo && videoId !== null ? (
          <YouTube
            videoId={videoId}
            opts={opts}
            style={{ height: '50vh', width: '75vw', maxWidth: '100%' }}
          />
        ) : null}

        <ToggleButtonGroup
          // value={alignment}
          exclusive
          // onChange={handleChange}
          aria-label="Platform"
          sx={{
            width: '75vw',
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#3b3b3b',
          }}
        >
          <ToggleButton
            value="poster"
            sx={{
              padding: '5px',
              fontSize: '0.7em',
              fontWeight: 'bold',
              flexBasis: '50%',
              color: !showVideo ? '#fff' : '#24A5A5',
            }}
            onClick={() => setShowVideo(false)}
          >
            {'Poster'}
          </ToggleButton>
          <ToggleButton
            value="bande-annonce"
            sx={{
              padding: '5px',
              fontSize: '0.7em',
              fontWeight: 'bold',
              flexBasis: '50%',
              textDecoration:
                videoId === 'no-video' ? 'line-through !important' : 'none',
              color:
                showVideo && videoId !== 'no-video'
                  ? '#fff'
                  : !showVideo && videoId !== 'no-video'
                  ? '#24A5A5'
                  : 'gray',
            }}
            onClick={videoId !== 'no-video' ? () => setShowVideo(true) : null}
          >
            {'Bande-annonce'}
          </ToggleButton>
        </ToggleButtonGroup>
      </>
    </Modal>
  );
};

CriticAdvicesModal.propTypes = {
  showPoster: PropTypes.bool.isRequired,
  setShowPoster: PropTypes.func.isRequired,
  criticInfos: PropTypes.object.isRequired,
};

export default CriticAdvicesModal;
