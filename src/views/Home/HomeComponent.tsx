// Import des composants internes
import Header from '@utils/Header';

const Home = () => {
  const userInfos = JSON.parse(localStorage.getItem('user_infos'));

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
    <Header userInfos={userInfos} />
  );
};

export default Home;
