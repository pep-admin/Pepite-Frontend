// Import des libs externes
import { Stack, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

// Import du contexte movie / tv
import { useData } from '@hooks/DataContext';
import { findFrenchNameCountry } from '@utils/functions/getFrenchNameCountry';

const SwipeContent = ({ movieDetail, movies, index }) => {
  const { displayType } = useData();

  if (
    movieDetail.current.id === movies[index].id &&
    movieDetail.current.genres.length
  ) {
    console.log(
      `genres pour le film ${movieDetail.current.id} =>`,
      movieDetail.current.genres,
    );
  } else if (movieDetail.next.genres.length) {
    console.log(
      `genres pour le film ${movieDetail.next.id} =>`,
      movieDetail.next.genres,
    );
  }

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
              {
                // Si des genres ont été spécifiés pour le film affiché
                movieDetail.current.id === movies[index].id &&
                movieDetail.current.genres.length
                  ? movieDetail.current.genres
                      ?.map(genre => genre.name)
                      .join(', ')
                  : // Si des genres ont été spécifiés pour le film suivant
                  movieDetail.next.genres.length
                  ? movieDetail.next.genres?.map(genre => genre.name).join(', ')
                  : // Si aucun genre n'a été spécifié
                    'Non spécifié'
              }
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
              movies[index].release_date &&
              movies[index].release_date !== ''
                ? movies[index].release_date.split('-')[0]
                : displayType === 'tv' && movies[index].first_air_date
                ? movies[index].first_air_date.split('-')[0]
                : displayType === 'tv' && movies[index].first_air_date === null
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
              {movieDetail.current.id === movies[index].id
                ? findFrenchNameCountry(
                    movieDetail.current.production_countries,
                  ).join(', ')
                : findFrenchNameCountry(
                    movieDetail.next.production_countries,
                  ).join(', ')}
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
