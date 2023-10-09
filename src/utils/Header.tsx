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

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const { displayType, setDisplayType } = useData();

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
              onClick={() => setDisplayType('films')}
              selected={displayType === 'films'}
            >
              Films
            </ToggleButton>
            <ToggleButton
              value="series"
              sx={{
                padding: '5px',
                fontSize: '0.7em',
                fontWeight: 'bold',
              }}
              onClick={() => setDisplayType('series')}
              selected={displayType === 'series'}
            >
              Séries
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
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
