import { Stack, Typography, useTheme } from '@mui/material';
import UserAvatar from '@utils/components/UserAvatar';
import ProfilRank from './ProfilRank';

const ProfilPresentation = ({ userInfos, additionalInfos }) => {

  const theme = useTheme();

  return (
    <>
      <UserAvatar
        userInfos={userInfos}
        picHeight={'40vw'}
        picWidth={'40vw'}
        sx={{
          position: 'absolute',
          top: '-20.5vh',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '3.4em'
        }}
        redirection={false}
      />
      <Stack marginTop='7vh' spacing={4} alignItems='center'>
        <Stack spacing={2} alignItems='center' width='100%'>
          <Typography
            component='h1'
            align='center'
            color={theme.palette.text.primary}
            fontFamily='League Spartan, sans-serif'
            fontSize='2.1em'
            fontWeight='300'
            lineHeight='1'
          >
            {`${userInfos.first_name} ${userInfos.last_name}`}
          </Typography>
          <ProfilRank userInfos={userInfos} />
        </Stack>
      </Stack>
    </>
  );
};

export default ProfilPresentation;