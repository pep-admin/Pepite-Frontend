import { Stack, Typography } from '@mui/material';

const ProfilReviews = ({ isProfilLoggedUser, userInfos }) => {
  return (
    <Stack
      spacing={3}
      padding='30px 0 40px 0'
    >
      <Stack width='fit-content' >
        <Typography
          component='h2'
          color='text.primary'
          fontSize='1.15em'
          fontWeight='400'
          textTransform='uppercase'
        >
          {
            isProfilLoggedUser ?
              'Vos notations'
            :
              `Notations de ${userInfos.first_name}`
          }
        </Typography>
      </Stack>
      <Stack spacing={4}>
        <Typography
          color='#555555'
          lineHeight='1'
        >
            {
            isProfilLoggedUser ?
              'Vous n\'avez encore rien noté.'
            :
              `${userInfos.first_name} n'a encore rien noté.`
          }
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProfilReviews;