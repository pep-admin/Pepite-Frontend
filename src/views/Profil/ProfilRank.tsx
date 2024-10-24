// Import des libs externes
import { Stack, Typography, styled, useTheme } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { ranks } from '@utils/data/ranks';

const ProfilRank = ({ userInfos }) => {

  const theme = useTheme();

  // Trouver le grade actuel et le prochain grade
  const currentRankIndex = ranks.findIndex(rank => rank.name === userInfos.rank);
  const currentRank = ranks[currentRankIndex];
  const nextRank = ranks[currentRankIndex + 1] || currentRank; // Si c'est le dernier grade, il n'y a pas de suivant

  // Calculer la progression vers le prochain grade
  const currentPoints = userInfos.progression;
  const pointsForCurrentRank = currentRank.points_required;
  const pointsForNextRank = nextRank.points_required;

  // Calculer la valeur de progression pour la barre
  const progressValue = ((currentPoints - pointsForCurrentRank) / (pointsForNextRank - pointsForCurrentRank)) * 100;

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

  return (
    <Stack spacing={2} >
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
          {`${userInfos.rank}`}
        </Typography>
      </Stack>
      <BorderLinearProgress
        variant="determinate"
        value={progressValue}
      />
    </Stack>
  );
};

export default ProfilRank;
