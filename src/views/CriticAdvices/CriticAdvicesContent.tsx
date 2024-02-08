// Import des libs externes
import { Stack, Typography, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants customisés
import { YellowRating } from '@utils/components/styledComponent';
import IsNew from '@utils/components/IsNew';
import { useMemo } from 'react';

const CriticAdvicesContent = ({
  type,
  chosenMovie,
  displayOverview,
  setDisplayOverview,
  infos,
}) => {
  // Information sur la critique : Film ou série
  const movieOrSeries = useMemo(() => {
    if (chosenMovie) return 'release_date' in chosenMovie ? 'Film' : 'Série';
    if (infos) return 'release_date' in infos ? 'Film' : 'Série';
    return null;
  }, [chosenMovie, infos]);

  // Informations sur les genres du film ou série
  const genres = useMemo(() => {
    const item = chosenMovie || infos;
    return item ? item.genres.map(genre => genre.name).join(', ') : '';
  }, [chosenMovie, infos]);

  // Informations sur l'année de sortie du film ou du premier épisode de la série
  const releaseYear = useMemo(() => {
    const date =
      (chosenMovie || infos)?.release_date ||
      (chosenMovie || infos)?.first_air_date;
    return date ? date.split('-')[0] : '';
  }, [chosenMovie, infos]);

  // Informations sur le titre du film ou de la série
  const title = useMemo(() => {
    if (chosenMovie && (type === 'new-critic' || type === 'new-advice'))
      return chosenMovie.title || chosenMovie.name;
    if (infos && (type === 'old-critic' || type === 'old-advice'))
      return infos.title || infos.name;
    return '';
  }, [chosenMovie, infos, type]);

  // Note du film ou de la série
  const originalScore = useMemo(() => {
    if (type === 'new-critic' || type === 'new-advice') {
      return chosenMovie ? chosenMovie.vote_average / 2 : 0;
    }
    return infos ? infos.vote_average / 2 : 0;
  }, [type, chosenMovie, infos]);

  // Arrondi à un chiffre après la virgule
  const roundedScore = parseFloat(originalScore.toFixed(1));

  return (
    <CardContent sx={{ padding: '0 0 0 12px !important', flexGrow: '1' }}>
      <Stack>
        <Stack>
          <Stack direction="column" columnGap="10px">
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              columnGap="10px"
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                component="h5"
                textAlign="left"
                color="primary.dark"
                sx={{
                  maxWidth: '190px',
                }}
              >
                {title}
              </Typography>
              {type === 'old-critic' || type === 'old-advice' ? (
                <IsNew
                  from={'critic'}
                  created_at={
                    type == 'old-critic' ? infos.critic_date : infos.advice_date
                  }
                />
              ) : null}
            </Stack>
            <Stack direction="row" columnGap="5px">
              <YellowRating
                value={roundedScore}
                precision={0.1}
                readOnly
                sx={{ position: 'relative', top: '1.4px' }}
              />
              <Typography variant="body2" fontWeight="bold" component="p">
                {`${roundedScore}` + ' / 5'}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Typography
              variant="body2"
              fontWeight="bold"
              component="p"
              color="primary.dark"
            >
              {'Type :'}
            </Typography>
            <Typography variant="body2" component="p" marginLeft="5px">
              {movieOrSeries}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography
              variant="body2"
              fontWeight="bold"
              component="p"
              color="primary.dark"
              whiteSpace="nowrap"
            >
              {'Genre :'}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              marginLeft="5px"
              align="left"
            >
              {genres}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography
              variant="body2"
              fontWeight="bold"
              component="p"
              color="primary.dark"
            >
              {'Année :'}
            </Typography>
            <Typography variant="body2" component="p" marginLeft="5px">
              {releaseYear}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography
              variant="body2"
              fontWeight="bold"
              component="p"
              color="primary.dark"
            >
              {'Synopsis :'}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              component="p"
              marginLeft="5px"
              onClick={() => setDisplayOverview(!displayOverview)}
            >
              {!displayOverview ? 'Afficher' : 'Masquer'}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  );
};

CriticAdvicesContent.propTypes = {
  type: PropTypes.string.isRequired,
  chosenMovie: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  displayOverview: PropTypes.bool.isRequired,
  setDisplayOverview: PropTypes.func.isRequired,
  infos: PropTypes.object,
};

export default CriticAdvicesContent;
