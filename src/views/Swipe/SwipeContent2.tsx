// Import des libs externes
import { Stack, Typography, Divider, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import ChoiceBtn2 from './ChoiceBtn2';
import ColoredRating from '@utils/components/ColoredRating';

// Import des fonctions utilitaires
import { convertRating } from '@utils/functions/convertRating';
import { findFrenchNameCountry } from '@utils/functions/getFrenchNameCountry';

// Import des icônes
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';

// Import des noms des genres raccourcis
import {
  shortGenresMovieList,
  shortGenresSerieList,
} from '@utils/data/shortGenres';
import { getMovieDetails } from '@utils/request/getMovieDetails';
import { useEffect, useState } from 'react';

const SwipeContent2 = ({
  movie,
  swipeType,
  showMovieInfos,
  setShowMovieInfos,
  openSnackbar,
  setOpenSnackbar
}) => {

  console.log('rendu SwipeContent !', movie);
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
      const details = await getMovieDetails(swipeType, movieId);
      console.log('les détails =>', details);
      
      setMovieDetails(details);

    } catch (err) {
      console.log(err);
      // setError({
      //   message: 'Erreur dans la récupération des détails du film.',
      //   error: err,
      // });
    }
  };

  const findDirectorName = (crew) => {
    const director = crew.find(member => member.job === "Director");
    return director ? director.name : "Réalisateur inconnu";
  };

  const findTopActors = (cast) => {
    // Trie les acteurs par popularité décroissante
    const sortedCast = cast.sort((a, b) => b.popularity - a.popularity);
  
    // Sélectionne les trois premiers acteurs
    const topActors = sortedCast.slice(0, 3).map(actor => actor.name);
  
    // Vérifie si le nombre d'acteurs dépasse trois
    return topActors.join(', ');
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
              <>
                <Stack>
                  <Typography fontSize="2.4vh" color="#fff">
                    Moyenne des
                    <span style={{ color: '#DD8C28', fontWeight: '500' }}>
                      {' '}
                      amis
                    </span>
                  </Typography>
                  <Stack
                    height="15px"
                    direction="row"
                    alignItems="center"
                    position="relative"
                    left="2.5px"
                  >
                    <ColoredRating
                      color="#DD8C28"
                      emptyColor="#B9B9B9"
                      value={4.3}
                      readOnly={true}
                      precision={0.1}
                    />
                    <Typography
                      fontSize="2.4vh"
                      component="span"
                      sx={{
                        color: '#DD8C28',
                        fontWeight: '500',
                      }}
                    >
                      {'4.3'}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography fontSize="2.4vh" color="#fff">
                    Moyenne des
                    <span style={{ color: '#24A5A5', fontWeight: '500' }}>
                      {' '}
                      suivis
                    </span>
                  </Typography>
                  <Stack
                    height="15px"
                    direction="row"
                    alignItems="center"
                    position="relative"
                    left="2.5px"
                  >
                    <ColoredRating
                      color="#24A5A5"
                      emptyColor="#B9B9B9"
                      value={4.1}
                      readOnly={true}
                      precision={0.1}
                    />
                    <Typography
                      fontSize="2.4vh"
                      component="span"
                      sx={{
                        color: '#24A5A5',
                        fontWeight: '500',
                      }}
                    >
                      {'4.1'}
                    </Typography>
                  </Stack>
                </Stack>
              </>
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
          <Stack
            sx={{
              display: !showMovieInfos ? 'none' : 'flex',
              opacity: !showMovieInfos ? '0' : '1',
              transition: !showMovieInfos
                ? 'opacity 0ms ease-in-out'
                : 'opacity 600ms ease-in-out',
            }}
          >
            <Stack
              maxHeight="27vh"
              sx={{
                overflowY: 'scroll',
              }}
            >
              <Typography
                color="primary"
                fontWeight="300"
                lineHeight="1.6"
                fontSize="2.1vh"
              >
                {movie.overview === null
                  ? "Désolé, il n'y a pas de synopsis disponible pour ce film..."
                  : movie.overview}
              </Typography>
            </Stack>
            <Stack
              height="15vh"
              justifyContent="space-evenly"
              margin="7px 0 10px 0"
            >
              <Stack direction="row" columnGap="10px">
                <Typography color="secondary" fontWeight="500">
                  {'Pays :'}
                </Typography>
                <Typography color="primary" fontWeight="300">
                  { movieDetails && findFrenchNameCountry(movieDetails.production_countries).join(', ') }
                </Typography>
              </Stack>
              <Stack direction="row" columnGap="10px">
                <Typography color="secondary" fontWeight="500">
                  {'Réalisation :'}
                </Typography>
                <Typography color="primary" fontWeight="300">
                  { movieDetails && findDirectorName(movieDetails.crew) }
                </Typography>
              </Stack>
              <Stack direction="row" columnGap="10px">
                <Typography color="secondary" fontWeight="500">
                  {'Acteurs :'}
                </Typography>
                <Typography color="primary" fontWeight="300" width='66vw' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
                  { movieDetails && findTopActors(movieDetails.cast) }
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <Stack
        height="100px"
        width="100%"
        direction="row"
        justifyContent="space-between"
        padding="0 5% 15px 5%"
      >
        <ChoiceBtn2
          choice={'unwanted'}
          movie={movie}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          // moviesStatusUpdated={moviesStatusUpdated}
          // setMoviesStatusUpdated={setMoviesStatusUpdated}
          // index={index}
          // currentMovieIndex={currentMovieIndex}
          // setCurrentMovieIndex={setCurrentMovieIndex}
          // swipeToTheRight={swipeToTheRight}
        />
        <ChoiceBtn2
          choice={'wanted'}
          movie={movie}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          // moviesStatusUpdated={moviesStatusUpdated}
          // setMoviesStatusUpdated={setMoviesStatusUpdated}
          // index={index}
          // currentMovieIndex={currentMovieIndex}
          // setCurrentMovieIndex={setCurrentMovieIndex}
          // swipeToTheRight={null}
        />
        <ChoiceBtn2
          choice={'watched'}
          movie={movie}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          // moviesStatusUpdated={moviesStatusUpdated}
          // setMoviesStatusUpdated={setMoviesStatusUpdated}
          // index={index}
          // currentMovieIndex={currentMovieIndex}
          // setCurrentMovieIndex={setCurrentMovieIndex}
          // swipeToTheRight={swipeToTheRight}
        />
      </Stack>
    </>
  );
};

SwipeContent2.propTypes = {
  movieDetail: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  currentMovieIndex: PropTypes.number.isRequired,
  setCurrentMovieIndex: PropTypes.func.isRequired,
  showMovieInfos: PropTypes.bool.isRequired,
  setShowMovieInfos: PropTypes.func.isRequired,
  moviesStatusUpdated: PropTypes.array.isRequired,
  setMoviesStatusUpdated: PropTypes.func.isRequired,
  swipeToTheRight: PropTypes.func.isRequired,
  swipeType: PropTypes.string.isRequired,
};

export default SwipeContent2;
