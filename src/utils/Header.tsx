import * as React from 'react';

// Import des libs externes
import {
  AppBar,
  Container,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Toolbar,
  Avatar,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import MenuIcon from '@mui/icons-material/Menu';
import { handleLogout } from './request/swipe/fetchData';

const pages = ['Accueil', 'Swipe', 'Mes contacts'];
const settings = ['Profil', 'Compte', 'Déconnexion'];

const Header = () => {
  const { displayType, setDisplayType, userId } = useData();
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
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  async function onLogout() {
    await handleLogout();

    navigate('/login');
  }

  return (
    <AppBar position="static" sx={{ height: '60px' }}>
      <Container maxWidth="xl" sx={{ margin: 'auto' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h1"
            color={'#24A5A5'}
            fontSize={'1.8em'}
            sx={{ position: 'relative', bottom: '1px' }}
          >
            {'Pépite.'}
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ margin: 'auto' }}
          >
            <ToggleButton
              value="films"
              sx={{
                padding: '5px',
                fontSize: '0.7em',
                fontWeight: 'bold',
              }}
              onClick={() => setDisplayType('movie')}
              selected={displayType === 'movie'}
            >
              {'Films'}
            </ToggleButton>
            <ToggleButton
              value="series"
              sx={{
                padding: '5px',
                fontSize: '0.7em',
                fontWeight: 'bold',
              }}
              onClick={() => setDisplayType('tv')}
              selected={displayType === 'tv'}
            >
              {'Séries'}
            </ToggleButton>
          </ToggleButtonGroup>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#052525', paddingRight: '15px' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    if (page === 'Swipe') {
                      navigate('/swipe');
                    }
                    handleCloseNavMenu();
                  }}
                >
                  <Typography variant="body2" textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Badge badgeContent={4} color="primary">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === 'Déconnexion') {
                      onLogout();
                    } else if (setting === 'Profil') {
                      navigate(`/profil/${userId}`);
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography variant="body2" textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
