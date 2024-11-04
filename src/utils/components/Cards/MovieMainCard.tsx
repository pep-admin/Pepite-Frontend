import { Box, Divider, Stack, Typography } from '@mui/material';
// import ColoredRating from '../ColoredRating';
import { convertDate } from '@utils/functions/convertDate';
import GoldNuggetIcon from '../GoldNuggetIcon';
import { TurnipIcon } from '../styledComponent';
import ColoredRating from '../ColoredRating';
import { formatRating } from '@utils/functions/formatRating';
import { useNavigate } from 'react-router-dom';
// import { convertRating } from '@utils/functions/convertRating';

const MovieMainCard = ({ movie, displayGradient, isFirstCard, isLastCard }) => {

  const navigate = useNavigate();

  const isMovieOrSerie = 'release_date' in movie ? 'movie' : 'serie';
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;
  const release_date = isMovieOrSerie === 'movie' ? movie.release_date : movie.first_air_date;

  console.log('le film profil =>', movie);
  
  return (
    <>
      <Stack 
        direction='row' 
        position='relative' 
        marginTop={
          (movie.is_gold_nugget || movie.is_turnip) && displayGradient && isFirstCard ?
          '18px !important' : '0'
        }
      >
        {
          (movie.is_gold_nugget || movie.is_turnip) && displayGradient &&
          <Box 
            height='149px'
            width='calc(100% + 10vw)'
            position='absolute'
            left='-5vw'
            top='-19px'
            zIndex='0'
            sx={{
              background: movie.is_gold_nugget ?
                'linear-gradient(90deg, rgba(2,30,30,1) 0%, rgba(71,63,38,1) 100%)'
                :
                'linear-gradient(90deg, rgba(2,30,30,1) 0%, rgba(91,28,64,1) 100%)'
            }}
          />
        }
        <Stack 
          direction='row' 
          justifyContent='space-between' 
          flexGrow='1'
          position='relative' 
          zIndex='1'
        >
          <Stack>
            <Box
              sx={{
                height: '110px',
                aspectRatio: '2/3',
                background: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                outline: '1px solid #292929'
              }}
              onClick={() => navigate(`/film/${isMovieOrSerie}/${movie.id}`)}
            />
          </Stack>
          <Stack 
            direction='row' 
            justifyContent='space-between' 
            flexGrow='1' 
            paddingTop='4px'
          >
            <Stack padding='6px 0 0 15px' >
              <Typography
                component='h3'
                fontSize={movieTitle.length >= 10 ? '1em' : '1.1em'}
                lineHeight='1.3'
                paddingRight='15px'
              >
                {`${movieTitle}`}
              </Typography>
              <Typography
                fontSize='0.9em'
                color='gray'
              >
                {`${convertDate('year', release_date)}`}
              </Typography>
              <Typography
                fontSize='0.9em'
                color='secondary.light'
              >
                {`${isMovieOrSerie === 'movie' ? 'Film' : 'Série'}`}
              </Typography>
            </Stack>
            <Stack padding={movie.is_gold_nugget ? '2px 0 0 0' : '6px 0 0 0'} maxWidth='min-content'>
              <Stack 
                direction='row' 
                justifyContent='space-between'
                alignItems='center'
              >
                {
                  movie.is_gold_nugget ?
                  <>
                    <GoldNuggetIcon 
                      height={'23px'}
                      width={'23px'}
                      strokeWidth={0}
                      isShadowed={false}
                      sx={null}
                    />
                    <Typography
                      color='secondary'
                      fontSize='1.4em'
                      fontWeight='800'
                      lineHeight='1.3'
                      sx={{
                        letterSpacing: '-1.3px',
                        marginLeft: '9px'
                      }}
                    >
                      {'pépite.'}
                    </Typography>
                  </>
                  : movie.is_turnip ?
                  <>
                    <TurnipIcon
                      sx={{
                        fontSize: '25px'
                      }}
                    />
                    <Typography
                      color='purple.light'
                      fontSize='1.4em'
                      fontWeight='800'
                      lineHeight='1.3'
                      sx={{
                        letterSpacing: '-1.3px',
                        marginLeft: '9px'
                      }}
                    >
                      {'navet.'}
                    </Typography>
                  </>
                  :
                  <Stack>
                    <ColoredRating 
                      color='#E7AE1A' 
                      emptyColor='#AAAAAA' 
                      value={movie.user_rating} 
                      readOnly={true}
                      precision={0.1}
                      fontSize='1.2'
                    />
                    <Typography
                      color='secondary'
                      fontSize='0.9em'
                      fontFamily='Pragati Narrow, sans-serif'
                      lineHeight='1.3'
                    >
                      {`${formatRating(movie.user_rating)} / 5`}
                    </Typography>
                  </Stack>
                }
                
              </Stack>
              <Typography
                fontFamily='Pragati Narrow, sans-serif'
                fontSize='0.9em'
                color='gray'
              >
                {`le ${convertDate('full', movie.post_date)}`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        </Stack>
        
      { !isLastCard && <Divider sx={{ borderColor: '#173333', zIndex: 100 }} /> }
    </>
    
  );
};

export default MovieMainCard;