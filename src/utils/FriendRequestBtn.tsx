// Import des libs externes
import { Divider, Menu, MenuItem, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VerifiedIcon from '@mui/icons-material/Verified';
// import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';

// Import des requêtes
import { requestNewFriend } from './request/friendship/requestNewFriend';
import { checkFriendshipStatus } from './request/friendship/checkFriendshipStatus';
import { handleFriendship } from '@utils/request/friendship/handleFriendship';

const FriendRequestBtn = ({
  page,
  anchorEl,
  setAnchorEl,
  receiverId,
  friendRequestList,
  getFriendRequests,
  getFriendsNumber,
}) => {
  const [friendshipStatus, setFriendshipStatus] = useState({
    status: 'none',
    receiverId: null,
  });
  const [receiveFriendship, setReceiveFriendship] = useState(false);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Envoie une demande d'amitié
  const handleFriendRequest = async () => {
    await requestNewFriend(receiverId);
    handleClose();
    checkStatus(); // Actualise le status d'amitié en attente
  };

  // Suit la personne concernée
  const handleFollowingRequest = () => {
    console.log('demande de suivi');
    handleClose();
  };

  // Vérifie si l'utilisateur connecté a envoyé une demande en ami, si une demande est en attente, si une amitié existe
  const checkStatus = async () => {
    const status = await checkFriendshipStatus(receiverId);
    setFriendshipStatus(status);
  };

  // Accepte une demande d'ami
  const acceptFriendRequest = async choice => {
    await handleFriendship(receiverId, choice);
    handleClose();
    checkStatus(); // Actualise le status d'amitié accepté
    getFriendRequests();
  };

  // Si l'utilisateur connecté a reçu une demande d'amitié, on affichera le bouton "accepter"
  useEffect(() => {
    if (page === 'profil') return;

    const isReceiver = friendRequestList.some(
      request => request.id === receiverId,
    );
    setReceiveFriendship(isReceiver);
  }, [friendRequestList]);

  // A chaque fois qu'on récupère la liste des personnes suggérées, on met à jour le status (pas de demande, en attente, ou accepté )
  useEffect(() => {
    checkStatus();
  }, [getFriendsNumber]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      autoFocus={false}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
        sx: {
          padding: '0',
          bgcolor: '#ededed',
        },
      }}
    >
      <MenuItem
        sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }}
      >
        {
          // Si l'utilisateur connecté a fait une demande d'amitié
          friendshipStatus.status === 'pending' && !receiveFriendship ? (
            <Stack direction="row" alignItems="center" columnGap="7px">
              <TimelapseIcon sx={{ color: '#ababab', fontSize: '22px' }} />
              {'Demande en attente'}
            </Stack>
          ) : // Si l'utilisateur connecté a accepté la demande
          friendshipStatus.status === 'accepted' ? (
            <Stack direction="row" alignItems="center" columnGap="7px">
              <VerifiedIcon sx={{ color: '#F29E50', fontSize: '22px' }} />
              {'Ami(e)'}
            </Stack>
          ) : // Si l'utilisateur connecté a reçu une demande
          receiveFriendship ? (
            <Stack
              direction="row"
              alignItems="center"
              columnGap="7px"
              onClick={() => acceptFriendRequest('accepted')}
            >
              <VerifiedIcon sx={{ color: '#ababab', fontSize: '22px' }} />
              {'Accepter'}
            </Stack>
          ) : (
            // Si aucun des deux utilisateurs n'a fait de demande
            <Stack
              direction="row"
              alignItems="center"
              columnGap="7px"
              onClick={handleFriendRequest}
            >
              <PersonAddIcon sx={{ color: '#ababab', fontSize: '22px' }} />
              {'Demander en ami'}
            </Stack>
          )
        }
      </MenuItem>
      <Divider sx={{ margin: '0 !important' }} />
      <MenuItem
        onClick={handleFollowingRequest}
        sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }}
      >
        {
          // Si les deux utilisateurs sont amis, on met également en suivi
          friendshipStatus.status === 'accepted' ? (
            <Stack direction="row" alignItems="center" columnGap="5px">
              <BookmarkIcon sx={{ color: '#24A5A5', fontSize: '22px' }} />
              {'Suivi'}
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" columnGap="5px">
              <BookmarkIcon sx={{ color: '#ababab', fontSize: '22px' }} />
              {'Suivre'}
            </Stack>
          )
        }
      </MenuItem>
    </Menu>
  );
};

FriendRequestBtn.propTypes = {
  receiverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  anchorEl: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLElement),
    PropTypes.oneOf([null]),
  ]),
  setAnchorEl: PropTypes.func.isRequired,
  friendRequestList: PropTypes.array,
  getFriendRequests: PropTypes.func,
  page: PropTypes.string.isRequired,
  getFriendsNumber: PropTypes.func.isRequired,
};

export default FriendRequestBtn;
