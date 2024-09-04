import { Button, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Import des icônes
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterMenu from './FilterMenu';

const SwipeFilter2 = ({
  typeChosen,
  setTypeChosen,
  countryChosen,
  setCountryChosen,
  genreChosen,
  setGenreChosen,
  ratingChosen,
  setRatingChosen,
  periodChosen,
  setPeriodChosen,
  setIsFilterValidated,
  setAreFiltersOpened,
}) => {
  const [typeFilter, setTypeFilter] = useState(null);
  const [countryFilter, setCountryFilter] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [periodFilter, setPeriodFilter] = useState(null);

  const [isButtonVisible, setIsButtonVisible] = useState(false); // Bouton de validation des filtres

  const isFirstRender = useRef(true);

  const openTypeFilter = Boolean(typeFilter);
  const openCountryFilter = Boolean(countryFilter);
  const openGenreFilter = Boolean(genreFilter);
  const openRatingFilter = Boolean(ratingFilter);
  const openPeriodFilter = Boolean(periodFilter);

  const handleTypeClick = (event, filterType) => {
    if (
      typeFilter ||
      countryFilter ||
      genreFilter ||
      ratingFilter ||
      periodFilter
    ) {
      return;
    }
    event.stopPropagation();

    switch (filterType) {
      case 'type':
        setTypeFilter(event.currentTarget);
        break;
      case 'country':
        setCountryFilter(event.currentTarget);
        break;
      case 'genre':
        setGenreFilter(event.currentTarget);
        break;
      case 'rating':
        setRatingFilter(event.currentTarget);
        break;
      case 'period':
        setPeriodFilter(event.currentTarget);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Ignorer le premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Si l'un des filtres change, on affiche le bouton de validation
    if (
      typeChosen ||
      countryChosen.name ||
      genreChosen.name ||
      ratingChosen.value ||
      periodChosen.name
    ) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [
    typeChosen,
    countryChosen.name,
    genreChosen.name,
    ratingChosen.value,
    periodChosen.name,
  ]);

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
          <Typography
            variant="body2"
            color={typeChosen && typeChosen !== 'all' ? 'secondary' : '#7b7b7b'}
          >
            {typeChosen === 'movie'
              ? 'Films'
              : typeChosen === 'tv'
              ? 'Séries'
              : 'Tous'}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'type'}
          anchorEl={typeFilter}
          openMenu={openTypeFilter}
          setFilter={setTypeFilter}
          state={typeChosen}
          setState={setTypeChosen}
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
        onClick={e => handleTypeClick(e, 'country')}
      >
        <FlagIcon fontSize="medium" />
        <Stack>
          <Typography component="h3">{'Pays'}</Typography>
          <Typography
            variant="body2"
            color={
              countryChosen.name && countryChosen.name !== 'Tous'
                ? 'secondary'
                : '#7b7b7b'
            }
            whiteSpace="nowrap"
          >
            {countryChosen.name}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'country'}
          anchorEl={countryFilter}
          openMenu={openCountryFilter}
          setFilter={setCountryFilter}
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
            color={
              genreChosen.name && genreChosen.name !== 'Tous'
                ? 'secondary'
                : '#7b7b7b'
            }
          >
            {genreChosen.name ? genreChosen.name : 'Tous'}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'genre'}
          anchorEl={genreFilter}
          openMenu={openGenreFilter}
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
            color={
              ratingChosen.value && ratingChosen.value !== 'Toutes'
                ? 'secondary'
                : '#7b7b7b'
            }
          >
            {ratingChosen.value ? ratingChosen.value : 'Toutes'}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'rating'}
          anchorEl={ratingFilter}
          openMenu={openRatingFilter}
          setFilter={setRatingFilter}
          state={ratingChosen}
          setState={setRatingChosen}
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
        onClick={e => handleTypeClick(e, 'period')}
      >
        <CalendarMonthIcon fontSize="medium" />
        <Stack>
          <Typography component="h3">{'Période'}</Typography>
          <Typography
            variant="body2"
            color={
              periodChosen.name && periodChosen.name !== 'Toutes'
                ? 'secondary'
                : '#7b7b7b'
            }
          >
            {periodChosen.name}
          </Typography>
        </Stack>
        <FilterMenu
          filterName={'period'}
          anchorEl={periodFilter}
          openMenu={openPeriodFilter}
          setFilter={setPeriodFilter}
          state={periodChosen}
          setState={setPeriodChosen}
        />
      </Stack>
      {isButtonVisible && (
        <Stack marginTop="20px">
          <Button
            onClick={() => {
              setIsFilterValidated(true);
              setAreFiltersOpened(false);
            }}
          >
            {'Valider'}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

SwipeFilter2.propTypes = {
  typeChosen: PropTypes.string.isRequired,
  setTypeChosen: PropTypes.func.isRequired,
  countryChosen: PropTypes.object.isRequired,
  setCountryChosen: PropTypes.func.isRequired,
  genreChosen: PropTypes.object.isRequired,
  setGenreChosen: PropTypes.func.isRequired,
  ratingChosen: PropTypes.object.isRequired,
  setRatingChosen: PropTypes.func.isRequired,
  periodChosen: PropTypes.object.isRequired,
  setPeriodChosen: PropTypes.func.isRequired,
  setIsFilterValidated: PropTypes.func.isRequired,
  setAreFiltersOpened: PropTypes.func.isRequired,
};

export default SwipeFilter2;
