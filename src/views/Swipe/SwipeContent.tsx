// Import des libs externes
import { Stack, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

// Import du contexte movie / tv
import { useData } from '@hooks/DataContext';
import { findFrenchNameCountry } from '@utils/functions/getFrenchNameCountry';

const SwipeContent = ({ movieDetail, movies, index }) => {
  const { displayType } = useData();

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
            <Typography variant="body2">
              {displayType === 'movie' ? 'Film' : 'Série'}
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
              {'Genre :'}
            </Typography>
            <Typography variant="body2">
              {movieDetail.genres.length === 0
                ? 'Non spécifié'
                : movieDetail.genres.map(genre => genre.name).join(', ')}
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
              {displayType === 'movie' &&
              movieDetail.release_date &&
              movieDetail.release_date !== ''
                ? movieDetail.release_date.split('-')[0]
                : displayType === 'tv' && movieDetail.first_air_date
                ? movieDetail.first_air_date.split('-')[0]
                : displayType === 'tv' && movieDetail.first_air_date === null
                ? 'Non spécifié'
                : 'Non spécifié'}
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
            <Typography variant="body2">
              {findFrenchNameCountry(movieDetail.production_countries).join(
                ', ',
              )}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack width="calc(65% - 10px)" sx={{ overflowY: 'scroll' }}>
        <Typography variant="body2" align="left">
          {movies[index].overview === null
            ? "Désolé, il n'y a pas de synopsis disponible pour ce film..."
            : movies[index].overview}
        </Typography>
      </Stack>
    </Stack>
  );
};

SwipeContent.propTypes = {
  index: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
  movieDetail: PropTypes.object.isRequired,
};

export default SwipeContent;
