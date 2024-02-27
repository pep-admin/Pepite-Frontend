import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const GradientBtn = () => {
  return (
    <Button
      sx={{
        height: '40px',
        width: '40px',
        minWidth: 'auto',
        margin: '0 0 0 30px !important',
        padding: '0',
        background: 'linear-gradient(315deg, rgba(18,117,160,1) 0%, rgba(107,218,218,1) 100%)',
        borderRadius: '50%',
        position: 'relative',
        bottom: '-10px'
      }}  
    >
      <VisibilityIcon />
    </Button>
  );
};

export default GradientBtn;