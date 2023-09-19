import {
  TextField, Typography, Grid, CssBaseline, Container, 
} from '@mui/material';


const Register = () => {
  return (
    <>
      <Container sx={{ bgcolor: '#0E6666', height: '100vh' }} maxWidth="sm">
        <Typography variant="h1" sx={{ color: '#24A5A5' }}>
              Pépite
        </Typography>
        <Container>
          <TextField id="outlined-basic" label="Nom" variant="outlined" />
          <TextField id="outlined-basic" label="Prénom" variant="outlined" />
          <TextField id="outlined-basic" label="E-mail" variant="outlined" />
          <TextField id="outlined-basic" label="Mot de passe" variant="outlined" />
          <TextField id="outlined-basic" label="Confirmer le mot de passe" variant="outlined" />
        </Container>
        
      </Container>
    </>
    
  );
};

export default Register;