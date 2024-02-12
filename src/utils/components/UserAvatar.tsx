import { Avatar } from '@mui/material';
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import PropTypes from 'prop-types';

const UserAvatar = ({
  variant,
  userInfos,
  picWidth,
  picHeight,
  isOutlined,
  outlineWidth,
  relationType,
  sx,
}) => {
  // const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));
  const fullName = `${userInfos.first_name} ${userInfos.last_name}`;

  const findProfilPic = userInfos => {
    if (userInfos.profilPics.length) {
      const findActivePic = userInfos.profilPics.find(pic => pic.isActive === 1)
        ?.filePath;
      return `${apiBaseUrl}/uploads/${findActivePic}`;
    } else {
      return `${assetsBaseUrl}/images/default_profil_pic.png`;
    }
  };

  const findRelationColor = relationType => {
    if (!isOutlined) return 'transparent';

    switch (relationType) {
      case 'close_friend':
        return '#ff7b00';
      case 'friend':
        return '#f29e50';
      case 'followed':
        return '#24a5a5';
      case 'self':
        return '#fff';
      default:
        return '#fff';
    }
  };

  return (
    <Avatar
      variant={variant}
      alt={`Photo de profil de ${fullName}`}
      src={findProfilPic(userInfos)}
      sx={{
        width: picWidth,
        height: picHeight,
        border: 'none !important',
        outlineWidth: isOutlined ? outlineWidth : 'medium',
        outlineStyle: 'solid',
        outlineColor: findRelationColor(relationType),
        cursor: 'pointer',
        ...sx,
      }}
    />
  );
};

UserAvatar.propTypes = {
  variant: PropTypes.string.isRequired,
  userInfos: PropTypes.object.isRequired,
  picWidth: PropTypes.number.isRequired,
  picHeight: PropTypes.number.isRequired,
  isOutlined: PropTypes.bool.isRequired,
  outlineWidth: PropTypes.string,
  relationType: PropTypes.string,
  sx: PropTypes.object,
};

export default UserAvatar;
