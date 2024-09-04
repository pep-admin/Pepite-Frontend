// Import des libs externes
import { Skeleton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Import des fonctions utilitaires
import { findFrenchNameCountry } from '@utils/functions/getFrenchNameCountry';

const SwipeCredits = ({ movie, movieDetails }) => {
  const findDirectorName = crew => {
    const director = crew.find(member => member.job === 'Director');
    return director ? director.name : 'Réalisateur inconnu';
  };

  const findTopActors = cast => {
    // Trie les acteurs par popularité décroissante
    const sortedCast = cast.sort((a, b) => b.popularity - a.popularity);

    // Sélectionne les trois premiers acteurs
    const topActors = sortedCast.slice(0, 3).map(actor => actor.name);

    // Vérifie si le nombre d'acteurs dépasse trois
    return topActors.join(', ');
  };

  return (
    <Stack width="88vw" flexShrink="0" marginBottom='100px' >
      <Stack
        maxHeight="27vh"
        sx={{
          overflow: 'auto',
        }}
      >
        <Typography
          color="primary"
          fontWeight="300"
          lineHeight="1.9"
          fontSize="2.1vh"
        >
          {movie.overview === null
            ? "Désolé, il n'y a pas de synopsis disponible pour ce film..."
            : movie.overview}
        </Typography>
      </Stack>
      <Stack height="15vh" justifyContent="space-evenly" margin="7px 0 0 0">
        <Stack direction="row" columnGap="10px">
          <Typography color="secondary" fontWeight="500" whiteSpace="nowrap">
            {'Pays :'}
          </Typography>
          {movieDetails ? (
            <Typography
              color="primary"
              fontWeight="300"
              maxWidth="66vw"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {findFrenchNameCountry(movieDetails.production_countries).join(
                ', ',
              )}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              width="220px"
              sx={{ fontSize: '1em', bgcolor: 'rgb(56 56 56)' }}
            />
          )}
        </Stack>
        <Stack direction="row" columnGap="10px">
          <Typography color="secondary" fontWeight="500" whiteSpace="nowrap">
            {'Réalisation :'}
          </Typography>
          {movieDetails ? (
            <Typography
              color="primary"
              fontWeight="300"
              maxWidth="66vw"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {findDirectorName(movieDetails.crew)}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              width="176px"
              sx={{ fontSize: '1em', bgcolor: 'rgb(56 56 56)' }}
            />
          )}
        </Stack>
        <Stack direction="row" columnGap="10px">
          <Typography color="secondary" fontWeight="500" whiteSpace="nowrap">
            {'Acteurs :'}
          </Typography>
          {movieDetails ? (
            <Typography
              color="primary"
              fontWeight="300"
              maxWidth="66vw"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {findTopActors(movieDetails.cast)}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              width="200px"
              sx={{ fontSize: '1em', bgcolor: 'rgb(56 56 56)' }}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

SwipeCredits.propTypes = {
  movie: PropTypes.object.isRequired,
  movieDetails: PropTypes.object,
};

export default SwipeCredits;
