// Import des libs externes
import {
  Box,
  TextField,
  Typography,
  Menu,
  Fade,
  ImageList,
  ImageListItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { searchMulti } from './request/swipe/fetchData';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import { MagnifyingGlassIcon } from './styledComponent';

// Import des libs internes
import { getMovieDetails } from './request/getMovieDetails';
import { storeDetailsData } from './request/swipe/storeDetailsData';
import SearchResults from './SearchResults';

const SearchBar = ({ Item, page, handlePoster }) => {
  const { displayType, chosenMovieId, setChosenMovieId, setChosenMovie } =
    useData();

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
      const movieData = await getMovieDetails(displayType, id);
      setChosenMovie(movieData);
      console.log('le film choisi', movieData);
      // Stockage des détails du film dans la DB
      storeDetailsData(movieData, displayType);
      // if (page !== 'profil') {
      //   setGeneralRatings(movieData.vote_average);
      // }
    } catch (err) {
      setError({
        message: "Une erreur s'est produite lors de la recherche",
        error: err,
      });
    }
  };

  useEffect(() => {
    // Fonction débouncing
    const timeoutId = setTimeout(async () => {
      if (query) {
        const searchResults = await searchMulti(query, displayType);
        setResults(searchResults);
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

  useEffect(() => {
    console.log('les résultats', results);
  }, [results]);

  return (
    <Box
      component="form"
      ref={containerRef}
      marginTop={page === 'profil' ? '6px' : '0'}
      display={page === 'params' ? 'flex' : 'block'}
      flexDirection={page === 'params' ? 'column' : 'row'}
      alignItems={page === 'params' ? 'center' : 'flex-start'}
    >
      <Item
        sx={{
          position: 'relative',
          height: page === 'params' ? '30px' : '40px',
          padding: page === 'profil' || page === 'params' ? '0' : '0 10%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: page === 'profil' ? 'initial' : 'center',
          gap: page === 'profil' ? '6px' : '20px',
          maxWidth: page === 'params' ? '250px' : 'auto',
        }}
      >
        {page === 'profil' ? (
          <Box
            height="100%"
            width="100px"
            paddingLeft="7px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="body2"
              component="h4"
              fontWeight="bold"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              Kate Austen
            </Typography>
          </Box>
        ) : null}
        <TextField
          id="filled-basic"
          inputRef={searchBarRef}
          label={
            error.message
              ? `${error.message}`
              : page === 'profil'
              ? 'Notez un film ou une série !'
              : page === 'params'
              ? 'Une affiche de film, de série'
              : 'Rechercher un film, une série, une personne'
          }
          variant="filled"
          size="small"
          sx={{
            width: page === 'profil' ? 'calc(100% - 152px)' : '250px',
          }}
          value={query}
          onChange={e => {
            handleDisplayResults();
            setQuery(e.target.value);
          }}
        />
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
            borderRadius: '0 10px 10px 0',
            cursor: 'pointer',
          }}
        >
          <MagnifyingGlassIcon sx={{ height: '20px', width: '20px' }} />
        </Box>
      </Item>
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
                      onClick={() => handlePoster(result.poster_path)}
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
                      onClick={() => handlePoster(result.backdrop_path)}
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
  Item: PropTypes.elementType.isRequired,
  page: PropTypes.string.isRequired,
  handlePoster: PropTypes.func,
};

export default SearchBar;
