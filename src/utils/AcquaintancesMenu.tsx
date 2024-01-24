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

const AcquaintancesMenu = ({
  page,
  open,
  anchorEl,
  setAnchorEl,
  infos,
  chosenRelationship,
  ratings,
}) => {
  // Filtre les utilisateurs selon leur relation avec l'utilisateur connecté, selon le choix d'affichage (amis proches, amis ou suivis)
  const filteredUsers =
    page === 'poster'
      ? infos.filter(relation => relation.relation_type === chosenRelationship)
      : infos;

  const getDefaultProfilePicUrl = () =>
    'http://127.0.0.1:5173/images/default_profil_pic.png';

  const getProfilePicUrl = user => {
    if (page === 'poster') {
      const activePic = user.profilPics?.find(pic => pic.isActive === 1);
      return activePic
        ? `${apiBaseUrl}/uploads/${activePic.filePath}`
        : getDefaultProfilePicUrl();
    } else {
      return user.file_path.length
        ? `${apiBaseUrl}/uploads/${user.file_path}`
        : getDefaultProfilePicUrl();
    }
  };

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
      {filteredUsers?.map((user, index) => [
        <MenuItem
          key={user.id}
          onClick={() => setAnchorEl(null)}
          sx={{
            columnGap: '13px',
            padding: '6px',
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
            {page === 'poster' ? (
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
  ratings: PropTypes.object,
};

export default AcquaintancesMenu;
