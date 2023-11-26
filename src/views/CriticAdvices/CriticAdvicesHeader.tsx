// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Fade,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants customisés
import { OrangeRating } from '@utils/styledComponent';

// Import des icônes
import EditNoteIcon from '@mui/icons-material/EditNote';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { ratings } from '@utils/data/ratings';
import { deleteCritic } from '@utils/request/critics/deleteCritic';
import { getAllCriticsOfUser } from '@utils/request/critics/getCritics';

const CriticAdvicesHeader = ({
  type,
  ratingsHeaderRef,
  displayRatings,
  setDisplayRatings,
  newRating,
  setNewRating,
  criticInfos,
  setUserCritics,
  isModify,
  setIsModify,
}) => {
  const { displayType, setChosenMovieId, setChosenMovie } = useData();

  // Menu des outils pour modifier / supprimer
  const [displayTools, setDisplayTools] = useState(null);
  const openMenu = Boolean(displayTools);
  const handleToolsMenu = event => {
    setDisplayTools(event.currentTarget);
  };

  // Menu des étoiles pour noter une nouvelle critique
  const openRatings = Boolean(displayRatings);
  const handleRatingsMenu = event => {
    setDisplayRatings(event.currentTarget);
  };

  const handleCriticTools = async tool => {
    const userId = localStorage.getItem('user_id');

    if (tool === 'delete') {
      // TO DO: faire apparaitre une modale
      await deleteCritic(criticInfos.critic_id, displayType);
      const newCriticsData = await getAllCriticsOfUser(userId, displayType);
      setUserCritics(newCriticsData);
    }
  };

  const formatRating = rating => {
    // Si la note a une partie décimale autre que .0, retourner la note telle quelle
    if (rating % 1 !== 0) {
      return rating.toString();
    }
    // Sinon, retourner la note sans la partie décimale
    return Math.floor(rating).toString();
  };

  return (
    <Stack
      direction="row"
      height="35px"
      alignItems="center"
      justifyContent="space-between"
      padding="0 10px"
      columnGap="10px"
    >
      {/* Si conseil d'un ami */}
      {/* <Avatar
          alt="Photo de Kate"
          src="http://127.0.0.1:5173/images/kate.jpg"
          sx={{
            width: 37,
            height: 37,
            marginRight: '5px'
          }}
        /> */}
      <Typography
        variant="body2"
        component="p"
        fontWeight="bold"
        minWidth="80px"
        align="left"
      >
        {type === 'new-critic' ? 'Nouvelle note' : 'Vous avez noté'}
      </Typography>
      <Box display="flex" alignItems="center" columnGap="5px">
        <OrangeRating
          value={
            type === 'new-critic' ? newRating : parseFloat(criticInfos.rating)
          }
          precision={0.5}
          readOnly
          sx={{ position: 'relative', bottom: '0.5px' }}
        />
        {type === 'new-critic' || isModify ? (
          <>
            <Box
              ref={ratingsHeaderRef}
              width="25px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor:
                  newRating === null && !isModify ? '#a09f9f' : '#F29E50',
                color: newRating === null ? '#fff' : 'inherit',
                fontWeight: newRating === null ? 'normal' : 'bold',
              }}
              onClick={e => handleRatingsMenu(e)}
            >
              {newRating === null && !isModify
                ? '?'
                : newRating === null && isModify
                ? `${formatRating(criticInfos.rating)}`
                : newRating}
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={displayRatings}
              open={openRatings}
              onClose={() => setDisplayRatings(null)}
              TransitionComponent={Fade}
              sx={{
                marginTop: '5px',
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                sx: {
                  padding: '0',
                },
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Stack
                sx={{
                  backgroundColor: '#ededed',
                  padding: '5px 8px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  maxHeight: '150px',
                }}
              >
                {ratings.map(rating => {
                  return (
                    <React.Fragment key={rating.number}>
                      <MenuItem
                        key={rating.number}
                        onClick={() => {
                          setNewRating(rating.number);
                          setDisplayRatings(null);
                        }}
                        sx={{
                          padding: '0',
                          minHeight: 'auto',
                          columnGap: '7px',
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                          <OrangeRating
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
                      </MenuItem>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </Stack>
            </Menu>
          </>
        ) : null}
        <Typography variant="body2" component="p" fontWeight="bold">
          {(type === 'new-critic' && !criticInfos) || isModify
            ? ' / 5'
            : `${formatRating(criticInfos.rating)} / 5`}
        </Typography>
      </Box>
      <Box
        minWidth="80px"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        {type === 'new-critic' ? (
          <ClearIcon
            fontSize="small"
            sx={{
              position: 'relative',
              left: '4px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setChosenMovieId(null);
              setChosenMovie(null);
            }}
          />
        ) : (
          <>
            <EditNoteIcon
              sx={{ position: 'relative', left: '4px', cursor: 'pointer' }}
              onClick={handleToolsMenu}
            />
            <Menu
              id="basic-menu"
              anchorEl={displayTools}
              open={openMenu}
              onClose={() => setDisplayTools(null)}
              TransitionComponent={Fade}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                sx: {
                  padding: '0',
                },
              }}
            >
              <Stack
                sx={{
                  backgroundColor: '#ededed',
                  padding: '5px 8px',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <MenuItem
                  onClick={() => {
                    setIsModify(!isModify);
                    setDisplayTools(null);
                  }}
                  sx={{ padding: '0', minHeight: 'auto' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <ModeEditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.8em',
                      },
                    }}
                  >
                    {!isModify ? 'Modifier' : 'Annuler'}
                  </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleCriticTools('delete');
                    setDisplayTools(null);
                  }}
                  sx={{ padding: '0', minHeight: 'auto' }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <ClearIcon fontSize="small" sx={{ color: '#d32f2f' }} />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.8em',
                        color: '#d32f2f',
                      },
                    }}
                  >
                    {'Supprimer'}
                  </ListItemText>
                </MenuItem>
              </Stack>
            </Menu>
          </>
        )}
      </Box>
    </Stack>
  );
};

CriticAdvicesHeader.propTypes = {
  type: PropTypes.string.isRequired,
  ratingsHeaderRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  displayRatings: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  setDisplayRatings: PropTypes.func.isRequired,
  newRating: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  setNewRating: PropTypes.func.isRequired,
  criticInfos: PropTypes.object,
  setUserCritics: PropTypes.func.isRequired,
  isModify: PropTypes.bool.isRequired,
  setIsModify: PropTypes.func.isRequired,
};

export default CriticAdvicesHeader;
