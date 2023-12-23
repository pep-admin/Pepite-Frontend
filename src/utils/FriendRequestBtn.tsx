// Import des libs externes
import { Divider, Menu, MenuItem, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';

// Import des requêtes
import { requestNewFriend } from './request/friendship/requestNewFriend';
import { checkFriendshipStatus } from './request/friendship/checkFriendshipStatus';

const FriendRequestBtn = ({ anchorEl, setAnchorEl, receiverId }) => {
  const [friendshipStatus, setFriendshipStatus] = useState('none');

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

  const handleFollowingRequest = () => {
    console.log('demande de suivi');
    handleClose();
  };

  const checkStatus = async () => {
    const status = await checkFriendshipStatus(receiverId);
    setFriendshipStatus(status);
  };

  useEffect(() => {
    checkStatus();
  }, []);

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
        onClick={handleFriendRequest}
        sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }}
      >
        {friendshipStatus === 'pending' ? (
          <Stack direction="row" alignItems="center" columnGap="5px">
            <TimelapseIcon sx={{ color: '#ababab', fontSize: '22px' }} />
            {'Demande en attente'}
          </Stack>
        ) : friendshipStatus === 'accepted' ? (
          'Demande confirmée'
        ) : (
          <Stack direction="row" alignItems="center" columnGap="5px">
            <PersonAddIcon sx={{ color: '#ababab', fontSize: '22px' }} />
            {'Demander en ami'}
          </Stack>
        )}
      </MenuItem>
      <Divider sx={{ margin: '0 !important' }} />
      <MenuItem
        onClick={handleFollowingRequest}
        sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }}
      >
        <Stack direction="row" alignItems="center" columnGap="5px">
          <BookmarkIcon sx={{ color: '#ababab', fontSize: '22px' }} />
          {'Suivre'}
        </Stack>
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
};

export default FriendRequestBtn;
