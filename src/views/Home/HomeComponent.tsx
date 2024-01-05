// Import des libs externes
import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// Import des composants internes
import Header from '@utils/Header';
import { Item } from '@utils/styledComponent';
import SearchBar from '@utils/SearchBar';
import ContactsComponent from '@views/Contacts/ContactsComponent';
import ProfilSuggestedNotes from '@views/Profil/ProfilSuggestedNotes';

// Import des requêtes
import { getAllCriticsOfAcquaintances } from '@utils/request/critics/getAllCriticsOfAcquaintances';

// Import du contexte
import { useData } from '@hooks/DataContext';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';

const Home = () => {
  const { displayType } = useData();

  const [userInfos, setUserInfos] = useState(
    // L'utilisateur connecté
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites de l'utilisateur du profil
  const [criticsOfAcquaintances, setCriticsOfAcquaintances] = useState([]); // Les critiques des connaissances de l'utilisateur

  const getCritics = async () => {
    const critics = await getAllCriticsOfAcquaintances(
      userInfos.id,
      displayType,
    );
    console.log(critics);
    setCriticsOfAcquaintances(critics);
  };

  useEffect(() => {
    getCritics();
  }, [displayType]);

  return (
    <>
      <Header userInfos={userInfos} setUserInfos={setUserInfos} />
      <Container
        maxWidth="xl"
        sx={{
          padding: '6px',
          backgroundColor: '#F4F4F4',
          minHeight: 'calc(100vh - 60px)',
        }}
      >
        <Stack direction="column" spacing={1}>
          <SearchBar
            Item={Item}
            page={'contacts'}
            userInfos={userInfos}
            chosenUser={null}
            handlePoster={null}
          />
          <ContactsComponent page={'home'} />
          <Item
            customheight="calc(100% - 6px)"
            customwidth="100%"
            margintop="6px"
            overflow="hidden"
          >
            <ProfilSuggestedNotes
              page={'home'}
              goldenMovies={goldenMovies}
              setGoldenMovies={setGoldenMovies}
              userInfos={userInfos}
            />
          </Item>
          <SearchBar
            Item={Item}
            page={'home'}
            userInfos={userInfos}
            chosenUser={null}
            handlePoster={null}
            showPicModal={null}
          />
          {criticsOfAcquaintances.length ? (
            criticsOfAcquaintances.map(critic => {
              return (
                <CriticAdvicesComponent
                  key={critic.id}
                  type={'old-critic'}
                  setUserCritics={setCriticsOfAcquaintances}
                  setGoldenMovies={setGoldenMovies}
                  chosenMovie={null}
                  setNewCriticError={null}
                  setNewCriticInfo={null}
                  setNewCriticSuccess={null}
                  infos={critic}
                  chosenUser={null}
                  countCriticsAndGold={null}
                />
              );
            })
          ) : (
            <NoCriticAdvice page={'home'} />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
