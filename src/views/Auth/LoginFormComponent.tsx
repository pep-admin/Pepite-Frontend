// Import de libs externes
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Import des composants internes
import AuthHeader from './AuthHeader';

const LoginFormComponent = ({ formik }) => {
  const navigate = useNavigate();

  return (
    <Box
      width={'100vw'}
      minHeight={'100vh'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: 'form.main',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          height: '90%',
          textAlign: 'center',
          padding: '0 10%',
          margin: '5% 0',
        }}
      >
        <AuthHeader />
        <Box
          sx={{
            backgroundColor: '#034040',
            borderRadius: '20px',
            padding: '20px 10% 10px 10%',
            marginBottom: '20px',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container rowGap="20px">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="text"
                  variant="outlined"
                  autoComplete="e-mail"
                  required
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  variant="outlined"
                  autoComplete="current-password"
                  required
                  {...formik.getFieldProps('password')}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background:
                      'linear-gradient(315deg, rgba(51, 170, 91, 1) 0%, rgba(36, 165, 165, 1) 100%)',
                    color: '#ffffff',
                    lineHeight: 'normal',
                    padding: '2px 0 0 0',
                  }}
                >
                  {'Se connecter'}
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: '13px' }}>
              {formik.status && formik.status.state === 'error' ? (
                <Typography variant="body1" color="error.main">
                  {formik.status.message}
                </Typography>
              ) : null}
              <Typography
                variant="body1"
                sx={{
                  color: '#8E8E8E',
                  cursor: 'pointer',
                  '&:hover': { color: '#24A5A5' },
                }}
              >
                {'Mot de passe oublié ?'}
              </Typography>
            </Box>
          </form>
        </Box>
        <Box
          sx={{
            backgroundColor: '#034040',
            borderRadius: '20px',
            padding: '13px 10% 20px 10%',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#8E8E8E',
              marginBottom: '11px',
            }}
          >
            {"Vous n'avez pas de compte ?"}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '75%',
              backgroundColor: '#24A5A5',
              color: '#ffffff',
              lineHeight: 'normal',
              padding: '2px 0 0 0',
            }}
            onClick={() => navigate('/register')}
          >
            {"S'inscrire"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

// Règle les erreurs es-lint
LoginFormComponent.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default LoginFormComponent;
