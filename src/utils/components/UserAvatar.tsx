import { Avatar } from '@mui/material';
import { apiBaseUrl } from '@utils/request/config';
// import { useNavigate } from 'react-router-dom';

const UserAvatar = ({
  userInfos,
  picWidth,
  picHeight,
  sx,
  // redirection,
}) => {
  // const navigate = useNavigate();
  const activeProfilPic = userInfos.profilPics.find(pic => pic.isActive === 1)?.filePath;
  const fullName = `${userInfos.first_name} ${userInfos.last_name}`;

  return (
    <Avatar
      variant="circular"
      alt={`Photo de ${fullName}`}
      src={activeProfilPic ? `${apiBaseUrl}/uploads/${activeProfilPic}` : undefined}
      sx={{
        height: `${picHeight}`,
        width: `${picWidth}`,
        border: '1px solid #2E2E2E',
        fontSize: '2em', 
        backgroundColor: activeProfilPic ? 'inherit' : '#0c6666',
        color: '#040404',
        ...sx
      }}
    >
      {/* Si pas de photo de profil */}
      {!activeProfilPic && fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) // Limiter à 2 lettres
      }
    </Avatar>
  );
};

export default UserAvatar;
