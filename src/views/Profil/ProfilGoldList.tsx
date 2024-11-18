import { Stack, Typography, Button } from '@mui/material';
import { useState } from 'react';
import MovieMainCard from '@utils/components/Cards/MovieMainCard';
import CustomBadge from '@utils/components/Wrappers/CustomBadge';

const ProfilGoldList = ({ isProfilLoggedUser, userInfos, goldNuggetsCount, goldNuggetsMovies }) => {

  const [visibleMoviesCount, setVisibleMoviesCount] = useState(3); // Par défaut, afficher 3 films

  // Fonction pour afficher 3 films supplémentaires
  const handleShowMore = () => {
    setVisibleMoviesCount((prevCount) => prevCount + 3);
  };

  return (
    <Stack
      spacing={3}
      padding='30px 0 40px 0'
    >
      <Stack width='fit-content' padding='0 5vw'>
        <CustomBadge
          value={goldNuggetsCount}
          max={999}
          showZero={true}
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
                'Vos pépites'
              :
                `Pépites de ${userInfos.first_name}`
            }
          </Typography>
        </CustomBadge>
      </Stack>
      <Stack spacing={3}>
        {
          !goldNuggetsMovies.length ? (
            <Typography color='#555555' lineHeight='1'>
              {isProfilLoggedUser ? 'Vous n\'avez encore ajouté aucune pépite.' : `${userInfos.first_name} n'a encore ajouté aucune pépite.`}
            </Typography>
          ) : (
            goldNuggetsMovies.slice(0, visibleMoviesCount).map((movie, index) => (
              <MovieMainCard 
                key={movie.id} 
                listSectionIndex={null}
                movie={movie} 
                displayGradient={false}
                isFirstCard={index === 0}
                isLastCard={index === goldNuggetsMovies.length - 1} 
                onComplete={null}
              />
            ))
          )
        }
      </Stack>
      {visibleMoviesCount < goldNuggetsMovies.length && (
        <Button
          variant="outlined"
          onClick={handleShowMore}
          sx={{
            marginTop: '40px !important',
            alignSelf: 'center',
            fontWeight: 'normal',
            color: '#186060',
            borderColor: '#186060',
            lineHeight: '1',
          }}
        >
          {'Afficher +'}
        </Button>
      )}
    </Stack>
  );
};

export default ProfilGoldList;
