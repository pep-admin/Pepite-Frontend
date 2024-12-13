import { Badge } from '@mui/material';

/*
  couleurs amis : '#835F00'
  couleurs suivis : '#0c6666'
*/

const CustomBadge = ({ value, max, showZero, bgColor, children }) => {
  return (
    <Badge 
      badgeContent={value} 
      showZero={showZero}  
      max={max}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: bgColor,
          color: '#fff',
          right: '-17px',
        }
      }}
    >
      { children }
    </Badge>
  );
};

export default CustomBadge;