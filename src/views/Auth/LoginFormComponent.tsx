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

// Import des composants internes
import AuthHeader from './AuthHeader';
import { EnvInfo } from '@components/EnvInfo';
import { useNavigate } from 'react-router-dom';

const LoginFormComponent = ({ formik }) => {
  const navigate = useNavigate();

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
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
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
                  color="primary"
                  fullWidth
                  sx={{ color: '#ffffff' }}
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
            }}
          >
            {"Vous n'avez pas de compte ?"}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ color: '#ffffff' }}
            onClick={() => navigate('/register')}
          >
            {"S'inscrire"}
          </Button>
        </Box>
        <EnvInfo />
      </Container>
    </div>
  );
};

// Règle les erreurs es-lint
LoginFormComponent.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default LoginFormComponent;
