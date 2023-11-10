import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Stack } from '@mui/material';

const Home = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Stack direction="row" justifyContent={'center'} width={'100%'}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/swipe">
            Swipe
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Home;
