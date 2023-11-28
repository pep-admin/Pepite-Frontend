import useCheckAuth from '@hooks/useCheckAuth';
import Header from '@utils/Header';

const Home = () => {
  const { isAuthenticated, isLoading } = useCheckAuth();

  // Si le statut d'authentification est en cours de chargement, affichez un indicateur de chargement
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, ne rien rendre (ou rendre un composant spécifique)
  if (!isAuthenticated) {
    return null;
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
