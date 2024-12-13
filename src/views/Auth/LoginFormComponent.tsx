// Import de libs externes
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
  Divider,
} from '@mui/material';

const LoginFormComponent = ({ formik, isSubmitted, setAuthPage }) => {

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
        {'Connexion'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={5} marginTop='12px'>
          <TextField
            fullWidth
            label="Email"
            type="text"
            variant="outlined"
            autoComplete="e-mail"
            required
            {...formik.getFieldProps('email')}
            error={isSubmitted && Boolean(formik.errors.email)}
            helperText={isSubmitted && formik.errors.email}
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
            autoComplete="current-password"
            required
            {...formik.getFieldProps('password')}
            error={
              isSubmitted && Boolean(formik.errors.password)
            }
            helperText={isSubmitted && formik.errors.password}
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
            {'Se connecter'}
          </Button>
        </Stack>
        <Box sx={{ marginTop: '13px' }}>
          {formik.status && formik.status.state === 'error' ? (
            <Typography align='center' color="error.main">
              {formik.status.message}
            </Typography>
          ) : null}
          <Typography
            align='center'
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
      <Divider sx={{ borderColor: '#616161', margin: '17px 0' }}/>
      <Stack direction='row'>
        <Typography
          variant="body1"
          sx={{
            color: '#8E8E8E',
            marginBottom: '11px',
          }}
        >
          {"Pas de compte ?"}
        </Typography>
        <Typography
          color='primary.light'
          fontWeight='500'
          marginLeft='5px'
          onClick={() => setAuthPage('register')}
        >
          {'Inscription'}
        </Typography>
      </Stack>
    </Container>
  );
};

export default LoginFormComponent;
