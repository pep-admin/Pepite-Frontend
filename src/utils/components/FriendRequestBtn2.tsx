import { Button, Divider, Menu, MenuItem, Stack } from '@mui/material';
import React, { useState } from 'react';

// Import des icônes
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VerifiedIcon from '@mui/icons-material/Verified';

const FriendRequestBtn2 = () => {

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

  

  return (
    <>
      <Button
        variant='contained'
        sx={{ 
          height: '35px',
          width: '130px',
          background: 'linear-gradient(315deg, rgba(51, 170, 91, 1) 0%, rgba(36, 165, 165, 1) 100%)', 
          color: '#fff',
          lineHeight: 'normal',
          padding: '2px 0 0 0'
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
                // onClick={() => cancelFriendshipRequest()}
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
                // onClick={() => acceptFriendRequest()}
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
                // onClick={handleFriendRequest}
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
                // onClick={() => unfollowUser()}
              >
                <BookmarkIcon sx={{ color: '#24A5A5', fontSize: '22px' }} />
                {'Suivi'}
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                columnGap="5px"
                // onClick={() => followUser()}
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

export default FriendRequestBtn2;