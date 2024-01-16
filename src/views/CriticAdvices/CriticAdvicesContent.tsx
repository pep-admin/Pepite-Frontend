// Import des libs externes
import { Stack, Typography, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants customisés
import { YellowRating } from '@utils/styledComponent';
import IsNew from '@utils/IsNew';

const CriticAdvicesContent = ({
  type,
  chosenMovie,
  displayOverview,
  setDisplayOverview,
  infos,
}) => {
  let originalScore;

  if (type === 'new-critic' || type === 'new-advice')
    originalScore = chosenMovie.vote_average;
  else {
    originalScore = infos.vote_average;
  }

  const scoreOutOfFive = originalScore / 2;
  const roundedScore = parseFloat(scoreOutOfFive.toFixed(1));

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
                  maxWidth: '160px',
                }}
              >
                {
                  // Si l'utilisateur compte noter un film
                  chosenMovie !== null &&
                  'release_date' in chosenMovie &&
                  (type === 'new-critic' || type === 'new-advice')
                    ? `${chosenMovie.title}`
                    : // Si l'utilisateur a déjà noté un film
                    infos !== null &&
                      'release_date' in infos &&
                      (type === 'old-critic' || type === 'old-advice')
                    ? `${infos.title}`
                    : // Si l'utilisateur compte noter une série
                    chosenMovie !== null &&
                      'first_air_date' in chosenMovie &&
                      (type === 'new-critic' || type === 'new-advice')
                    ? `${chosenMovie.name}`
                    : // Si l'utilisateur a déjà noté une série
                    infos !== null &&
                      'first_air_date' in infos &&
                      (type === 'old-critic' || type === 'old-advice')
                    ? `${infos.name}`
                    : null
                }
              </Typography>
              {type === 'old-critic' || type === 'old-advice' ? (
                <IsNew from={'critic'} created_at={infos.created_at} />
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
              {
                // Si l'utilisateur choisit un film
                (chosenMovie !== null &&
                  'release_date' in chosenMovie &&
                  (type === 'new-critic' || type === 'new-advice')) ||
                // Si la critique est une critique || un conseil de film
                (infos !== null &&
                  'release_date' in infos &&
                  (type === 'old-critic' || type === 'old-advice'))
                  ? 'Film'
                  : // Si l'utilisateur choisit une série
                  (chosenMovie !== null &&
                      'first_air_date' in chosenMovie &&
                      (type === 'new-critic' || type === 'new-advice')) ||
                    // Si la critique est une critique de série
                    (infos !== null &&
                      'first_air_date' in infos &&
                      (type === 'old-critic' || type === 'old-advice'))
                  ? 'Série'
                  : null
              }
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
              {chosenMovie !== null &&
              (type === 'new-critic' || type === 'new-advice')
                ? chosenMovie.genres.map(genre => genre.name).join(', ')
                : infos.genres.map(genre => genre.name).join(', ')}
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
              {
                // Si l'utilisateur choisit un film
                chosenMovie !== null &&
                'release_date' in chosenMovie &&
                (type === 'new-critic' || type === 'new-advice')
                  ? chosenMovie.release_date.split('-')[0]
                  : // Si l'utilisateur choisit une série
                  chosenMovie !== null &&
                    'first_air_date' in chosenMovie &&
                    (type === 'new-critic' || type === 'new-advice')
                  ? chosenMovie.first_air_date.split('-')[0]
                  : // Si la critique est une critique de film
                  infos !== null &&
                    'release_date' in infos &&
                    (type === 'old-critic' || type === 'old-advice')
                  ? infos.release_date.split('-')[0]
                  : // Si la critique est une critique de série
                  infos !== null &&
                    'first_air_date' in infos &&
                    (type === 'old-critic' || type === 'old-advice')
                  ? infos.first_air_date.split('-')[0]
                  : null
              }
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
