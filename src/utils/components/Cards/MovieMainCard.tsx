import { Box, Divider, Stack, Typography } from '@mui/material';
// import ColoredRating from '../ColoredRating';
import { convertDate } from '@utils/functions/convertDate';
import GoldNuggetIcon from '../GoldNuggetIcon';
// import { convertRating } from '@utils/functions/convertRating';

const MovieMainCard = ({ movie, isLastCard }) => {

  const isMovieOrSerie = 'release_date' in movie ? 'movie' : 'serie';
  const movieTitle = isMovieOrSerie === 'movie' ? movie.title : movie.name;
  const release_date = isMovieOrSerie === 'movie' ? movie.release_date : movie.first_air_date;

  return (
    <>
      <Stack direction='row'>
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
              fontSize='1.2em'
              lineHeight='1.3'
              paddingRight='15px'
            >
              {`${movieTitle}`}
            </Typography>
            <Typography
              fontSize='0.9em'
              color='text.secondary'
            >
              {`${convertDate('year', release_date)}`}
            </Typography>
          </Stack>
          <Stack padding='5px 0 0 0' maxWidth='min-content'>
            <Stack 
              direction='row' 
              justifyContent='space-between'
              alignItems='center'
            >
              <GoldNuggetIcon 
                height={'23px'}
                width={'23px'}
                strokeWidth={1}
                isShadowed={true}
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
            </Stack>
            <Typography
              fontFamily='Pragati Narrow, sans-serif'
              fontSize='0.9em'
              color='gray'
            >
              {`le ${convertDate('full', movie.critic_date)}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      { !isLastCard && <Divider sx={{ borderColor: '#173333' }} /> }
    </>
    
  );
};

export default MovieMainCard;