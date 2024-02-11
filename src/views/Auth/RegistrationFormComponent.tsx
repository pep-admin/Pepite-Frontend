// Import de libs externes
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import AuthHeader from './AuthHeader';
import '../../styles/autofill.css';
import { useNavigate } from 'react-router-dom';

function RegistrationFormComponent({ formik, setIsBtnClicked }) {
  // Status de l'autocomplétion de chrome sur les inputs
  const [isAutoFill, setIsAutoFill] = useState({
    lastName: false,
    firstName: false,
    email: false,
  });

  const navigate = useNavigate();

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
          bgcolor: 'form.main',
          height: '90%',
          textAlign: 'center',
          padding: '0 10%',
          margin: '5% 0',
        }}
      >
        <Stack>
          <AuthHeader />
          <form onSubmit={formik.handleSubmit}>
            <Stack
              spacing={3}
              marginBottom={'20px'}
              borderRadius={'20px'}
              paddingY={'30px'}
              paddingX={'12%'}
              sx={{
                backgroundColor: 'form.dark',
              }}
            >
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

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                {"S'inscrire"}
              </Button>
              {formik.status && formik.status.state === 'success' ? (
                <Typography variant="body1" color="success.main">
                  {formik.status.message}
                </Typography>
              ) : formik.status && formik.status.state === 'error' ? (
                <Typography variant="body1" color="error.main">
                  {formik.status.message}
                </Typography>
              ) : null}
            </Stack>
          </form>
          <Stack
            borderRadius={'20px'}
            padding={'25px 12% 30px 12%'}
            sx={{
              backgroundColor: 'form.dark',
            }}
          >
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                color: '#8E8E8E',
                whiteSpace: 'nowrap',
              }}
            >
              {'Vous possédez déjà un compte ?'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIsBtnClicked(true);
                navigate('/login');
              }}
            >
              {'Se connecter'}
            </Button>
          </Stack>
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
