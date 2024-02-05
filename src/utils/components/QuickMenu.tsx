// Import des libs externes
import {
  Divider,
  ListItemIcon,
  ListItemText,
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
import ColoredRating from './ColoredRating';
import { TurnipIcon } from '@utils/components/styledComponent';

// Import du tableau des notes de 0 à 5
import { ratings } from '@utils/data/ratings';
import { addNewCritic } from '@utils/request/critics/postCritic';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { getUserMovieStatusRequest } from '@utils/request/list/getUserMovieStatusRequest';
import { removeWantedMovieRequest } from '@utils/request/list/removeWantedMovieRequest';
import { removeWatchedMovieRequest } from '@utils/request/list/removeWatchedMovieRequest';

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

  const { displayType } = useData();

  const openQuickNoteMenu = Boolean(anchorQuickNoteMenu); // Gestion du menu de notation rapide

  const handleQuickNoteMenu = event => {
    setAnchorQuickNoteMenu(event.currentTarget);
  };

  const closeQuickNoteMenu = () => {
    setAnchorQuickNoteMenu(null);
  };

  const quicklyRateMovie = async rating => {
    const text = '';

    const movieState = await getUserMovieStatusRequest(infos.id, displayType);
    console.log('statut du film', movieState);

    // Si le film était dans la liste des films à voir, on le supprime de cette même liste
    if (movieState.isWanted) {
      await removeWantedMovieRequest(infos.id, displayType);
    }

    // Si le film était dans la liste des films vus, on le supprime de cette même liste
    else if (movieState.isWatched) {
      await removeWatchedMovieRequest(infos.id, displayType);
    }

    // Ajout dans la liste des films notés
    await addNewCritic(
      infos.id,
      displayType,
      rating.number,
      text,
      isGoldNugget,
      isTurnip,
    );

    /* Pour ne pas perturber l'UX lors de la notation rapide, 
    on ne récupère pas les nouvelles données dynamiquement */

    setIsQuicklyRated(true);
    setOpenSnackbar(true);

    handleCloseNoteMenu();
    closeQuickNoteMenu();
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
      <Menu
        anchorEl={anchorQuickNoteMenu}
        open={openQuickNoteMenu}
        onClose={() => setAnchorQuickNoteMenu(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          sx: {
            padding: '0 !important',
          },
        }}
        slotProps={{
          paper: {
            sx: {
              padding: '8px 10px !important',
              maxHeight: '150px',
            },
          },
        }}
        elevation={3}
        autoFocus={false}
      >
        <MenuItem
          sx={{
            minHeight: 'auto',
            columnGap: '10px',
            padding: '5px 11px',
            backgroundColor: isTurnip
              ? '#efc6db !important'
              : '#eaeaea !important',
          }}
          onClick={() => {
            setIsGoldNugget(false);
            setIsTurnip(!isTurnip);
          }}
        >
          <TurnipIcon sx={{ height: '25px' }} />
          <Typography
            fontSize="1em"
            component="p"
            lineHeight="normal"
            fontFamily="League Spartan"
            fontWeight={800}
            sx={{
              position: 'relative',
              top: '3px',
            }}
          >
            {'navet !'}
          </Typography>
        </MenuItem>
        {ratings.map((rating, index) => [
          <MenuItem
            key={`item-${rating.number}`}
            sx={{
              minHeight: 'auto',
              columnGap: '7px',
              padding: '5px 11px',
            }}
            onClick={() => quicklyRateMovie(rating)}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <ColoredRating
                color="#F29E50"
                value={rating.number}
                precision={0.5}
                readOnly
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  fontSize: '0.8em',
                },
              }}
            >
              {rating.value}
            </ListItemText>
          </MenuItem>,
          ratings.length - 1 === index ? null : (
            <Divider
              key={`divider-${rating.number}`}
              sx={{ margin: '0 !important' }}
            />
          ),
        ])}
        <MenuItem
          sx={{
            minHeight: 'auto',
            columnGap: '10px',
            padding: '5px 11px',
            backgroundColor: isGoldNugget
              ? '#f7c89c !important'
              : '#eaeaea !important',
          }}
          onClick={() => {
            setIsGoldNugget(!isGoldNugget);
            setIsTurnip(false);
          }}
        >
          <img
            src="/images/gold_rating.svg"
            alt=""
            style={{
              height: '22px',
            }}
          />
          <Typography
            fontSize="1em"
            component="p"
            lineHeight="normal"
            fontFamily="League Spartan"
            fontWeight={800}
            sx={{
              position: 'relative',
              top: '0.5px',
            }}
          >
            {'pépite.'}
          </Typography>
        </MenuItem>
      </Menu>
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
