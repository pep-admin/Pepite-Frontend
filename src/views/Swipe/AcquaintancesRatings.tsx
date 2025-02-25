// Import des libs externes
import { Stack, Typography } from '@mui/material';

// Import des composants internes
import ColoredRating from '@utils/components/ColoredRating';

const AcquaintancesRatings = () => {
  return (
    <>
      <Stack>
        <Typography fontSize="2.4vh" color="#fff">
          Moyenne des
          <span style={{ color: '#DD8C28', fontWeight: '500' }}> amis</span>
        </Typography>
        <Stack
          height="15px"
          direction="row"
          alignItems="center"
          position="relative"
          left="2.5px"
        >
          <ColoredRating
            color="#DD8C28"
            emptyColor="#B9B9B9"
            value={4.3}
            readOnly={true}
            precision={0.1}
            fontSize="inherit"
          />
          <Typography
            fontSize="2.4vh"
            component="span"
            sx={{
              color: '#DD8C28',
              fontWeight: '500',
            }}
          >
            {'4.3'}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography fontSize="2.4vh" color="#fff">
          Moyenne des
          <span style={{ color: '#24A5A5', fontWeight: '500' }}> suivis</span>
        </Typography>
        <Stack
          height="15px"
          direction="row"
          alignItems="center"
          position="relative"
          left="2.5px"
        >
          <ColoredRating
            color="#24A5A5"
            emptyColor="#B9B9B9"
            value={4.1}
            readOnly={true}
            precision={0.1}
            fontSize="inherit"
          />
          <Typography
            fontSize="2.4vh"
            component="span"
            sx={{
              color: '#24A5A5',
              fontWeight: '500',
            }}
          >
            {'4.1'}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default AcquaintancesRatings;
