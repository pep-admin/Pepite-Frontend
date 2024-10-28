import { Button, keyframes } from '@mui/material';
import GoldNuggetIcon from '@utils/components/GoldNuggetIcon';
import { TurnipIcon } from '@utils/components/styledComponent';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const QuickRatingBtns = ({ btnType, handleBtnAction }) => {
  // Définition de l'animation
  const slideInAnimation = keyframes`
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `;

  const getGradientColor = () => {
    switch (btnType) {
      case 'turnip':
        return {
          gradient:
            'linear-gradient(135deg, rgba(201,17,114,1) 0%, rgba(46,0,27,1) 76%, rgba(46,0,27,1) 100%)',
          shadow: 'inset 2px 4px 4px rgba(169, 89, 135, 1)',
        };
      case 'gold':
        return {
          gradient:
            'linear-gradient(135deg, rgba(206,142,5,1) 0%, rgba(54,21,0,1) 76%, rgba(54,21,0,1) 100%)',
          shadow: 'inset 2px 4px 4px rgba(167, 155, 30, 1)',
        };
      case 'validate':
        return {
          gradient:
            'linear-gradient(135deg, rgb(33 136 42) 0%, rgb(2 2 2) 100%)',
          shadow: 'none',
        };
      case 'cancel':
        return {
          gradient:
            'linear-gradient(135deg, rgb(151 37 37) 0%, rgb(2 2 2) 100%)',
          shadow: 'none',
        };
      default:
        break;
    }
  };

  return (
    <Button
      sx={{
        height: '47px',
        width: '47px',
        minWidth: 'auto',
        background: getGradientColor().gradient,
        padding: '0',
        borderRadius: '50%',
        outline:
          btnType !== 'validate' && btnType !== 'cancel'
            ? '1px solid #151515'
            : 'none',
        animation:
          btnType !== 'validate' && btnType !== 'cancel'
            ? `${slideInAnimation} 1s ease-out`
            : 'none',
        boxShadow: getGradientColor().shadow,
      }}
      onClick={() => handleBtnAction(btnType)}
    >
      {btnType === 'turnip' ? (
        <TurnipIcon sx={{ fontSize: '30px' }} />
      ) : btnType === 'gold' ? (
        <GoldNuggetIcon
          height="30px"
          width="30px"
          isShadowed={false}
          strokeWidth="3px"
          sx={null}
        />
      ) : btnType === 'validate' ? (
        <DoneIcon sx={{ fontSize: '30px' }} />
      ) : (
        <ClearIcon sx={{ fontSize: '30px' }} />
      )}
    </Button>
  );
};

export default QuickRatingBtns;
