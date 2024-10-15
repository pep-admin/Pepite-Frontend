// Import des libs externes
import * as React from 'react';
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Stack,
  SwipeableDrawer,
  Box,
} from '@mui/material';

// Import des icônes
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NavigationPresentation from './NavigationPresentation';
import HeaderNavigation from './HeaderNavigation';
import { handleLogout } from '@utils/request/authRequest';

const Header2 = ({ page, isTrailerFullscreen }) => {

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const [menuDrawerOpen, setMenuDrawerOpen] = React.useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = React.useState(false);

  const toggleMenuDrawer = (open) => (_) => {
    setMenuDrawerOpen(open);
  };

  const toggleSearchDrawer = (open) => (_) => {
    setSearchDrawerOpen(open);
  };

  return (
    <AppBar
      position={
        page === 'swipe'
          ? 'absolute'
          : 'static'
      }
      elevation={page === 'swipe' ? 2 : 0}
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
          backgroundColor: 'inherit',
        }}
      >
        <Stack sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            size="large"
            aria-label="open menu"
            onClick={toggleMenuDrawer(true)}
            sx={{ color: '#fff', padding: '0' }}
          >
            <MenuIcon />
          </IconButton>
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
            aria-label="open search"
            onClick={toggleSearchDrawer(true)}
            sx={{ color: '#fff', padding: '0' }}
          >
            <SearchIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      {/* Drawer pour le Menu */}
      <SwipeableDrawer
        anchor="left"
        open={menuDrawerOpen}
        onClose={toggleMenuDrawer(false)}
        onOpen={toggleMenuDrawer(true)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '60vw',
            backgroundColor: '#011212',
            padding: '25px 0 0 0'
          },
        }}
      >
        <Stack
          sx={{
            flexGrow: '1'
          }}
        >
          <NavigationPresentation loggedUserInfos={loggedUserInfos} />
          <HeaderNavigation 
            page={page} 
              
          />
        </Stack>
        {/* Ajoutez le contenu du menu ici */}
      </SwipeableDrawer>

      {/* Drawer pour la Recherche */}
      <SwipeableDrawer
        anchor="top"
        open={searchDrawerOpen}
        onClose={toggleSearchDrawer(false)}
        onOpen={toggleSearchDrawer(true)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            backgroundColor: '#011212',
          },
        }}
      >
        <Box
          role="presentation"
          onClick={toggleSearchDrawer(false)}
          onKeyDown={toggleSearchDrawer(false)}
          sx={{ p: 2, color: '#fff' }}
        >
          <Typography variant="h6">Recherche</Typography>
          {/* Ajoutez le composant de recherche ici */}
        </Box>
      </SwipeableDrawer>
    </AppBar>
  );
};

export default Header2;
