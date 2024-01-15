// Import des libs externes
import React, { useEffect, useState } from 'react';
import {
  Stack,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des icônes
import { YellowRating } from '@utils/styledComponent';
import StarIcon from '@mui/icons-material/Star';

// Import des requêtes
import { getAllGoldNuggetsOfUser } from '@utils/request/goldNugget/getAllGoldNuggetsOfUser';
import { getGoldNuggetsFromAcquaintances } from '@utils/request/goldNugget/getGoldNuggetsFromAcquaintances';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des fonctions
import { convertRating } from '@utils/functions/convertRating';

// Import des composants internes
import CriticAdvicesModal from '@views/CriticAdvices/CriticAdvicesModal';
import ProfilNoGold from './ProfilNoGold';

const ProfilSuggestedNotes = ({
  page,
  goldenMovies,
  setGoldenMovies,
  userInfos,
  chosenUser,
}) => {
  const [showGoldenMovie, setShowGoldenMovie] = useState(false);
  const [goldenMovieInfos, setGoldenMovieInfos] = useState(null);

  const { displayType } = useData();
  const { id } = useParams();

  /* 
    Récupère les pépites de l'utilisateur pour la page de profil
  OU
    Récupère les pépites des amis et followed pour la page d'accueil
  */
  const fetchAllGoldNuggetsOfUser = async () => {
    let goldNuggets;

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
    } else if (page === 'profil') {
      goldNuggets = await getAllGoldNuggetsOfUser(displayType, id);
      setGoldenMovies(goldNuggets);
    } else return;
  };

  useEffect(() => {
    fetchAllGoldNuggetsOfUser();
  }, [displayType]);

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
          {!goldenMovies.length ? (
            <ProfilNoGold
              page={page}
              userInfos={userInfos}
              chosenUser={chosenUser}
            />
          ) : (
            goldenMovies.map((movie, index) => {
              return (
                <React.Fragment key={movie.id}>
                  <Card
                    sx={{
                      height: '100%',
                      width: 95,
                      flexShrink: 0,
                      boxShadow: 'none',
                      position: 'relative',
                    }}
                  >
                    <CardActionArea
                      sx={{ height: 'calc(100% - 23px)' }}
                      onClick={() => {
                        setGoldenMovieInfos({
                          ...movie,
                          users: movie.users,
                        });
                        setShowGoldenMovie(true);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="100%"
                        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={
                          displayType === 'movie'
                            ? `${movie.title}`
                            : `${movie.name}`
                        }
                        sx={{
                          borderRadius: '10px',
                          boxShadow:
                            '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
                        }}
                      />
                    </CardActionArea>
                    <CardContent
                      sx={{
                        height: '23px',
                        width: '100%',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        gutterBottom
                        component="h4"
                        margin="0"
                        paddingLeft="8px"
                        maxWidth="100%"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        sx={{ fontSize: '1em' }}
                      >
                        {displayType === 'movie' ? movie.title : movie.name}
                      </Typography>
                    </CardContent>
                    <Box
                      width="100%"
                      position="absolute"
                      bottom="23px"
                      height="23px"
                      borderRadius="0 0 10px 10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: '#0000009e' }}
                    >
                      <YellowRating
                        name="half-rating-read"
                        value={convertRating(movie.vote_average)}
                        precision={0.1}
                        readOnly
                        emptyIcon={
                          <StarIcon
                            sx={{ color: '#E1E1E1', fontSize: '1.05em' }}
                          />
                        }
                        sx={{ marginRight: '5px', fontSize: '0.9em' }}
                      />
                      <Typography
                        variant="body2"
                        component="span"
                        fontWeight="bold"
                        sx={{ color: '#FFDA1B' }}
                      >
                        {convertRating(movie.vote_average)}
                      </Typography>
                    </Box>
                    <Box
                      width="23px"
                      height="23px"
                      position="absolute"
                      top="3px"
                      right="3px"
                      borderRadius="50%"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: 'rgba(244, 244, 244, 0.65)' }}
                    >
                      <img
                        src="/images/gold_right_top.svg"
                        alt=""
                        style={{
                          position: 'relative',
                          top: '0.2px',
                        }}
                      />
                      {page !== 'profil' && movie?.users.length > 1 ? (
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          position="absolute"
                          color="#052525"
                        >
                          {`${movie.users.length}`}
                        </Typography>
                      ) : null}
                    </Box>
                  </Card>
                  {goldenMovies.length - 1 !== index ? (
                    <Divider variant="middle" flexItem orientation="vertical" />
                  ) : null}
                </React.Fragment>
              );
            })
          )}
        </Stack>
      </Stack>
    </>
  );
};

ProfilSuggestedNotes.propTypes = {
  goldenMovies: PropTypes.array.isRequired,
  setGoldenMovies: PropTypes.func.isRequired,
  userInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
  page: PropTypes.string.isRequired,
};

export default ProfilSuggestedNotes;
