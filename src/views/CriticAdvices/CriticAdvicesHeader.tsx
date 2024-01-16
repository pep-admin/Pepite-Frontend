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
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import {
  DarkOrangeRating,
  OrangeRating,
  TurnipIcon,
  TurquoiseRating,
} from '@utils/styledComponent';
import ClearIcon from '@mui/icons-material/Clear';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { ratings } from '@utils/data/ratings';
import ModifyOrDelete from '@utils/ModifyOrDelete';
import { formatRating } from '@utils/functions/formatRating';

const CriticAdvicesHeader = ({
  type,
  ratingsHeaderRef,
  displayRatings,
  setDisplayRatings,
  newRating,
  setNewRating,
  infos,
  setUserCritics,
  isModify,
  setIsModify,
  isGoldNugget,
  setIsGoldNugget,
  // setIsNuggetAnimEnded,
  isTurnip,
  setIsTurnip,
  chosenUser,
  criticUserInfos,
}) => {
  const { setChosenMovieId, setChosenMovie } = useData();

  // Infos de l'utilisateur connecté
  const user_infos = JSON.parse(localStorage.getItem('user_infos'));

  // Menu des étoiles pour noter une nouvelle critique
  const openRatings = Boolean(displayRatings);
  const handleRatingsMenu = event => {
    setDisplayRatings(event.currentTarget);
  };

  const closeMenu = () => {
    setDisplayRatings(null);
  };

  // Vérifie le statut "pépite" et "navet" à l'ouverture du menu de modification de note
  useEffect(() => {
    if (infos?.is_gold_nugget && isModify) {
      setIsGoldNugget(true);
      setIsTurnip(false);
    } else if (infos?.is_turnip && isModify) {
      setIsGoldNugget(false);
      setIsTurnip(true);
    }
  }, [infos, isModify]);

  // useEffect(() => {
  //   console.log('chosen user', chosenUser);
  // }, [chosenUser]);

  return (
    <Stack
      direction="row"
      height="35px"
      alignItems="center"
      justifyContent="space-between"
      padding="0 10px"
      columnGap="10px"
    >
      <Typography variant="body2" component="p" minWidth="80px" align="left">
        {
          // Si l'utilisateur connecté souhaite poster une nouvelle critique sur son profil
          type === 'new-critic' ? (
            'Nouvelle note'
          ) : // Si l'utilisateur connecté souhaite poster un conseil sur le profil d'un ami
          type === 'new-advice' ? (
            <>
              {'Conseillez à '}
              <span
                style={{
                  fontWeight: 'bold',
                  color:
                    chosenUser?.relation_type === 'close_friend'
                      ? '#ff7b00'
                      : '#F29E50',
                }}
              >
                {chosenUser.first_name} {chosenUser.last_name}
              </span>
            </>
          ) : // Si l'utilisateur voit une critique d'un autre utilisateur
          type === 'old-critic' && infos.sender_id !== user_infos.id ? (
            <>
              <span
                style={{
                  fontWeight: 'bold',
                  color:
                    infos.relation_type === 'close_friend'
                      ? '#ff7b00'
                      : infos.relation_type === 'friend'
                      ? '#F29E50'
                      : '#24A5A5',
                }}
              >
                {criticUserInfos.first_name} {criticUserInfos.last_name}
              </span>
              {' a noté'}
            </>
          ) : // Si l'utilisateur voit son conseil sur le profil d'un ami
          type === 'old-advice' && infos.sender_id === user_infos.id ? (
            'Vous avez conseillé'
          ) : // TODO : Si l'utilisateur voit un conseil d'un autre utilisateur
          type === 'old-advice' && infos.sender_id !== user_infos.id ? (
            <>
              <span
                style={{
                  fontWeight: 'bold',
                  color:
                    infos.relation_type === 'close_friend'
                      ? '#ff7b00'
                      : '#F29E50',
                }}
              >
                {criticUserInfos.first_name} {criticUserInfos.last_name}
              </span>
              {' a conseillé'}
            </>
          ) : (
            'Vous avez noté'
          )
        }
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        columnGap="5px"
        whiteSpace="nowrap"
      >
        {infos.relation_type === 'close_friend' ? (
          <DarkOrangeRating
            value={
              type === 'new-critic' || type === 'new-advice' || isModify
                ? newRating
                : parseFloat(infos.rating)
            }
            precision={0.5}
            readOnly
            sx={{ position: 'relative', bottom: '0.5px' }}
          />
        ) : infos.relation_type === 'friend' ||
          infos.sender_id === parseInt(user_infos.id, 10) ? (
          <OrangeRating
            value={
              type === 'new-critic' || type === 'new-advice' || isModify
                ? newRating
                : parseFloat(infos.rating)
            }
            precision={0.5}
            readOnly
            sx={{ position: 'relative', bottom: '0.5px' }}
          />
        ) : (
          <TurquoiseRating
            value={
              type === 'new-critic' || type === 'new-advice' || isModify
                ? newRating
                : parseFloat(infos.rating)
            }
            precision={0.5}
            readOnly
            sx={{ position: 'relative', bottom: '0.5px' }}
          />
        )}
        {type === 'new-critic' || type === 'new-advice' || isModify ? (
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
                ? `${formatRating(infos.rating)}`
                : newRating}
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={displayRatings}
              open={openRatings}
              onClose={() => closeMenu()}
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
                  padding="5px 15px"
                  sx={{
                    backgroundColor: isTurnip ? '#c5739d' : '#a09f9f',
                  }}
                >
                  <TurnipIcon sx={{ height: '25px' }} />
                  <Typography
                    fontSize="1em"
                    component="p"
                    fontFamily="Sirin Stencil"
                    sx={{ color: '#fff' }}
                    onClick={() => {
                      setIsGoldNugget(false);
                      setIsTurnip(!isTurnip);
                    }}
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
                  padding="5px 15px"
                  sx={{
                    backgroundColor: isGoldNugget ? '#dda979' : '#a09f9f',
                  }}
                >
                  <img
                    src="/images/gold_rating.svg"
                    alt=""
                    style={{
                      position: 'relative',
                      top: '0.2px',
                    }}
                  />
                  <Typography
                    fontSize="1em"
                    component="p"
                    fontFamily="Sirin Stencil"
                    sx={{ color: '#fff', lineHeight: '15px' }}
                    onClick={() => {
                      setIsGoldNugget(!isGoldNugget);
                      setIsTurnip(false);
                      // if (isGoldNugget) {
                      //   setIsNuggetAnimEnded(false);
                      // }
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
          {((type === 'new-critic' || type === 'new-advice') && !infos) ||
          isModify
            ? ' / 5'
            : `${formatRating(infos.rating)} / 5`}
        </Typography>
      </Box>
      <Box
        minWidth="80px"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        {type === 'new-critic' || type === 'new-advice' ? (
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
        ) : user_infos.id === infos.sender_id ? (
          <ModifyOrDelete
            parent={'critic'}
            infos={infos}
            setInfos={setUserCritics}
            isModify={isModify}
            setIsModify={setIsModify}
          />
        ) : null}
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
  infos: PropTypes.object,
  setUserCritics: PropTypes.func.isRequired,
  isModify: PropTypes.bool.isRequired,
  setIsModify: PropTypes.func.isRequired,
  isGoldNugget: PropTypes.bool.isRequired,
  setIsGoldNugget: PropTypes.func.isRequired,
  // setIsNuggetAnimEnded: PropTypes.func.isRequired,
  isTurnip: PropTypes.bool.isRequired,
  setIsTurnip: PropTypes.func.isRequired,
  chosenUser: PropTypes.object,
  criticUserInfos: PropTypes.object.isRequired,
};

export default CriticAdvicesHeader;
