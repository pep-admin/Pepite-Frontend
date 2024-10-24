import { Fab, Stack, Typography } from '@mui/material';
import GoldNuggetIcon from '../GoldNuggetIcon';
import { TurnipIcon } from '../styledComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MovieInterestBtn = ({ btnType, value }) => {
  return (
    <Fab 
      variant="extended" 
      color="primary"
      sx={{
        height: '33px',
        width: 'auto',
        padding: '0 10px',
        backgroundColor: 
          btnType === 'gold' 
          ? '#5C3C0D !important' 
          : btnType === 'turnip'
          ? '#5E103D !important'
          : '#161616 !important',
        outline: '1px solid #2D2D2D'
      }}
    >
      <Stack 
        spacing={1}
        direction='row' 
        justifyContent='space-evenly'
        alignItems='center'
        height='100%'
        // width='100%'
      >
        {
          btnType === 'gold' ?
            <GoldNuggetIcon
              height='100%'
              width='20px'
              isShadowed={false}
              strokeWidth='3px'
              sx={null}
            />
          : btnType === 'heart' ?
            <FavoriteIcon
              sx={{
                color: 'red',
                fontSize: '20px'
              }}
            />
          :
            <TurnipIcon
              sx={{
                height: '100%',
                width: '20px',
                position: 'relative',
                bottom: '1px'
              }}
            />
        }
        <Typography
          component='span'
          color={ 
            btnType === 'gold' 
            ? 'secondary' 
            : btnType === 'turnip'
            ? 'purple.light' 
            : '#cf1c1c'  
          }
          fontFamily='Pragati Narrow, sans-serif'
          fontSize='1.3em'
          fontWeight='600'
          lineHeight='1'
        >
          {`${ value }`}
        </Typography>
      </Stack>
    </Fab>
  );
};

export default MovieInterestBtn;