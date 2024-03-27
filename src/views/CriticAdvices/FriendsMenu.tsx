// Import des libs externes
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des variables d'environnement
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';

// Import des requêtes
import { getFriendsList } from '@utils/request/friendship/getFriendsList';

const FriendsMenu = ({ chosenUser, setChosenUser }) => {
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos')); // Les infos de l'utilisateur connecté

  const [friendsList, setFriendsList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFriendsChoice = async () => {
    const response = await getFriendsList(loggedUserInfos.id);
    setFriendsList(response);
    console.log('les amis', response);
  };

  const selectFriend = friend => {
    console.log('ami choisi', friend);
    setChosenUser(friend);
  };

  useEffect(() => {
    getFriendsChoice();
  }, []);

  useEffect(() => {
    console.log('user choisi', chosenUser);
  }, [chosenUser]);

  return (
    <>
      {chosenUser ? (
        <span
          style={{
            display: 'block',
            fontWeight: '600',
            marginTop: '3px',
          }}
          onClick={handleClick}
        >
          {`${chosenUser.first_name} ${chosenUser.last_name}`}
        </span>
      ) : (
        <Button
          variant="contained"
          disableElevation
          sx={{
            height: '20px',
            width: '25px',
            padding: '0',
            minWidth: 'auto',
            bgcolor: '#8a8a8a',
            color: '#fff',
            borderRadius: '4px',
            fontWeight: '600',
            '&:hover': {
              bgcolor: '#8a8a8a',
              color: '#fff',
            },
          }}
          aria-controls={open ? 'friends-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {'?'}
        </Button>
      )}
      <Menu
        id="friends-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': "bouton de choix d'ami",
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            maxHeight: '270px',
            maxWidth: '220px',
          },
        }}
      >
        {friendsList.length ? (
          friendsList.map(friend => {
            return (
              <MenuItem
                key={friend.id}
                onClick={() => {
                  selectFriend(friend);
                  handleClose();
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    variant="circular"
                    alt={`photo de profil de ${friend.first_name} ${friend.last_name}`}
                    src={
                      friend.file_path
                        ? `${apiBaseUrl}/uploads/${friend.file_path}`
                        : `${assetsBaseUrl}/images/default_profil_pic.png`
                    }
                  />
                  <Typography>
                    {`${friend.first_name} ${friend.last_name}`}
                  </Typography>
                </Stack>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem sx={{ whiteSpace: 'normal' }}>
            <Typography align="center">
              {"Vous n'avez encore aucun ami à conseiller."}
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

FriendsMenu.propTypes = {
  chosenUser: PropTypes.object,
  setChosenUser: PropTypes.func.isRequired,
};

export default FriendsMenu;
