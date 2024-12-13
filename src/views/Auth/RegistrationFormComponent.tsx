// Import de libs externes
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import '../../styles/autofill.css';

function RegistrationFormComponent({ formik, setAuthPage }) {

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
    <Container
      sx={{
        padding: '0 9vw'
      }}
    >
      <Typography
        fontSize='1.25em'
        fontWeight='800'
        color='#E7E7E7'
      >
        {'Inscription'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={5} marginTop='12px'>
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
            InputLabelProps={{
              shrink: isAutoFill.firstName || undefined,
            }}
            {...formik.getFieldProps('lastName')}
            error={
              formik.touched.lastName && Boolean(formik.errors.lastName)
            }
            helperText={
              formik.touched.lastName && formik.errors.lastName
            }
            FormHelperTextProps={{
              sx: {
                position: 'absolute',
                bottom: '-22px'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #c5c5c5'
              }
            }}
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
            InputLabelProps={{
              shrink: isAutoFill.lastName || undefined,
            }}
            {...formik.getFieldProps('firstName')}
            error={
              formik.touched.firstName &&
              Boolean(formik.errors.firstName)
            }
            helperText={
              formik.touched.firstName && formik.errors.firstName
            }
            FormHelperTextProps={{
              sx: {
                position: 'absolute',
                bottom: '-22px'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #c5c5c5'
              }
            }}
          />
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
            FormHelperTextProps={{
              sx: {
                position: 'absolute',
                bottom: '-22px'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #c5c5c5'
              }
            }}
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
            helperText={
              formik.touched.password && formik.errors.password
            }
            FormHelperTextProps={{
              sx: {
                position: 'absolute',
                bottom: '-22px'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #c5c5c5'
              }
            }}
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
            FormHelperTextProps={{
              sx: {
                position: 'absolute',
                bottom: '-22px'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #c5c5c5'
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background:
                'linear-gradient(45deg, rgba(177, 145, 16, 1) 0%, rgba(194, 172, 99, 1) 100%)',
              color: '#ffffff',
              lineHeight: 'normal',
              padding: '2px 0 0 0',
            }}
          >
            {'S\'inscrire'}
          </Button>
        </Stack>
        <Box sx={{ marginTop: '13px' }}>
          {formik.status && formik.status.state === 'error' ? (
            <Typography variant="body1" color="error.main">
              {formik.status.message}
            </Typography>
          ) : null}
        </Box>
      </form>
      <Divider sx={{ borderColor: '#616161', margin: '23px 0 17px 0' }}/>
      <Stack direction='row'>
        <Typography
          variant="body1"
          sx={{
            color: '#8E8E8E',
            marginBottom: '11px',
          }}
        >
          {"Déjà un compte ?"}
        </Typography>
        <Typography
          color='primary.light'
          fontWeight='500'
          marginLeft='5px'
          onClick={() => setAuthPage('login')}
        >
          {'Connexion'}
        </Typography>
      </Stack>
    </Container>
  );
}

export default RegistrationFormComponent;
