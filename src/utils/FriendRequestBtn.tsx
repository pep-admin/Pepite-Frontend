// Import des libs externes
import { Divider, Menu, MenuItem, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';

// Import des requêtes
import { requestNewFriend } from './request/friendship/requestNewFriend';
import { checkFriendshipStatus } from './request/friendship/checkFriendshipStatus';

const FriendRequestBtn = ({ receiverId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [friendshipStatus, setFriendshipStatus] = useState('none');

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFriendRequest = async () => {
    await requestNewFriend(receiverId);
    handleClose();
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
    <>
      <PersonAddAlt1TwoToneIcon
        sx={{
          fontSize: '23.5px',
          color: '#0e6666',
          position: 'relative',
          bottom: '1.1px',
          cursor: 'pointer',
        }}
        onClick={e => handleClick(e)}
      />
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
    </>
  );
};

FriendRequestBtn.propTypes = {
  receiverId: PropTypes.string.isRequired,
};

export default FriendRequestBtn;
