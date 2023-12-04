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
import React from 'react';
import PropTypes from 'prop-types';

// Import des composants customisés
import {
  GoldNuggetIcon,
  OrangeRating,
  TurnipIcon,
} from '@utils/styledComponent';

// Import des icônes
import ClearIcon from '@mui/icons-material/Clear';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { ratings } from '@utils/data/ratings';
import ModifyOrDelete from '@utils/ModifyOrDelete';

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
  isGoldNugget,
  setIsGoldNugget,
  setIsNuggetAnimEnded,
  isTurnip,
  setIsTurnip
}) => {
  const { setChosenMovieId, setChosenMovie } = useData();

  // Menu des étoiles pour noter une nouvelle critique
  const openRatings = Boolean(displayRatings);
  const handleRatingsMenu = event => {
    setDisplayRatings(event.currentTarget);
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
              slotProps={{
                paper: {
                  sx: {
                    maxHeight: '150px',
                  },
                },
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
              <Stack>
                <Stack
                  direction="row"
                  height="33.04px"
                  alignItems="center"
                  gap="20px"
                  padding="5px 11px"
                  sx={{
                    backgroundColor: isTurnip ? '#c5739d' : '#8c8c8c',
                  }}
                >
                  <TurnipIcon sx={{ height: '25px' }} />
                  <Typography
                    fontSize="1em"
                    component="p"
                    fontFamily="Sirin Stencil"
                    sx={{ color: '#fff' }}
                    onClick={() => setIsTurnip(!isTurnip)}
                  >
                    {'Navet !'}
                  </Typography>
                </Stack>
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
                          minHeight: 'auto',
                          columnGap: '7px',
                          padding: '5px 11px',
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
                      <Divider sx={{ margin: '0 !important' }} />
                    </React.Fragment>
                  );
                })}
                <Stack
                  direction="row"
                  height="33.04px"
                  alignItems="center"
                  gap="20px"
                  padding="5px 8px"
                  sx={{
                    backgroundColor: isGoldNugget ? '#dda979' : '#8c8c8c',
                  }}
                >
                  <GoldNuggetIcon sx={{ height: '20px' }} />
                  <Typography
                    fontSize="1em"
                    component="p"
                    fontFamily="Sirin Stencil"
                    sx={{ color: '#fff', lineHeight: '15px' }}
                    onClick={() => {
                      setIsGoldNugget(!isGoldNugget);
                      if(isGoldNugget) {
                        setIsNuggetAnimEnded(false);
                      }
                    }}
                  >
                    {'Pépite !'}
                  </Typography>
                </Stack>
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
          <ModifyOrDelete
            parent={'critic'}
            infos={criticInfos}
            setInfos={setUserCritics}
            isModify={isModify}
            setIsModify={setIsModify}
          />
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
