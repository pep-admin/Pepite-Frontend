// Import des libs externes
import { Skeleton, Stack, Typography, styled, useTheme } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

// Import des requêtes
import { getUserRankRequest } from '@utils/request/grades/getUserRankRequest';

const ProfilRank = ({ page, criticsNumber }) => {

  const { id } = useParams();
  const theme = useTheme();

  const [progression, setProgression] = useState(0);
  const [userRank, setUserRank] = useState(null);
  const [currentGradePoints, setCurrentGradePoints] = useState(0);
  const [nextGradePoints, setNextGradePoints] = useState(0);

  const getUserRank = async () => {
    const response = await getUserRankRequest(id);
    // console.log('la réponse', response);

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
    variant: 'determinate',
    height: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#363636',
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#E7AE1A',
    },
  }));

  useEffect(() => {
    getUserRank();
  }, [criticsNumber]);

  return (
    <Stack spacing={2} width='35vw'>
      {
        userRank ?
          <Stack 
            direction='row'
            justifyContent='center'
            alignItems='center' 
            columnGap='2px' 
          >
            <MilitaryTechIcon
              sx={{
                color: theme.palette.secondary.light
              }}
            />
             <Typography
              component='p'
              align='center'
              color='secondary.light'
              fontFamily='League Spartan, sans-serif'
              fontSize='1.1em'
              fontWeight='300'
              lineHeight='1'
            >
              {`${userRank}`}
            </Typography>
          </Stack>
        :
          <Skeleton variant='text' sx={{ fontSize: '1.1em', width: '100%' }} />
      } 
      <BorderLinearProgress
        variant="determinate"
        value={progressionPercentage}
      />
    </Stack>
  );
};

export default ProfilRank;
