// Import des libs externes
import { Stack, Typography, CardContent, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants customisés
import {
  GoldNuggetIcon,
  TurnipIcon,
  YellowRating,
} from '@utils/styledComponent';

const CriticAdvicesContent = ({
  type,
  chosenMovie,
  displayOverview,
  setDisplayOverview,
  isGoldNugget,
  isTurnip,
  infos,
  isModify,
}) => {
  // const [isNuggetAnimEnded, setIsNuggetAnimEnded] = useState(false);
  const [isNew, setIsNew] = useState(false);

  let originalScore;

  if (type === 'new-critic' || type === 'new-advice')
    originalScore = chosenMovie.vote_average;
  else {
    originalScore = infos.vote_average;
  }

  const scoreOutOfFive = originalScore / 2;
  const roundedScore = parseFloat(scoreOutOfFive.toFixed(1));

  // Vérifie si la critique ou le conseil a moins de 3 jours (bandeau "New")
  const checkIfNew = () => {
    if (type === 'new-critic' || type === 'new-advice') return;

    const createdAt = new Date(infos.created_at).getTime();

    if (!isNaN(createdAt)) {
      const currentDate = new Date().getTime(); // Convertir en timestamp
      const diffTime = Math.abs(currentDate - createdAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 3) {
        setIsNew(true);
      }
    }
  };

  useEffect(() => {
    checkIfNew();
  }, []);

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
              {(type === 'old-critic' || type === 'old-advice') && isNew ? (
                <Typography
                  component="span"
                  fontStyle="italic"
                  sx={{
                    whiteSpace: 'nowrap',
                    fontSize: '0.8em',
                    padding: '0 5px',
                    backgroundColor: '#5ac164',
                    color: '#fff',
                    lineHeight: '1.5',
                    position: 'relative',
                    top: '4px',
                  }}
                >
                  {'New !'}
                </Typography>
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
              {type === 'new-critic' || type === 'new-advice' || isModify ? (
                <Box
                  height="20px"
                  width="60px"
                  display="flex"
                  justifyContent="space-between"
                  marginLeft="10px"
                >
                  {isGoldNugget ? (
                    <>
                      <GoldNuggetIcon
                        sx={{
                          fontSize: '16px',
                        }}
                      />
                      <Typography
                        variant="body2"
                        component="p"
                        fontWeight="bold"
                      >
                        {'Pépite !'}
                      </Typography>
                    </>
                  ) : isTurnip ? (
                    <>
                      <TurnipIcon
                        sx={{
                          fontSize: '16px',
                        }}
                      />
                      <Typography
                        variant="body2"
                        component="p"
                        fontWeight="bold"
                      >
                        {'Navet !'}
                      </Typography>
                    </>
                  ) : null}
                </Box>
              ) : type === 'old-critic' ? (
                <Box
                  height="20px"
                  width="60px"
                  display="flex"
                  justifyContent="space-between"
                  marginLeft="10px"
                >
                  {infos.is_gold_nugget === 1 ? (
                    <>
                      <GoldNuggetIcon sx={{ fontSize: '16px' }} />
                      <Typography
                        variant="body2"
                        component="p"
                        fontWeight="bold"
                      >
                        {'Pépite !'}
                      </Typography>
                    </>
                  ) : infos.is_turnip === 1 ? (
                    <>
                      <TurnipIcon sx={{ fontSize: '16px' }} />
                      <Typography
                        variant="body2"
                        component="p"
                        fontWeight="bold"
                      >
                        {'Navet !'}
                      </Typography>
                    </>
                  ) : null}
                </Box>
              ) : null}
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
  isGoldNugget: PropTypes.bool.isRequired,
  setIsGoldNugget: PropTypes.func.isRequired,
  isTurnip: PropTypes.bool.isRequired,
  isModify: PropTypes.bool.isRequired,
};

export default CriticAdvicesContent;
