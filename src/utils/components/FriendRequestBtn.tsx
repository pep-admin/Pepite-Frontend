// Import des libs externes
import { Button, Divider, Menu, MenuItem, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VerifiedIcon from '@mui/icons-material/Verified';

// Import des requêtes
import { sendFriendshipRequest } from '@utils/request/friendship/handleFrienshipRequest';
import { checkFriendshipStatus } from '@utils/request/friendship/checkFriendshipStatus';
import { cancelFriendShip } from '@utils/request/friendship/cancelFriendship';
import { acceptFriendship } from '@utils/request/friendship/acceptFriendship';
import { followSomeone } from '@utils/request/followed/followSomeone';
import { checkFollowedStatus } from '@utils/request/followed/checkFollowedStatus';
import { unfollowSomeone } from '@utils/request/followed/unfollowSomeone';

const FriendRequestBtn = ({
  page,
  userInfos,
  getFriendsRequests,
  getFriends,
  getFollowed,
}) => {
  const [friendshipStatus, setFriendshipStatus] = useState({
    status: 'none',
    is_close: false,
    receiverId: null,
  });
  const [followedStatus, setFollowedStatus] = useState({
    status: 'none',
    receiverId: null,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // **** Amitiés **** //

  // Vérifie si l'utilisateur connecté a envoyé une demande en ami, si une demande est en attente, si une amitié existe
  const checkIfFriends = async () => {
    const status = await checkFriendshipStatus(userInfos.id);
    setFriendshipStatus(status);
  };

  // Envoie une demande d'amitié
  const handleFriendRequest = async () => {
    await sendFriendshipRequest(userInfos.id);
    handleClose();
    checkIfFriends(); // Actualise le status d'amitié en attente
  };

  // Annuler une demande d'amitié
  const cancelFriendshipRequest = async () => {
    await cancelFriendShip(userInfos.id);
    handleClose();
    checkIfFriends(); // Supprime le bouton de demande en attente
  };

  // Accepte une demande d'amitié
  const acceptFriendRequest = async () => {
    await acceptFriendship(userInfos.id);
    handleClose();
    checkIfFriends(); // Actualise le status d'amitié accepté

    if (page === 'contacts') {
      getFriendsRequests();
      getFriends();
    }
  };

  // **** Suivis **** //

  // Vérifie si l'utilisateur connecté suit la personne concernée
  const checkIfFollowed = async () => {
    const status = await checkFollowedStatus(userInfos.id);
    setFollowedStatus(status);
  };

  // Suit la personne concernée
  const followUser = async () => {
    await followSomeone(userInfos.id);
    handleClose();
    checkIfFollowed();

    if (page === 'contacts') {
      getFollowed();
    }
  };

  // Arrête de suivre la personne concernée
  const unfollowUser = async () => {
    await unfollowSomeone(userInfos.id);
    handleClose();
    checkIfFollowed();

    if (page === 'contacts') {
      getFollowed();
    }
  };

  useEffect(() => {
    checkIfFriends();
    checkIfFollowed();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          height: '35px',
          width: '130px',
          background:
            'linear-gradient(315deg, rgba(51, 170, 91, 1) 0%, rgba(36, 165, 165, 1) 100%)',
          color: '#fff',
          lineHeight: 'normal',
          padding: '2px 0 0 0',
        }}
        onClick={e => handleClick(e)}
      >
        {'Ajouter'}
      </Button>
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }}
        >
          {
            // Si l'utilisateur connecté a fait une demande d'amitié
            friendshipStatus.status === 'pending' ? (
              <Stack
                direction="row"
                alignItems="center"
                columnGap="7px"
                onClick={() => cancelFriendshipRequest()}
              >
                <TimelapseIcon sx={{ color: '#ababab', fontSize: '22px' }} />
                {'Annuler la demande'}
              </Stack>
            ) : // Si l'utilisateur connecté a accepté la demande
            friendshipStatus.status === 'accepted' ? (
              <Stack direction="row" alignItems="center" columnGap="7px">
                <VerifiedIcon
                  sx={{
                    color: friendshipStatus.is_close ? '#F16C22' : '#F29E50',
                    fontSize: '22px',
                  }}
                />
                {friendshipStatus.is_close ? 'Ami(e) +' : 'Ami(e)'}
              </Stack>
            ) : // Si l'utilisateur connecté a reçu une demande
            friendshipStatus.status === 'awaiting_response' ? (
              <Stack
                direction="row"
                alignItems="center"
                columnGap="7px"
                onClick={() => acceptFriendRequest()}
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
          sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }}
        >
          {
            // Si les deux utilisateurs sont amis, on met également en suivi
            friendshipStatus.status === 'accepted' ||
            followedStatus.status === 'followed' ? (
              <Stack
                direction="row"
                alignItems="center"
                columnGap="5px"
                onClick={() => unfollowUser()}
              >
                <BookmarkIcon sx={{ color: '#24A5A5', fontSize: '22px' }} />
                {'Suivi'}
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                columnGap="5px"
                onClick={() => followUser()}
              >
                <BookmarkIcon sx={{ color: '#ababab', fontSize: '22px' }} />
                {'Suivre'}
              </Stack>
            )
          }
        </MenuItem>
      </Menu>
    </>
  );
};

FriendRequestBtn.propTypes = {
  page: PropTypes.string.isRequired,
  userInfos: PropTypes.object.isRequired,
  getFriendsRequests: PropTypes.func,
  getFriends: PropTypes.func,
  getFollowed: PropTypes.func,
};

export default FriendRequestBtn;
