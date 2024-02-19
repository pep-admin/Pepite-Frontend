// Import de libs externes
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Import des composants internes
import AuthHeader from './AuthHeader';

import '../../styles/autofill.css';

function RegistrationFormComponent({ formik, setIsBtnClicked }) {
  const navigate = useNavigate();

  // Status de l'autocomplétion de chrome sur les inputs
  const [isAutoFill, setIsAutoFill] = useState({
    lastName: false,
    firstName: false,
    email: false,
  });

  // Détecte si une animation d'autocomplétion est lancée / arrêtée
  function detectAutoFill(inputName) {
    return {
      onAnimationStart: e => {
        if (e.animationName === 'onAutoFillStart') {
          setIsAutoFill(prevState => ({ ...prevState, [inputName]: true }));
        }
      },
      onAnimationEnd: e => {
        if (e.animationName === 'onAutoFillCancel') {
          setIsAutoFill(prevState => ({ ...prevState, [inputName]: false }));
        }
      },
    };
  }

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
        <Stack>
          <AuthHeader />
          <Box
            sx={{
              backgroundColor: 'form.dark',
              borderRadius: '20px',
              padding: '20px 10% 10px 10%',
              marginBottom: '20px',
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid container rowGap='20px'>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nom"
                    variant="outlined"
                    autoComplete="family-name"
                    required
                    InputProps={{
                      ...detectAutoFill('lastName'),
                      inputProps: {
                        className: 'auto-fill-state',
                      },
                    }}
                    InputLabelProps={{ shrink: isAutoFill.firstName || undefined }}
                    {...formik.getFieldProps('lastName')}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Prénom"
                    variant="outlined"
                    autoComplete="given-name"
                    required
                    InputProps={{
                      ...detectAutoFill('firstName'),
                      inputProps: {
                        className: 'auto-fill-state',
                      },
                    }}
                    InputLabelProps={{ shrink: isAutoFill.lastName || undefined }}
                    {...formik.getFieldProps('firstName')}
                    error={
                      formik.touched.firstName && Boolean(formik.errors.firstName)
                    }
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>  
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    autoComplete="email"
                    required
                    InputProps={{
                      ...detectAutoFill('email'),
                      inputProps: {
                        className: 'auto-fill-state',
                      },
                    }}
                    InputLabelProps={{ shrink: isAutoFill.email || undefined }}
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
                    autoComplete="new-password"
                    required
                    {...formik.getFieldProps('password')}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12}>  
                  <TextField
                    fullWidth
                    label="Confirmez le mot de passe"
                    type="password"
                    variant="outlined"
                    autoComplete="new-password"
                    required
                    {...formik.getFieldProps('passwordConfirm')}
                    error={
                      formik.touched.passwordConfirm &&
                      Boolean(formik.errors.passwordConfirm)
                    }
                    helperText={
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ 
                      background: 'linear-gradient(315deg, rgba(51, 170, 91, 1) 0%, rgba(36, 165, 165, 1) 100%)', 
                      color: '#ffffff',
                      lineHeight: 'normal',
                      padding: '2px 0 0 0'
                    }}
                  >
                    {'S\'inscrire'}
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: '10px' }}>
                {formik.status && formik.status.state === 'error' ? (
                  <Typography variant="body1" color="error.main">
                    {formik.status.message}
                  </Typography>
                ) : null}
              </Box>
            </form>
          </Box>
          <Box
            sx={{
              backgroundColor: 'form.dark',
              borderRadius: '20px',
              padding: '13px 10% 20px 10%',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#8E8E8E',
                marginBottom: '11px'
              }}
            >
              {'Vous possédez déjà un compte ?'}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                width: '75%',
                backgroundColor: 'form.light', 
                color: '#ffffff',
                lineHeight: 'normal',
                padding: '2px 0 0 0'
              }}
              onClick={() => navigate('/login')}
            >
              {'Se connecter'}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

// Règle les erreurs es-lint
RegistrationFormComponent.propTypes = {
  formik: PropTypes.object.isRequired,
  setIsBtnClicked: PropTypes.func.isRequired,
};

export default RegistrationFormComponent;
