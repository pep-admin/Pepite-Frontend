import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

interface CustomButtonProps extends ButtonProps {
  choice?: string;
  btntype?: 'filter' | 'others';
  isactive?: boolean;
  errorstate?: null | boolean;
}

const btnSize = {
  filter: '55px',
  others: '70px',
};

const bgGradient = {
  filter:
    'linear-gradient(to bottom right, rgba(4, 50, 50, 1) 0%, rgba(1, 18, 18, 0.7) 75%)',
  others:
    'linear-gradient(to bottom right, rgba(4, 50, 50, 1) 0%, rgba(1, 18, 18, 0) 75%)',
};

const hoverColors = {
  filter:
    'linear-gradient(to bottom right, rgba(42, 42, 42, 1), rgba(0, 0, 0, 0.73))',
  unwanted: 'linear-gradient(to bottom right, #9b1a1a, #000000)',
  wanted: 'linear-gradient(to bottom right, #225b1d, #000000)',
  watched: 'linear-gradient(to bottom right, #8f5411, #000000)',
};

const getGradientColor = (
  choice: string, 
  isactive: boolean, 
  errorstate: null | boolean, 
  lockColor: boolean
) => {
  // Bloque le changement couleur si lockColor est activé
  if (lockColor) return bgGradient.others;

  if (choice === 'unwanted' && isactive && !errorstate) {
    return hoverColors.unwanted;
  } else if (choice === 'wanted' && isactive && !errorstate) {
    return hoverColors.wanted;
  } else if (choice === 'watched' && isactive && !errorstate) {
    return hoverColors.watched;
  } else {
    return bgGradient.others;
  }
};

// Bouton rond de gradient personnalisé
export const CustomButton = styled(Button, {
  shouldForwardProp: prop =>
    prop !== 'isactive' &&
    prop !== 'btntype' &&
    prop !== 'errorstate',  
})<CustomButtonProps>(
  ({ choice, btntype, isactive, errorstate }) => {
    const [lockColor, setLockColor] = useState(false);

    useEffect(() => {
      // Si une erreur est détectée, verrouillez la couleur
      if (errorstate) {
        setLockColor(true);
      }
    }, [errorstate]);

    return {
      height: btnSize[btntype],
      width: btnSize[btntype],
      minWidth: 'auto',
      padding: '0',
      background:
        btntype === 'filter'
          ? bgGradient.filter
          : getGradientColor(choice, isactive, errorstate, lockColor),
      color: '#fff',
      borderRadius: '50%',
      boxShadow: 'inset 4.5px 4px 4px rgba(31, 170, 179, 0.25) !important',
    };
  }
);