// Import des libs externes
import {
  CardMedia,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Box,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import { getVideo } from '@utils/request/critics/getVideo';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { OrangeRating } from '@utils/styledComponent';
import StarIcon from '@mui/icons-material/Star';

// Import des requêtes
import { getUser } from '@utils/request/users/getUser';

// Import des variables d'environnement
import apiBaseUrl from '@utils/request/config';

// Import des fonctions utilitaires
import { formatRating } from '@utils/functions/formatRating';

interface Picture {
  id: number;
  user_id: number;
  filePath: string;
  uploaded_at: string;
  isActive: number;
}

interface User {
  coverPics: Picture[];
  create_datetime: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  last_login_date: string;
  profilPics: Picture[];
  rank: string;
}

const CriticAdvicesModal = ({
  page,
  showPoster,
  setShowPoster,
  infos,
  from,
}) => {
  const { displayType } = useData();

  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [goldNuggetUserInfos, setGoldNuggetUserInfos] = useState<User | null>(
    null,
  );
  const [showUserInfos, setShowUserInfos] = useState(true);

  const opts = {
    height: '100%',
    width: '100%',
  };

  // Récupère la bande annonce youtube
  const fetchTrailerUrl = async () => {
    let movieId;

    if (from === 'critic') {
      movieId = infos.id;
    } else if (from === 'suggested' && displayType === 'movie') {
      movieId = infos.movie_id;
    } else if (from === 'suggested' && displayType === 'tv') {
      movieId = infos.serie_id;
    }

    try {
      const response = await getVideo(displayType, movieId);
      const data = response.data;
      if (data.results.length === 0) {
        setVideoId('no-video');
        return;
      }

      const trailer = data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube',
      );
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

  const getGoldNuggetUserInfos = async () => {
    const userInfos = await getUser(infos.user_id);
    setGoldNuggetUserInfos(userInfos);
  };

  useEffect(() => {
    fetchTrailerUrl();
    if (from !== 'critic') {
      getGoldNuggetUserInfos();
    }
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
          width="80vw"
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
          <Stack position="relative">
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500/${infos.poster_path}`}
              alt="green iguana"
              sx={{
                height: 'auto',
                width: '80vw',
                objectFit: 'contain',
              }}
            />
            {page === 'home' && showUserInfos ? (
              <Stack
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
                bgcolor="rgba(0, 0, 0, 0.67)"
                padding="6px"
                alignItems="center"
              >
                <Typography
                  variant="h2"
                  align="center"
                  color="#fff"
                  fontSize="2.5em"
                  fontFamily="Sirin Stencil"
                  marginBottom="7px"
                >
                  {'PÉPITE !'}
                </Typography>
                <Divider
                  sx={{
                    width: '75px',
                    borderBottomWidth: 'medium',
                    borderColor: '#fff',
                  }}
                />
                <Stack
                  width="100%"
                  flexGrow="1"
                  alignItems="center"
                  padding="30px 0"
                >
                  <VisibilityOffIcon
                    fontSize="large"
                    sx={{
                      color: '#fff',
                      marginBottom: '15px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowUserInfos(false)}
                  />
                  <Avatar
                    alt={`Photo de profil de ${goldNuggetUserInfos?.first_name}`}
                    src={
                      // Si l'utilisateur a défini une photo de profil
                      goldNuggetUserInfos?.profilPics.length
                        ? `${apiBaseUrl}/uploads/${goldNuggetUserInfos?.profilPics.find(
                            pic => pic.isActive === 1,
                          ).filePath}`
                        : // Si l'utilisateur n'a pas défini de photo de profil
                          'http://127.0.0.1:5173/images/default_profil_pic.png'
                    }
                    sx={{
                      width: 90,
                      height: 90,
                      outline: '3.5px solid #fff',
                      marginBottom: '15px',
                    }}
                  />
                  <Typography sx={{ color: '#fff' }}>
                    {`${goldNuggetUserInfos?.first_name} ${goldNuggetUserInfos?.last_name} a noté`}
                  </Typography>
                  <Typography color="primary" fontSize="2em" fontWeight="bold">
                    {infos?.title ? `${infos.title}` : `${infos.name}`}
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    <OrangeRating
                      name="half-rating-read"
                      value={parseFloat(infos?.rating)}
                      precision={0.1}
                      readOnly
                      emptyIcon={
                        <StarIcon sx={{ color: '#E1E1E1', fontSize: '1em' }} />
                      }
                      sx={{ marginRight: '10px', fontSize: '1.3em' }}
                    />
                    <Typography
                      fontSize="1.3em"
                      color="secondary"
                      fontWeight="bold"
                    >
                      {`${formatRating(infos?.rating)} / 5`}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ) : page === 'home' && !showUserInfos ? (
              <Stack
                position="absolute"
                top="0"
                left="0"
                height="54px"
                width="100%"
                padding="6px"
              >
                <Stack
                  width="100%"
                  flexGrow="1"
                  alignItems="center"
                  padding="30px 0"
                >
                  <Box height="57.4px"></Box>
                  <VisibilityIcon
                    fontSize="large"
                    sx={{
                      color: '#fff',
                      marginBottom: '15px',
                      cursor: 'pointer',
                      opacity: '0.25',
                    }}
                    onClick={() => setShowUserInfos(true)}
                  />
                </Stack>
              </Stack>
            ) : null}
          </Stack>
        ) : showVideo && videoId !== null ? (
          <YouTube
            videoId={videoId}
            opts={opts}
            style={{ height: '50vh', width: '75vw', maxWidth: '100%' }}
          />
        ) : null}

        <ToggleButtonGroup
          exclusive
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
  infos: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
  page: PropTypes.string,
};

export default CriticAdvicesModal;
