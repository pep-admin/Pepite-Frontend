// Import des libs externes
import {
  Box,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

// Import des composants internes
import SuggestedGoldNuggets2 from '@utils/components/SuggestedGoldNuggets';
import ListMoviesSeries from './ListMoviesSeries';
import Header2 from '@utils/components/Header/Header2';

const ListComponent2 = () => {
  const loggedUserInfos = JSON.parse(localStorage.getItem('user_infos'));

  const [alignment, setAlignment] = useState('À voir');
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur

  const handleChange = (_, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    console.log(alignment);
  }, [alignment]);

  return (
    <>
      <Header2 page={'Ma liste'} isTrailerFullscreen={null} />
      <Container
        sx={{
          height: 'calc(100vh - 65px)',
          marginTop: '15px',
          padding: '0',
        }}
      >
        <Stack height="100%">
          <Stack alignItems="center" padding="0 4%">
            <ToggleButtonGroup
              color="success"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              fullWidth
              sx={{
                height: '50px',
              }}
            >
              <ToggleButton
                value="À voir"
                sx={{
                  lineHeight: 'normal',
                }}
              >
                {'À voir'}
              </ToggleButton>
              <ToggleButton
                value="À noter"
                sx={{
                  lineHeight: 'normal',
                }}
              >
                {'À noter'}
              </ToggleButton>
              <ToggleButton
                value="Notés"
                sx={{
                  lineHeight: 'normal',
                }}
              >
                {'Notés'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack marginTop="10px" padding="0 4%">
            <Typography
              component="h4"
              variant="body2"
              fontWeight="600"
              color="#383838"
            >
              {'Dernières pépites de vos contacts'}
            </Typography>
          </Stack>
          <Box
            width="100vw"
            marginTop="66px"
            bgcolor="#CAE6E4"
            position="relative"
            display="flex"
            flexGrow="1"
          >
            <SuggestedGoldNuggets2
              page={'list'}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              loggedUserInfos={loggedUserInfos}
              // chosenUser={chosenUser}
            />
            <Stack width="100vw" padding="0 4%" marginTop="73px">
              <Stack marginBottom="5px">
                <Typography
                  component="h4"
                  variant="body2"
                  fontWeight="600"
                  color="#383838"
                >
                  {`${alignment}`}
                </Typography>
              </Stack>
              {/* <ListMoviesSeries movieOrSerie={'movie'} alignment={alignment} />
              <ListMoviesSeries movieOrSerie={'tv'} alignment={alignment} /> */}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default ListComponent2;
