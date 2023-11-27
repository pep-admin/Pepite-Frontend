import Header from '@utils/Header';
import { checkAuth } from '@utils/functions/checkAuth';

const Home = () => {
  // Redirection vers la page /login si utilisateur non authentifié
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {    
    return;
  } 

  return (
    // <AppBar position="static" sx={{ mb: 2 }}>
    //   <Toolbar>
    //     {/* <Typography variant="body1">{displayBuildDate}</Typography> */}
    //     <Stack
    //       direction={'row'}
    //       justifyContent={'center'}
    //       alignItems={'center'}
    //       width={'100%'}
    //     >
    //       {/* <Button color="inherit" component={Link} to="/">
    //         {'Home'}
    //       </Button>
    //       <Button color="inherit" component={Link} to="/login">
    //         Login
    //       </Button>
    //       <Button color="inherit" component={Link} to="/register">
    //         Register
    //       </Button>
    //       <Button color="inherit" component={Link} to="/about">
    //         About
    //       </Button>
    //       <Button color="inherit" component={Link} to="/swipe">
    //         Swipe
    //       </Button> */}

    //     </Stack>
    //   </Toolbar>
    // </AppBar>
    <Header />
  );
};

export default Home;
