import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface CustomButtonProps extends ButtonProps {
  choice?: string;
  btntype?: 'filter' | 'others';
  isunwanted?: boolean;
  iswanted?: boolean;
  iswatched?: boolean;
}

const btnSize = {
  filter: '50px',
  others: '60px'
}

const bgGradient = {
  filter: 'linear-gradient(to bottom right, rgba(42, 42, 42, 1), rgba(0, 0, 0, 0.73))',
  others: 'linear-gradient(to bottom right, rgba(42, 42, 42, 1), rgba(32, 32, 32, 0))'
}

const hoverColors = {
  filter: 'linear-gradient(to bottom right, rgba(42, 42, 42, 1), rgba(0, 0, 0, 0.73))',
  unwanted: 'linear-gradient(to bottom right, #792332, #000000)',
  wanted: 'linear-gradient(to bottom right, #225b1d, #000000)',
  watched: 'linear-gradient(to bottom right, #70491d, #000000)'
};

const getGradientColor = (choice, isunwanted, iswanted, iswatched) => {
  if(choice === 'unwanted' && isunwanted) {
    return hoverColors.unwanted;
  }
  else if(choice === 'wanted' && iswanted) {
    return hoverColors.wanted;
  }
  else if(choice === 'watched' && iswatched) {
    return hoverColors.watched;
  }
  else {
    return bgGradient.others;
  }
}

// Bouton rond de gradient personnalisé
export const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isunwanted' && prop !== 'iswanted' && prop !== 'iswatched' && prop !== 'btntype',
})<CustomButtonProps>(({ choice, btntype, isunwanted, iswanted, iswatched}) => ({
  height: btnSize[btntype],
  width: btnSize[btntype],
  minWidth: 'auto',
  padding: '0',
  background: 
    btntype === 'filter' ?
      bgGradient.filter
    :
      getGradientColor(choice, isunwanted, iswanted, iswatched),
  color: '#fff',
  borderRadius: '50%',
  boxShadow: 'inset 4.5px 4px 4px rgba(241, 220, 165, 0.25) !important',
}));