// Import des libs externes
import { LinearProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes
import MilitaryTechTwoToneIcon from '@mui/icons-material/MilitaryTechTwoTone';
import { useEffect, useState } from 'react';
import { getUserRankRequest } from '@utils/request/grades/getUserRankRequest';

const ProfilRank = ({ criticsNumber }) => {
  const { id } = useParams();

  const [progression, setProgression] = useState(0);
  const [userRank, setUserRank] = useState("Chercheur d'Or");
  const [currentGradePoints, setCurrentGradePoints] = useState(0);
  const [nextGradePoints, setNextGradePoints] = useState(0);

  const getUserRank = async () => {
    const response = await getUserRankRequest(id);
    console.log('la réponse', response);

    setProgression(response.progression);
    setUserRank(response.rank);
    setCurrentGradePoints(response.currentGradePoints);
    setNextGradePoints(response.nextGradePoints);
  };

  useEffect(() => {
    getUserRank();
  }, [criticsNumber]);

  // Calcul du pourcentage de progression vers le prochain grade
  const progressionPercentage =
    nextGradePoints > currentGradePoints
      ? ((progression - currentGradePoints) /
          (nextGradePoints - currentGradePoints)) *
        100
      : 0;

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
        {userRank}
      </Typography>
      <LinearProgress
        color="success"
        variant="determinate"
        value={progressionPercentage}
        sx={{
          width: '100%',
        }}
      />
    </Stack>
  );
};

ProfilRank.propTypes = {
  criticsNumber: PropTypes.number.isRequired,
};

export default ProfilRank;
