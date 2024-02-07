// Import des libs externes
import { LinearProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes
import MilitaryTechTwoToneIcon from '@mui/icons-material/MilitaryTechTwoTone';

const ProfilRank = ({ loggedUserInfos, chosenUser }) => {
  const { id } = useParams();

  return (
    <Stack alignItems="center">
      <MilitaryTechTwoToneIcon sx={{ color: '#8324A5' }} />
      <Typography
        component="h4"
        sx={{
          color: '#8324A5',
          margin: '4px 0 6px 0',
          fontFamily: 'League Spartan',
          fontSize: '0.85em',
          fontWeight: '700',
          letterSpacing: '-0.2px',
          lineHeight: 'normal',
        }}
      >
        {loggedUserInfos.id === parseInt(id, 10)
          ? `${loggedUserInfos.rank}`
          : `${chosenUser?.rank}`}
      </Typography>
      <LinearProgress
        color="success"
        variant="determinate"
        value={30}
        sx={{
          width: '100%',
        }}
      />
    </Stack>
  );
};

ProfilRank.propTypes = {
  loggedUserInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
};

export default ProfilRank;
