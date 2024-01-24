// Import des libs externes
import { Stack, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

// Import du contexte movie / tv
import { useData } from '@hooks/DataContext';
import { findFrenchNameCountry } from '@utils/functions/getFrenchNameCountry';

const SwipeContent = ({ movieDetail, movies, index }) => {
  const { displayType } = useData();

  // Fonction pour obtenir les genres du film
  const getGenres = movie => {
    if (movie && movie.id === movies[index].id) {
      return movie.genres.length
        ? movie.genres.map(genre => genre.name).join(', ')
        : 'Non spécifié';
    }
    return null;
  };

  // Vérification des genres pour le film affiché et le film suivant
  const genresCurrent = getGenres(movieDetail.current);
  const genresNext = getGenres(movieDetail.next);

  // Fonction pour extraire l'année à partir d'une date
  const getYear = date => {
    return date ? date.split('-')[0] : 'Non spécifié';
  };

  // Détermine la date à utiliser en fonction du type d'affichage
  const date =
    displayType === 'movie'
      ? movies[index].release_date
      : movies[index].first_air_date;

  // Sélectionner le bon détail de film (affiché ou suivant) et obtenir les pays de production
  const movieToDisplay =
    movieDetail.current && movieDetail.current.id === movies[index].id
      ? movieDetail.current
      : movieDetail.next && movieDetail.next.id === movies[index].id
      ? movieDetail.next
      : null;

  const productionCountries = movieToDisplay
    ? findFrenchNameCountry(movieToDisplay.production_countries).join(', ')
    : null;

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
              {genresCurrent || genresNext}
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
            <Typography variant="body2">{getYear(date)}</Typography>
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
            <Typography variant="body2">{productionCountries}</Typography>
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
