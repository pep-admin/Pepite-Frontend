//  Import des libs externes
import { Stack, Avatar, Typography, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Import des composants internes
import CustomAlert from '@utils/CustomAlert';

// Import des variables d'environnement
import apiBaseUrl from '@utils/request/config';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useRef, useState } from 'react';

// Import des requêtes
import { acceptFriendship } from '@utils/request/friendship/acceptFriendship';
import { handleCloseFriendRequest } from '@utils/request/friendship/handleCloseFriend';
import { removeFriendRequest } from '@utils/request/friendship/removeFriendRequest';
import { unfollowSomeone } from '@utils/request/followed/unfollowSomeone';
import { declineFriendship } from '@utils/request/friendship/declineFriendship';
import { YellowRating } from './styledComponent';
import { convertRating } from './functions/convertRating';
import { removeWantedMovieRequest } from './request/list/removeWantedMovieRequest';

const MainItemList = ({ type, data, getRequest, getRequest2, isLast }) => {
  const [isCloseFriend, setIsCloseFriend] = useState(false);
  const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
  const [showRemoveFollowedModal, setShowRemoveFollowedModal] = useState(false);
  const [showRemoveWantedMovie, setShowRemoveWantedMovie] = useState(false);

  const isCloseRef = useRef(false);

  const { displayType } = useData();

  const navigate = useNavigate();

  const handleCloseFriend = async () => {
    setIsCloseFriend(!isCloseFriend);
    isCloseRef.current = !isCloseRef.current;

    if (isCloseRef.current) {
      await handleCloseFriendRequest(data.id, 1);
    } else {
      await handleCloseFriendRequest(data.id, 0);
    }
  };

  const updateFriendList = () => {
    getRequest(); // Met à jour la liste des demandes d'amis
    getRequest2(); // Met à jour la liste d'amis
  };

  // Accepte une demande d'ami
  const acceptFriendRequest = async () => {
    await acceptFriendship(data.id);
    updateFriendList();
  };

  // Refuse une demande d'ami
  const declineFriendRequest = async () => {
    await declineFriendship(data.id);
    updateFriendList();
  };

  // Supprime un ami de la liste d'amis
  const removeFriendFromList = async () => {
    await removeFriendRequest(data.id);
    updateFriendList();
  };

  // Supprime un suivi de la liste des suivis
  const removeFollowedFromList = async () => {
    await unfollowSomeone(data.id);
    getRequest(); // Met à jour la liste des suivis
  };

  const removeWantedMovie = async () => {
    await removeWantedMovieRequest(data.id, displayType);
    getRequest(); // Met à jour la liste des films / séries à voir
  };

  useEffect(() => {
    if (data.is_close === 1) {
      setIsCloseFriend(true);
      isCloseRef.current = true;
    } else {
      setIsCloseFriend(false);
      isCloseRef.current = false;
    }
  }, []);

  return (
    <>
      {showRemoveFriendModal ||
      showRemoveFollowedModal ||
      showRemoveWantedMovie ? (
        <CustomAlert
          type="warning"
          message={
            showRemoveFriendModal ? (
              <span>
                {'Êtes vous sûr(e) de vouloir retirer '}
                <strong> {data.first_name} </strong>
                <strong> {data.last_name} </strong>
                {"de votre liste d'amis?"}
              </span>
            ) : showRemoveFollowedModal ? (
              <span>
                {'Êtes vous sûr(e) de ne plus vouloir suivre '}
                <strong> {data.first_name} </strong>
                <strong> {data.last_name} ?</strong>
              </span>
            ) : showRemoveWantedMovie ? (
              <span>
                {'Êtes-vous sûr(e) de vouloir supprimer '}
                {displayType === 'movie' ? (
                  <strong> {data.title} </strong>
                ) : (
                  <strong> {data.name} </strong>
                )}
                {`de votre liste des ${
                  displayType === 'movie'
                    ? 'films souhaités'
                    : 'séries souhaitées'
                } ?`}
              </span>
            ) : null
          }
          setShowModal={
            showRemoveFriendModal
              ? setShowRemoveFriendModal
              : showRemoveFollowedModal
              ? setShowRemoveFollowedModal
              : showRemoveWantedMovie
              ? setShowRemoveWantedMovie
              : null
          }
          confirmation={
            showRemoveFriendModal
              ? removeFriendFromList
              : showRemoveFollowedModal
              ? removeFollowedFromList
              : showRemoveWantedMovie
              ? removeWantedMovie
              : null
          }
        />
      ) : null}
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Avatar
            variant={type === 'movies' ? 'square' : 'rounded'}
            alt={
              type === 'movies'
                ? `Poster ${
                    displayType === 'movie' ? 'du film' : 'de la série'
                  } ${displayType === 'movie' ? data.title : data.name}`
                : `Photo de profil de ${data.first_name} ${data.last_name}`
            }
            src={
              type === 'movies' && data.poster_path
                ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                : type === 'movies' && !data.poster_path
                ? null
                : // Si l'utilisateur a défini une photo de profil
                data.file_path
                ? `${apiBaseUrl}/uploads/${data.file_path}`
                : // Si l'utilisateur n'a pas défini de photo de profil
                  'http://127.0.0.1:5173/images/default_profil_pic.png'
            }
            sx={{
              width: 50,
              height: 50,
            }}
            onClick={() => navigate(`/profil/${data.id}`)}
          />
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography variant="body2" component="h4" fontWeight="bold">
              {type === 'movies'
                ? `${data.title}`
                : `${data.first_name} ${data.last_name}`}
            </Typography>
            {type === 'movies' ? (
              <Stack direction="row" columnGap="3px" flexWrap="wrap">
                <YellowRating
                  readOnly
                  value={convertRating(data.vote_average)}
                  precision={0.1}
                  sx={{
                    position: 'relative',
                    left: '-3px',
                    bottom: '-1px',
                  }}
                />
                <Typography
                  fontSize="0.8em"
                  fontWeight="bold"
                >{`${convertRating(data.vote_average)} / 5`}</Typography>
                <Typography
                  fontSize="0.8em"
                  align="left"
                  height="14.22px"
                  flexBasis="100%"
                >
                  <>
                    {'noté par'}
                    <span style={{ fontWeight: 'bold' }}> 3 connaissances</span>
                  </>
                </Typography>
              </Stack>
            ) : (
              <Typography variant="body2" component="h4" color="primary">
                {`3 amis en commun`}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          {type === 'friends' ? (
            <FavoriteIcon
              fontSize="small"
              sx={{ color: isCloseFriend ? '#F16C22' : '#B9B9B9' }}
              onClick={() => handleCloseFriend()}
            />
          ) : null}
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                type === 'requests' || type === 'movies'
                  ? '#0E6666 !important'
                  : type === 'followed'
                  ? '#24A5A5 !important'
                  : type === 'friends' && isCloseFriend
                  ? '#F16C22 !important'
                  : '#F29E50 !important',
              height: '20px',
              width: 'auto',
              minWidth: '60px',
              whiteSpace: 'nowrap',
              color: '#fff',
              padding: '0 8px',
              fontSize: '0.9em',
              fontWeight: 'normal',
              textTransform: 'initial',
            }}
            onClick={() => (type === 'requests' ? acceptFriendRequest() : null)}
          >
            {type === 'requests'
              ? 'Accepter'
              : type === 'followed'
              ? 'Suivi'
              : type === 'friends' && isCloseFriend
              ? 'Ami +'
              : type === 'friends' && !isCloseFriend
              ? 'Ami'
              : type === 'movies'
              ? "Je l'ai vu !"
              : null}
          </Button>
          <DeleteOutlineOutlinedIcon
            fontSize="small"
            sx={{ color: '#B9B9B9' }}
            onClick={() =>
              // Suppression de la demande d'amitié reçue
              type === 'requests'
                ? declineFriendRequest()
                : // Apparition de la modale demandant la confirmation de suppression d'un ami
                type === 'friends'
                ? setShowRemoveFriendModal(!showRemoveFriendModal)
                : // Apparition de la modale demandant la confirmation de ne plus suivre quelqu'un
                type === 'followed'
                ? setShowRemoveFollowedModal(!showRemoveFollowedModal)
                : // Supprime le film de la liste des films à voir
                type === 'movies'
                ? setShowRemoveWantedMovie(!showRemoveWantedMovie)
                : null
            }
          />
        </Stack>
      </Stack>
      {!isLast ? <Divider /> : null}
    </>
  );
};

MainItemList.propTypes = {
  data: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  getRequest: PropTypes.func.isRequired,
  getRequest2: PropTypes.func,
  getFollowed: PropTypes.func,
};

export default MainItemList;
