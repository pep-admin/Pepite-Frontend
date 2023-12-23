// Import des libs externes
import {
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

// Import des icônes
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';

const FriendRequestBtn = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {    
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFriendRequest = () => {
    console.log('demande d\'ami');
    handleClose();
  }

  const handleFollowingRequest = () => {
    console.log('demande de suivi');
    handleClose();
  }

  return (
    <>
      <PersonAddAlt1TwoToneIcon 
        sx={{ 
          fontSize: '23.5px', 
          color: '#0e6666',
          position: 'relative',
          bottom: '1.1px',
          cursor: 'pointer'
        }}
        onClick={(e) => handleClick(e)}
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
            bgcolor: '#ededed'
          },
        }}
      >
        <MenuItem onClick={handleFriendRequest} sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }} >
          {'Demander en ami'}
        </MenuItem>
        <Divider sx={{ margin: '0 !important'}} />
        <MenuItem onClick={handleFollowingRequest} sx={{ fontSize: '0.9em', minHeight: '37px', padding: '0 10px' }}>
          {'Suivre'}
        </MenuItem>
      </Menu>
    </>  
  );
};

export default FriendRequestBtn;