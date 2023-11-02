// Import des libs externes
import {
  Card,
  CardMedia,
  Container,
  Stack,
  Box,
  Avatar,
  Typography,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import Header from '@utils/Header';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// Import des composants internes
import { Item } from '@utils/styledComponent';
import ProfilDetails from './ProfilDetails';
import ProfilSuggestedNotes from './ProfilSuggestedNotes';
import SearchBar from '@utils/SearchBar';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';

// Import des icônes
import MilitaryTechTwoToneIcon from '@mui/icons-material/MilitaryTechTwoTone';

// Import du contexte
import { useData } from '@hooks/DataContext';
import { getAllCriticsOfUser } from '@utils/request/critics/getCritics';

const ProfilComponent = () => {
  const { id } = useParams();
  const { chosenMovie } = useData();

  const [userCritics, setUserCritics] = useState([]);

  const [newCriticError, setNewCriticError] = useState({
    error: null,
    message: null,
  });
  const [newCriticInfo, setNewCriticInfo] = useState({
    info: null,
    message: null,
  });
  const [newCriticSuccess, setNewCriticSuccess] = useState({
    success: null,
    message: null,
  });

  const fetchCritics = useCallback(async () => {
    try {
      const criticData = await getAllCriticsOfUser(id);
      console.log(criticData);
      setUserCritics(criticData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }, []);

  useEffect(() => {
    fetchCritics();
  }, [fetchCritics]);

  return (
    <>
      <Header />
      <Card
        sx={{
          height: '25vh',
          width: '100%',
          position: 'relative',
          borderRadius: '0',
        }}
      >
        <CardMedia
          image="http://127.0.0.1:5173/images/interstellar.jpg"
          sx={{
            height: '100%',
          }}
        />
        {/* Backround gradient pour la lisibilité du nom de l'utilisateur */}
        <Box
          width="100%"
          height="100%"
          position="absolute"
          bottom="0"
          right="0"
          sx={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(14,14,14,0.37) 70%)',
          }}
        ></Box>
        <Box
          position="absolute"
          bottom="0"
          right="0"
          width="calc(100% - 108px)"
        >
          <Typography
            component="h2"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.4em',
              padding: '0 6px 0 16px',
            }}
          >
            {'Kate Austen'}
          </Typography>
        </Box>
      </Card>
      <Container
        maxWidth="xl"
        sx={{
          padding: '0 6px',
          backgroundColor: '#F4F4F4',
          minHeight: 'calc(100vh - (60px + 25vh))',
          marginBottom: '7px',
        }}
      >
        <Stack height="100%" position="relative">
          <Box
            width="100px"
            display="flex"
            justifyContent="center"
            position="absolute"
            top="-66px"
            left="0"
          >
            <Avatar
              alt="Remy Sharp"
              src="http://127.0.0.1:5173/images/kate.jpg"
              sx={{
                width: 90,
                height: 90,
                boxShadow: 'inset 0px 0px 0px 3px #fff',
              }}
            />
          </Box>
          <Stack
            direction="column"
            height="189px"
            columnGap="6px"
            flexWrap="wrap"
          >
            <Box height="189px" width="100px">
              <Box
                position="relative"
                height="50px"
                width="100px"
                borderRadius="100px 100px 0 0"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                paddingTop="5px"
                sx={{ background: '#fff' }}
              >
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
                  {'Maître noteur'}
                </Typography>
              </Box>
              <Item
                customheight="calc(100% - 50px)"
                customwidth="100px"
                padding="7px"
                display="flex"
                flexdirection="column"
                borderradius="0 0 10px 10px"
              >
                <ProfilDetails />
              </Item>
            </Box>
            <Item
              customheight="calc(100% - 6px)"
              customwidth="calc(100% - 108px)"
              margintop="6px"
              overflow="hidden"
            >
              <ProfilSuggestedNotes />
            </Item>
          </Stack>
          <SearchBar Item={Item} page={'profil'} />
          <Stack>
            {chosenMovie !== null ? (
              <CriticAdvicesComponent
                type={'new-critic'}
                chosenMovie={chosenMovie}
                setNewCriticError={setNewCriticError}
                setNewCriticInfo={setNewCriticInfo}
                setNewCriticSuccess={setNewCriticSuccess}
                criticInfos={null}
              />
            ) : null}
            {newCriticError.error &&
            !newCriticSuccess.success &&
            !newCriticInfo.info ? (
              <Item margintop="6px">
                <Alert
                  severity="error"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {newCriticError.message}
                </Alert>
              </Item>
            ) : !newCriticError.error &&
              newCriticSuccess.success &&
              !newCriticInfo.info ? (
              <Item margintop="6px">
                <Alert
                  severity="success"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {newCriticSuccess.message}
                </Alert>
              </Item>
            ) : !newCriticError.error &&
              !newCriticSuccess.success &&
              newCriticInfo.info ? (
              <Item margintop="6px">
                <Alert
                  severity="info"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                  }}
                >
                  <AlertTitle
                    sx={{
                      display: 'flex',
                      marginBottom: '0',
                      fontWeight: 'bold',
                    }}
                  >
                    {'Critique déjà existante'}
                  </AlertTitle>
                  {'Souhaitez vous la remplacer par cette nouvelle critique ?'}
                  <Stack direction="row" justifyContent="center">
                    <Button>{'Remplacer'}</Button>
                    <Button
                      onClick={() =>
                        setNewCriticInfo({ info: false, message: null })
                      }
                    >
                      {'Annuler'}
                    </Button>
                  </Stack>
                </Alert>
              </Item>
            ) : null}
            {userCritics.length > 0
              ? userCritics.map(critic => {
                  return (
                    <CriticAdvicesComponent
                      key={critic.id}
                      type={'old-critic'}
                      chosenMovie={null}
                      setNewCriticError={null}
                      setNewCriticInfo={null}
                      setNewCriticSuccess={null}
                      criticInfos={critic}
                    />
                  );
                })
              : null}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProfilComponent;
