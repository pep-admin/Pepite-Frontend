import { Stack, Typography, styled } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { getUserRankRequest } from '@utils/request/grades/getUserRankRequest';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfilRank2 = ({ criticsNumber }) => {

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

  // Calcul du pourcentage de progression vers le prochain grade
  const progressionPercentage =
    nextGradePoints > currentGradePoints
      ? ((progression - currentGradePoints) /
          (nextGradePoints - currentGradePoints)) *
        100
      : 0;

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    variant: "determinate",
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#E0E0E0',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1BADAD'
    },
  }));

  useEffect(() => {
    getUserRank();
  }, [criticsNumber]);

  return (
    <Stack width='110px'>
      <Typography 
        variant='body2' 
        align='center' 
        color='#898989' 
        fontWeight='600'
        marginBottom='3px'
      >
        {`${userRank}`}
      </Typography>
      <BorderLinearProgress
        variant="determinate"
        value={progressionPercentage}
      />
    </Stack>
  );
};

export default ProfilRank2;