// Import des libs externes
import { useEffect, useState } from 'react';
import { Stack, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des requêtes
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { getGoldNuggetsFromAcquaintances } from '@utils/request/goldNugget/getGoldNuggetsFromAcquaintances';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des composants internes
import CriticAdvicesModal from '@views/CriticAdvices/CriticAdvicesModal';
import ProfilNoGold from '@views/Profil/ProfilNoGold';
import SuggestedGoldNuggetsCards from '@views/Profil/SuggestedGoldNuggetsCards';

const SuggestedGoldNuggets = ({
  page,
  userCritics,
  goldenMovies,
  setGoldenMovies,
  userInfos,
  chosenUser,
}) => {
  const [showGoldenMovie, setShowGoldenMovie] = useState(false);
  const [goldenMovieInfos, setGoldenMovieInfos] = useState(null);
  const [areGoldenMoviesFetched, setAreGoldenMoviesFetched] = useState(false);

  const { displayType } = useData();
  const { id } = useParams();

  /* 
    Récupère les pépites de l'utilisateur pour la page de profil
  OU
    Récupère les pépites des amis et followed pour la page d'accueil
  */
  const fetchAllGoldNuggetsOfUser = async () => {
    setAreGoldenMoviesFetched(false);
    let goldNuggets;

    // Si on est sur la page home ou la page de la liste de films, on récupère les pépites des connaissances
    if (page === 'home' || page === 'list') {
      goldNuggets = await getGoldNuggetsFromAcquaintances(
        displayType,
        userInfos.id,
      );
      const moviesMap = new Map();

      // Supprime les doublons des pépites et ajoute les ids utilisateurs si plusieurs pépites pour un film
      goldNuggets.forEach(nugget => {
        if (!moviesMap.has(nugget.movie_id)) {
          // Si le film n'est pas encore dans le Map, on ajoute les détails du film et un tableau pour les utilisateurs
          moviesMap.set(nugget.movie_id, {
            ...nugget,
            users: [nugget.user_id],
          });
        } else {
          // Si le film est déjà dans le Map, on ajoute l'id de l'utilisateur au tableau des utilisateurs
          const existingEntry = moviesMap.get(nugget.movie_id);
          existingEntry.users.push(nugget.user_id);
          moviesMap.set(nugget.movie_id, existingEntry);
        }
      });
      const uniqueMoviesArray = Array.from(moviesMap.values());
      setGoldenMovies(uniqueMoviesArray);

      // Si on est sur la page de profil, on récupère les pépites de l'utilisateur connecté
    } else if (page === 'profil') {
      goldNuggets = await getAllGoldNuggetsOfUser(displayType, id);
      setGoldenMovies(goldNuggets);
    } else return;

    setAreGoldenMoviesFetched(true);
  };

  useEffect(() => {
    fetchAllGoldNuggetsOfUser();
  }, [displayType, id, userCritics]);

  return (
    <>
      {showGoldenMovie ? (
        <CriticAdvicesModal
          page={page}
          showPoster={showGoldenMovie}
          setShowPoster={setShowGoldenMovie}
          infos={goldenMovieInfos}
          from={'suggested'}
        />
      ) : null}
      <Stack direction="column" height="100%">
        <Stack
          direction="row"
          height="25px"
          justifyContent="space-between"
          alignItems="center"
          padding="0 10px"
        >
          <Typography variant="body2" component="p" fontWeight="bold">
            {page === 'profil'
              ? 'Vos dernières pépites'
              : 'Dernières pépites de vos contacts'}
          </Typography>
          <Typography variant="body2" component="p" fontWeight="bold">
            {'Voir +'}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          height={page === 'profil' ? 'calc(100% - 25.8px)' : '150px'}
          justifyContent="flex-start"
          padding={!goldenMovies.length ? '6px' : '6px 6px 0 6px'}
          columnGap={page === 'profil' ? '10px' : '6px'}
          sx={{
            overflowX: 'scroll',
          }}
        >
          {!goldenMovies.length && areGoldenMoviesFetched ? (
            <ProfilNoGold
              page={page}
              userInfos={userInfos}
              chosenUser={chosenUser}
            />
          ) : (
            goldenMovies.map((movie, index) => {
              return (
                <SuggestedGoldNuggetsCards
                  key={movie.id}
                  page={page}
                  movie={movie}
                  isLast={goldenMovies.length - 1 === index ? true : false}
                  setGoldenMovieInfos={setGoldenMovieInfos}
                  setShowGoldenMovie={setShowGoldenMovie}
                />
              );
            })
          )}
        </Stack>
      </Stack>
    </>
  );
};

SuggestedGoldNuggets.propTypes = {
  goldenMovies: PropTypes.array.isRequired,
  setGoldenMovies: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  page: PropTypes.string.isRequired,
  userCritics: PropTypes.array.isRequired,
};

export default SuggestedGoldNuggets;
