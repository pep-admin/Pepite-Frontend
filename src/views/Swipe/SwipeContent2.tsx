// Import des libs externes
import { Stack, Typography, Divider, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Import des fonctions utilitaires
import { convertRating } from '@utils/functions/convertRating';

// Import des icônes
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';

// Import des noms des genres raccourcis
import {
  shortGenresMovieList,
  shortGenresSerieList,
} from '@utils/data/shortGenres';

// Import des requêtes 
import { getMovieDetails } from '@utils/request/getMovieDetails';
import AcquaintancesRatings from './AcquaintancesRatings';
import SwipeCredits from './SwipeCredits';

const SwipeContent2 = ({
  movie,
  typeChosen,
  showMovieInfos,
  setShowMovieInfos,
  setError
}) => {

  // console.log('rendu SwipeContent !', movie);
  const [movieDetails, setMovieDetails] = useState(null);
  
  const getTitle = () => {
    if ('title' in movie) {
      return movie.title;
    }
    if ('name' in movie) {
      return movie.name;
    }
  };

  // Fonction pour obtenir les genres raccourcis du film
  const getShortGenres = () => {
    let shortGenres = [];

    if (movie.genre_ids.length) {
      if ('release_date' in movie) {
        shortGenres = shortGenresMovieList;
      } else {
        shortGenres = shortGenresSerieList;
      }

      // Utilisation de map pour transformer genre_ids en noms de genres
      const genreNames = movie.genre_ids
        .map((genre) => {
          const genreObj = shortGenres.find(sg => sg.id === genre);
          return genreObj ? genreObj.name : null;
        })
        .filter(Boolean) // Retire les genres non trouvés (null)
        .join(', '); // Convertir le tableau de noms en une chaîne de caractères

      return genreNames || 'Non spécifié';

    } else {
      return 'Non spécifié';
    }
  };

  // Fonction pour extraire l'année à partir d'une date
  const getYear = () => {

    let date = null;

    if('release_date' in movie) {
      date = movie.release_date;
    }
    else if('first_air_date' in movie) {
      date = movie.first_air_date;
    } else {
      return 'Non spécifié';
    }

    return date ? date.split('-')[0] : 'Non spécifié';
  };

  // Récupère les détails d'un film (genre, année...)
  const fetchMovieDetails = async movieId => {
    try {
      const details = await getMovieDetails(typeChosen, movieId);
      console.log('les détails =>', details);
      
      setMovieDetails(details);

    } catch (err) {
      
      setError({
        state: true,
        message: 'Erreur dans la récupération des détails du film.',
      });
    }
  };

  useEffect(() => {
    if(showMovieInfos) {
      fetchMovieDetails(movie.id);
    }
  }, [showMovieInfos])

  return (
    <>
      <CardContent
        sx={{
          height: 'auto',
          width: '100%',
          padding: '0 !important',
          marginBottom: '100px'
        }}
      >
        <Stack>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                component="h1"
                fontSize="6.5vh"
                fontFamily="League Spartan"
                fontWeight="700"
                color="primary.main"
                lineHeight="1.1"
                maxWidth="85%"
                letterSpacing="-1px"
                sx={{
                  WebkitTextStroke: '1px black',
                }}
              >
                {getTitle()}
              </Typography>
              <Typography
                component="p"
                fontSize="7.5vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color="primary.main"
                lineHeight="0.9"
                position="relative"
                top="5px"
                onClick={() => setShowMovieInfos(!showMovieInfos)}
              >
                {!showMovieInfos ? '+' : '-'}
              </Typography>
            </Stack>
            <Stack direction="row" whiteSpace="nowrap">
              <Typography
                fontSize="2.2vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color="secondary.main"
              >
                {'release_date' in movie ? 'Film' : 'Série'}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center',
                }}
              />
              <Typography
                fontSize="2.2vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color="secondary.main"
                maxWidth="150px"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {getShortGenres()}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center',
                }}
              />
              <Typography
                fontSize="2.2vh"
                fontFamily="League Spartan"
                fontWeight="500"
                color="secondary.main"
              >
                {getYear()}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '15px',
                  borderColor: 'secondary.main',
                  margin: '0 8px',
                  alignSelf: 'center',
                }}
              />
              <Stack direction="row">
                <StarIcon
                  fontSize="small"
                  sx={{ color: 'secondary.main', marginRight: '5px' }}
                />
                <Typography
                  fontSize="2.2vh"
                  fontFamily="League Spartan"
                  fontWeight="500"
                  color="secondary.main"
                >
                  {convertRating(movie.vote_average)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            height={!showMovieInfos ? '10vh' : '5vh'}
            direction={!showMovieInfos ? 'row' : 'column'}
            justifyContent="space-between"
            padding={!showMovieInfos ? '23px 0' : '0'}
            marginBottom={!showMovieInfos ? '23px' : '0'}
          >
            {!showMovieInfos ? (
              <AcquaintancesRatings />
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                flexBasis="100%"
                columnGap="5px"
              >
                <CircleIcon color="primary" sx={{ fontSize: '1vh' }} />
                <CircleIcon color="primary" sx={{ fontSize: '1vh' }} />
              </Stack>
            )}
          </Stack>
          {
            !showMovieInfos ?
              null
            :
              <SwipeCredits movie={movie} movieDetails={movieDetails} />
          }
        </Stack>
      </CardContent>
    </>
  );
};

SwipeContent2.propTypes = {
  movie: PropTypes.object.isRequired,
  typeChosen: PropTypes.string.isRequired,
  showMovieInfos: PropTypes.bool.isRequired,
  setShowMovieInfos: PropTypes.func.isRequired,
};

export default SwipeContent2;
