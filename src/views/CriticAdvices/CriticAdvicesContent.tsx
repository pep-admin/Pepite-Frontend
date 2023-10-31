// Import des libs externes
import { Stack, Typography, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants customisés
import { YellowRating } from '@utils/styledComponent';

const CriticAdvicesContent = ({
  type,
  chosenMovie,
  displayOverview,
  setDisplayOverview,
}) => {
  return (
    <CardContent sx={{ padding: '0 0 0 12px !important', flexGrow: '1' }}>
      <Stack>
        <Stack>
          <Stack direction="row" alignItems="center" columnGap="10px">
            <Typography
              variant="body1"
              fontWeight="bold"
              component="h5"
              textAlign="left"
              color="primary.dark"
            >
              {chosenMovie !== null && type === 'new-critic'
                ? chosenMovie[0].title
                : 'Seul sur mars'}
            </Typography>
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
              {chosenMovie !== null &&
              'release_date' in chosenMovie[0] &&
              type === 'new-critic'
                ? 'film'
                : chosenMovie !== null &&
                  'first_air_date' in chosenMovie[0] &&
                  type === 'new-critic'
                ? 'série'
                : 'Seul sur mars'}
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
};

export default CriticAdvicesContent;
