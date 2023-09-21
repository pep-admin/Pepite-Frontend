// Import de libs externes
import { Stack, Typography } from '@mui/material';

const AuthHeader = () => {
  return (
    <Stack
      marginBottom={'20px'}
      borderRadius={'20px'}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography
        variant="h1"
        color={'#24A5A5'}
        fontSize={'4em'}
        marginBottom={'20px'}
      >
        {'Pépite.'}
      </Typography>
      <Typography
        variant="h2"
        color={'#FEFEFE'}
        fontSize={'1.5em'}
        maxWidth={'250px'}
      >
        {'Partagez vos films et séries préférés avec vos amis.'}
      </Typography>
    </Stack>
  );
};

export default AuthHeader;
