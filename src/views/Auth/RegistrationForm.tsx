import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import AuthHeader from './AuthHeader';

function RegistrationForm() {
  return (
    <div
      style={{
        backgroundColor: '#0E6666',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: '#0E6666',
          height: '90%',
          textAlign: 'center',
          padding: '0 10%',
          margin: '5% 0',
        }}
      >
        <AuthHeader />
        <Box
          sx={{
            backgroundColor: '#094B4B',
            borderRadius: '20px',
            padding: '30px 12%',
            marginBottom: '20px',
          }}
        >
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Nom" variant="outlined" required />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Prénom"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmez le mot de passe"
                  type="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ color: '#ffffff' }}
                >
                  S'inscrire
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box
          sx={{
            backgroundColor: '#094B4B',
            borderRadius: '20px',
            padding: '25px 12% 30px 12%',
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
            Vous possédez déjà un compte ?
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ color: '#ffffff' }}
            href="http://127.0.0.1:5173/login"
          >
            Se connecter
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default RegistrationForm;
