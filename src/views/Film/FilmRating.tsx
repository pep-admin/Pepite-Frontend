import { Stack, Typography, Button } from '@mui/material';
import MovieInterestBtn from '@utils/components/Buttons/MovieInterestBtn';
import ColoredRating from '@utils/components/ColoredRating';
import { checkIfMovieReleased } from '@utils/functions/checkIfMovieReleased';
import { convertDate } from '@utils/functions/convertDate';
import { convertRating } from '@utils/functions/convertRating';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

const FilmRating = ({ isMovieOrSerie, movie }) => {

  const isReleased = checkIfMovieReleased(movie);
  const dbTable = isMovieOrSerie === 'movie' ? 'movie' : 'tv';

  const navigate = useNavigate();

  return (
    <Stack 
      alignItems='center'
      width='100%'  
    >
      <Stack 
        direction='row' 
        justifyContent='center'
        alignItems='center'
        position='relative'
        spacing={1}
      >
        {
          isReleased ?

            movie.vote_average && movie.vote_count ?
            <>
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
            </>
            :
            <Typography
              component='p'
              align='justify'
              color='#7c7c7c'
              fontWeight='200'
            >
              {'Aucune note disponible.'}
            </Typography>
          :
          <>
            <CalendarMonthIcon
              sx={{ 
                fontSize: '20px', 
                color: '#bdbdbd',
                position: 'absolute',
                left: '-21px',
                bottom: '4px'
              }}
            />
            <Typography
              fontWeight="400"
              sx={{ 
                color: '#bdbdbd',
              }}
            >
              {`${convertDate('full', movie.release_date)}`}
            </Typography>
          </>
        }
      </Stack>
      <Stack 
        direction='row' 
        justifyContent={ isReleased ? 'space-between' : 'center' }
        width='70%'  
        marginTop='20px'
      >
        { isReleased && <MovieInterestBtn btnFrom={'movie'} btnType={'gold'} value={4} disabled={null} handleBtn={null} /> }
        <MovieInterestBtn btnFrom={'movie'} btnType={'heart'} value={12} disabled={null} handleBtn={null} />
        { isReleased && <MovieInterestBtn btnFrom={'movie'} btnType={'turnip'} value={2} disabled={null} handleBtn={null} /> }
      </Stack>
      { isReleased &&
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
            onClick={() => navigate(`/rating/${dbTable}/${movie.id}/review`)}
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
            onClick={() => navigate(`/rating/${dbTable}/${movie.id}/advice`)}
          >
            {'Conseiller à un ami'}
          </Button>
        </Stack>
      }
    </Stack>
    
  );
};

export default FilmRating;