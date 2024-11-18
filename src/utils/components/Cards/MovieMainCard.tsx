import { Box, Divider, Stack, Typography } from '@mui/material';
// import ColoredRating from '../ColoredRating';
import { convertDate } from '@utils/functions/convertDate';
import GoldNuggetIcon from '../GoldNuggetIcon';
import { TurnipIcon } from '../styledComponent';
import ColoredRating from '../ColoredRating';
import { formatRating } from '@utils/functions/formatRating';
import { useNavigate } from 'react-router-dom';
import ListActionBtns from '@views/List/ListActionBtns';
// import { convertRating } from '@utils/functions/convertRating';

const MovieMainCard = ({ listSectionIndex, movie, displayGradient, isFirstCard, isLastCard, onComplete }) => {

  const navigate = useNavigate();

  const isMovieOrSerie = 'release_date' in movie ? 'movie' : 'serie';
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;
  const release_date = isMovieOrSerie === 'movie' ? movie.release_date : movie.first_air_date;

  console.log('le film : ', movie);
  
  
  return (
    <Stack
      marginTop={
        (movie.is_gold_nugget || movie.is_turnip) && displayGradient && !isFirstCard ?
        '0 !important' : '18px'
      }
      sx={{
        background: movie.is_gold_nugget && displayGradient
          ? 'linear-gradient(90deg, rgba(2,30,30,0) 0%, rgba(71,63,38,0.5) 100%)'
          : movie.is_turnip && displayGradient
          ? 'linear-gradient(90deg, rgba(2,30,30,0) 0%, rgba(91,28,64,0.5) 100%)'
          : 'transparent'
      }}
    >
      <Stack padding='0 5vw'>
        <Stack 
          direction='row' 
          justifyContent='space-between' 
          flexGrow='1'
          position='relative' 
          zIndex='1'
          marginTop={
            (movie.is_gold_nugget || movie.is_turnip) && displayGradient ?
            '18px !important' : '0'
          }
        >
          <Stack>
            <Box
              sx={{
                height: listSectionIndex !== null ? '100px' : '110px',
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
            <Stack padding='0 0 0 15px' >
              <Typography
                component='h3'
                fontSize={movieTitle.length >= 20 ? '0.95em' : '1em'}
                lineHeight='1.4'
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
            {
              listSectionIndex === null || listSectionIndex === 2 ?
              <Stack>
                <Stack 
                  direction='row' 
                  // justifyContent='space-between'
                  alignItems='center'
                  position='relative'
                  bottom={movie.is_gold_nugget || movie.is_turnip ? '4px' : '0'}
                >
                  {
                    movie.is_gold_nugget ?
                    <>
                      <GoldNuggetIcon 
                        height={'21px'}
                        width={'21px'}
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
                          marginLeft: '9px',
                        }}
                      >
                        {'pépite.'}
                      </Typography>
                    </>
                    : movie.is_turnip ?
                    <>
                      <TurnipIcon
                        sx={{
                          fontSize: '23px',
                          position: 'relative',
                          bottom: '2px'
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
              :
              <ListActionBtns 
                listSectionIndex={listSectionIndex}
                movie={movie}
                isMovieOrSerie={isMovieOrSerie}
                onComplete={onComplete}
              />
            }
          </Stack>
        </Stack>
        {movie.text &&
        <Stack marginTop='18px'>
          <Typography
            fontStyle='italic'
            fontWeight='300'
          >
            {`❝ ${movie.text} ❞`}
          </Typography>
        </Stack>
        }
        { !isLastCard && <Divider sx={{ borderColor: '#173333', zIndex: 100, marginTop: '18px' }} /> }
      </Stack>
    </Stack>
  );
};

export default MovieMainCard;