// Import des libs externes
import * as React from 'react';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Stack,
  Avatar,
  Badge,
} from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import NotificationsMenu from '../NotificationsMenu';
import SettingsMenu from './SettingsMenu';
import PagesMenu from './PagesMenu';

// Import des icônes
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Import des requêtes
import { MagnifyingGlassIcon } from '../styledComponent';
import { getNotificationsRequest } from '@utils/request/notifications/getNotificationsRequest';
import { markNotificationsAsRead } from '@utils/request/notifications/markNotificationsAsRead';

type Notification = {
  type:
    | 'friendRequest'
    | 'acceptedFriendRequest'
    | 'movieAdvice'
    | 'serieAdvice';
  date: string;
};

type Notifications = Notification[];

const Header = ({ page }) => {
  // Infos de l'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const [notifications, setNotifications] = React.useState<Notifications>([]);
  const [anchorElNotif, setAnchorElNotif] = React.useState<null | HTMLElement>(
    null,
  );

  const openNotif = Boolean(anchorElNotif);

  // Détermine l'ancre pour le menu de navigation des pages
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // Détermine l'ancre pour le menu de navigation du compte
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // Ferme le menu de navigations des pages
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Ferme le menu de navigation du compte
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Détermine l'ancre pour le menu des notifications
  const handleOpenNotifMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNotif(event.currentTarget);
    markNotificationsAsRead(); // Marque les notifications comme lues
  };

  // Ferme le menu des notifications
  const handleCloseNotifMenu = () => {
    setAnchorElNotif(null);
    getNotifications(); // Fait disparaitre le Badge des notifications
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  async function getNotifications() {
    const response = await getNotificationsRequest();

    // Trier toutes les notifications par date, du plus récent au plus ancien
    const sortedNotifications = response.sort((a, b) => {
      // Convertit les dates en timestamps pour la comparaison
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();

      return dateB - dateA; // Tri du plus récent au plus ancien
    });

    console.log('la réponse des notifs', sortedNotifications);

    // Mettre à jour l'état avec les notifications triées
    setNotifications(sortedNotifications);
  }

  React.useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <AppBar
        position={
          page === 'swipe'
            ? 'absolute'
            : page === 'list' || page === 'contacts'
            ? 'static'
            : 'fixed'
        }
        sx={{
          height: '50px',
          justifyContent: 'center',
          backgroundColor: 'rgba(1, 18, 18, 0.9)',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: '50px',
            width: '100%',
            padding: '0 4%',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={3}>
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
            <Badge
              badgeContent={notifications.length}
              color="secondary"
              max={99}
              sx={{
                '& .MuiBadge-badge': {
                  right: 0,
                  top: 3,
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-nav-appbar"
                aria-haspopup="true"
                sx={{ color: '#fff', padding: '0' }}
                onClick={handleOpenNotifMenu}
              >
                <NotificationsIcon />
              </IconButton>
            </Badge>
            <PagesMenu
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
            />
            <NotificationsMenu
              page={page}
              anchorElNotif={anchorElNotif}
              openNotif={openNotif}
              handleCloseNotifMenu={handleCloseNotifMenu}
              notifications={notifications}
            />
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
          <Stack direction="row" spacing={3}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-nav-appbar"
              aria-haspopup="true"
              sx={{ color: '#fff', padding: '0' }}
            >
              <MagnifyingGlassIcon />
            </IconButton>
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
            <SettingsMenu
              anchorElUser={anchorElUser}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Header;
