// Import des libs externes
import { Stack, Typography, Divider, AvatarGroup, Avatar } from '@mui/material';
import PropTypes from 'prop-types';

// Import des icônes
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { OrangeRating } from '@utils/styledComponent';
import StarIcon from '@mui/icons-material/Star';

// Import des variables d'environnement
import apiBaseUrl from '@utils/request/config';

// Import des fonctions utilitaires
import { formatRating } from '@utils/functions/formatRating';
import { useEffect, useState } from 'react';
import { getAverageRatingsRequest } from '@utils/request/critics/getAverageRatingsRequest';
import RelationAverageRatings from './RelationAverageRatings';

const ModalPosterContent = ({
  infos,
  goldNuggetUserInfos,
  setShowUserInfos,
  relationshipStatus,
}) => {
  const [relationsAverageRating, setRelationsAverageRating] = useState(null);
  const [showRatingsDetails, setShowRatingsDetails] = useState(null);

  const openRelationsRatings = Boolean(showRatingsDetails);

  // Trie les relations : 1) amis proches, 2) amis, 3) suivis
  const sortedGoldNuggetUserInfos = [...goldNuggetUserInfos].sort((a, b) => {
    const relationTypeA = relationshipStatus[a.id]?.relation_type || 'unknown';
    const relationTypeB = relationshipStatus[b.id]?.relation_type || 'unknown';

    const priorityMap = {
      close_friend: 1,
      friend: 2,
      followed: 3,
      unknown: 4,
    };

    return priorityMap[relationTypeA] - priorityMap[relationTypeB];
  });

  // Compte le nombre de relations qui ont noté la pépite
  const countRelationshipTypes = () => {
    let closeFriendCount = 0;
    let friendCount = 0;
    let followedCount = 0;

    goldNuggetUserInfos.forEach(userInfo => {
      const relationType = relationshipStatus[userInfo.id]?.relation_type;
      if (relationType === 'close_friend') {
        closeFriendCount++;
      } else if (relationType === 'friend') {
        friendCount++;
      } else if (relationType === 'followed') {
        followedCount++;
      }
    });

    return { closeFriendCount, friendCount, followedCount };
  };

  const { closeFriendCount, friendCount, followedCount } =
    countRelationshipTypes();

  const getAverageRating = async movieId => {
    const averageRating = await getAverageRatingsRequest(movieId);
    console.log('la note moyenne', averageRating);
    setRelationsAverageRating(averageRating);
  };

  useEffect(() => {
    getAverageRating(infos.movie_id);
  }, [infos]);

  useEffect(() => {
    console.log(sortedGoldNuggetUserInfos);
  }, [sortedGoldNuggetUserInfos]);

  return (
    <Stack
      position="absolute"
      top="0"
      left="0"
      height="100%"
      width="100%"
      bgcolor="rgba(0, 0, 0, 0.67)"
      padding="6px"
      alignItems="center"
    >
      <Typography
        variant="h2"
        align="center"
        color="#fff"
        fontSize="2.5em"
        fontFamily="Sirin Stencil"
        marginBottom="7px"
      >
        {'PÉPITE.'}
      </Typography>
      <Divider
        sx={{
          width: '75px',
          borderBottomWidth: 'medium',
          borderColor: '#fff',
        }}
      />
      <Stack width="100%" flexGrow="1" alignItems="center" padding="30px 0">
        <VisibilityOffIcon
          fontSize="large"
          sx={{
            color: '#fff',
            marginBottom: '15px',
            cursor: 'pointer',
          }}
          onClick={() => setShowUserInfos(false)}
        />
        <AvatarGroup max={4}>
          {sortedGoldNuggetUserInfos?.map((userInfo, index) => {
            const userRelationType =
              relationshipStatus[userInfo.id]?.relation_type || 'unknown';

            return (
              <Avatar
                key={index}
                alt={`Photo de profil de ${userInfo.first_name}`}
                src={
                  userInfo.profilPics.length
                    ? `${apiBaseUrl}/uploads/${
                        userInfo.profilPics.find(pic => pic.isActive === 1)
                          .filePath
                      }`
                    : 'http://127.0.0.1:5173/images/default_profil_pic.png'
                }
                sx={{
                  width: goldNuggetUserInfos.length > 1 ? 70 : 90,
                  height: goldNuggetUserInfos.length > 1 ? 70 : 90,
                  border: 'none !important',
                  outlineWidth:
                    goldNuggetUserInfos.length > 1 ? '2.5px' : '3.5px',
                  outlineStyle: 'solid',
                  outlineColor:
                    userRelationType === 'close_friend'
                      ? '#ef3f43'
                      : userRelationType === 'friend'
                      ? '#F29E50'
                      : '#24A5A5',
                  marginBottom: '15px',
                }}
              />
            );
          })}
        </AvatarGroup>
        {closeFriendCount > 0 && (
          <>
            <Typography
              align="center"
              sx={{ color: '#fff', fontSize: '1.05em' }}
              onClick={e => {
                setShowRatingsDetails(e.currentTarget);
              }}
            >
              {closeFriendCount > 0 && (
                <>
                  <span
                    style={{
                      color: '#ef3f43',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {`${closeFriendCount} ami${
                      closeFriendCount > 1 ? 's' : ''
                    } proche${closeFriendCount > 1 ? 's' : ''}`}
                  </span>
                  {closeFriendCount > 1 ? ' ont noté' : ' a noté'}
                </>
              )}
            </Typography>
            <RelationAverageRatings
              open={openRelationsRatings}
              anchorEl={showRatingsDetails}
              setAnchorEl={setShowRatingsDetails}
            />
          </>
        )}
        {friendCount > 0 && (
          <Typography align="center" sx={{ color: '#fff', fontSize: '1.05em' }}>
            {friendCount > 0 && (
              <>
                <span style={{ color: '#F29E50', fontWeight: 'bold' }}>
                  {`${friendCount} ami${friendCount > 1 ? 's' : ''}`}
                </span>
                {friendCount > 1 ? ' ont noté' : ' a noté'}
              </>
            )}
          </Typography>
        )}
        {followedCount > 0 && (
          <Typography align="center" sx={{ color: '#fff', fontSize: '1.05em' }}>
            {followedCount > 0 && (
              <>
                <span style={{ color: '#24A5A5', fontWeight: 'bold' }}>
                  {`${followedCount} suivi${followedCount > 1 ? 's' : ''}`}
                </span>
                {followedCount > 1 ? ' ont noté' : ' a noté'}
              </>
            )}
          </Typography>
        )}
        <Typography
          color="primary"
          align="center"
          fontSize="2em"
          fontWeight="bold"
        >
          {infos?.title ? `${infos.title}` : `${infos.name}`}
        </Typography>
        {relationsAverageRating && (
          <Stack direction="row" alignItems="center">
            <OrangeRating
              name="half-rating-read"
              value={parseFloat(relationsAverageRating)}
              precision={0.1}
              readOnly
              emptyIcon={
                <StarIcon sx={{ color: '#E1E1E1', fontSize: '1em' }} />
              }
              sx={{ marginRight: '10px', fontSize: '1.3em' }}
            />
            <Typography fontSize="1.3em" color="secondary" fontWeight="bold">
              {`${formatRating(relationsAverageRating)} / 5`}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

ModalPosterContent.propTypes = {
  infos: PropTypes.object.isRequired,
  goldNuggetUserInfos: PropTypes.array.isRequired,
  setShowUserInfos: PropTypes.func.isRequired,
  relationshipStatus: PropTypes.object.isRequired,
};

export default ModalPosterContent;
