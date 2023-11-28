// Import de libs externes
import { Stack, Typography, Box, styled } from '@mui/material';
import { GoldNuggetIcon, GoldNuggetWireframe } from '@utils/styledComponent';
import { useEffect, useRef, useState } from 'react';
import { keyframes } from '@emotion/react';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

type AnimatedCircleProps = {
  size: string;
  left: string;
  bottom: string;
  rotation: string;
};
const getRiseKeyframes = (rotation) => keyframes`
  0% { transform: translateY(20px) rotate(${rotation}deg); opacity: 0; }
  45% { transform: translateY(-25px) rotate(${rotation}deg); opacity: 1; }
  100% { transform: translateY(-100px) rotate(${rotation}deg); opacity: 0; }
`;

const AnimatedCircle = styled(AutoAwesomeIcon)<AnimatedCircleProps>(({ size, left, bottom, rotation }) => {
  const riseAnimation = getRiseKeyframes(rotation);
  return {
    position: 'absolute',
    left,
    bottom,
    fontSize: size,
    animation: `${riseAnimation} 10s linear forwards`,
  };
});

const AuthHeader = () => {
  const logoRef = useRef(null);
  const [shine, setShine] = useState([]);

  useEffect(() => {
    // Créez et ajoutez des cercles à l'état
    const intervalId = setInterval(() => {
      const newShine = {
        size: (0.75 + Math.random() * 0.4).toString() + 'em',
        left: `${Math.random() * 100}%`,
        bottom: '0%',
        rotation: (Math.random() * 360).toString(),
        color: `rgba(255, ${Math.random() * (255 - 150) + 150}, 0, ${Math.random() + 0.4})`, // Génération de la couleur
        id: Math.random(),
        createdAt: Date.now()
      };
      setShine(prevShine => {
        const filteredShine = prevShine.filter(shineItem => Date.now() - shineItem.createdAt < 10000);
        console.log(filteredShine);
        
        return [...filteredShine, newShine];
      });
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
      <Box ref={logoRef} width='100px' position='relative'>
        <GoldNuggetIcon sx={{ fontSize: '4.5em' }}/>
        {/* <GoldNuggetWireframe sx={{ fontSize: '4.5em' }} /> */}
        {shine.map(shineItem => (
          <AnimatedCircle
            key={shineItem.id}
            size={shineItem.size}
            left={shineItem.left}
            bottom={shineItem.bottom}
            rotation={shineItem.rotation}
            sx={{ color: shineItem.color }}
          />
        ))}
      </Box>
      <Typography
        variant="h1"
        color={'#fff'}
        fontSize={'4em'}
      >
        {'PÉPITE.'}
      </Typography>
      <Typography variant='h5' component='p' fontFamily={'Square peg'} color='primary' marginBottom={'20px'}>
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
