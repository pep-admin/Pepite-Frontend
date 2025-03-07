import { useEffect, useState } from 'react';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import AuthHeader2 from '@views/Auth/AuthHeader2';
import LoginFormContainer from './LoginFormContainer';
import RegisterFormContainer from './RegisterFormContainer';

const backdropMovies = [
  // { title: 'Gladiator (2000)',
  //   backdrop_path: '/Ar7QuJ7sJEiC0oP3I8fKBKIQD9u.jpg'
  // }, // gladiator
  {
    title: 'Gladiator 2 (2024)',
    backdrop_path: '/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
  }, // gladiator 2
];

const AuthContainer = ({ authType }) => {
  const [authPage, setAuthPage] = useState(authType);
  const [backgroundMovie, setBackgroundMovie] = useState({
    image: null,
    title: null,
  });

  const getRandomBackdrop = movies => {
    if (!movies || movies.length === 0) {
      return null; // Si le tableau est vide ou non défini
    }
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  };

  useEffect(() => {
    // Récupérer une image aléatoire
    const randomBackdrop = getRandomBackdrop(backdropMovies);

    // Construire l'URL complète de l'image
    if (randomBackdrop) {
      const imageUrl = `https://image.tmdb.org/t/p/original${randomBackdrop.backdrop_path}`;
      setBackgroundMovie({ image: imageUrl, title: randomBackdrop.title });
    }
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: backgroundMovie.image
          ? `linear-gradient(
            rgba(1, 18, 18, 0.5) 0%,
            rgba(1, 18, 18, 0.5) 30%,  
            rgba(1, 18, 18, 0.6) 40%,
            rgba(1, 18, 18, 0.9) 55%, 
            rgba(1, 18, 18, 1) 65%,
            rgba(1, 18, 18, 1) 100%),
            url(${backgroundMovie.image})`
          : 'none',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          padding: '10px 5vw',
        }}
      >
        <AuthHeader2 backgroundMovieTitle={backgroundMovie.title} />
        <Stack alignItems="center" marginTop="80%">
          <Typography
            align="center"
            fontWeight="400"
            fontSize="1.4em"
            color="#E7E7E7"
            lineHeight="1.7"
          >
            Partagez vos films et séries <br /> préférées avec vos amis.
          </Typography>
          <Divider
            sx={{
              width: '100px',
              borderColor: '#D69B33',
              margin: '12px 0 24px 0',
            }}
          />
        </Stack>
        {authPage === 'login' ? (
          <LoginFormContainer setAuthPage={setAuthPage} />
        ) : (
          <RegisterFormContainer setAuthPage={setAuthPage} />
        )}
      </Container>
    </Box>
  );
};

export default AuthContainer;
