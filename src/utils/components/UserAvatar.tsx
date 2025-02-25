import { Avatar } from '@mui/material';
import { apiBaseUrl } from '@utils/request/config';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const UserAvatar = ({
  userInfos,
  picWidth,
  picHeight,
  sx,
  redirection,
  onSelect,
}) => {
  const navigate = useNavigate();

  const fullName = `${userInfos.first_name} ${userInfos.last_name}`;

  let activeProfilPic = null;

  if (userInfos.profilPics) {
    activeProfilPic = userInfos.profilPics.find(pic => pic.isActive === 1)
      ?.filePath;
  } else {
    activeProfilPic = userInfos.profile_pic;
  }

  return (
    <Avatar
      variant="circular"
      alt={`Photo de ${fullName}`}
      src={
        activeProfilPic ? `${apiBaseUrl}/uploads/${activeProfilPic}` : undefined
      }
      sx={{
        height: `${picHeight}`,
        width: `${picWidth}`,
        border: '1px solid #2E2E2E',
        fontSize: `calc(0.4 * ${picHeight})`,
        backgroundColor: activeProfilPic ? 'inherit' : '#0c6666',
        color: '#011212',
        maxHeight: '150px',
        maxWidth: '150px',
        ...sx,
      }}
      onClick={() =>
        redirection
          ? navigate(`/profil/${userInfos.id}`)
          : onSelect
          ? onSelect(userInfos)
          : null
      }
    >
      {/* Si pas de photo de profil */}
      {
        !activeProfilPic &&
          fullName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) // Limiter à 2 lettres
      }
    </Avatar>
  );
};

export default UserAvatar;
