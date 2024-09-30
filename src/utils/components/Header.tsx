// Import des libs externes
import * as React from 'react';
import {
  AppBar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  ListItemIcon,
  Divider,
  Stack,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import des icônes
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SwipeIcon from '@mui/icons-material/Swipe';
import ChecklistIcon from '@mui/icons-material/Checklist';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Import des requêtes
import { handleLogout } from '../request/authRequest';

const pages = ['Accueil', 'Swipe', 'Ma liste', 'Mes contacts'];
const settings = ['Profil', 'Compte', 'Déconnexion'];

const Header = ({ page, isTrailerFullscreen }) => {
  // Infos de l'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log('settings', event.currentTarget);

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  async function onLogout() {
    await handleLogout();
    localStorage.clear();

    navigate('/login');
  }

  return (
    <AppBar
      position={
        page === 'swipe'
          ? 'absolute'
          : page === 'home' || page === 'list' || page === 'contacts'
          ? 'static'
          : 'fixed'
      }
      elevation={ page === 'swipe' ? 2 : 0}
      sx={{
        visibility: isTrailerFullscreen ? 'hidden' : 'visible',
        height: '56px',
        justifyContent: 'center',
        backgroundColor: page === 'swipe' ? 'rgba(1, 18, 18, 0.75)' : '#052525',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: '56px',
          width: '100%',
          padding: '0 6%',
          justifyContent: 'space-between',
          backgroundColor: 'inherit'
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-nav-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ color: '#fff', padding: '0' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-user-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            MenuListProps={{
              sx: {
                padding: '0',
              },
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page, index) => [
              <MenuItem
                key={page}
                onClick={() => {
                  if (page === 'Accueil') {
                    navigate(`/home/${loggedUserInfos.id}`);
                  } else if (page === 'Swipe') {
                    navigate('/swipe');
                  } else if (page === 'Ma liste') {
                    navigate(`/list/${loggedUserInfos.id}`);
                  } else if (page === 'Mes contacts') {
                    navigate(`/contacts/${loggedUserInfos.id}`);
                  }
                  handleCloseNavMenu();
                }}
                sx={{ padding: '0 16px' }}
              >
                {page === 'Accueil' ? (
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                ) : page === 'Swipe' ? (
                  <ListItemIcon>
                    <SwipeIcon fontSize="small" />
                  </ListItemIcon>
                ) : page === 'Ma liste' ? (
                  <ListItemIcon>
                    <ChecklistIcon fontSize="small" />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <GroupsIcon fontSize="small" />
                  </ListItemIcon>
                )}
                <Typography variant="body2" textAlign="center">
                  {page}
                </Typography>
              </MenuItem>,
              page.length - 1 !== index && (
                <Divider
                  key={`page-divider-${index}`}
                  sx={{ width: '80%', margin: '0 auto !important' }}
                />
              ),
            ])}
          </Menu>
        </Stack>
        <Stack>
          <Typography
            variant="h1"
            color={'#fff'}
            fontSize={'2.3em'}
            sx={{
              letterSpacing: '-3.5px',
            }}
          >
            {'pépite.'}
          </Typography>
        </Stack>
        <Stack>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-nav-appbar"
            aria-haspopup="true"
            onClick={handleOpenUserMenu}
            sx={{ color: '#fff', padding: '0' }}
          >
            <Avatar
              sx={{
                height: '37px',
                width: '37px',
                bgcolor: '#043232',
                color: '#fdfdfd',
                borderRadius: '50%',
                fontSize: '0.65em',
              }}
              {...stringAvatar(
                `${loggedUserInfos.first_name} ${loggedUserInfos.last_name}`,
              )}
            />
          </IconButton>
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
