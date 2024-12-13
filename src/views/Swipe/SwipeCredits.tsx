// Import des libs externes
import { Skeleton, Stack, Typography, useTheme } from '@mui/material';

// Import des fonctions utilitaires
import { findFrenchNameCountry } from '@utils/functions/getFrenchNameCountry';

const SwipeCredits = ({ isMovieOrSerie, movie, movieDetails }) => {

  const theme = useTheme();

  return (
    <Stack width="88vw" flexShrink="0" marginBottom="100px">
      <Stack
        maxHeight="27vh"
        sx={{
          overflow: 'auto',
        }}
      >
        <Typography
          color={theme.palette.text.primary}
          fontWeight="300"
          lineHeight="1.9"
          fontSize="2.1vh"
        >
          {movie.overview === null || movie.overview === ''
            ? `Aucun synopsis disponible pour ${isMovieOrSerie === 'movie' ? 'ce film' : 'cette série'}.`
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
              color={theme.palette.text.primary}
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
              color={theme.palette.text.primary}
              fontWeight="300"
              maxWidth="66vw"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {`${movieDetails.director}`}
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
              color={theme.palette.text.primary}
              fontWeight="300"
              maxWidth="66vw"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {`${movieDetails.topActors}`}
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

export default SwipeCredits;
