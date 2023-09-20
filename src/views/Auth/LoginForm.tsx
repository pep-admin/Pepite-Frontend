import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import AuthHeader from './AuthHeader';

const LoginForm = () => {
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
            padding: '30px 12% 17px 12%',
            marginBottom: '20px',
          }}
        >
          <form>
            <Grid container spacing={3}>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ color: '#ffffff' }}
                >
                  Se connecter
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: '13px' }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#8E8E8E',
                  cursor: 'pointer',
                  '&:hover': { color: '#24A5A5' },
                }}
              >
                Mot de passe oublié ?
              </Typography>
            </Box>
          </form>
        </Box>
        <Box
          sx={{
            backgroundColor: '#094B4B',
            borderRadius: '20px',
            padding: '20px 12% 25px 12%',
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
            Vous n'avez pas de compte ?
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ color: '#ffffff' }}
            href="http://127.0.0.1:5173/register"
          >
            S'inscrire
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;
