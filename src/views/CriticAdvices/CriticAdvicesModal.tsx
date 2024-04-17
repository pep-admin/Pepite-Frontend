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

// Import des icônes
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Import des requêtes
import { getUser } from '@utils/request/users/getUser';

// Import des fonctions utilitaires
import { getRelationStatusRequest } from '@utils/request/friendship/getRelationStatusRequest';

// Import des composants internes
import ModalPosterContent from './ModalPosterContent';
import { getMovieDetails } from '@utils/request/getMovieDetails';

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

type Genre = {
  id: number;
  name: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type ReleaseDateEntry = {
  iso_3166_1: string;
};

type Movie = {
  friends_and_followed_critics?: undefined;
  genres: Array<Genre>;
  id: number;
  overview: string;
  poster_path: string;
  production_countries: Array<ProductionCountry>;
  release_date: string;
  release_dates: {
    results: Array<ReleaseDateEntry>;
  };
  title: string;
  vote_average: number;
  wanted_date?: string;
  watched_date?: string;
};

// Valeur initiale basée sur la structure de votre objet
const initialMovie: Movie = {
  friends_and_followed_critics: undefined,
  genres: [],
  id: 0,
  overview: '',
  poster_path: '',
  production_countries: [],
  release_date: '',
  release_dates: { results: [] },
  title: '',
  vote_average: 0,
  wanted_date: undefined,
  watched_date: undefined,
};

const CriticAdvicesModal = ({
  page,
  showPoster,
  setShowPoster,
  infos,
  loggedUserInfos,
  chosenUser,
  from,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [goldNuggetUserInfos, setGoldNuggetUserInfos] = useState<User[]>([]);
  const [showUserInfos, setShowUserInfos] = useState(true);
  const [relationshipStatus, setRelationshipStatus] = useState({});
  const [movieInfos, setMovieInfos] = useState<Movie>(initialMovie);

  const opts = {
    height: '100%',
    width: '100%',
  };

  const getMovieInfos = async () => {
    let type = '';
    let id;

    if (infos.type === 'movie_advice') {
      type = 'movie';
      id = infos.movie_id;
    } else {
      type = 'tv';
      id = infos.serie_id;
    }

    const response = await getMovieDetails(type, id);
    const movieWithDetails = { ...response, ...infos };
    setMovieInfos(movieWithDetails);
  };

  // Récupère la bande annonce youtube
  const fetchTrailerUrl = async () => {
    let movieId = 0;
    let type = '';

    if (from === 'old-critic' || from === 'old-advice') {
      movieId = infos.id;
      if ('release_date' in infos) {
        type = 'movie';
      } else {
        type = 'tv';
      }
    }

    if ('movie_id' in infos) {
      movieId = infos.movie_id;
      type = 'movie';
    } else if ('serie_id' in infos) {
      movieId = infos.serie_id;
      type = 'tv';
    }

    try {
      const response = await getVideo(type, movieId);
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

      const userInfosPromises = userIds.map(userId => getUser(userId));
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
    if (from === 'notifications') return;

    // Statut des relations entre les utilisateurs qui ont choisi le film en pépite
    for (const i in infos.users) {
      getRelationStatus(infos.users[i]);
    }

    // Informations des utilisateurs qui ont choisi le film en pépite
    if (from !== 'old-critic' && infos.users) {
      getGoldNuggetUsersInfos(infos.users);
    }

    // Récupère la bande annonce (si existante) du film choisi
    fetchTrailerUrl();
  }, [infos, from]);

  useEffect(() => {
    if (from !== 'notifications') return;

    getMovieInfos();
    fetchTrailerUrl();
  }, [from]);

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
              backgroundColor: '#1c1c1c',
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
              image={
                from === 'notifications'
                  ? `https://image.tmdb.org/t/p/w500/${movieInfos.poster_path}`
                  : `https://image.tmdb.org/t/p/w500/${infos.poster_path}`
              }
              alt={`poster du film`}
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
                infos={from === 'notifications' ? movieInfos : infos}
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
                      marginTop: '73.6px',
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
            backgroundColor: '#1c1c1c',
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
  infos: PropTypes.object,
  loggedUserInfos: PropTypes.object.isRequired,
  criticUserInfos: PropTypes.object,
  chosenUser: PropTypes.object,
  from: PropTypes.string.isRequired,
  page: PropTypes.string,
};

export default CriticAdvicesModal;
