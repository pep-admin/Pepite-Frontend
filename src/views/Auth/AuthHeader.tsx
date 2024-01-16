// Import de libs externes
import { Stack, Typography, Box } from '@mui/material';
import { GoldNuggetIcon } from '@utils/GoldNuggetIcon';
import { useEffect, useRef, useState } from 'react';

// Import d'un fichier CSS pour éviter la surcharge de balises style dans le head
import '../../styles/animations.css';

// Import des icônes
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AuthHeader = () => {
  const logoRef = useRef(null);
  const [shine, setShine] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const animationClass = `animatedCircle animatedCircle${Math.floor(
        Math.random() * 11,
      )}`;

      const newShine = {
        size: `${0.75 + Math.random() * 0.4}em`,
        left: `${Math.random() * 100}%`,
        bottom: '0%',
        color: `rgba(255, ${Math.random() * (255 - 150) + 150}, 0, ${
          Math.random() + 0.4
        })`,
        animationClass,
        id: Math.random(),
        createdAt: Date.now(),
      };
      setShine(prevShine =>
        prevShine
          .filter(shineItem => Date.now() - shineItem.createdAt < 10000)
          .concat(newShine),
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Stack
      marginBottom={'20px'}
      borderRadius={'20px'}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box ref={logoRef} width="70px" position="relative">
        <GoldNuggetIcon
          width={'64.25px'}
          height={'61px'}
          strokeWidth={'1.6'}
          isShadowed={true}
        />
        {shine.map(shineItem => (
          <AutoAwesomeIcon
            key={shineItem.id}
            style={{
              fontSize: shineItem.size,
              left: shineItem.left,
              bottom: shineItem.bottom,
              color: shineItem.color,
              position: 'absolute',
            }}
            className={shineItem.animationClass}
          />
        ))}
      </Box>
      <Typography
        variant="h1"
        color={'#fff'}
        fontSize={'4em'}
        sx={{
          textShadow: '#00000059 1px 4px 3px',
        }}
      >
        {'PÉPITE.'}
      </Typography>
      <Typography
        variant="h5"
        component="p"
        fontFamily={'Square peg'}
        color="primary"
        marginBottom={'20px'}
      >
        {'Échanges cinéphiles'}
      </Typography>
      <Typography
        variant="h2"
        color={'#FEFEFE'}
        fontSize={'1.5em'}
        maxWidth={'250px'}
      >
        {'Partagez vos films et séries préférés avec vos amis.'}
      </Typography>
    </Stack>
  );
};

export default AuthHeader;
