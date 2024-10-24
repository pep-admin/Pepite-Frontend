import { Badge } from '@mui/material';

const CustomBadge = ({ value, max, showZero, bgColor, children }) => {
  return (
    <Badge 
      badgeContent={value.length} 
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