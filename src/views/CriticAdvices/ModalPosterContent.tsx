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

const ModalPosterContent = ({
  page,
  from,
  infos,
  loggedUserInfos,
  criticUserInfos,
  chosenUser,
  goldNuggetUserInfos,
  setShowUserInfos,
  relationshipStatus,
}) => {
  const [relationsRatings, setRelationsRatings] = useState(null);
  const [showMovieInfos, setShowMovieInfos] = useState(false);

  const { displayType } = useData();

  const getRatings = async id => {
    const averageRating = await getRatingsRequest(id, displayType);
    setRelationsRatings(averageRating);
  };

  useEffect(() => {
    if (from === 'critic') return;

    if (displayType === 'movie') {
      getRatings(infos.movie_id);
    } else {
      getRatings(infos.serie_id);
    }
  }, [infos, from]);

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
            marginBottom: '10px',
            cursor: 'pointer',
            order: '1',
          }}
          onClick={() => setShowUserInfos(false)}
        />
        {
          // Si la modale affichée vient de la page de profil ou directement des critiques
          !showMovieInfos && (page === 'profil' || from === 'critic') ? (
            <>
              <Typography
                variant="body1"
                fontWeight="400"
                color="#fff"
                order="2"
                marginBottom="10px"
              >
                {loggedUserInfos.id === (infos.user_id || infos.sender_id) ? (
                  <>
                    {'Vous avez noté le '}
                    <span style={{ color: '#24a5a5' }}>{`${convertDate(
                      infos.critic_date,
                    )}`}</span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        color:
                          (page === 'profil' &&
                            chosenUser?.relation_type === 'close_friend') ||
                          (page === 'home' &&
                            criticUserInfos?.relation_type === 'close_friend')
                            ? '#ff7b00'
                            : (page === 'profil' &&
                                chosenUser?.relation_type === 'friend') ||
                              (page === 'home' &&
                                criticUserInfos?.relation_type === 'friend')
                            ? '#F29E50'
                            : '#24A5A5',
                        fontWeight: 'bold',
                      }}
                    >
                      {page === 'profil'
                        ? `${chosenUser.first_name} ${chosenUser.last_name}`
                        : `${criticUserInfos.first_name} ${criticUserInfos.last_name}`}
                    </span>
                    {` a noté le ${convertDate(infos.critic_date)}`}
                  </>
                )}
              </Typography>
            </>
          ) : // Si la modale affichée vient de la page home, on affichera toutes les connaissances qui ont noté le film
          !showMovieInfos && (page === 'home' || page === 'list') ? (
            <ModalAcquaintancesInfos
              goldNuggetUserInfos={goldNuggetUserInfos}
              relationshipStatus={relationshipStatus}
              relationsRatings={relationsRatings}
            />
          ) : (
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
          )
        }
        <Stack
          direction="row"
          alignItems="center"
          columnGap="10px"
          maxWidth="200px"
          order="6"
          marginBottom="10px"
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
                page === 'profil' || from === 'critic'
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
                page === 'profil' || from === 'critic'
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
