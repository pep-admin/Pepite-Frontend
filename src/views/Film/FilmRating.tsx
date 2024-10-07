import { Stack, Typography, Button } from '@mui/material';
import ColoredRating from '@utils/components/ColoredRating';
import GoldNuggetIcon from '@utils/components/GoldNuggetIcon';
import { TurnipIcon } from '@utils/components/styledComponent';
import { convertRating } from '@utils/functions/convertRating';

const FilmRating = ({ movie }) => {

  return (
    <Stack spacing={2} alignItems='center'>
      <Stack 
        direction='row' 
        justifyContent='center'
        alignItems='center'
        spacing={1}
      >
        <ColoredRating 
          color='#E7AE1A' 
          emptyColor='#AAAAAA' 
          value={convertRating(movie.vote_average)} 
          readOnly={true}
          precision={0.1}
          fontSize='1.2'
        />
        <Typography
          component='span'
          color='secondary'
          fontFamily='Pragati Narrow, sans-serif'
          fontSize='1.2em'
          fontWeight='bold'
          position='relative'
          bottom='0.2px'
        >
          {`${convertRating(movie.vote_average)} / 5`}
        </Typography>
      </Stack>
      <Stack 
        direction='row' 
        justifyContent='space-between'
        width='50%'  
      >
        <Button
          sx={{
            height: '30px',
            width: '56px',
            minWidth: 'auto',
            border: '1px solid #1F1F1F',
            backgroundColor: '#5C3C0D',
            padding: '0'
          }}
        >
          <Stack 
            direction='row' 
            justifyContent='space-evenly'
            alignItems='center'
            height='100%'
            width='100%'
          >
            <GoldNuggetIcon
              height='100%'
              width='20px'
              isShadowed={false}
              strokeWidth='3px'
            />
            <Typography
              component='span'
              color='secondary'
              fontFamily='Pragati Narrow, sans-serif'
              fontSize='1.15em'
              fontWeight='600'
              lineHeight='1'
            >
              {`4`}
            </Typography>
          </Stack>
        </Button>
        <Button
          sx={{
            height: '30px',
            width: '56px',
            minWidth: 'auto',
            border: '1px solid #1F1F1F',
            backgroundColor: '#5E103D',
            padding: '0'
          }}
        >
          <Stack 
            direction='row' 
            justifyContent='space-evenly'
            alignItems='center'
            height='100%'
            width='100%'
          >
            <TurnipIcon
              sx={{
                height: '100%',
                width: '20px'
              }}
            />
            <Typography
              component='span'
              color='purple.light'
              fontFamily='Pragati Narrow, sans-serif'
              fontSize='1.15em'
              fontWeight='600'
              lineHeight='1'
            >
              {`4`}
            </Typography>
          </Stack>
        </Button>
      </Stack>
      <Stack 
        direction='row' 
        justifyContent='space-between'
        width='100%'
        marginTop='26px !important'
      >
        <Button
          sx={{
            width: '45%',
            padding: '2px 10px 0 10px',
            color: '#f1f1f1',
            outline: '1px solid #2D2D2D',
            fontSize: '0.75em',
            fontWeight: '400'
          }}
        >
          {'Noter ce film'}
        </Button>
        <Button
          sx={{
            width: '45%',
            padding: '2px 10px 0 10px',
            color: '#f1f1f1',
            outline: '1px solid #2D2D2D',
            fontSize: '0.75em',
            fontWeight: '400'
          }}
        >
          {'Conseiller à un ami'}
        </Button>
      </Stack>
    </Stack>
    
  );
};

export default FilmRating;