// Import des libs externes
import {
  Box,
  TextField,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Menu,
  Fade,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { searchMulti } from './request/swipe/fetchData';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Import des icônes
import { MagnifyingGlassIcon } from './styledComponent';

// Import de la fonction pour récupérer le détail d'un film / série
import { getMovieDetails } from './request/getMovieDetails';

const SearchBar = ({ Item, page }) => {
  const { displayType, setChosenMovie } = useData();

  const [error, setError] = useState({ message: null, error: null });

  const [query, setQuery] = useState(''); // Texte saisi par l'utilisateur
  const [results, setResults] = useState([]); // Les résultats de la recherche

  const [idChoice, setIdChoice] = useState(null); // L'id du film / série recherché
  // const [generalRatings, setGeneralRatings] = useState(0); // Note générale
  const [displayResults, setDisplayResults] = useState(null); // Affiche ou non les résultats
  const containerRef = useRef(null);
  const openResults = Boolean(displayResults);

  const handleDisplayResults = () => {
    setDisplayResults(containerRef.current);
  };

  const handleChoice = id => {
    setIdChoice(id);
  };

  // TODO : changer la requête de recherche movie / tv
  const getChosenMovie = async id => {
    try {
      const movieData = await getMovieDetails(displayType, id);
      setChosenMovie(movieData);
      // if (page !== 'profil') {
      //   setGeneralRatings(movieData[0].vote_average);
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

  useEffect(() => {
    if (idChoice) {
      getChosenMovie(idChoice);
    }
  }, [idChoice]);

  return (
    <Box
      component="form"
      ref={containerRef}
      marginTop={page === 'profil' ? '6px' : '0'}
    >
      <Item
        sx={{
          position: 'relative',
          height: '40px',
          padding: page === 'profil' ? '0' : '0 10%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: page === 'profil' ? 'initial' : 'center',
          gap: page === 'profil' ? '6px' : '20px',
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
          label={
            error.message
              ? `${error.message}`
              : page === 'profil'
              ? 'Notez un film ou une série !'
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
      {results.length > 0 ? (
        <Menu
          id="basic-menu"
          anchorEl={displayResults}
          open={openResults}
          onClose={() => setDisplayResults(null)}
          TransitionComponent={Fade}
          disableAutoFocus={true}
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
              <Box key={result.id}>
                <ListItem
                  onClick={() => {
                    handleChoice(result.id);
                    setDisplayResults(null);
                  }}
                  sx={{ display: 'flex' }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={result.title || result.name}
                      src={
                        result.poster_path !== null
                          ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
                          : 'http://127.0.0.1:5173/images/no_poster.jpg'
                      }
                      sx={{ borderRadius: 0 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="h4"
                        variant="body2"
                        color="text.primary"
                      >
                        {result.title || result.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {result.release_date
                          ? result.release_date.split('-')[0]
                          : result.first_air_date
                          ? result.first_air_date.split('-')[0]
                          : null}
                      </Typography>
                    }
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  />
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  sx={{ listStyleType: 'none' }}
                />
              </Box>
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
};

export default SearchBar;
