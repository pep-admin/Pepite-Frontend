import { Stack, Typography, Button } from '@mui/material';
import MovieInterestBtn from '@utils/components/Buttons/MovieInterestBtn';
import ColoredRating from '@utils/components/ColoredRating';
import { convertRating } from '@utils/functions/convertRating';

const FilmRating = ({ isMovieOrSerie, movie }) => {

  return (
    <Stack 
      spacing={3} 
      alignItems='center'
      width='100%'  
    >
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
        width='70%'  
      >
        <MovieInterestBtn btnType={'gold'} value={4} />
        <MovieInterestBtn btnType={'heart'} value={12} />
        <MovieInterestBtn btnType={'turnip'} value={2} />
      </Stack>
      <Stack 
        direction='row' 
        justifyContent='space-between'
        width='100%'
        marginTop='36px !important'
      >
        <Button
          sx={{
            height: '35px',
            width: '45%',
            padding: '2px 10px 0 10px',
            color: '#f1f1f1',
            outline: '1px solid #2D2D2D',
            fontSize: '0.75em',
            fontWeight: '400'
          }}
        >
          {`Noter ${isMovieOrSerie === 'movie' ? 'ce film' : 'cette série'}`}
        </Button>
        <Button
          sx={{
            height: '35px',
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