// Import des libs externes
import { Container, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

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
import SkeletonCard from '@views/CriticAdvices/SkeletonCard';

const Home = () => {
  const { displayType, chosenMovie } = useData();

  const scrollDownRef = useRef(null);

  // L'utilisateur connecté
  const [userInfos, setUserInfos] = useState(
    JSON.parse(localStorage.getItem('user_infos')),
  );
  const [goldenMovies, setGoldenMovies] = useState([]); // Toutes les pépites des amis et suivis de l'utilisateur
  const [criticsOfAcquaintances, setCriticsOfAcquaintances] = useState([]); // Les critiques des connaissances de l'utilisateur
  const [criticsPage, setCriticsPage] = useState(1); // Page de critiques incrémentée à chaque fois que l'utilisateur scroll en bas de page
  const [loadingMore, setLoadingMore] = useState(false); // Booléen : charger de nouvelles critiques
  const [areCriticsFetched, setAreCriticsFetched] = useState(false);
  const [haveMoreCritics, setHaveMoreCritics] = useState(true);

  // const [alertSeverity, setAlertSeverity] = useState({
  //   state: null,
  //   message: null,
  // });

  const resetAndLoadCritics = async () => {
    setCriticsPage(1); // Réinitialiser la pagination
    setCriticsOfAcquaintances([]); // Réinitialiser la liste des critiques
    await getCritics(); // Charger les nouvelles critiques
  };

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

  const getCritics = async () => {
    if (loadingMore) return; // Évite les appels redondants
    // setLoadingMore(true); // Indiquer que le chargement est en cours
    setLoadingMore(true);

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

    console.log('new critics', critics);

    // Si plus assez de critiques à récupérer, on affichera le message qui indique qu'il n'y a plus de critiques à parcourir
    if (critics.length < 5) {
      setHaveMoreCritics(false);
    }

    setCriticsOfAcquaintances(existingCritics => [
      ...existingCritics,
      ...newCritics,
    ]);

    setAreCriticsFetched(true);

    setLoadingMore(false); // Fin du chargement
  };

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting && haveMoreCritics && !loadingMore) {
      console.log('recharge !!!');

      setCriticsPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '250px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (scrollDownRef.current) observer.observe(scrollDownRef.current);

    return () => {
      if (scrollDownRef.current) observer.unobserve(scrollDownRef.current);
    };
  }, [scrollDownRef, haveMoreCritics, loadingMore]);

  useEffect(() => {
    resetAndLoadCritics();
  }, [displayType]);

  useEffect(() => {
    if (criticsPage > 1) {
      getCritics();
    }
  }, [criticsPage]);

  useEffect(() => {
    console.log('chargement...', loadingMore);
  }, [loadingMore]);

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
              userCritics={criticsOfAcquaintances}
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
              setUserCritics={setCriticsOfAcquaintances}
              setAdvicesReceived={null}
              setGoldenMovies={setGoldenMovies}
              chosenUser={null}
              countCriticsAndGold={null}
              infos={null}
              haveMoreCritics={null}
              isLast={null}
              // loadingMore={loadingMore}
              // chosenUser={chosenUser}
              // countCriticsAndGold={countCriticsAndGold}
            />
          ) : null}
          {criticsOfAcquaintances.length ? (
            criticsOfAcquaintances.map((critic, index) => {
              return (
                <React.Fragment key={index}>
                  <CriticAdvicesComponent
                    page={'home'}
                    type={'old-critic'}
                    setUserCritics={setCriticsOfAcquaintances}
                    setAdvicesReceived={null}
                    setGoldenMovies={setGoldenMovies}
                    chosenMovie={null}
                    infos={critic}
                    chosenUser={null}
                    countCriticsAndGold={null}
                    haveMoreCritics={haveMoreCritics}
                    isLast={criticsOfAcquaintances.length - 1 === index}
                    // loadingMore={loadingMore}
                  />
                  {/* {haveMoreCritics && <div ref={scrollDownRef}></div>} */}
                </React.Fragment>
              );
            })
          ) : !criticsOfAcquaintances.length && areCriticsFetched ? (
            <NoCriticAdvice page={'home'} />
          ) : null}
          {loadingMore && <SkeletonCard />}
          {haveMoreCritics && <div ref={scrollDownRef}></div>}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
