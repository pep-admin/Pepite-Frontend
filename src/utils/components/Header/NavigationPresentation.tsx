import { Avatar, Stack, Typography } from '@mui/material';
import { apiBaseUrl } from '@utils/request/config';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const NavigationPresentation = ({ loggedUserInfos }) => {

  const fullName = `${loggedUserInfos.first_name} ${loggedUserInfos.last_name}`;
  const activeProfilPic = loggedUserInfos.profilPics.find(pic => pic.isActive === 1)?.filePath;

  return (
    <Stack>
      <Stack
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <Avatar
          variant="circular"
          alt={`Photo de ${fullName}`}
          src={activeProfilPic ? `${apiBaseUrl}/uploads/${activeProfilPic}` : undefined}
          sx={{
            height: '100px',
            width: '100px',
            border: '1px solid #2E2E2E',
            fontSize: '2em', 
            backgroundColor: activeProfilPic ? 'inherit' : '#0c6666',
            color: '#040404'
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
        <Stack>
          <Typography
            align='center'
            fontFamily='Pragati Narrow, sans-serif'
            fontSize='1.4em'
          >
            {`${fullName}`}
          </Typography>
          <Stack direction='row'>
            <MilitaryTechIcon 
              sx={{
                color: '#DD7909'
              }}
            />
            <Typography
              align='center'
              fontFamily='Pragati Narrow, sans-serif'
              color='#DD7909'
            >
              {`${loggedUserInfos.rank}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>

  );
};

export default NavigationPresentation;