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
import { requestNewFriend } from '../request/friendship/requestNewFriend';
import { checkFriendshipStatus } from '../request/friendship/checkFriendshipStatus';
import { acceptFriendship } from '@utils/request/friendship/acceptFriendship';
import { checkFollowedStatus } from '../request/followed/checkFollowedStatus';
import { followSomeone } from '../request/followed/followSomeone';
import { unfollowSomeone } from '../request/followed/unfollowSomeone';
import { cancelFriendShip } from '../request/friendship/cancelFriendship';

const FriendRequestBtn = ({
  page,
  anchorProfilBtn,
  setAnchorProfilBtn,
  receiverId,
  friendsList,
  followedList,
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(page === 'profil' ? anchorProfilBtn : anchorEl);

  const handleClose = () => {
    if (page === 'profil') {
      setAnchorProfilBtn(null);
    } else {
      setAnchorEl(null);
    }
  };

  // Envoie une demande d'amitié
  const handleFriendRequest = async () => {
    await requestNewFriend(receiverId);
    handleClose();
    checkIfFriends(); // Actualise le status d'amitié en attente
  };

  // Suit la personne concernée
  const followUser = async () => {
    await followSomeone(receiverId);
    handleClose();
    checkIfFollowed();

    if (page === 'contacts') {
      getFollowed();
    }
  };

  // Arrête de suivre la personne concernée
  const unfollowUser = async () => {
    await unfollowSomeone(receiverId);
    handleClose();
    checkIfFollowed();

    if (page === 'contacts') {
      getFollowed();
    }
  };

  // Vérifie si l'utilisateur connecté a envoyé une demande en ami, si une demande est en attente, si une amitié existe
  const checkIfFriends = async () => {
    const status = await checkFriendshipStatus(receiverId);
    setFriendshipStatus(status);
  };

  // Vérifie si l'utilisateur connecté a envoyé une demande en ami, si une demande est en attente, si une amitié existe
  const checkIfFollowed = async () => {
    const status = await checkFollowedStatus(receiverId);
    setFollowedStatus(status);
  };

  // Accepte une demande d'amitié
  const acceptFriendRequest = async () => {
    await acceptFriendship(receiverId);
    handleClose();
    checkIfFriends(); // Actualise le status d'amitié accepté

    if (page === 'contacts') {
      getFriendsRequests();
      getFriends();
    }
  };

  // Annuler une demande d'amitié
  const cancelFriendshipRequest = async () => {
    await cancelFriendShip(receiverId);
    handleClose();
    checkIfFriends(); // Supprime le bouton de demande en attente
  };

  // A chaque fois qu'on récupère la liste des personnes suggérées, on met à jour le status (pas de demande, en attente, à confirmer, ou accepté )
  useEffect(() => {
    checkIfFriends();
  }, [friendsList]);

  // A chaque fois qu'on récupère la liste des suivis, on met à jour le status (suivi ou non)
  useEffect(() => {
    checkIfFollowed();
  }, [followedList]);

  return (
    <>
      <Button
        size="small"
        variant="contained"
        sx={{
          width: '72px',
          height: '20px',
          textTransform: 'initial',
          fontWeight: 'normal',
          fontSize: '0.9em',
          padding: '0',
          display: page === 'profil' ? 'none' : 'flex',
        }}
        onClick={e => handleClick(e)}
      >
        {'Ajouter'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={page === 'profil' ? anchorProfilBtn : anchorEl}
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
  anchorProfilBtn: PropTypes.instanceOf(Element),
  setAnchorProfilBtn: PropTypes.func,
  receiverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  friendsList: PropTypes.array,
  followedList: PropTypes.array,
  getFriendsRequests: PropTypes.func,
  getFriends: PropTypes.func,
  getFollowed: PropTypes.func,
};

export default FriendRequestBtn;
