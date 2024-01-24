// Import des libs externes
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

// Import des icônes
import StarIcon from '@mui/icons-material/Star';
import { OrangeRating } from '@utils/styledComponent';
import { YellowRating } from '@utils/styledComponent';
import { TurquoiseRating } from '@utils/styledComponent';

// Fonction qui divise la note par 2 et arrondit au dizième
import { convertRating } from '@utils/functions/convertRating';

const SwipeRatings = ({ movies, index, currentMovieIndex }) => {
  // Détermine la note NUMBER / 5 selon l'index précédent, courant, suivant et selon la disponibilité
  const getMovieRatingValue = movieIndex => {
    if (movieIndex < 0 || movieIndex >= movies.length) {
      return 0;
    }
    if (movies[movieIndex].vote_count !== 0) {
      return convertRating(movies[movieIndex].vote_average);
    }
    return 0;
  };

  // Détermine la note STRING / 5 selon l'index précédent, courant, suivant et selon la disponibilité
  const getMovieRatingText = movieIndex => {
    if (
      movieIndex < 0 ||
      movieIndex >= movies.length ||
      movies[movieIndex].vote_count === 0
    ) {
      return '? / 5';
    }
    return `${convertRating(movies[movieIndex].vote_average)} / 5`;
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
      >
        <YellowRating
          name="half-rating-read"
          size="small"
          value={getMovieRatingValue(
            // Film affiché
            index === currentMovieIndex
              ? currentMovieIndex
              : // Film suivant
              index === currentMovieIndex + 1
              ? currentMovieIndex + 1
              : // Film précédent
                currentMovieIndex - 1,
          )}
          precision={0.1}
          readOnly
          emptyIcon={<StarIcon sx={{ color: '#E1E1E1' }} fontSize="inherit" />}
          sx={{ marginRight: '5px' }}
        />
        <Typography
          variant="body2"
          component="span"
          sx={{
            color: '#FFDA1B',
            fontSize: '1em',
            fontWeight: 'bold',
            position: 'relative',
            top: 0.5,
          }}
        >
          {getMovieRatingText(
            // Film affiché
            index === currentMovieIndex
              ? currentMovieIndex
              : // Film suivant
              index === currentMovieIndex + 1
              ? currentMovieIndex + 1
              : // Film précédent
                currentMovieIndex - 1,
          )}
        </Typography>
        <Box minWidth="170px" position="relative" bottom="5px" textAlign="left">
          <Typography
            component="span"
            variant="body2"
            sx={{ color: '#fefefe', minWidth: '170px' }}
          >
            {'Note générale'}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
      >
        <OrangeRating
          name="half-rating-read"
          size="small"
          value={2.5}
          precision={0.25}
          readOnly
          emptyIcon={<StarIcon sx={{ color: '#E1E1E1' }} fontSize="inherit" />}
          sx={{ marginRight: '5px' }}
        />
        <Typography
          variant="body2"
          component="span"
          sx={{
            color: '#F29E50',
            fontSize: '1em',
            fontWeight: 'bold',
            position: 'relative',
            top: 0.5,
          }}
        >
          {'2.5' + ' / 5'}
        </Typography>
        <Box minWidth="170px" position="relative" bottom="5px" textAlign="left">
          <Typography
            component="span"
            variant="body2"
            sx={{ color: '#F29E50', fontWeight: 'bold' }}
          >
            {'2 amis'}
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{ color: '#fefefe' }}
          >
            {' ont noté ce film'}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexWrap="wrap"
      >
        <TurquoiseRating
          name="half-rating-read"
          size="small"
          value={2.5}
          precision={0.25}
          readOnly
          emptyIcon={<StarIcon sx={{ color: '#E1E1E1' }} fontSize="inherit" />}
          sx={{ marginRight: '5px' }}
        />
        <Typography
          variant="body2"
          component="span"
          sx={{
            color: '#24A5A5',
            fontSize: '1em',
            fontWeight: 'bold',
            position: 'relative',
            top: 0.5,
          }}
        >
          {'2.5' + ' / 5'}
        </Typography>
        <Box minWidth="170px" position="relative" bottom="5px" textAlign="left">
          <Typography
            component="span"
            variant="body2"
            sx={{ color: '#24A5A5', fontWeight: 'bold' }}
          >
            {'3 abonnements'}
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{ color: '#fefefe' }}
          >
            {' ont noté ce film'}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const SwipeRatingsPropTypes = {
  movies: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
};

SwipeRatings.propTypes = SwipeRatingsPropTypes;

export default SwipeRatings;
