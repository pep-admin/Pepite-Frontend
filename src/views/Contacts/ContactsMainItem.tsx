//  Import des libs externes
import { Stack, Avatar, Typography, Divider, Button } from '@mui/material';
import PropTypes from 'prop-types';

// Import des variables d'environnement
import apiBaseUrl from '@utils/request/config';

// Import des icônes
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useRef, useState } from 'react';

// Import des requêtes
import { handleFriendship } from '@utils/request/friendship/handleFriendship';
import { handleCloseFriendRequest } from '@utils/request/friendship/handleCloseFriend';

const ContactsMainItem = ({
  type,
  user,
  getFriendRequests,
  getFriendsNumber,
  isLast,
}) => {
  const [isCloseFriend, setIsCloseFriend] = useState(false);
  const isCloseRef = useRef(false);

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
  const handleFriendRequest = async choice => {
    await handleFriendship(user.id, choice);
    getFriendRequests(); // Supprime la demande de la liste des demandes d'amis
    getFriendsNumber(); // Ajoute le nouvel ami dans la liste d'amis
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
              sx={{ color: isCloseFriend ? '#F29E50' : '#B9B9B9' }}
              onClick={() => handleCloseFriend()}
            />
          ) : null}
          <Button
            variant="contained"
            color={type === 'requests' ? 'primary' : 'secondary'}
            sx={{
              height: '20px',
              width: '60px',
              minWidth: 'auto',
              color: '#fff',
              padding: '0',
              fontSize: '0.9em',
              fontWeight: 'normal',
              textTransform: 'initial',
            }}
            onClick={() =>
              type === 'requests' ? handleFriendRequest('accepted') : null
            }
          >
            {type === 'requests' ? 'Accepter' : 'Ami(e)'}
          </Button>
          <DeleteOutlineOutlinedIcon
            fontSize="small"
            sx={{ color: '#B9B9B9' }}
            onClick={() =>
              type === 'requests' ? handleFriendRequest('declined') : null
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
};

export default ContactsMainItem;
