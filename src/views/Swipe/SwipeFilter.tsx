// Import des libs externes
// import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Fade,
  Rating,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Import de la liste de tous les pays
import {
  americanCountryCodes,
  continents,
  countriesList,
} from '@utils/data/Countries';
import { genreMovieList, genreSerieList } from '@utils/data/genres';

// Import du contexte
import { useData } from '@hooks/DataContext';

// Légende des notes
const labels: { [index: string]: string } = {
  0.5: 'Terrible',
  1: 'Mauvais',
  1.5: 'Médiocre',
  2: 'Passable',
  2.5: 'Moyen',
  3: 'Pas mal',
  3.5: 'Bon',
  4: 'Très bon',
  4.5: 'Excellent',
  5: "Chef d'œuvre",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const SwipeFilter = ({
  Item,
  countryChosen,
  setCountryChosen,
  isoCountry,
  genreChosen,
  setGenreChosen,
}) => {
  const { displayType } = useData();

  // ***** Filtre selon les pays ***** //
  const [countryFilter, setCountryFilter] = useState(null);
  const openCountry = Boolean(countryFilter);
  const handleCountryClick = event => {
    setCountryFilter(event.currentTarget);
  };

  const [openContinent, setOpenContinent] = useState({
    anchor: null,
    continent: {
      name: 'Amérique',
      code: americanCountryCodes,
    },
    open: false,
  });
  const [continentChosen, setContinentChosen] = useState([]);

  // ***** Filtre selon le genre ***** //
  const [genreFilter, setGenreFilter] = useState(null);
  const [movieOrSerie, setMovieOrSerie] = useState(genreMovieList);

  const openGenre = Boolean(genreFilter);
  const handleGenreClick = event => {
    setGenreFilter(event.currentTarget);
  };

  // ***** Filtre selon la note ***** //
  const [ratingsFilter, setRatingsFilter] = useState(null);
  const openRatings = Boolean(ratingsFilter);
  const handleRatingsClick = event => {
    setRatingsFilter(event.currentTarget);
  };
  const handleRatingsClose = () => {
    setRatingsFilter(null);
  };

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    if (displayType === 'movie') {
      setMovieOrSerie(genreMovieList);
    } else if (displayType === 'tv') {
      setMovieOrSerie(genreSerieList);
    }
  }, [displayType]);

  return (
    <Item
      sx={{
        backgroundColor: '#0E6666',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 3%',
      }}
    >
      {/* Filtre par pays */}
      <Button
        id="fade-button"
        aria-controls={openCountry ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openCountry ? 'true' : undefined}
        onClick={handleCountryClick}
        sx={{
          color: countryChosen !== '' ? '#fff' : '#24A5A5',
          position: 'relative',
        }}
      >
        {'Pays'}
        {isoCountry !== '' ? (
          <img
            src={`https://flagsapi.com/${isoCountry}/shiny/16.png`}
            style={{ position: 'absolute', right: '3px' }}
          />
        ) : null}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={countryFilter}
        open={openCountry}
        onClose={() => setCountryFilter(null)}
        TransitionComponent={Fade}
      >
        {/* Pays choisi */}
        {countriesList
          .filter(country => country.iso_3166_1 === isoCountry)
          .map(country => {
            return (
              <MenuItem
                key={country.native_name}
                onClick={() => {
                  setCountryChosen(country.native_name);
                  setCountryFilter(null);
                }}
                sx={{
                  backgroundColor:
                    countryChosen !== '' &&
                    country.native_name === countryChosen
                      ? '#24A5A5'
                      : 'inherit',
                }}
              >
                {country.native_name}
              </MenuItem>
            );
          })}
        {/* Continents */}
        {continents.map(continent => {
          return (
            <MenuItem
              key={continent.name}
              onClick={event => {
                setOpenContinent({
                  anchor: event.currentTarget,
                  continent: continent,
                  open: !openContinent.open,
                });
                setContinentChosen(continent.code);
              }}
              sx={{
                backgroundColor:
                  openContinent.continent.name === continent.name &&
                  openContinent.open
                    ? '#dcdcdc !important'
                    : 'inherit',
                justifyContent: 'space-between',
                paddingRight: '5px',
                gap: '20px',
              }}
            >
              {continent.name}
              {openContinent.continent.name === continent.name &&
              openContinent.open ? (
                <ChevronRightIcon sx={{ color: '#0e6666' }} />
              ) : (
                <ChevronLeftIcon sx={{ color: '#0e6666' }} />
              )}
            </MenuItem>
          );
        })}
      </Menu>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={openContinent.anchor}
        open={openContinent.open && openContinent.anchor !== null}
        onClose={() =>
          setOpenContinent({
            anchor: null,
            continent: openContinent.continent,
            open: false,
          })
        }
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {countriesList
          .filter(country => continentChosen.includes(country.iso_3166_1))
          .map(country => {
            return (
              <MenuItem
                key={country.native_name}
                onClick={() => {
                  setOpenContinent({
                    anchor: null,
                    continent: openContinent.continent,
                    open: false,
                  });
                  setCountryChosen(country.native_name);
                  setCountryFilter(null);
                }}
                sx={{
                  fontSize: '1em',
                  backgroundColor:
                    countryChosen !== '' &&
                    country.native_name === countryChosen
                      ? '#24A5A5'
                      : 'inherit',
                }}
              >
                {country.native_name}
              </MenuItem>
            );
          })}
      </Menu>
      {/* Filtre par genre */}
      <Button
        id="fade-button"
        aria-controls={openGenre ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openGenre ? 'true' : undefined}
        onClick={handleGenreClick}
        sx={{
          color: genreChosen.id !== null ? '#fff' : '#24A5A5',
          position: 'relative',
        }}
      >
        {'Genre'}
        {genreChosen.name !== null ? (
          <Typography
            component="span"
            color="primary"
            variant="body2"
            sx={{
              width: '50px',
              position: 'absolute',
              right: '-30px',
              top: '11px',
              textTransform: 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'left',
            }}
          >
            {genreChosen.name}
          </Typography>
        ) : null}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={genreFilter}
        open={openGenre}
        onClose={() => setGenreFilter(null)}
        TransitionComponent={Fade}
      >
        {movieOrSerie.map((genre, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                setGenreChosen({ name: genre.name, id: genre.id });
                setGenreFilter(null);
              }}
              sx={{
                backgroundColor:
                  genreChosen.id !== null && genre.id === genreChosen.id
                    ? '#24A5A5'
                    : 'inherit',
              }}
            >
              {genre.name}
            </MenuItem>
          );
        })}
      </Menu>

      {/* Filtre par note */}
      <Button
        id="fade-button"
        aria-controls={openRatings ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openRatings ? 'true' : undefined}
        onClick={handleRatingsClick}
      >
        Note
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={ratingsFilter}
        open={openRatings}
        onClose={handleRatingsClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => setCountryFilter(null)}>
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(_, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </MenuItem>
      </Menu>
    </Item>
  );
};

SwipeFilter.propTypes = {
  Item: PropTypes.elementType.isRequired,
  isoCountry: PropTypes.string.isRequired,
  countryChosen: PropTypes.string.isRequired,
  setCountryChosen: PropTypes.func.isRequired,
  genreChosen: PropTypes.object.isRequired,
  setGenreChosen: PropTypes.func.isRequired,
};

export default SwipeFilter;
