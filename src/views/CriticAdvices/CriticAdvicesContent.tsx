// Import des libs externes
import { Stack, Typography, CardContent, Button } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants customisés
import { GoldNuggetIcon, YellowRating } from '@utils/styledComponent';

const CriticAdvicesContent = ({
  type,
  chosenMovie,
  displayOverview,
  setDisplayOverview,
  isGoldNugget,
  setIsGoldNugget,
  criticInfos,
}) => {
  return (
    <CardContent sx={{ padding: '0 0 0 12px !important', flexGrow: '1' }}>
      <Stack>
        <Stack>
          <Stack direction="column" columnGap="10px">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                component="h5"
                textAlign="left"
                color="primary.dark"
              >
                {chosenMovie !== null && type === 'new-critic'
                  ? chosenMovie[0].title
                  : criticInfos.title}
              </Typography>
              {type === 'new-critic' ? (
                <Button
                  variant="contained"
                  sx={{
                    height: '100%',
                    padding: '2px 6px',
                    textTransform: 'initial',
                    borderRadius: '2px',
                    color: !isGoldNugget ? 'inherit' : '#fff',
                    backgroundColor: !isGoldNugget
                      ? '#e5e4e4 !important'
                      : '#F29E50 !important',
                  }}
                  onClick={() => setIsGoldNugget(!isGoldNugget)}
                >
                  <GoldNuggetIcon
                    sx={{ fontSize: '15px', marginRight: '5px' }}
                  />
                  <Typography variant="body2" component="p">
                    {isGoldNugget ? 'Pépite !' : 'Pépite ?'}
                  </Typography>
                </Button>
              ) : null}
            </Stack>

            <Stack direction="row" columnGap="5px">
              <YellowRating
                value={4.5}
                precision={0.5}
                readOnly
                sx={{ position: 'relative', top: '1.4px' }}
              />
              <Typography variant="body2" fontWeight="bold" component="p">
                {'4.5 / 5'}
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
              {(chosenMovie !== null &&
                'release_date' in chosenMovie[0] &&
                type === 'new-critic') ||
              ('release_date' in criticInfos && type === 'old-critic')
                ? 'film'
                : (chosenMovie !== null &&
                    'first_air_date' in chosenMovie[0] &&
                    type === 'new-critic') ||
                  ('first_air_date' in criticInfos && type === 'old-critic')
                ? 'série'
                : null}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography
              variant="body2"
              fontWeight="bold"
              component="p"
              color="primary.dark"
            >
              {'Genre :'}
            </Typography>
            <Typography variant="body2" component="p" marginLeft="5px">
              {chosenMovie !== null && type === 'new-critic'
                ? chosenMovie[0].genres.map(genre => genre.name).join(', ')
                : 'Science-fiction'}
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
              {chosenMovie !== null &&
              'release_date' in chosenMovie[0] &&
              type === 'new-critic'
                ? chosenMovie[0].release_date.split('-')[0]
                : chosenMovie !== null &&
                  'first_air_date' in chosenMovie[0] &&
                  type === 'new-critic'
                ? chosenMovie[0].first_air_date.split('-')[0]
                : '2014'}
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
  chosenMovie: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf([null])]),
  displayOverview: PropTypes.bool.isRequired,
  setDisplayOverview: PropTypes.func.isRequired,
  criticInfos: PropTypes.object.isRequired,
  isGoldNugget: PropTypes.bool.isRequired,
  setIsGoldNugget: PropTypes.func.isRequired,
};

export default CriticAdvicesContent;
