// Import des libs externes
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

// Import des icônes
import ColoredRating from './ColoredRating';
import { TurnipIcon } from '@utils/components/styledComponent';

// Import du tableau des notes de 0 à 5
import { ratings } from '@utils/data/ratings';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des requêtes
import { getUserMovieStatusRequest } from '@utils/request/list/getUserMovieStatusRequest';
import { handleWatchedMovieRequest } from '@utils/request/list/handleWatchedMovieRequest';
import { removeWatchedMovieRequest } from '@utils/request/list/removeWatchedMovieRequest';
import { addNewQuickRating } from '@utils/request/quickRatings/addNewQuickRating';

const RatingMenu = ({
  utility,
  infos,
  setIsQuicklyRated,
  setOpenSnackbar,
  anchorQuickNoteMenu,
  setAnchorQuickNoteMenu,
  handleCloseNoteMenu,
  anchorOrigin,
  transformOrigin,
  setNewRating,
  isGoldNugget,
  setIsGoldNugget,
  isTurnip,
  setIsTurnip,
}) => {
  const { displayType } = useData();

  const openQuickNoteMenu = Boolean(anchorQuickNoteMenu); // Gestion du menu de notation rapide

  const closeQuickNoteMenu = () => {
    setAnchorQuickNoteMenu(null);
  };

  const quicklyRateMovie = async rating => {
    // Vérifie si l'utilisateur souhaite voir le film, l'a déjà vu, ou l'a déjà noté
    const movieState = await getUserMovieStatusRequest(infos.id, displayType);

    // Si le film était dans la liste des films à voir, on le supprime de cette même liste
    if (movieState.isWanted) {
      await handleWatchedMovieRequest(infos.id, displayType, true);
    }

    // Si le film était dans la liste des films vus, on le supprime de cette même liste
    else if (movieState.isWatched) {
      await removeWatchedMovieRequest(infos.id, displayType);
    }

    // Ajout dans la liste des notations rapides
    await addNewQuickRating(
      infos.id,
      displayType,
      rating,
      isGoldNugget,
      isTurnip,
    );

    setIsQuicklyRated(true);
    setOpenSnackbar(true);

    handleCloseNoteMenu();
    closeQuickNoteMenu();
  };

  return (
    <Menu
      anchorEl={anchorQuickNoteMenu}
      open={openQuickNoteMenu}
      onClose={() => setAnchorQuickNoteMenu(null)}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
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
          onClick={() =>
            utility === 'quick-rating'
              ? quicklyRateMovie(rating.number)
              : setNewRating(rating.number)
          }
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <ColoredRating
              color="#F29E50"
              emptyColor="#969696"
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
  );
};

RatingMenu.propTypes = {
  utility: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.object.isRequired,
  transformOrigin: PropTypes.object.isRequired,
  setNewRating: PropTypes.func,
  isGoldNugget: PropTypes.bool.isRequired,
  setIsGoldNugget: PropTypes.func.isRequired,
  setIsTurnip: PropTypes.func.isRequired,
  isTurnip: PropTypes.bool.isRequired,
  infos: PropTypes.object,
  setIsQuicklyRated: PropTypes.func,
  setOpenSnackbar: PropTypes.func,
  anchorQuickNoteMenu: PropTypes.object,
  setAnchorQuickNoteMenu: PropTypes.func.isRequired,
  handleCloseNoteMenu: PropTypes.func.isRequired,
};

export default RatingMenu;
