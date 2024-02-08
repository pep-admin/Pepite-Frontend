// Import des libs externes
import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RatingMenu from './RatingMenu';

const QuickMenu = ({
  infos,
  handleCloseNoteMenu,
  anchorNoteMenu,
  openNoteMenu,
  setIsQuicklyRated,
  setOpenSnackbar,
}) => {
  const [anchorQuickNoteMenu, setAnchorQuickNoteMenu] = useState(null); // Le menu qui permet de noter rapidement un film
  const [isGoldNugget, setIsGoldNugget] = useState(false);
  const [isTurnip, setIsTurnip] = useState(false);

  const handleQuickNoteMenu = event => {
    setAnchorQuickNoteMenu(event.currentTarget);
  };

  return (
    <>
      <Menu
        anchorEl={anchorNoteMenu}
        open={openNoteMenu}
        onClose={handleCloseNoteMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        elevation={3}
        autoFocus={false}
      >
        <MenuItem
          sx={{
            height: '25px',
            padding: '8px 10px',
            minHeight: 'auto !important',
          }}
          onClick={handleQuickNoteMenu}
        >
          <Stack
            direction="row"
            alignItems="center"
            height="25px"
            columnGap="7px"
          >
            <ListItemIcon
              sx={{ minWidth: 'auto !important', alignItems: 'center' }}
            >
              <StarBorderIcon
                fontSize="small"
                sx={{ position: 'relative', right: '2px' }}
              />
            </ListItemIcon>
            <Typography fontSize="0.8em" lineHeight="normal">
              {'Note rapide'}
            </Typography>
          </Stack>
        </MenuItem>
        <Divider sx={{ margin: '8px' }} />
        <MenuItem
          sx={{
            height: '25px',
            padding: '8px 10px',
            minHeight: 'auto !important',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            height="25px"
            columnGap="7px"
          >
            <ListItemIcon sx={{ minWidth: 'auto !important' }}>
              <EditNoteIcon fontSize="small" />
            </ListItemIcon>
            <Typography fontSize="0.8em" lineHeight="normal">
              {'Critique'}
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>
      <RatingMenu
        utility={'quick-rating'}
        infos={infos}
        setIsQuicklyRated={setIsQuicklyRated}
        setOpenSnackbar={setOpenSnackbar}
        anchorQuickNoteMenu={anchorQuickNoteMenu}
        setAnchorQuickNoteMenu={setAnchorQuickNoteMenu}
        handleCloseNoteMenu={handleCloseNoteMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        setNewRating={null}
        isGoldNugget={isGoldNugget}
        setIsGoldNugget={setIsGoldNugget}
        isTurnip={isTurnip}
        setIsTurnip={setIsTurnip}
      />
    </>
  );
};

QuickMenu.propTypes = {
  infos: PropTypes.object.isRequired,
  handleCloseNoteMenu: PropTypes.func.isRequired,
  anchorNoteMenu: PropTypes.object.isRequired,
  openNoteMenu: PropTypes.bool.isRequired,
  setIsQuicklyRated: PropTypes.func.isRequired,
  setOpenSnackbar: PropTypes.func.isRequired,
};

export default QuickMenu;
