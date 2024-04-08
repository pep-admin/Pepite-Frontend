import { Avatar } from '@mui/material';
import { findRelationColor } from '@utils/functions/findRelationColor';
import { apiBaseUrl, assetsBaseUrl } from '@utils/request/config';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserAvatar = ({
  variant,
  userInfos,
  picWidth,
  picHeight,
  isOutlined,
  outlineWidth,
  relationType,
  sx,
  redirection,
}) => {
  const navigate = useNavigate();

  const fullName = `${userInfos.first_name} ${userInfos.last_name}`;

  const findProfilPic = userInfos => {
    if (userInfos.profilPics?.length) {
      const findActivePic = userInfos.profilPics.find(pic => pic.isActive === 1)
        ?.filePath;
      return `${apiBaseUrl}/uploads/${findActivePic}`;
    } else if (userInfos.profil_pic) {
      return `${apiBaseUrl}/uploads/${userInfos.profil_pic}`;
    } else {
      return `${assetsBaseUrl}/images/default_profil_pic.png`;
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
        outlineColor: !isOutlined
          ? 'transparent'
          : findRelationColor(relationType),
        cursor: 'pointer',
        ...sx,
      }}
      onClick={() => redirection && navigate(`/profil/${userInfos.id}`)}
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
  redirection: PropTypes.bool.isRequired,
};

export default UserAvatar;
