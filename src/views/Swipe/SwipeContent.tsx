import { Stack, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

const SwipeContent = ({ movieDetail, movies, index }) => {
  return (
    <Stack
      direction="row"
      divider={
        <Divider orientation="vertical" flexItem sx={{ margin: '0 10px' }} />
      }
      sx={{
        height: '100%',
      }}
    >
      <Stack width="calc(35% - 10px)" sx={{ overflowY: 'scroll' }}>
        <Stack
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          spacing={1}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#0E6666',
                fontWeight: 'bold',
              }}
            >
              {'Type :'}
            </Typography>
            <Typography variant="body2">{'Film'}</Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#0E6666',
                fontWeight: 'bold',
              }}
            >
              {'Genre :'}
            </Typography>
            <Typography variant="body2">
              {movieDetail[0].genres.map(genre => genre.name).join(', ')}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#0E6666',
                fontWeight: 'bold',
              }}
            >
              {'Année :'}
            </Typography>
            <Typography variant="body2">
              {movieDetail[0].release_date.split('-')[0]}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#0E6666',
                fontWeight: 'bold',
              }}
            >
              {'Pays :'}
            </Typography>
            <Typography variant="body2">{movieDetail[1].join(', ')}</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack width="calc(65% - 10px)" sx={{ overflowY: 'scroll' }}>
        <Typography variant="body2" align="left">
          {movies[index].overview === ''
            ? "Désolé, il n'y a pas de synopsis disponible pour ce film..."
            : movies[index].overview}
        </Typography>
      </Stack>
    </Stack>
  );
};

const SwipeContentPropTypes = {
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.array.isRequired,
};

SwipeContent.propTypes = SwipeContentPropTypes;

export default SwipeContent;
