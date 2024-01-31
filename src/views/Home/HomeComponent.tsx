// Import des libs externes
import { Container, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

// Import des composants internes
import Header from '@utils/Header';
import SearchBar from '@utils/SearchBar';
import { Item } from '@utils/styledComponent';
import ContactsSuggestions from '@views/Contacts/ContactsSuggestions';
import SuggestedGoldNuggets from '@views/Profil/SuggestedGoldNuggets';
import CriticAdvicesComponent from '@views/CriticAdvices/CriticAdvicesComponent';
import NoCriticAdvice from '@views/CriticAdvices/NoCriticAdvice';
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';

// Import des requêtes
import { getAllCriticsOfAcquaintances } from '@utils/request/critics/getAllCriticsOfAcquaintances';

// Import du contexte
import { useData } from '@hooks/DataContext';
import useVerticalScroll from '@hooks/useVerticalScroll';

const Home = () => {
  const { displayType, chosenMovie } = useData();

  // L'utilisateur connecté
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur
  const [criticsOfAcquaintances, setCriticsOfAcquaintances] = useState([]); // Les critiques des connaissances de l'utilisateur
  const [isDataFetched, setIsDataFetched] = useState(false); // Si les données ont été récupérées

  const firstRender = useRef(true);

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
    7) les critiques de l'utilisateur connecté
  */

  const getCritics = async page => {
    console.log('recup des critiques');

    const critics = await getAllCriticsOfAcquaintances(
      userInfos.id,
      displayType,
      page,
    );

    const newCritics = critics
      .map(critic => ({
        ...critic,
        // Convertir la date en un format comparable
        timestamp: new Date(critic.created_at).getTime(),
        // Ordre d'affichage basé sur le type de relation
        order:
          critic.relation_type === 'close_friend'
            ? 3 // Critiques des amis proches en premier
            : critic.relation_type === 'friend'
            ? 2 // Critiques des amis en deuxième
            : critic.relation_type === 'followed'
            ? 1 // Critiques des suivis en troisième
            : 0, // Critiques de l'utilisateur connecté
      }))

      .sort((a, b) => {
        // On trie d'abord selon la relation, puis par date
        return b.order - a.order || b.timestamp - a.timestamp;
      });

    setCriticsOfAcquaintances(existingCritics => [
      ...existingCritics,
      ...newCritics,
    ]);

    setIsDataFetched(true);

    // Return un booléen true si des données supplémentaires existent, sinon false
    return critics.length >= 5;
  };

  const { observerRef, loading, hasMore } = useVerticalScroll(
    firstRender,
    getCritics,
    displayType,
    setCriticsOfAcquaintances,
    setIsDataFetched,
  );

  // Détecte le premier rendu du composant
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

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
          <ContactsSuggestions
            page={'home'}
            friendsList={null}
            followedList={null}
            getFriendsRequests={null}
            getFriends={null}
            getFollowed={null}
          />
          <Item
            customheight="calc(100% - 6px)"
            customwidth="100%"
            margintop="6px"
            overflow="hidden"
          >
            <SuggestedGoldNuggets
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
              page={'home'}
              type={'new-critic'}
              chosenMovie={chosenMovie}
              setData={setCriticsOfAcquaintances}
              // setAdvicesReceived={null}
              setGoldenMovies={setGoldenMovies}
              chosenUser={null}
              infos={null}
              haveMoreCritics={null}
              isLast={null}
            />
          ) : null}
          {criticsOfAcquaintances.length ? (
            criticsOfAcquaintances.map((critic, index) => {
              return (
                <CriticAdvicesComponent
                  key={index}
                  page={'home'}
                  type={'old-critic'}
                  setData={setCriticsOfAcquaintances}
                  // setUserCritics={setCriticsOfAcquaintances}
                  // setAdvicesReceived={null}
                  setGoldenMovies={setGoldenMovies}
                  chosenMovie={null}
                  infos={critic}
                  chosenUser={null}
                  haveMoreCritics={hasMore}
                  isLast={criticsOfAcquaintances.length - 1 === index}
                />
              );
            })
          ) : !criticsOfAcquaintances.length && isDataFetched ? (
            <NoCriticAdvice page={'home'} />
          ) : null}
          {loading && <SkeletonCard />}
          {hasMore && <div ref={observerRef}></div>}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
