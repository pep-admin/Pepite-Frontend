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
import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes
import { TurnipIcon } from '@utils/components/styledComponent';
import ClearIcon from '@mui/icons-material/Clear';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { ratings } from '@utils/data/ratings';
import ModifyOrDelete from '@utils/components/ModifyOrDelete';
import { formatRating } from '@utils/functions/formatRating';
import ColoredRating from '@utils/components/ColoredRating';

const CriticAdvicesHeader = ({
  page,
  type,
  ratingsHeaderRef,
  displayRatings,
  setDisplayRatings,
  newRating,
  setNewRating,
  infos,
  setData,
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

  const { id } = useParams();

  const navigate = useNavigate();

  // Infos de l'utilisateur connecté
  const user_infos = JSON.parse(localStorage.getItem('user_infos'));

  // Menu des étoiles pour noter une nouvelle critique
  const openRatings = Boolean(displayRatings);

  const handleRatingsMenu = useCallback(
    event => {
      setDisplayRatings(event.currentTarget);
    },
    [setDisplayRatings],
  );

  const closeMenu = useCallback(() => {
    setDisplayRatings(null);
  }, [setDisplayRatings]);

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

  // Génère le contenu du header selon plusieurs conditions
  const generateContent = () => {
    // Si l'utilisateur veut poster une nouvelle critique
    if (type === 'new-critic') {
      return <span style={{ fontWeight: 'bold' }}>{'Nouvelle note'}</span>;

      // Si l'utilisateur veut conseiller un film / une série à un ami
    } else if (type === 'new-advice') {
      return (
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
            onClick={() => navigate(`/profil/${chosenUser.id}`)}
          >
            {chosenUser.first_name} {chosenUser.last_name}
          </span>
        </>
      );

      // Si l'utilisateur voit la critique d'une de ses connaissances
    } else if (type === 'old-critic' && infos.user_id !== user_infos.id) {
      const color =
        (page === 'profil' && chosenUser?.relation_type === 'close_friend') ||
        (page === 'home' && infos?.relation_type === 'close_friend')
          ? '#ff7b00'
          : '#F29E50';

      return (
        <>
          <span
            style={{ fontWeight: 'bold', color }}
            onClick={() => navigate(`/profil/${criticUserInfos.id}`)}
          >
            {criticUserInfos.first_name} {criticUserInfos.last_name}
          </span>
          {' a noté'}
        </>
      );

      // Si l'utilisateur voit un de ses ancien conseil
    } else if (
      page === 'profil' &&
      type === 'old-advice' &&
      infos.sender_id === user_infos.id
    ) {
      return (
        <span style={{ fontWeight: 'bold' }}>{'Vous avez conseillé'}</span>
      );

      // Si l'utilisateur voit une de ses anciennes critiques
    } else if (type === 'old-critic' && infos.user_id === user_infos.id) {
      return <span style={{ fontWeight: 'bold' }}>{'Vous avez noté'}</span>;

      // Si l'utilisateur voit le conseil de quelqu'un d'autre
    } else if (
      page === 'profil' &&
      type === 'old-advice' &&
      infos.sender_id !== user_infos.id
    ) {
      return (
        <>
          <span
            style={{
              fontWeight: 'bold',
              color:
                chosenUser?.relation_type === 'close_friend'
                  ? '#ff7b00'
                  : '#F29E50',
            }}
            onClick={() => navigate(`/profil/${criticUserInfos.id}`)}
          >
            {criticUserInfos.first_name} {criticUserInfos.last_name}
          </span>
          {' a conseillé'}
        </>
      );
    }
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
      <Typography
        variant="body2"
        component="p"
        minWidth="80px"
        align="left"
        whiteSpace="nowrap"
        maxWidth="363px"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {generateContent()}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        columnGap="5px"
        whiteSpace="nowrap"
      >
        <ColoredRating
          readOnly={true}
          precision={0.5}
          color={
            (page === 'profil' && chosenUser?.relation_type === 'friend') ||
            (page === 'home' && infos?.relation_type === 'friend') ||
            user_infos.id === parseInt(id, 10)
              ? // (type === 'new-critic' || type === 'new-advice' || isModify) ?
                '#F29E50'
              : (page === 'profil' &&
                  chosenUser?.relation_type === 'close_friend') ||
                (page === 'home' && infos?.relation_type === 'close_friend')
              ? '#ff7b00'
              : '#24A5A5'
          }
          value={
            type === 'new-critic' || type === 'new-advice' || isModify
              ? newRating
              : parseFloat(infos.rating)
          }
          sx={{ position: 'relative', bottom: '0.5px' }}
        />
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
            setData={setData}
            // setInfos={setUserCritics}
            isModify={isModify}
            setIsModify={setIsModify}
          />
        ) : null}
      </Box>
    </Stack>
  );
};

CriticAdvicesHeader.propTypes = {
  page: PropTypes.string.isRequired,
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
  setData: PropTypes.func.isRequired,
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

export default React.memo(CriticAdvicesHeader);
