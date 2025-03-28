import { Stack, Typography } from '@mui/material';
import mainLogo from '/images/main_logo.png';

const AuthHeader2 = ({ backgroundMovieTitle }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row">
        <Stack>
          <img
            src={mainLogo}
            alt="logo de pépite"
            style={{
              height: '50px',
              width: '50px',
              position: 'relative',
              bottom: '2px',
            }}
          />
        </Stack>
        <Stack>
          <Typography
            variant="h1"
            color={'#fff'}
            fontSize={'2.2em'}
            sx={{
              letterSpacing: '-1.9px',
            }}
          >
            {'pépite.'}
          </Typography>
          <Typography
            variant="h2"
            fontSize="1.2em"
            component="p"
            fontFamily={'Square peg'}
            color="#D69B33"
            position="relative"
            bottom="2px"
          >
            {'Échanges cinéphiles'}
          </Typography>
        </Stack>
      </Stack>
      {backgroundMovieTitle ? (
        <Stack height="45px" justifyContent="center">
          <Typography fontWeight="200" fontStyle="italic" color="#B8B8B8">
            {`${backgroundMovieTitle}`}
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default AuthHeader2;
