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
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import PropTypes from 'prop-types';
import ColoredRating from './ColoredRating';

const AcquaintancesMenu = ({
  page,
  open,
  anchorEl,
  setAnchorEl,
  infos,
  chosenRelationship,
  ratings,
}) => {
  console.log('les infos', infos);

  // Filtre les utilisateurs selon leur relation avec l'utilisateur connecté, selon le choix d'affichage (amis proches, amis ou suivis)
  const filteredUsers =
    page === 'poster'
      ? infos.filter(relation => relation.relation_type === chosenRelationship)
      : infos;

  // Url de la photo de profil par défaut
  const getDefaultProfilePicUrl = () =>
    `${assetsBaseUrl}/images/default_profil_pic.png`;

  // Fonction qui récupère la photo de profil active de l'utilisateur
  const getProfilePicUrl = user => {
    if (page === 'poster') {
      const activePic = user.profilPics?.find(pic => pic.isActive === 1);
      return activePic
        ? `${apiBaseUrl}/uploads/${activePic.filePath}`
        : getDefaultProfilePicUrl();
    } else {
      return user.file_path?.length
        ? `${apiBaseUrl}/uploads/${user.file_path}`
        : getDefaultProfilePicUrl();
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        sx: {
          padding: '0',
        },
      }}
      autoFocus={false}
    >
      {filteredUsers?.map((user, index) => [
        <MenuItem
          key={user.id}
          onClick={() => setAnchorEl(null)}
          sx={{
            columnGap: '10px',
            padding: '6px 10px 6px 8px',
            fontSize: '0.9em',
          }}
        >
          <Avatar
            alt={`Photo de profil de ${user.first_name} ${user.last_name}`}
            src={getProfilePicUrl(user)}
            sx={{
              height: 40,
              width: 40,
            }}
          />
          <Stack>
            <Typography variant="body2">
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            {page === 'poster' || page === 'list' ? (
              <Stack direction="row" alignItems="center">
                <ColoredRating
                  readOnly={true}
                  precision={0.5}
                  color={
                    page === 'poster'
                      ? '#F29E50'
                      : user.relation_type === 'close_friend'
                      ? '#ff7b00'
                      : user.relation_type === 'friend'
                      ? '#F29E50'
                      : '#24A5A5'
                  }
                  emptyColor="gray"
                  value={
                    page === 'poster'
                      ? ratings?.individual_ratings.find(
                          rating => rating.userId === user.id,
                        )?.rating
                      : user.rating
                  }
                />
                <Typography fontSize="0.8em" fontWeight="bold">
                  {page === 'poster'
                    ? `${formatRating(
                        ratings?.individual_ratings.find(
                          rating => rating.userId === user.id,
                        ).rating,
                      )} / 5`
                    : `${user.rating} / 5`}
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </MenuItem>,
        filteredUsers.length - 1 === index ? null : (
          <Divider sx={{ margin: '0 !important' }} />
        ),
      ])}
    </Menu>
  );
};

AcquaintancesMenu.propTypes = {
  page: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func.isRequired,
  infos: PropTypes.array,
  chosenRelationship: PropTypes.string,
  ratings: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AcquaintancesMenu;
