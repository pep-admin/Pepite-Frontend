// Import des libs externes
import {
  styled,
  Rating,
  Typography,
  Box,
} from '@mui/material';

// Import de l'icône étoile vide
import StarIcon from '@mui/icons-material/Star';

// Etoiles customisées jaune
const YellowRating = styled(Rating)({
  '.MuiRating-iconFilled': {
    color: '#FFDA1B',
  },
});

// Etoiles customisées jaune
const OrangeRating = styled(Rating)({
  '.MuiRating-iconFilled': {
    color: '#F29E50',
  },
});

// Etoiles customisées turquoise
const TurquoiseRating = styled(Rating)({
  '.MuiRating-iconFilled': {
    color: '#24A5A5',
  },
});

const SwipeRatings = () => {
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
          value={2.5}
          precision={0.25}
          readOnly
          emptyIcon={
            <StarIcon
              sx={{ color: '#E1E1E1' }}
              fontSize="inherit"
            />
          }
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
          {'2.5' + '/5'}
        </Typography>
        <Box
          minWidth="170px"
          position="relative"
          bottom="5px"
          textAlign="left"
        >
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
        emptyIcon={
          <StarIcon
            sx={{ color: '#E1E1E1' }}
            fontSize="inherit"
          />
        }
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
        {'2.5' + '/5'}
      </Typography>
      <Box
        minWidth="170px"
        position="relative"
        bottom="5px"
        textAlign="left"
      >
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
        emptyIcon={
          <StarIcon
            sx={{ color: '#E1E1E1' }}
            fontSize="inherit"
          />
        }
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
        {'2.5' + '/5'}
      </Typography>
      <Box
        minWidth="170px"
        position="relative"
        bottom="5px"
        textAlign="left"
      >
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

export default SwipeRatings;