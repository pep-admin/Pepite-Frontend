// Import des libs externes
import {
  Stack,
  Box,
  Typography,
  Divider,
  Skeleton,
  Button,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import UserAvatar from '@utils/components/UserAvatar';
import ColoredRating from '@utils/components/ColoredRating';
import RatingMenu from '@utils/components/RatingMenu';
import ModifyOrDelete from '@utils/components/ModifyOrDelete';

// Import des icônes
import ClearIcon from '@mui/icons-material/Clear';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des fonctions utilitaires
import { formatRating } from '@utils/functions/formatRating';
import { convertDate } from '@utils/functions/convertDate';
import FriendsMenu from './FriendsMenu';

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
  isTurnip,
  setIsTurnip,
  chosenUser,
  setChosenUser,
  openSnackbar,
  cardsToShow,
  setGoldenMovies,
}) => {
  const { setChosenMovieId, setChosenMovie } = useData();

  const { id } = useParams();

  const navigate = useNavigate();

  // Infos de l'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const isProfilUserLogged = loggedUserInfos.id === parseInt(id, 10); // Vérifie si le profil affiché est celui de l'utilisateur connecté

  const handleRatingsMenu = useCallback(
    event => {
      setDisplayRatings(event.currentTarget);
    },
    [setDisplayRatings],
  );

  const closeMenu = useCallback(() => {
    setDisplayRatings(null);
  }, [setDisplayRatings]);

  const findGoodColor = page => {
    let userInfos;

    if (page === 'profil' && !isProfilUserLogged) {
      userInfos = chosenUser;
    } else if (page === 'profil' && isProfilUserLogged) {
      userInfos = loggedUserInfos;
    } else {
      userInfos = infos;
    }

    switch (userInfos?.relation_type) {
      case 'close_friend':
        return '#ff7b00';
      case 'friend':
        return '#F29E50';
      case 'followed':
        return '#24A5A5';
      default:
        return '#F29E50';
    }
  };

  // Génère le contenu du header selon plusieurs conditions
  const generateContent = () => {
    // Si l'utilisateur veut poster une nouvelle critique
    if (type === 'new-critic') {
      return <span style={{ fontWeight: '600' }}>{'Nouvelle note'}</span>;

      // Si l'utilisateur veut conseiller un film / une série à un ami
    } else if (type === 'new-advice') {
      return (
        <>
          {'Conseillez à '}
          {!isProfilUserLogged && (
            <span
              style={{
                display: 'block',
                marginTop: '3px',
                fontWeight: '600',
                color: findGoodColor(page),
              }}
              onClick={() => navigate(`/profil/${chosenUser.id}`)}
            >
              {chosenUser.first_name} {chosenUser.last_name}
            </span>
          )}
        </>
      );

      // Si l'utilisateur voit la critique d'une de ses connaissances
    } else if (type === 'old-critic' && infos.user_id !== loggedUserInfos.id) {
      return (
        <>
          {infos.isLoadingUser ? (
            <Skeleton
              variant="text"
              sx={{
                fontSize: '1em',
                width: '100px',
              }}
            />
          ) : (
            <>
              <span
                style={{ fontWeight: '600', color: findGoodColor(page) }}
                onClick={() => navigate(`/profil/${infos.criticUserInfos.id}`)}
              >
                {infos.criticUserInfos.first_name}{' '}
                {infos.criticUserInfos.last_name}
              </span>
              {' a noté'}
            </>
          )}
        </>
      );

      // Si l'utilisateur voit un de ses ancien conseil
    } else if (
      page === 'profil' &&
      type === 'old-advice' &&
      infos.sender_id === loggedUserInfos.id
    ) {
      return <span style={{ fontWeight: '600' }}>{'Vous avez conseillé'}</span>;

      // Si l'utilisateur voit une de ses anciennes critiques
    } else if (type === 'old-critic' && infos.user_id === loggedUserInfos.id) {
      return <span style={{ fontWeight: '600' }}>{'Vous avez noté'}</span>;
      // Si l'utilisateur voit le conseil de quelqu'un d'autre
    } else if (
      page === 'profil' &&
      type === 'old-advice' &&
      infos.sender_id !== loggedUserInfos.id
    ) {
      return (
        <>
          <span
            style={{
              fontWeight: '600',
              color: findGoodColor(page),
            }}
            onClick={() => navigate(`/profil/${infos.criticUserInfos.id}`)}
          >
            {infos.criticUserInfos.first_name} {infos.criticUserInfos.last_name}
          </span>
          {' a conseillé'}
        </>
      );
    } else if (type === 'new-quick-rating') {
      return (
        <span
          style={{
            display: 'inline-block',
            maxWidth: '100px',
            fontWeight: '600',
            whiteSpace: 'normal',
          }}
        >
          {'Notez de manière privée'}
        </span>
      );
    }
  };

  // Vérifie le statut "pépite" et "navet" à l'ouverture du menu de modification de note
  useEffect(() => {
    if (!isModify) return;

    if (infos?.is_gold_nugget && isModify) {
      setIsGoldNugget(true);
      setIsTurnip(false);
    } else if (infos?.is_turnip && isModify) {
      setIsGoldNugget(false);
      setIsTurnip(true);
    }
  }, [infos, isModify]);

  return (
    <>
      <Stack
        direction="row"
        height="48px"
        alignItems="center"
        justifyContent="space-between"
        padding="0 10px"
        columnGap="10px"
      >
        <Stack alignItems="flex-start" flexGrow="1">
          <Stack direction="row" alignItems="center" width="100%">
            {type === 'new-critic' ||
            type === 'new-advice' ||
            type === 'new-quick-rating' ? (
              <UserAvatar
                variant="circle"
                userInfos={loggedUserInfos}
                picHeight={40}
                picWidth={40}
                isOutlined={false}
                redirection={false}
              />
            ) : (type === 'old-critic' || type === 'old-advice') &&
              infos.criticUserInfos.isLoadingUser ? (
              <Skeleton variant="circular" height={40} width={40} />
            ) : (
              <UserAvatar
                variant="circle"
                userInfos={infos.criticUserInfos}
                picHeight={40}
                picWidth={40}
                isOutlined={false}
                redirection={true}
              />
            )}
            <Stack
              direction="row"
              alignItems={
                type === 'new-critic' || type === 'new-advice'
                  ? 'center'
                  : 'flex-start'
              }
              columnGap="10px"
            >
              <Stack alignItems="flex-start" margin="0 10px">
                <Typography
                  variant="body2"
                  component="p"
                  minWidth="80px"
                  align="left"
                  whiteSpace="nowrap"
                  maxWidth="144px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  lineHeight="normal"
                  marginBottom="2px"
                >
                  {generateContent()}
                  {isProfilUserLogged && type === 'new-advice' && (
                    <FriendsMenu
                      chosenUser={chosenUser}
                      setChosenUser={setChosenUser}
                    />
                  )}
                </Typography>
                {(type === 'old-critic' || type === 'old-advice') && (
                  <Typography fontSize="0.8em" color="#9B9B9B" fontWeight="300">
                    {`le ${convertDate(
                      type === 'old-critic'
                        ? infos.critic_date
                        : infos.advice_date,
                    )}`}
                  </Typography>
                )}
              </Stack>
              <Stack
                direction="row"
                position="relative"
                bottom={
                  type === 'old-critic' || type === 'old-advice' ? '2px' : '1px'
                }
              >
                <ColoredRating
                  readOnly={true}
                  emptyColor="#969696"
                  precision={0.5}
                  color={findGoodColor(page)}
                  value={
                    type === 'new-critic' ||
                    type === 'new-advice' ||
                    type === 'new-quick-rating' ||
                    isModify
                      ? newRating
                      : parseFloat(infos.rating)
                  }
                  sx={{ position: 'relative', bottom: '0.5px' }}
                />
                {type === 'new-critic' ||
                type === 'new-advice' ||
                type === 'new-quick-rating' ||
                isModify ? (
                  <>
                    <Button
                      ref={ratingsHeaderRef}
                      variant="contained"
                      disableElevation
                      sx={{
                        height: '20px',
                        width: '30px',
                        padding: '0',
                        minWidth: 'auto',
                        bgcolor:
                          newRating === null && !isModify
                            ? '#8a8a8a'
                            : '#F29E50',
                        color: newRating === null ? '#fff' : 'inherit',
                        fontWeight: newRating === null ? 'normal' : '600',
                        borderRadius: '4px',
                        '&:hover': {
                          bgcolor: '#8a8a8a',
                          color: '#fff',
                        },
                      }}
                      onClick={e => handleRatingsMenu(e)}
                    >
                      {newRating === null && !isModify
                        ? '?'
                        : newRating === null && isModify
                        ? `${formatRating(infos.rating)}`
                        : newRating}
                    </Button>
                    <RatingMenu
                      utility={'new-post'}
                      infos={infos}
                      setIsQuicklyRated={null}
                      setOpenSnackbar={null}
                      anchorQuickNoteMenu={displayRatings}
                      setAnchorQuickNoteMenu={setDisplayRatings}
                      handleCloseNoteMenu={closeMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      setNewRating={setNewRating}
                      isGoldNugget={isGoldNugget}
                      setIsGoldNugget={setIsGoldNugget}
                      isTurnip={isTurnip}
                      setIsTurnip={setIsTurnip}
                    />
                  </>
                ) : null}
                <Typography
                  component="p"
                  fontWeight="600"
                  position="relative"
                  top="1px"
                  marginLeft="2px"
                  fontSize="0.8em"
                >
                  {((type === 'new-critic' ||
                    type === 'new-advice' ||
                    type === 'new-quick-rating') &&
                    !infos) ||
                  isModify
                    ? ' / 5'
                    : `${formatRating(infos.rating)} / 5`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignSelf={
            type === 'old-critic' || type === 'old-advice'
              ? 'flex-start'
              : 'center'
          }
          padding={
            type === 'old-critic' || type === 'old-advice' ? '4px 0 0 0' : '0'
          }
        >
          {type === 'new-critic' ||
          type === 'new-advice' ||
          type === 'new-quick-rating' ? (
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
          ) : loggedUserInfos.id === infos.user_id ||
            loggedUserInfos.id === infos.sender_id ? (
            <ModifyOrDelete
              page={page}
              parent={type}
              infos={infos}
              setData={setData}
              chosenUser={chosenUser}
              isModify={isModify}
              setIsModify={setIsModify}
              openSnackbar={openSnackbar}
              cardsToShow={cardsToShow}
              setGoldenMovies={setGoldenMovies}
            />
          ) : null}
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#e9e9e9' }} />
    </>
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
  isTurnip: PropTypes.bool.isRequired,
  setIsTurnip: PropTypes.func.isRequired,
  chosenUser: PropTypes.object,
  setChosenUser: PropTypes.func,
  openSnackbar: PropTypes.func.isRequired,
  cardsToShow: PropTypes.number.isRequired,
  setGoldenMovies: PropTypes.func.isRequired,
};

export default React.memo(CriticAdvicesHeader);
