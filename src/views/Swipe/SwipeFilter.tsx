// Import des libs externes
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import FilterMenu from './FilterMenu';

// Import des icônes
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

// Import du contexte
import { useData } from '@hooks/DataContext';

import { americanCountryCodes } from '@utils/data/countries';

const SwipeFilter = ({
  swipeType,
  setSwipeType,
  countryChosen,
  setCountryChosen,
  genreChosen,
  setGenreChosen,
  ratingChosen,
  setRatingChosen,
  setIsFilterValidated,
  setAreFiltersOpen,
}) => {
  const { displayType } = useData();

  const [typeFilter, setTypeFilter] = useState(null);
  const [continentFilter, setContinentFilter] = useState({
    anchor: null,
    continent: {
      name: 'Amérique',
      code: americanCountryCodes,
    },
  });
  const [genreFilter, setGenreFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const isFirstRender = useRef(true);

  const openTypeFilter = Boolean(typeFilter);
  const openContinentFilter = Boolean(continentFilter.anchor);
  const openGenreFilter = Boolean(genreFilter);
  const openRatingFilter = Boolean(ratingFilter);

  const handleTypeClick = (event, filterType) => {
    if (typeFilter || continentFilter.anchor || genreFilter || ratingFilter) {
      return;
    }

    switch (filterType) {
      case 'type':
        setTypeFilter(event.currentTarget);
        break;
      case 'continent':
        setContinentFilter({
          anchor: event.currentTarget,
          continent: {
            name: 'Amérique',
            code: americanCountryCodes,
          },
        });
        break;
      case 'genre':
        setGenreFilter(event.currentTarget);
        break;
      case 'rating':
        setRatingFilter(event.currentTarget);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log('le filtre continent', continentFilter);
  }, [continentFilter]);

  // Surveillez les changements dans les filtres
  useEffect(() => {
    // Ignorer le premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false; // Marquez que le premier rendu est passé
      return;
    }

    // Si l'un des filtres change, affichez le bouton de validation
    if (
      displayType ||
      continentFilter.continent.code ||
      genreChosen.name ||
      ratingChosen.value
    ) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [displayType, swipeType, continentFilter, genreChosen, ratingChosen]);

  return (
    <Stack>
      <Stack
        direction="row"
        height="12vh"
        color="#bababa"
        columnGap="15px"
        alignItems="center"
        padding="0 3vw"
        onClick={e => handleTypeClick(e, 'type')}
      >
        <LocalMoviesIcon fontSize="medium" />
        <Stack>
          <Typography component="h3">{'Type'}</Typography>
          <Typography variant="body2" color="secondary">
            {swipeType === 'movie'
              ? 'Films'
              : swipeType === 'tv'
              ? 'Séries'
              : 'Films et séries'}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'type'}
          anchorEl={typeFilter}
          openMenu={openTypeFilter}
          filter={null}
          setFilter={setTypeFilter}
          state={swipeType}
          setState={setSwipeType}
        />
      </Stack>
      <Divider sx={{ borderColor: '#404040' }} />
      <Stack
        direction="row"
        height="12vh"
        color="#bababa"
        columnGap="15px"
        alignItems="center"
        padding="0 5vw 0 3vw"
        onClick={e => handleTypeClick(e, 'continent')}
      >
        <FlagIcon fontSize="medium" />
        <Stack>
          <Typography component="h3">{'Pays'}</Typography>
          <Typography variant="body2" color="secondary" whiteSpace="nowrap">
            {countryChosen.name}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'continent'}
          anchorEl={continentFilter.anchor}
          openMenu={openContinentFilter}
          filter={continentFilter}
          setFilter={setContinentFilter}
          state={countryChosen}
          setState={setCountryChosen}
        />
      </Stack>
      <Divider sx={{ borderColor: '#404040' }} />
      <Stack
        direction="row"
        height="12vh"
        color="#bababa"
        columnGap="15px"
        alignItems="center"
        padding="0 5vw 0 3vw"
        onClick={e => handleTypeClick(e, 'genre')}
      >
        <MovieFilterIcon fontSize="medium" />
        <Stack>
          <Typography component="h3">{'Genre'}</Typography>
          <Typography
            variant="body2"
            color={genreChosen.name ? 'secondary' : '#7b7b7b'}
          >
            {genreChosen.name ? genreChosen.name : 'Tous'}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'genre'}
          anchorEl={genreFilter}
          openMenu={openGenreFilter}
          filter={genreFilter}
          setFilter={setGenreFilter}
          state={genreChosen}
          setState={setGenreChosen}
        />
      </Stack>
      <Divider sx={{ borderColor: '#404040' }} />
      <Stack
        direction="row"
        height="12vh"
        color="#bababa"
        columnGap="15px"
        alignItems="center"
        padding="0 5vw 0 3vw"
        onClick={e => handleTypeClick(e, 'rating')}
      >
        <StarIcon fontSize="medium" />
        <Stack>
          <Typography component="h3">{'Note'}</Typography>
          <Typography
            variant="body2"
            color={ratingChosen.value ? 'secondary' : '#7b7b7b'}
          >
            {ratingChosen.value ? ratingChosen.value : 'toutes'}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'rating'}
          anchorEl={ratingFilter}
          openMenu={openRatingFilter}
          filter={ratingFilter}
          setFilter={setRatingFilter}
          state={ratingChosen}
          setState={setRatingChosen}
        />
      </Stack>
      <Divider sx={{ borderColor: '#404040' }} />
      {isButtonVisible && (
        <Stack marginTop="20px">
          <Button
            onClick={() => {
              setIsFilterValidated(true);
              setAreFiltersOpen(false);
            }}
          >
            {'Valider'}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

SwipeFilter.propTypes = {
  swipeType: PropTypes.string.isRequired,
  setSwipeType: PropTypes.func.isRequired,
  countryChosen: PropTypes.object,
  setCountryChosen: PropTypes.func.isRequired,
  genreChosen: PropTypes.object,
  setGenreChosen: PropTypes.func.isRequired,
  ratingChosen: PropTypes.object,
  setRatingChosen: PropTypes.func.isRequired,
  setIsFilterValidated: PropTypes.func.isRequired,
  setAreFiltersOpen: PropTypes.func.isRequired,
};

export default SwipeFilter;
