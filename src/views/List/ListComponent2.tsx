import { Box, Container, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Header from '@utils/components/Header';
import SuggestedGoldNuggets2 from '@utils/components/SuggestedGoldNuggets2';
import { useEffect, useState } from 'react';
import ListMoviesSeries from './ListMoviesSeries';
import { useData } from '@hooks/DataContext';

const ListComponent2 = () => {

  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const { displayType } = useData();

  const [alignment, setAlignment] = useState('À voir');
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur

  const handleChange = (_, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    console.log(alignment);
    
  }, [alignment])

  return (
    <>
      <Header page={'list'} />
      <Container 
        sx={{ 
          height: 'calc(100vh - 65px)',
          marginTop: '15px',
          padding: '0',
        }}
      >
        <Stack height='100%'>
          <Stack alignItems='center' padding='0 4%' >
            <ToggleButtonGroup
              color="success"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              fullWidth
            >
              <ToggleButton value='À voir'>{'À voir'}</ToggleButton>
              <ToggleButton value='À noter'>{'À noter'}</ToggleButton>
              <ToggleButton value='Notés'>{'Notés'}</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack marginTop='10px' padding='0 4%' >
            <Typography
              component='h4' 
              variant='body2' 
              fontWeight='600'
              color='#383838'  
            >
              {'Dernières pépites de vos contacts'}
            </Typography>
          </Stack>
          <Box
            width='100vw' 
            marginTop='66px'
            bgcolor='#CAE6E4'
            position='relative'
            display='flex'
            flexGrow='1'
          >
            <SuggestedGoldNuggets2
              page={'list'}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              loggedUserInfos={loggedUserInfos}
              // chosenUser={chosenUser}
            />
            <Stack 
              width='100vw'
              padding='0 4%'
              marginTop='73px'
            >
              <Stack>
                <Typography 
                  component='h4' 
                  variant='body2' 
                  fontWeight='600'
                  color='#383838'  
                >
                  {`${alignment}`}
                </Typography>
              </Stack>
              <ListMoviesSeries 
                movieOrSerie={'movie'}
                alignment={alignment}
              />
              <ListMoviesSeries 
                movieOrSerie={'tv'}
                alignment={alignment}
              />
            </Stack>
          </Box>
        </Stack>
      
      </Container>
    </>
  );
};

export default ListComponent2;