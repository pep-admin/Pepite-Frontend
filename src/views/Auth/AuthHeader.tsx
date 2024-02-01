// Import de libs externes
import { Stack, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

// Import d'un fichier CSS pour éviter la surcharge de balises style dans le head
import '../../styles/animations.css';

// Import des icônes
import { ShineIcon } from '@utils/components/styledComponent';

let iconIdCounter = 0;

const AuthHeader = () => {
  const [icons, setIcons] = useState([]); // Les étoiles qui brillent

  // Génère une position X en empêchant l'apparition de l'étoile ailleurs que sur les pépites
  const generateRandomX = (
    boxWidth,
    iconWidth,
    excludeRange,
    allowedValues,
  ) => {
    let x = Math.random() * (boxWidth - iconWidth);
    if (x > excludeRange[0] && x < excludeRange[1]) {
      const randomIndex = Math.floor(Math.random() * allowedValues.length);
      x = allowedValues[randomIndex];
    }

    return x;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const excludeRange = [5, 32]; // La plage de valeurs à exclure sur l'axe des x
      const allowedValues = [0, 3, 35, 40, 53]; // Valeurs autorisées si la position est dans la plage exclue

      // Dimensions de la Box
      const boxWidth = 64;
      const boxHeight = 29;

      // Taille de l'icône
      const iconWidth = 18;
      const iconHeight = 18;

      // Génère des positions aléatoires au niveau des pépites de l'image
      const newIcon = {
        id: iconIdCounter++,
        x: generateRandomX(boxWidth, iconWidth, excludeRange, allowedValues),
        y: Math.random() * (boxHeight - iconHeight),
      };

      setIcons(prevIcons => {
        // Limite de 10 icônes dans le DOM
        const maxIcons = 10;

        // Si 10 icônes sont présentes dans le DOM, on retire la première
        const iconsToUpdate =
          prevIcons.length >= maxIcons ? prevIcons.slice(1) : prevIcons;

        return [...iconsToUpdate, newIcon];
      });
    }, 1300); // Ajout d'une nouvelle icône toutes les 1.5 secondes

    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <Stack
      marginBottom={'20px'}
      borderRadius={'20px'}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        position="relative"
        height="100px"
        marginBottom="10px"
        display="flex"
        justifyContent="center"
        sx={{
          filter: 'contrast(0.9)',
        }}
      >
        <img src="/images/logo_pepite_svg.svg" alt="cornet de pop corns" />
        <Box position="absolute" bottom="0" height="29px" width="64px">
          {icons.map(icon => (
            <ShineIcon
              key={icon.id}
              className="animatedShine" // Classe pour l'animation
              style={{
                left: `${icon.x}px`, // Utiliser la position x aléatoire
                top: `${icon.y}px`, // Utiliser la position y aléatoire
              }}
              sx={{
                position: 'absolute',
                height: '18px',
                width: '18px',
              }}
            />
          ))}
        </Box>
      </Box>
      <Typography
        variant="h1"
        color={'#fff'}
        fontSize={'4.4em'}
        sx={{
          letterSpacing: '-5.5px',
          textShadow: '#02455C -5px 4.5px 0',
        }}
      >
        {'pépite.'}
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
