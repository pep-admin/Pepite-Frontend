//  Import des libs externes
import { Stack, Avatar, Typography, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Import des composants internes
import CustomAlert from '@utils/CustomAlert';

// Import des variables d'environnement
import apiBaseUrl from '@utils/request/config';

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

const ContactsMainItem = ({
  type,
  user,
  getFriendRequests,
  getFriendsNumber,
  getFollowed,
  isLast,
}) => {
  const [isCloseFriend, setIsCloseFriend] = useState(false);
  const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
  const [showRemoveFollowedModal, setShowRemoveFollowedModal] = useState(false);

  const isCloseRef = useRef(false);

  const navigate = useNavigate();

  const handleCloseFriend = async () => {
    setIsCloseFriend(!isCloseFriend);
    isCloseRef.current = !isCloseRef.current;

    if (isCloseRef.current) {
      await handleCloseFriendRequest(user.id, 1);
    } else {
      await handleCloseFriendRequest(user.id, 0);
    }
  };

  // Accepte une demande d'ami
  const acceptFriendRequest = async () => {
    await acceptFriendship(user.id);
    getFriendRequests(); // Met à jour la liste des demandes d'amis
    getFriendsNumber(); // Met à jour la liste d'amis
  };

  // Refuse une demande d'ami
  const declineFriendRequest = async () => {
    await declineFriendship(user.id);
    getFriendRequests(); // Met à jour la liste des demandes d'amis
    getFriendsNumber(); // Met à jour la liste d'amis
  };

  // Supprime un ami de la liste d'amis
  const removeFriendFromList = async () => {
    await removeFriendRequest(user.id);
    getFriendRequests(); // Met à jour la liste des demandes d'amis
    getFriendsNumber(); // Met à jour la liste des amis
  };

  // Supprime un suivi de la liste des suivis
  const removeFollowedFromList = async () => {
    await unfollowSomeone(user.id);
    getFollowed();
  };

  useEffect(() => {
    if (user.is_close === 1) {
      setIsCloseFriend(true);
      isCloseRef.current = true;
    } else {
      setIsCloseFriend(false);
      isCloseRef.current = false;
    }
  }, []);

  return (
    <>
      {showRemoveFriendModal || showRemoveFollowedModal ? (
        <CustomAlert
          type="warning"
          message={
            showRemoveFriendModal
              ? `Êtes vous sûr(e) de vouloir retirer ${user.first_name} ${user.last_name} de votre liste d'amis?`
              : `Êtes vous sûr(e) de ne plus vouloir suivre ${user.first_name} ${user.last_name}?`
          }
          setOnSuccess={null}
          setShowModal={
            showRemoveFriendModal
              ? setShowRemoveFriendModal
              : setShowRemoveFollowedModal
          }
          confirmation={
            showRemoveFriendModal
              ? removeFriendFromList
              : removeFollowedFromList
          }
        />
      ) : null}
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={`Photo de profil de ${user.first_name} ${user.last_name}`}
            src={
              // Si l'utilisateur a défini une photo de profil
              user.file_path
                ? `${apiBaseUrl}/uploads/${user.file_path}`
                : // Si l'utilisateur n'a pas défini de photo de profil
                  'http://127.0.0.1:5173/images/default_profil_pic.png'
            }
            sx={{
              width: 50,
              height: 50,
            }}
            onClick={() => navigate(`/profil/${user.id}`)}
          />
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography variant="body2" component="h4" fontWeight="bold">
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography variant="body2" component="h4" color="primary">
              {`3 amis en commun`}
            </Typography>
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
                type === 'requests'
                  ? '#0E6666 !important'
                  : type === 'followed'
                  ? '#24A5A5 !important'
                  : type === 'friends' && isCloseFriend
                  ? '#F16C22 !important'
                  : '#F29E50 !important',
              height: '20px',
              width: '60px',
              minWidth: 'auto',
              color: '#fff',
              padding: '0',
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
              : 'Ami'}
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
                : null
            }
          />
        </Stack>
      </Stack>
      {!isLast ? <Divider /> : null}
    </>
  );
};

ContactsMainItem.propTypes = {
  user: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  getFriendRequests: PropTypes.func,
  getFriendsNumber: PropTypes.func,
  getFollowed: PropTypes.func,
};

export default ContactsMainItem;
