import { Box, Typography } from '@mui/material';

const AuthHeader = () => {
  return (
    <Box
      sx={{
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{ color: '#24A5A5', fontSize: '4em', marginBottom: '20px' }}
      >
        Pépite.
      </Typography>
      <Typography
        variant="h2"
        sx={{ color: '#FEFEFE', fontSize: '1.5em', maxWidth: '250px' }}
      >
        Partagez vos films et séries préférés avec vos amis.
      </Typography>
    </Box>
  );
};

export default AuthHeader;
