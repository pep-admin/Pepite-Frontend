// Import des libs externes
import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes
import HomeIcon from '@mui/icons-material/Home';
import SwipeIcon from '@mui/icons-material/Swipe';
import ChecklistIcon from '@mui/icons-material/Checklist';
import GroupsIcon from '@mui/icons-material/Groups';

const pages = ['Accueil', 'Swipe', 'Ma liste', 'Mes contacts'];

const PagesMenu = ({ anchorElNav, handleCloseNavMenu }) => {
  // Infos de l'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const navigate = useNavigate();

  return (
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
  );
};

PagesMenu.propTypes = {
  anchorElNav: PropTypes.object,
  handleCloseNavMenu: PropTypes.func.isRequired,
};

export default PagesMenu;
