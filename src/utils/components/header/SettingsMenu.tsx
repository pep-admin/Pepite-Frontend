import { Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';

// Import des icônes
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { handleLogout } from '@utils/request/authRequest';
import { useNavigate } from 'react-router-dom';

const settings = ['Profil', 'Compte', 'Déconnexion'];

const SettingsMenu = ({ anchorElUser, handleCloseUserMenu}) => {

  // Infos de l'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const navigate = useNavigate();

  async function onLogout() {
    await handleLogout();
    localStorage.clear();

    navigate('/login');
  }

  return (
    <Menu
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
      MenuListProps={{
        sx: {
          padding: '0',
        },
      }}
    >
      {settings.map((setting, index) => [
        <MenuItem
          key={`setting-item-${index}`}
          onClick={() => {
            if (setting === 'Déconnexion') {
              onLogout();
            } else if (setting === 'Profil' && loggedUserInfos.id) {
              navigate(`/profil/${loggedUserInfos.id}`);
            } else if (setting === 'Compte' && loggedUserInfos.id) {
              navigate(`/account/${loggedUserInfos.id}`);
            }
            handleCloseUserMenu();
          }}
          sx={{ padding: '0 16px' }}
        >
          {setting === 'Profil' ? (
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
          ) : setting === 'Compte' ? (
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
          ) : (
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
          )}
          <Typography variant="body2" textAlign="center">
            {setting}
          </Typography>
        </MenuItem>,
        settings.length - 1 !== index && (
          <Divider
            key={`setting-divider-${index}`}
            sx={{ width: '80%', margin: '0 auto !important' }}
          />
        ),
      ])}
    </Menu>
  );
};

export default SettingsMenu;