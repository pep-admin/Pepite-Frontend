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
  criticInfos,
  isModify,
}) => {
  // const [isNuggetAnimEnded, setIsNuggetAnimEnded] = useState(false);
  const [isNew, setIsNew] = useState(false);

  let originalScore;

  if (type === 'new-critic') originalScore = chosenMovie.vote_average;
  else {
    originalScore = criticInfos.vote_average;
  }

  const scoreOutOfFive = originalScore / 2;
  const roundedScore = parseFloat(scoreOutOfFive.toFixed(1));

  const checkCriticDate = () => {
    if (type === 'new-critic') return;

    const criticDate = new Date(criticInfos.critic_date).getTime(); // Convertir en timestamp

    if (!isNaN(criticDate)) {
      const currentDate = new Date().getTime(); // Convertir en timestamp
      const diffTime = Math.abs(currentDate - criticDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 3) {
        setIsNew(true);
      }
    }
  };

  useEffect(() => {
    checkCriticDate();
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
                  type === 'new-critic'
                    ? `${chosenMovie.title}`
                    : // Si l'utilisateur a déjà noté un film
                    criticInfos !== null &&
                      'release_date' in criticInfos &&
                      type === 'old-critic'
                    ? `${criticInfos.title}`
                    : // Si l'utilisateur compte noter une série
                    chosenMovie !== null &&
                      'first_air_date' in chosenMovie &&
                      type === 'new-critic'
                    ? `${chosenMovie.name}`
                    : // Si l'utilisateur a déjà noté une série
                    criticInfos !== null &&
                      'first_air_date' in criticInfos &&
                      type === 'old-critic'
                    ? `${criticInfos.name}`
                    : null
                }
              </Typography>
              {type === 'old-critic' && isNew ? (
                <Typography
                  component="span"
                  fontStyle="italic"
                  sx={{
                    whiteSpace: 'nowrap',
                    fontSize: '0.8em',
                    padding: '0 5px',
                    backgroundColor: '#5ac164',
                    color: '#fff',
                    lineHeight: '1.43',
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
              {type === 'new-critic' || isModify ? (
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
                  {criticInfos.is_gold_nugget === 1 ? (
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
                  ) : criticInfos.is_turnip === 1 ? (
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
                  type === 'new-critic') ||
                // Si la critique est une critique de film
                (criticInfos !== null &&
                  'release_date' in criticInfos &&
                  type === 'old-critic')
                  ? 'Film'
                  : // Si l'utilisateur choisit une série
                  (chosenMovie !== null &&
                      'first_air_date' in chosenMovie &&
                      type === 'new-critic') ||
                    // Si la critique est une critique de série
                    (criticInfos !== null &&
                      'first_air_date' in criticInfos &&
                      type === 'old-critic')
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
              {chosenMovie !== null && type === 'new-critic'
                ? chosenMovie.genres.map(genre => genre.name).join(', ')
                : criticInfos.genres.map(genre => genre.name).join(', ')}
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
                type === 'new-critic'
                  ? chosenMovie.release_date.split('-')[0]
                  : // Si l'utilisateur choisit une série
                  chosenMovie !== null &&
                    'first_air_date' in chosenMovie &&
                    type === 'new-critic'
                  ? chosenMovie.first_air_date.split('-')[0]
                  : // Si la critique est une critique de film
                  criticInfos !== null &&
                    'release_date' in criticInfos &&
                    type === 'old-critic'
                  ? criticInfos.release_date.split('-')[0]
                  : // Si la critique est une critique de série
                  criticInfos !== null &&
                    'first_air_date' in criticInfos &&
                    type === 'old-critic'
                  ? criticInfos.first_air_date.split('-')[0]
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
  criticInfos: PropTypes.object,
  isGoldNugget: PropTypes.bool.isRequired,
  setIsGoldNugget: PropTypes.func.isRequired,
  isTurnip: PropTypes.bool.isRequired,
  isModify: PropTypes.bool.isRequired,
};

export default CriticAdvicesContent;
