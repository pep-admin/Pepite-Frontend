// Import des libs externes
import { Stack, Box, Typography, Divider, Skeleton } from '@mui/material';
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

const CriticAdvicesHeader2 = ({
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
  criticUserInfos,
}) => {
  const { setChosenMovieId, setChosenMovie } = useData();

  const { id } = useParams();

  const navigate = useNavigate();

  // Infos de l'utilisateur connecté
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

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

  const findGoodColor = page => {
    let userInfos;

    if (page === 'profil' && loggedUserInfos.id !== parseInt(id, 10)) {
      userInfos = chosenUser;
    } else if (page === 'profil' && loggedUserInfos.id === parseInt(id, 10)) {
      userInfos = criticUserInfos;
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
          <span
            style={{
              fontWeight: '600',
              color: findGoodColor(page),
            }}
            onClick={() => navigate(`/profil/${chosenUser.id}`)}
          >
            {chosenUser.first_name} {chosenUser.last_name}
          </span>
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
                onClick={() => navigate(`/profil/${criticUserInfos.id}`)}
              >
                {criticUserInfos.first_name} {criticUserInfos.last_name}
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
    <>
      <Stack
        direction="row"
        height="48px"
        alignItems="center"
        padding="0 10px"
        columnGap="10px"
      >
        {infos?.isLoadingUser &&
        (type === 'old-critic' || type === 'old-advice') ? (
          <Skeleton variant="circular" height={40} width={40} />
        ) : (
          <UserAvatar
            variant="circle"
            userInfos={
              type === 'new-critic' || type === 'new-advice'
                ? loggedUserInfos
                : criticUserInfos
            }
            picHeight={40}
            picWidth={40}
            isOutlined={false}
            redirection={true}
          />
        )}
        <Stack alignItems="flex-start">
          <Stack direction="row" alignItems="center">
            <Typography
              variant="body2"
              component="p"
              minWidth="80px"
              align="left"
              whiteSpace="nowrap"
              maxWidth="363px"
              overflow="hidden"
              textOverflow="ellipsis"
              marginRight="10px"
              lineHeight="normal"
            >
              {generateContent()}
            </Typography>
            <ColoredRating
              readOnly={true}
              emptyColor="#969696"
              precision={0.5}
              color={findGoodColor(page)}
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
                    fontWeight: newRating === null ? 'normal' : '600',
                  }}
                  onClick={e => handleRatingsMenu(e)}
                >
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    position="relative"
                    top="1px"
                  >
                    {newRating === null && !isModify
                      ? '?'
                      : newRating === null && isModify
                      ? `${formatRating(infos.rating)}`
                      : newRating}
                  </Typography>
                </Box>
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
              variant="body2"
              component="p"
              fontWeight="600"
              position="relative"
              top="1px"
              marginLeft="2px"
            >
              {((type === 'new-critic' || type === 'new-advice') && !infos) ||
              isModify
                ? ' / 5'
                : `${formatRating(infos.rating)} / 5`}
            </Typography>
          </Stack>
          {(type === 'old-critic' || type === 'old-advice') && (
            <Typography fontSize="0.8em" color="#9B9B9B" fontWeight="300">
              {`le ${convertDate(
                type === 'old-critic' ? infos.critic_date : infos.advice_date,
              )}`}
            </Typography>
          )}
        </Stack>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          flexGrow="1"
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
          ) : loggedUserInfos.id === infos.user_id ||
            loggedUserInfos.id === infos.sender_id ? (
            <ModifyOrDelete
              page={page}
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
      <Divider sx={{ borderColor: '#e9e9e9' }} />
    </>
  );
};

CriticAdvicesHeader2.propTypes = {
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

export default React.memo(CriticAdvicesHeader2);
