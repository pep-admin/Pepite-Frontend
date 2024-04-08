// Import des libs externes
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import ModalAcquaintancesInfos from './ModalAcquaintancesInfos';

// Import des icônes
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { OrangeRating } from '@utils/components/styledComponent';
import StarIcon from '@mui/icons-material/Star';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

// Import des fonctions utilitaires
import { formatRating } from '@utils/functions/formatRating';
import { convertDate } from '@utils/functions/convertDate';

// Import des requêtes
import { getRatingsRequest } from '@utils/request/critics/getRatingsRequest';

// Import du contexte
import { useData } from '@hooks/DataContext';
import UserAvatar from '@utils/components/UserAvatar';
import { findRelationColor } from '@utils/functions/findRelationColor';
import { useParams } from 'react-router-dom';

const ModalPosterContent = ({
  page,
  from,
  infos,
  loggedUserInfos,
  chosenUser,
  goldNuggetUserInfos,
  setShowUserInfos,
  relationshipStatus,
}) => {
  const { displayType } = useData();
  const { id } = useParams();

  const isContentFromLoggedUser =
    from === 'old-critic' || from === 'suggested'
      ? infos.user_id === loggedUserInfos.id
      : infos.sender_id === loggedUserInfos.id;

  const [relationsRatings, setRelationsRatings] = useState(null);
  const [showMovieInfos, setShowMovieInfos] = useState(false);

  const getRatings = async id => {
    const averageRating = await getRatingsRequest(id, displayType);
    setRelationsRatings(averageRating);
  };

  useEffect(() => {
    if (
      from === 'old-critic' ||
      from === 'old-advice' ||
      from === 'notifications'
    )
      return;

    let id: number;

    if ('movie_id' in infos) {
      id = infos.movie_id;
    } else if ('serie_id' in infos) {
      id = infos.serie_id;
    }

    getRatings(id);
  }, [infos, from]);

  const generateText = () => {
    // Si la modale vient d'une critique OU des pépites suggérées de l'utilisateur connecté
    if (
      (from === 'old-critic' || from === 'suggested') &&
      infos.user_id === loggedUserInfos.id
    ) {
      return (
        <>
          {'Vous avez noté le '}
          <span style={{ color: '#24a5a5' }}>{`${convertDate(
            infos.critic_date,
          )}`}</span>
        </>
      );
    }
    // Si la modale vient d'une critique OU des pépites suggérées d'un autre utilisateur
    else if (
      (from === 'old-critic' || from === 'suggested') &&
      infos.user_id !== loggedUserInfos.id
    ) {
      const userInfos =
        page === 'home'
          ? infos.criticUserInfos
          : page === 'profil'
          ? chosenUser
          : infos;

      return (
        <>
          <strong style={{ color: findRelationColor(userInfos.relation_type) }}>
            {`${userInfos.first_name} ${userInfos.last_name}`}
          </strong>
          {' a noté le '}
          <span style={{ color: '#24a5a5' }}>{`${convertDate(
            infos.critic_date,
          )}`}</span>
        </>
      );
    }
    // Si la modale vient d'un conseil d'un ami
    else if (from === 'old-advice' && !isContentFromLoggedUser) {
      return (
        <>
          <strong
            style={{
              color: findRelationColor(infos?.criticUserInfos.relation_type),
            }}
          >
            {`${infos?.criticUserInfos.first_name} ${infos?.criticUserInfos.last_name}`}
          </strong>
          {' vous a conseillé '}
          {/* <br />
          <span style={{ color: '#24a5a5' }}>{`${convertDate(
            infos.advice_date,
          )}`}</span> */}
        </>
      );
    }
    // Si la modale vient d'un conseil de l'utilisateur connecté
    else if (from === 'old-advice' && isContentFromLoggedUser) {
      return (
        <>
          {'Vous avez conseillé à '}
          <strong
            style={{ color: findRelationColor(chosenUser.relation_type) }}
          >
            {`${chosenUser.first_name} ${chosenUser.last_name}`}
          </strong>
          {/* <br />
          <span style={{ color: '#24a5a5' }}>{`${convertDate(
            infos.advice_date,
          )}`}</span> */}
        </>
      );
    }
    // Si la modale vient d'un conseil des notifications
    else if (from === 'notifications') {
      return (
        <>
          <strong style={{ color: '#f29e50' }}>
            {`${infos.first_name} ${infos.last_name}`}
          </strong>
          {' vous a conseillé'}
        </>
      );
    }
  };

  return (
    <Stack
      position="absolute"
      top="0"
      left="0"
      height="100%"
      width="100%"
      bgcolor={!showMovieInfos ? 'rgba(0, 0, 0, 0.67)' : 'rgba(0, 0, 0, 0.85)'}
      padding="6px 20px"
      alignItems="center"
      sx={{
        overflowY: 'scroll',
      }}
    >
      <Typography
        variant="h2"
        align="center"
        color="#fff"
        fontSize="3em"
        fontFamily="League Spartan"
        fontWeight={800}
        sx={{
          letterSpacing: '-3.5px',
          visibility:
            infos.is_gold_nugget === 1 || from === 'suggested'
              ? 'visible'
              : 'hidden',
        }}
      >
        {'pépite.'}
      </Typography>
      <Stack
        width="100%"
        flexGrow="1"
        alignItems="center"
        padding="10px 0"
        justifyContent="flex-start"
      >
        <VisibilityOffIcon
          fontSize="large"
          sx={{
            color: '#fff',
            marginBottom: '15px',
            cursor: 'pointer',
            order: '1',
          }}
          onClick={() => setShowUserInfos(false)}
        />
        {showMovieInfos ? (
          <Stack order="8" marginTop="10px">
            <Typography
              align="justify"
              variant="body2"
              color="#fff"
              marginTop="10px"
              fontWeight="300"
              lineHeight="1.7"
            >
              {`${infos?.overview}`}
            </Typography>
          </Stack>
        ) : (page === 'home' || page === 'list') && from === 'suggested' ? (
          <ModalAcquaintancesInfos
            goldNuggetUserInfos={goldNuggetUserInfos}
            relationshipStatus={relationshipStatus}
            relationsRatings={relationsRatings}
          />
        ) : (
          <>
            <UserAvatar
              variant="circular"
              userInfos={
                isContentFromLoggedUser
                  ? loggedUserInfos
                  : from === 'notifications'
                  ? infos
                  : page === 'profil' && loggedUserInfos.id !== parseInt(id, 10)
                  ? chosenUser
                  : infos.criticUserInfos
              }
              picWidth={90}
              picHeight={90}
              isOutlined={true}
              outlineWidth="3.5px"
              relationType={
                isContentFromLoggedUser
                  ? 'self'
                  : from === 'notifications'
                  ? 'friend'
                  : page === 'profil' && loggedUserInfos.id !== parseInt(id, 10)
                  ? chosenUser.relation_type
                  : infos.criticUserInfos.relation_type
              }
              sx={{
                order: '2',
                marginBottom: '15px',
              }}
              redirection={false}
            />
            <Typography variant="body1" fontWeight="400" color="#fff" order="2">
              {generateText()}
            </Typography>
          </>
        )}
        <Stack
          direction="row"
          alignItems="center"
          columnGap="10px"
          maxWidth="200px"
          order="6"
          margin="10px 0"
        >
          <Typography
            color="secondary"
            align="center"
            fontSize="1.5em"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            lineHeight="33px"
            position="relative"
          >
            {infos?.title ? `${infos.title}` : `${infos.name}`}
            <InfoTwoToneIcon
              sx={{
                color: '#ffcd00',
                position: 'absolute',
                right: '-34px',
              }}
              onClick={() => {
                setShowMovieInfos(!showMovieInfos);
              }}
            />
          </Typography>
        </Stack>
        {(relationsRatings?.average_rating || infos?.rating) && (
          <Stack direction="row" alignItems="center" order="7">
            <OrangeRating
              name="half-rating-read"
              value={parseFloat(
                page === 'profil' ||
                  from === 'old-critic' ||
                  from === 'old-advice' ||
                  from === 'notifications'
                  ? infos.rating
                  : relationsRatings.average_rating,
              )}
              precision={0.1}
              readOnly
              emptyIcon={
                <StarIcon sx={{ color: '#E1E1E1', fontSize: '1em' }} />
              }
              sx={{ marginRight: '10px', fontSize: '1.3em' }}
            />
            <Typography
              fontSize="1.2em"
              color="primary"
              lineHeight="normal"
              fontWeight="500"
              paddingTop="3px"
            >
              {`${formatRating(
                page === 'profil' ||
                  from === 'old-critic' ||
                  from === 'old-advice' ||
                  from === 'notifications'
                  ? infos.rating
                  : relationsRatings.average_rating,
              )} / 5`}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

ModalPosterContent.propTypes = {
  page: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  infos: PropTypes.object.isRequired,
  loggedUserInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  criticUserInfos: PropTypes.object,
  goldNuggetUserInfos: PropTypes.array.isRequired,
  setShowUserInfos: PropTypes.func.isRequired,
  relationshipStatus: PropTypes.object,
};

export default ModalPosterContent;
