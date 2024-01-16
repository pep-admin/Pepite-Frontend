// Import des libs externes
import {
  Menu,
  MenuItem,
  Avatar,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { formatRating } from '@utils/functions/formatRating';
import apiBaseUrl from '@utils/request/config';
import { OrangeRating } from '@utils/styledComponent';
import PropTypes from 'prop-types';

const RelationAverageRatings = ({
  open,
  anchorEl,
  setAnchorEl,
  sortedAndMappedGoldNuggetUserInfos,
  chosenRelationship,
  ratings,
}) => {
  // Filtre les utilisateurs selon leur relation avec l'utilisateur connecté, selon le choix d'affichage (amis proches, amis ou suivis)
  const filteredUsers = sortedAndMappedGoldNuggetUserInfos.filter(
    relation => relation.relation_type === chosenRelationship,
  );

  console.log('les notes', ratings);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
        sx: {
          padding: '0',
        },
      }}
    >
      {filteredUsers.map((user, index) => [
        <MenuItem
          key={user.id}
          onClick={() => setAnchorEl(null)}
          sx={{
            columnGap: '13px',
            padding: '6px',
          }}
        >
          <Avatar
            alt={`Photo de profil de ${user.first_name} ${user.last_name}`}
            src={
              user.profilPics?.length
                ? `${apiBaseUrl}/uploads/${
                    user.profilPics.find(pic => pic.isActive === 1).filePath
                  }`
                : 'http://127.0.0.1:5173/images/default_profil_pic.png'
            }
            sx={{
              height: 43.9,
              width: 43.9,
            }}
          />
          <Stack>
            <Typography variant="body2">
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Stack direction="row" alignItems="center">
              <OrangeRating
                readOnly
                value={
                  ratings?.individual_ratings.find(
                    rating => rating.userId === user.id,
                  ).rating
                }
                precision={0.5}
                sx={{
                  fontSize: '0.9em',
                  position: 'relative',
                  left: '-4px',
                  bottom: '1.1px',
                }}
              />
              <Typography fontSize="0.8em" fontWeight="bold">
                {`${formatRating(
                  ratings?.individual_ratings.find(
                    rating => rating.userId === user.id,
                  ).rating,
                )} / 5`}
              </Typography>
            </Stack>
          </Stack>
        </MenuItem>,
        filteredUsers.length - 1 === index ? null : (
          <Divider sx={{ margin: '0 !important' }} />
        ),
      ])}
    </Menu>
  );
};

RelationAverageRatings.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func.isRequired,
  sortedAndMappedGoldNuggetUserInfos: PropTypes.array.isRequired,
  chosenRelationship: PropTypes.string.isRequired,
  ratings: PropTypes.object.isRequired,
};

export default RelationAverageRatings;
