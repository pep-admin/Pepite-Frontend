// Import des libs externes
import { Typography, AvatarGroup } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import AcquaintancesMenu from '@utils/components/AcquaintancesMenu';
import UserAvatar from '@utils/components/UserAvatar';

const ModalAcquaintancesInfos = ({
  goldNuggetUserInfos,
  relationshipStatus,
  relationsRatings,
}) => {
  const [showRatingsDetails, setShowRatingsDetails] = useState(null);
  const [chosenRelationship, setChosenRelationShip] = useState('close_friend');

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

  // Ajoute le type de relation pour chaque utilisateur qui a la pépite en commun
  const sortedAndMappedGoldNuggetUserInfos = sortedGoldNuggetUserInfos.map(
    userInfo => {
      const relationType =
        relationshipStatus[userInfo.id]?.relation_type || 'unknown';
      return {
        ...userInfo,
        relation_type: relationType,
      };
    },
  );

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

  return (
    <>
      <AvatarGroup max={4} sx={{ order: '2' }}>
        {sortedAndMappedGoldNuggetUserInfos?.map((userInfos, index) => {
          return (
            <UserAvatar
              key={index}
              variant={'circular'}
              userInfos={userInfos}
              picWidth={goldNuggetUserInfos.length > 1 ? 70 : 90}
              picHeight={goldNuggetUserInfos.length > 1 ? 70 : 90}
              isOutlined={true}
              outlineWidth={goldNuggetUserInfos.length > 1 ? '2.5px' : '3.5px'}
              relationType={userInfos.relation_type}
              sx={{ marginBottom: '15px' }}
              redirection={false}
            />
          );
        })}
      </AvatarGroup>
      {closeFriendCount > 0 && (
        <>
          <Typography
            align="center"
            sx={{ color: '#fff', fontSize: '1.05em', order: '3' }}
            onClick={e => {
              setChosenRelationShip('close_friend');
              setShowRatingsDetails(e.currentTarget);
            }}
          >
            {closeFriendCount > 0 && (
              <>
                <span
                  style={{
                    color: '#ff7b00',
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
          <AcquaintancesMenu
            page={'poster'}
            open={openRelationsRatings}
            anchorEl={showRatingsDetails}
            setAnchorEl={setShowRatingsDetails}
            infos={sortedAndMappedGoldNuggetUserInfos}
            chosenRelationship={chosenRelationship}
            ratings={relationsRatings}
          />
        </>
      )}
      {friendCount > 0 && (
        <>
          <Typography
            align="center"
            sx={{ color: '#fff', fontSize: '1.05em', order: '4' }}
            onClick={e => {
              setChosenRelationShip('friend');
              setShowRatingsDetails(e.currentTarget);
            }}
          >
            {friendCount > 0 && (
              <>
                <span style={{ color: '#F29E50', fontWeight: 'bold' }}>
                  {`${friendCount} ami${friendCount > 1 ? 's' : ''}`}
                </span>
                {friendCount > 1 ? ' ont noté' : ' a noté'}
              </>
            )}
          </Typography>
          <AcquaintancesMenu
            page={'poster'}
            open={openRelationsRatings}
            anchorEl={showRatingsDetails}
            setAnchorEl={setShowRatingsDetails}
            infos={sortedAndMappedGoldNuggetUserInfos}
            chosenRelationship={chosenRelationship}
            ratings={relationsRatings}
          />
        </>
      )}
      {followedCount > 0 && (
        <>
          <Typography
            align="center"
            sx={{ color: '#fff', fontSize: '1.05em', order: '5' }}
            onClick={e => {
              setChosenRelationShip('followed');
              setShowRatingsDetails(e.currentTarget);
            }}
          >
            {followedCount > 0 && (
              <>
                <span style={{ color: '#24A5A5', fontWeight: 'bold' }}>
                  {`${followedCount} suivi${followedCount > 1 ? 's' : ''}`}
                </span>
                {followedCount > 1 ? ' ont noté' : ' a noté'}
              </>
            )}
          </Typography>
          <AcquaintancesMenu
            page={'poster'}
            open={openRelationsRatings}
            anchorEl={showRatingsDetails}
            setAnchorEl={setShowRatingsDetails}
            infos={sortedAndMappedGoldNuggetUserInfos}
            chosenRelationship={chosenRelationship}
            ratings={relationsRatings}
          />
        </>
      )}
    </>
  );
};

ModalAcquaintancesInfos.propTypes = {
  goldNuggetUserInfos: PropTypes.array.isRequired,
  relationshipStatus: PropTypes.object.isRequired,
  relationsRatings: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

export default ModalAcquaintancesInfos;
