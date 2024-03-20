// Import des libs externes
import { Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DoneIcon from '@mui/icons-material/Done';

// Import des requêtes
import { acceptFriendship } from '@utils/request/friendship/acceptFriendship';
import { handleCloseFriendRequest } from '@utils/request/friendship/handleCloseFriend';
import { declineFriendship } from '@utils/request/friendship/declineFriendship';
import { addWatchedMovieRequest } from '../request/list/addWatchedMovieRequest';

const MainItemIcons = ({
  type,
  data,
  movieOrSerie,
  getRequest,
  getRequest2,
  // updateFriendList,
  removeWatchedMovie,
  showRemoveFriendModal,
  setShowRemoveFriendModal,
  showRemoveFollowedModal,
  setShowRemoveFollowedModal,
  showRemoveWantedMovie,
  setShowRemoveWantedMovie,
  showRemoveWatchedMovie,
  setShowRemoveWatchedMovie,
}) => {
  const [isCloseFriend, setIsCloseFriend] = useState(false);

  const isCloseRef = useRef(false);

  const handleCloseFriend = async () => {
    setIsCloseFriend(!isCloseFriend);
    isCloseRef.current = !isCloseRef.current;

    if (isCloseRef.current) {
      await handleCloseFriendRequest(data.id, 1);
    } else {
      await handleCloseFriendRequest(data.id, 0);
    }
  };

  // Accepte une demande d'ami
  const acceptFriendRequest = async () => {
    await acceptFriendship(data.id);
    await getRequest();
    getRequest2();
  };

  // Refuse une demande d'ami
  const declineFriendRequest = async () => {
    await declineFriendship(data.id);
    getRequest();
  };

  // Ajoute le film à la liste des films déjà vus (à noter)
  const addWatchedMovie = async () => {
    await addWatchedMovieRequest(data.id, movieOrSerie);
    getRequest(); // Supprime le film de la liste des films à voir
  };

  // Affichage des amis proches au montage du composant
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
    <Stack direction="row" spacing={3} alignItems="center">
      {type === 'requests' && (
        <DoneIcon
          fontSize="small"
          sx={{
            color: '#B9B9B9',
          }}
          onClick={() => acceptFriendRequest()}
        />
      )}
      {type === 'friends' ? (
        <FavoriteIcon
          fontSize="small"
          sx={{ color: isCloseFriend ? '#ff7b00' : '#B9B9B9' }}
          onClick={() => handleCloseFriend()}
        />
      ) : null}
      {type === 'wanted-movies' ? (
        <VisibilityOutlinedIcon
          fontSize="small"
          sx={{
            color: '#B9B9B9',
          }}
          onClick={() => addWatchedMovie()}
        />
      ) : type === 'watched-movies' ? (
        <VisibilityOffOutlinedIcon
          fontSize="small"
          sx={{
            color: '#B9B9B9',
          }}
          onClick={() => removeWatchedMovie('cancel')}
        />
      ) : null}
      {type === 'wanted-movies' || type === 'watched-movies' ? (
        <StarBorderOutlinedIcon
          fontSize="small"
          sx={{
            color: '#B9B9B9',
            visibility: type === 'rated-movies' ? 'hidden' : 'visible',
          }}
        />
      ) : null}
      <DeleteOutlineOutlinedIcon
        fontSize="small"
        sx={{
          color: '#B9B9B9',
          // visibility: type === 'rated-movies' ? 'hidden' : 'visible',
        }}
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
            : // Retire le film de la liste des films à voir
            type === 'wanted-movies'
            ? setShowRemoveWantedMovie(!showRemoveWantedMovie)
            : // Retire le film de la liste des films à noter
            type === 'watched-movies'
            ? setShowRemoveWatchedMovie(!showRemoveWatchedMovie)
            : null
        }
      />
    </Stack>
  );
};

MainItemIcons.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  movieOrSerie: PropTypes.string,
  getRequest: PropTypes.func.isRequired,
  getRequest2: PropTypes.func,
  removeWatchedMovie: PropTypes.func,
  showRemoveFriendModal: PropTypes.bool,
  setShowRemoveFriendModal: PropTypes.func,
  showRemoveFollowedModal: PropTypes.bool,
  setShowRemoveFollowedModal: PropTypes.func,
  showRemoveWantedMovie: PropTypes.bool,
  setShowRemoveWantedMovie: PropTypes.func,
  showRemoveWatchedMovie: PropTypes.bool,
  setShowRemoveWatchedMovie: PropTypes.func,
};

export default MainItemIcons;
