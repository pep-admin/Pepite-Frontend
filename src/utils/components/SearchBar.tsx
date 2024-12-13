// Import des libs externes
import {
  Box,
  TextField,
  Menu,
  Fade,
  ImageList,
  ImageListItem,
  Stack,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import des composants internes
import SearchResults from './SearchResults';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import { FeatherPenIcon } from './styledComponent';

// Import des requêtes internes
import {
  searchMoviesSeries,
  // searchUsers,
} from '../request/search/searchMoviesSeries';
import { getMovieDetailsRequest } from '../request/getMovieDetailsRequest';
import { storeDetailsData } from '../request/swipe/storeDetailsData';
import { searchUserRequest } from '@utils/request/search/searchUserRequest';

const SearchBar = ({
  page,
  loggedUserInfos,
  chosenUser,
  handlePoster,
  showPicModal,
}) => {
  const { displayType, chosenMovieId, setChosenMovieId, setChosenMovie } =
    useData();
  const { id } = useParams();

  const [error, setError] = useState({ message: null, error: null });

  const [query, setQuery] = useState(''); // Texte saisi par l'utilisateur
  const [results, setResults] = useState([]); // Les résultats de la recherche
  const [displayResults, setDisplayResults] = useState(null); // Affiche ou non les résultats

  const containerRef = useRef(null);
  const searchBarRef = useRef(null);

  const openResults = Boolean(displayResults);

  const handleDisplayResults = () => {
    setDisplayResults(containerRef.current);
  };

  const handleChoice = id => {
    setChosenMovieId(id);
    setTimeout(() => {
      searchBarRef.current?.blur();
    }, 0);
    setQuery('');
  };

  const getChosenMovie = async id => {
    try {
      const movieData = await getMovieDetailsRequest(displayType, id);
      setChosenMovie(movieData);

      // Stockage des détails du film dans la DB
      const movieToStore = { current: movieData };
      storeDetailsData(movieToStore, displayType);
    } catch (err) {
      setError({
        message: "Une erreur s'est produite lors de la recherche",
        error: err,
      });
    }
  };

  // Analyse la recherche de l'utilisateur toutes les 500ms
  useEffect(() => {
    // Fonction débouncing
    const timeoutId = setTimeout(async () => {
      if (query) {
        const moviesSeriesResults = await searchMoviesSeries(
          query,
          displayType,
        );
        const usersResults = await searchUserRequest(query);

        // Ajouter un champ 'type' pour différencier les résultats
        const formattedMoviesSeries = moviesSeriesResults.map(item => ({
          ...item,
          type: 'movieSeries',
        }));
        const formattedUsers = usersResults.map(item => ({
          ...item,
          type: 'user',
        }));

        const combinedResults = [...formattedMoviesSeries, ...formattedUsers];
        setResults(combinedResults);
      } else {
        setResults([]); // Si la requête est vide, on réinitialise les résultats
      }
    }, 500); // Attendre 500ms après la dernière saisie pour effectuer la recherche

    return () => clearTimeout(timeoutId); // Clear le timeout si l'utilisateur continue à taper
  }, [query]);

  useEffect(() => {
    if (chosenMovieId) {
      getChosenMovie(chosenMovieId);
    }
  }, [chosenMovieId]);

  return (
    <Box
      component="form"
      ref={containerRef}
      marginTop="6px"
      display={page === 'params' ? 'flex' : 'block'}
      flexDirection={page === 'params' ? 'column' : 'row'}
      alignItems={page === 'params' ? 'center' : 'flex-start'}
    >
      <Stack
        sx={{
          position: 'relative',
          height: '37px',
        }}
      >
        <TextField
          id="filled-basic"
          inputRef={searchBarRef}
          label={
            // S'il y a une erreur
            error.message
              ? `${error.message}`
              : // Si page de profil de l'utilisateur connecté et type choisi FILMS
              (page === 'profil' || page === 'home') &&
                loggedUserInfos?.id === parseInt(id, 10) &&
                displayType === 'movie'
              ? 'Un nom de film ou de série'
              : // Si page de profil de l'utilisateur connecté et type choisi SERIES
              (page === 'profil' || page === 'home') &&
                loggedUserInfos?.id === parseInt(id, 10) &&
                displayType === 'tv'
              ? 'Notez une série !'
              : // Si page de profil de l'utilisateur connecté et type choisi TOUS
              (page === 'profil' || page === 'home') &&
                loggedUserInfos?.id === parseInt(id, 10) &&
                displayType === 'all'
              ? 'Notez un film ou une série !'
              : // Si page de profil d'un autre utilisateur et type choisi FILMS
              (page === 'profil' || page === 'home') &&
                loggedUserInfos?.id !== parseInt(id, 10) &&
                displayType === 'movie'
              ? `Conseillez un film à ${chosenUser?.first_name} !`
              : // Si page de profil d'un autre utilisateur et type choisi SERIES
              (page === 'profil' || page === 'home') &&
                loggedUserInfos?.id !== parseInt(id, 10) &&
                displayType === 'tv'
              ? `Conseillez une série à ${chosenUser?.first_name} !`
              : // Si page de profil d'un autre utilisateur et type choisi SERIES
              (page === 'profil' || page === 'home') &&
                loggedUserInfos?.id !== parseInt(id, 10) &&
                displayType === 'all'
              ? `Conseillez un film ou une série à ${chosenUser?.first_name} !`
              : // Si choix de poster dans les paramètres
              page === 'params'
              ? 'Une affiche de film, de série'
              : // Si le type choisi est films
              displayType === 'movie'
              ? 'Rechercher un film, une personne'
              : // Si le type choisi est séries
              displayType === 'tv'
              ? 'Rechercher une série, une personne'
              : // Si le type choisi est tous
                'Rechercher un film, une série, une personne'
          }
          variant="filled"
          sx={{
            height: '37px',
            width: page === 'params' ? '100%' : 'calc(100% - 40px)',
            '& .MuiInputBase-root': {
              borderRadius: page === 'params' ? '7px' : '7px 0 0 7px',
              bgcolor: page === 'params' ? 'rgba(56, 56, 56, 0.08)' : '#fafafa',
            },
            '& .MuiInputLabel-root': {
              fontWeight: '300',
            },
            '& .MuiInputBase-root:hover': {
              // borderRadius: '10px 0 0 10px',
              bgcolor: '#fafafa',
            },
            '& label.Mui-focused': {
              color: 'primary.light', // Pour le label lorsque le TextField est focus
            },
            '& .MuiFilledInput-underline:after': {
              borderBottomColor: 'primary.light', // Pour la ligne en dessous du TextField
            },
          }}
          value={query}
          onChange={e => {
            handleDisplayResults();
            setQuery(e.target.value);
          }}
        />
        {page !== 'params' && (
          <Box
            position="absolute"
            top="0"
            right="0"
            height="100%"
            width="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#24A5A5',
              borderRadius: '0 7px 7px 0',
              cursor: 'pointer',
            }}
          >
            <FeatherPenIcon sx={{ height: '27px', width: '27px' }} />
          </Box>
        )}
      </Stack>
      {results.length > 0 && page === 'params' ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <ImageList
            sx={{ width: '90%', height: 250 }}
            cols={3}
            rowHeight={100}
          >
            {results
              .filter(
                result =>
                  result.poster_path !== null || result.backdrop_path !== null,
              )
              .map(result => (
                <React.Fragment key={result.id}>
                  {result.poster_path && (
                    <ImageListItem
                      onClick={() =>
                        handlePoster(result.poster_path, showPicModal.type)
                      }
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        alt={result.title || result.name}
                        loading="lazy"
                      />
                    </ImageListItem>
                  )}
                  {result.backdrop_path && (
                    <ImageListItem
                      onClick={() =>
                        handlePoster(result.backdrop_path, showPicModal.type)
                      }
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`}
                        alt={result.title || result.name}
                        loading="lazy"
                      />
                    </ImageListItem>
                  )}
                </React.Fragment>
              ))}
          </ImageList>
        </Box>
      ) : results.length > 0 && page !== 'params' ? (
        <Menu
          id="basic-menu"
          anchorEl={displayResults}
          open={openResults}
          onClose={() => setDisplayResults(null)}
          TransitionComponent={Fade}
          disableAutoFocus={true}
          slotProps={{
            paper: {
              sx: {
                width: '100%',
                mt: 1,
              },
            },
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            sx: {
              padding: '0',
              width: '100%',
              maxHeight: 185,
              zIndex: 1,
              backgroundColor: '#f1f1f1',
              overflowY: 'scroll',
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {results.map(result => {
            return (
              <SearchResults
                key={result.id}
                result={result}
                handleChoice={handleChoice}
                setDisplayResults={setDisplayResults}
              />
            );
          })}
        </Menu>
      ) : null}
    </Box>
  );
};

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
  handlePoster: PropTypes.func,
  showPicModal: PropTypes.object,
  loggedUserInfos: PropTypes.object.isRequired,
  chosenUser: PropTypes.object,
};

export default SearchBar;
