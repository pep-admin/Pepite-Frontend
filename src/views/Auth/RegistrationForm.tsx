// Import de libs externes
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
// Import des composants internes
import AuthHeader from './AuthHeader';

function RegistrationForm() {
  return (
    <Box
      width={'100vw'}
      minHeight={'100vh'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: 'a_renommer.main',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: 'a_renommer.main',
          height: '90%',
          textAlign: 'center',
          padding: '0 10%',
          margin: '5% 0',
        }}
      >
        <Stack>
          <AuthHeader />
          <form>
            <Stack
              spacing={3}
              marginBottom={'20px'}
              borderRadius={'20px'}
              paddingY={'30px'}
              paddingX={'12%'}
              sx={{
                backgroundColor: 'a_renommer.dark',
              }}
            >
              <TextField fullWidth label="Nom" variant="outlined" required />
              <TextField fullWidth label="Prénom" variant="outlined" required />
              <TextField fullWidth label="Email" variant="outlined" required />
              <TextField
                fullWidth
                label="Mot de passe"
                type="password"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Confirmez le mot de passe"
                type="password"
                variant="outlined"
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                {"S'inscrire"}
              </Button>
            </Stack>
          </form>
          <Stack
            borderRadius={'20px'}
            padding={'25px 12% 30px 12%'}
            sx={{
              backgroundColor: 'a_renommer.dark',
            }}
          >
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                color: '#8E8E8E',
                cursor: 'pointer',
                '&:hover': { color: '#24A5A5' },
              }}
            >
              {'Vous possédez déjà un compte ?'}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              href="http://127.0.0.1:5173/login"
            >
              {'Se connecter'}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default RegistrationForm;
