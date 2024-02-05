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
        variant="body2"
        sx={{
          color: '#8324A5',
          fontWeight: 'bold',
          marginBottom: '2px',
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
