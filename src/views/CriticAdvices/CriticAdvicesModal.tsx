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
import VisibilityIcon from '@mui/icons-material/Visibility';

// Import des requêtes
import { getUserRequest } from '@utils/request/users/getUserRequest';

// Import des fonctions utilitaires
import { getRelationStatusRequest } from '@utils/request/friendship/getRelationStatusRequest';

// Import des composants internes
import ModalPosterContent from './ModalPosterContent';

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
  loggedUserInfos,
  chosenUser,
  from,
}) => {
  const { displayType } = useData();

  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [goldNuggetUserInfos, setGoldNuggetUserInfos] = useState<User[]>([]);
  const [showUserInfos, setShowUserInfos] = useState(true);
  const [relationshipStatus, setRelationshipStatus] = useState({});

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

  const getGoldNuggetUsersInfos = async userIds => {
    try {
      console.log('recup infos user');

      const userInfosPromises = userIds.map(userId => getUserRequest(userId));
      const usersInfos = await Promise.all(userInfosPromises);
      setGoldNuggetUserInfos(usersInfos);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des informations des utilisateurs:',
        error,
      );
      setGoldNuggetUserInfos([]);
    }
  };

  const getRelationStatus = async id => {
    const relationShip = await getRelationStatusRequest(id);
    setRelationshipStatus(prevStatus => ({
      ...prevStatus,
      [id]: relationShip,
    }));
  };

  useEffect(() => {
    // Statut des relations entre les utilisateurs qui ont choisi le film en pépite
    for (const i in infos.users) {
      getRelationStatus(infos.users[i]);
    }

    // Informations des utilisateurs qui ont choisi le film en pépite
    if (from !== 'critic' && infos.users) {
      getGoldNuggetUsersInfos(infos.users);
    }

    // Récupère la bande annonce (si existante) du film choisi
    fetchTrailerUrl();
  }, [infos]);

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
          marginBottom="15px"
        >
          <Box
            height="30px"
            width="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#3b3b3b',
              borderRadius: '4px',
            }}
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
            {showUserInfos ? (
              <ModalPosterContent
                page={page}
                from={from}
                infos={infos}
                loggedUserInfos={loggedUserInfos}
                chosenUser={chosenUser}
                goldNuggetUserInfos={goldNuggetUserInfos}
                relationshipStatus={relationshipStatus}
                setShowUserInfos={setShowUserInfos}
              />
            ) : (
              <Stack
                position="absolute"
                top="0"
                left="0"
                height="auto"
                width="100%"
              >
                <Stack width="100%" alignItems="center">
                  <VisibilityIcon
                    fontSize="large"
                    sx={{
                      color: '#fff',
                      marginTop: '83.96px',
                      cursor: 'pointer',
                      opacity: '0.3',
                    }}
                    onClick={() => setShowUserInfos(true)}
                  />
                </Stack>
              </Stack>
            )}
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
  loggedUserInfos: PropTypes.object.isRequired,
  criticUserInfos: PropTypes.object,
  chosenUser: PropTypes.object,
  from: PropTypes.string.isRequired,
  page: PropTypes.string,
};

export default CriticAdvicesModal;
