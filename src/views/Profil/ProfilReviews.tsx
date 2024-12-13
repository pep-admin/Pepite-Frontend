import { Stack, Typography } from '@mui/material';
import MovieMainCard from '@utils/components/Cards/MovieMainCard';
import CustomBadge from '@utils/components/Wrappers/CustomBadge';

const ProfilReviews = ({ isProfilLoggedUser, userInfos, criticsCount, criticsMovies }) => {
  return (
    <Stack
      spacing={3}
      padding='30px 0 40px 0'
    >
      <Stack width='fit-content' padding='0 5vw'>
        <CustomBadge
          value={criticsCount}
          max={999}
          showZero
          bgColor={'#835F00'}
        >
          <Typography
            component='h2'
            color='text.primary'
            fontSize='1.15em'
            fontWeight='400'
            textTransform='uppercase'
          >
            {
              isProfilLoggedUser ?
                'Vos notations'
              :
                `Notations de ${userInfos.first_name}`
            }
          </Typography>
        </CustomBadge>
        </Stack>
        <Stack spacing={3}>
          {
            !criticsMovies.length ? (
              <Typography color='#555555' lineHeight='1' padding='0 5vw'>
                {isProfilLoggedUser ? 'Vous n\'avez encore posté aucune critique.' : `${userInfos.first_name} n'a encore posté aucune critique.`}
              </Typography>
            ) : (
              criticsMovies.map((movie, index) => (
                <MovieMainCard 
                  key={movie.id} 
                  listSectionIndex={null}
                  movie={movie} 
                  displayGradient={true}
                  isFirstCard={index === 0}
                  isLastCard={index === criticsMovies.length - 1} 
                  onComplete={null}
                />
              ))
            )
          }
        </Stack>
    </Stack>
  );
};

export default ProfilReviews;