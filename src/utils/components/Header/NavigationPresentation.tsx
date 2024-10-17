import { Stack, Typography, useTheme } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import UserAvatar from '../UserAvatar';

const NavigationPresentation = ({ loggedUserInfos }) => {

  const theme = useTheme();

  const fullName = `${loggedUserInfos.first_name} ${loggedUserInfos.last_name}`;

  return (
    <Stack>
      <Stack
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        <UserAvatar
          userInfos={loggedUserInfos}
          picHeight={'100px'}
          picWidth={'100px'}
          sx={null}
        />
        <Stack>
          <Typography
            align='center'
            fontFamily='Pragati Narrow, sans-serif'
            fontSize='1.4em'
          >
            {`${fullName}`}
          </Typography>
          <Stack 
            direction='row' 
            justifyContent='center'
            position='relative'
          >
            <MilitaryTechIcon 
              sx={{
                color: theme.palette.secondary.light,
                position: 'absolute',
                left: '-17px'
              }}
            />
            <Typography
              align='center'
              fontFamily='Pragati Narrow, sans-serif'
              color='secondary.light'
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