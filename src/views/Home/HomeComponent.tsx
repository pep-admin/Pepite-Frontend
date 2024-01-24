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
  const { displayType, chosenMovie } = useData();

  const [userInfos, setUserInfos] = useState(
    // L'utilisateur connecté
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur
  const [criticsOfAcquaintances, setCriticsOfAcquaintances] = useState([]); // Les critiques des connaissances de l'utilisateur
  const [criticsPage, setCriticsPage] = useState(1); // Page de critiques incrémentée à chaque fois que l'utilisateur scroll en bas de page
  const [loadingMore, setLoadingMore] = useState(true); // Booléen : charger de nouvelles critiques
  const [haveMoreCritics, setHaveMoreCritics] = useState(true);
  // const [alertSeverity, setAlertSeverity] = useState({
  //   state: null,
  //   message: null,
  // });

  /*
    On récupère 5 critiques selon cet ordre :
    1) les critiques récentes d'amis proches
    2) les critiques anciennes d'amis proches
    3) les critiques récentes d'amis
    4) les critiques anciennes d'amis
    5) les critiques récentes des suivis
    6) les critiques anciennes des suivis
  */
  const getCritics = async () => {
    setLoadingMore(true); // Critiques en cours de chargement

    const critics = await getAllCriticsOfAcquaintances(
      userInfos.id,
      displayType,
      criticsPage,
    );

    const newCritics = critics
      .map(critic => ({
        ...critic,
        // Convertir la date en un format comparable
        timestamp: new Date(critic.created_at).getTime(),
        // Attribuer une pondération basée sur le type de relation
        order:
          critic.relation_type === 'close_friend'
            ? 3
            : critic.relation_type === 'friend'
            ? 2
            : 1,
      }))
      .sort((a, b) => {
        // On trie d'abord selon la relation, puis par date
        return b.order - a.order || b.timestamp - a.timestamp;
      });

    if (!critics.length) {
      setHaveMoreCritics(false);
    }

    setCriticsOfAcquaintances(existingCritics => [
      ...existingCritics,
      ...newCritics,
    ]);

    // 1000 ms de delay pour permettre de voir le loader de chargement
    setTimeout(() => {
      setLoadingMore(false); // Critiques chargées
    }, 1000);
  };

  // Détecte le scroll en bas de page pour récupérer d'autres critiques
  useEffect(() => {
    if (!haveMoreCritics) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loadingMore
      )
        return;
      setCriticsPage(currentCount => currentCount + 1); // Récupérer une nouvelle page de critiques
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore]);

  useEffect(() => {
    getCritics();
  }, [displayType, criticsPage]);

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
          {chosenMovie !== null ? (
            <CriticAdvicesComponent
              type={'new-critic'}
              chosenMovie={chosenMovie}
              setUserCritics={setCriticsOfAcquaintances}
              setGoldenMovies={setGoldenMovies}
              infos={null}
              haveMoreCritics={null}
              isLast={null}
              // chosenUser={chosenUser}
              // countCriticsAndGold={countCriticsAndGold}
            />
          ) : null}
          {criticsOfAcquaintances.length ? (
            criticsOfAcquaintances.map((critic, index) => {
              return (
                <CriticAdvicesComponent
                  key={index}
                  type={'old-critic'}
                  setUserCritics={setCriticsOfAcquaintances}
                  setGoldenMovies={setGoldenMovies}
                  chosenMovie={null}
                  infos={critic}
                  chosenUser={null}
                  countCriticsAndGold={null}
                  haveMoreCritics={haveMoreCritics}
                  isLast={criticsOfAcquaintances.length - 1 === index}
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
