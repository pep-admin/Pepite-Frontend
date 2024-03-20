// Import des libs externes
import { Menu, MenuItem, Fade, Divider } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Import des composants internes
import ColoredRating from '@utils/components/ColoredRating';
import LanguageIcon from '@mui/icons-material/Language';

// Import de la liste de tous les pays
import { continents, countriesList } from '@utils/data/countries';

// Import des genres raccourcis
import { shortGenresMovieList } from '@utils/data/shortGenres';

// Import des choix de notations
import { ratings } from '@utils/data/ratings';

const typeMenu = ['Films', 'Séries'];
const periodMenu = [
  'Toutes',
  'Avant 1950',
  '1950 à 1960',
  '1960 à 1970',
  '1970 à 1980',
  '1980 à 1990',
  '1990 à 2000',
  '2000 à 2010',
  '2010 à 2020',
  'Depuis 2020',
];

const FilterMenu = ({
  filterName,
  anchorEl,
  openMenu,
  filter,
  setFilter,
  continentChosen,
  setContinentChosen,
  state,
  setState,
}) => {
  const [menuAnchor, setMenuAnchor] = useState(null); // Ancre du menu des continents

  // Affichage des sous-filtres (Type, Pays, Genre, Note)
  const displaySubFilters = () => {
    // Filtre des types (tous, films, ou séries)
    if (filterName === 'type') {
      return typeMenu.map((type, index) => {
        const menuItem = (
          <MenuItem
            key={type}
            sx={{
              bgcolor:
                (state === 'movie' && type === 'Films') ||
                (state === 'tv' && type === 'Séries')
                  ? '#E7AE1A'
                  : 'inherit',
              color:
                (state === 'movie' && type === 'Films') ||
                (state === 'tv' && type === 'Séries')
                  ? '#111111'
                  : 'inherit',
            }}
            onClick={() => {
              setState(
                type === 'Films' ? 'movie' : type === 'Séries' ? 'tv' : 'all',
              );
              setFilter(null);
            }}
          >
            {type}
          </MenuItem>
        );

        // Conditionnellement ajouter un Divider sauf pour le dernier élément
        if (index !== typeMenu.length - 1) {
          const divider = (
            <Divider
              key={`divider-${index}`}
              sx={{ borderColor: '#4c4c4c', margin: '0 !important' }}
            />
          );
          return [menuItem, divider];
        }

        return menuItem;
      });

      // Menu des continents
    } else if (filterName === 'continent' && filter.anchor) {
      return continents.flatMap((continent, index) => {
        const menuItem = (
          <MenuItem
            key={continent.name}
            sx={{
              '&:hover': {
                bgcolor:
                  continentChosen === continent.name ? '#d2d2d2' : 'inherit', // Couleur de fond par défaut
                color:
                  continentChosen === continent.name ? '#111111' : 'inherit', // Couleur du texte par défaut
              },
              bgcolor:
                continentChosen === continent.name ? '#d2d2d2' : 'inherit', // Couleur de fond par défaut
              color: continentChosen === continent.name ? '#111111' : 'inherit', // Couleur du texte par défaut
            }}
            onClick={e => {
              if (continent.name === 'Tous') {
                setMenuAnchor(null);
                setState({ name: 'Tous', code: null });
              } else {
                setMenuAnchor(e.currentTarget);
              }
              setContinentChosen(continent.name);
            }}
          >
            {continent.name}
          </MenuItem>
        );

        // Conditionnellement ajouter un Divider sauf pour le dernier élément
        if (index !== continents.length - 1) {
          const divider = (
            <Divider
              key={`divider-${index}`}
              sx={{ borderColor: '#4c4c4c', margin: '0 !important' }}
            />
          );
          return [menuItem, divider]; // Retourner un tableau contenant MenuItem suivi d'un Divider
        }

        return menuItem; // Pour le dernier élément, retourner seulement le MenuItem
      });
    } else if (filterName === 'genre') {
      return shortGenresMovieList.map((genre, index) => {
        const menuItem = (
          <MenuItem
            key={genre.id}
            sx={{
              '&:hover': {
                bgcolor: state.name === genre.name ? '#E7AE1A' : 'inherit', // Couleur de fond par défaut
                color: state.name === genre.name ? '#111111' : 'inherit', // Couleur du texte par défaut
              },
              bgcolor: state.name === genre.name ? '#E7AE1A' : 'inherit', // Couleur de fond par défaut
              color: state.name === genre.name ? '#111111' : 'inherit', // Couleur du texte par défaut
            }}
            onClick={() => {
              setState({ name: genre.name, id: genre.id });
              setFilter(null);
            }}
          >
            {genre.name}
          </MenuItem>
        );

        // Conditionnellement ajouter un Divider sauf pour le dernier élément
        if (index !== shortGenresMovieList.length - 1) {
          const divider = (
            <Divider
              key={`divider-${index}`}
              sx={{ borderColor: '#4c4c4c', margin: '0 !important' }}
            />
          );
          return [menuItem, divider];
        }

        return menuItem;
      });
    } else if (filterName === 'rating') {
      return ratings.map((rating, index) => {
        const menuItem = (
          <MenuItem
            key={rating.number}
            sx={{
              '&:hover': {
                bgcolor: state.number === rating.number ? '#E7AE1A' : 'inherit', // Couleur de fond par défaut
                color: state.number === rating.number ? '#111111' : 'inherit', // Couleur du texte par défaut
              },
              columnGap: '5px',
              bgcolor: state.number === rating.number ? '#E7AE1A' : 'inherit', // Couleur de fond par défaut
              color: state.number === rating.number ? '#111111' : 'inherit', // Couleur du texte par défaut
            }}
            onClick={() => {
              // setMenuAnchor(e.currentTarget);
              setState({ number: rating.number, value: rating.value });
            }}
          >
            <ColoredRating
              color={state.number === rating.number ? '#111111' : 'secondary'}
              emptyColor={state.number === rating.number ? '#fff' : '#bababa'}
              value={rating.number}
              readOnly={true}
              precision={0.5}
            />
            {rating.value}
          </MenuItem>
        );

        // Conditionnellement ajouter un Divider sauf pour le dernier élément
        if (index !== ratings.length - 1) {
          const divider = (
            <Divider
              key={`divider-${index}`}
              sx={{ borderColor: '#4c4c4c', margin: '0 !important' }}
            />
          );
          return [menuItem, divider];
        }

        return menuItem;
      });
    } else if (filterName === 'period') {
      return periodMenu.map((period, index) => {
        const menuItem = (
          <MenuItem
            key={period}
            sx={{
              '&:hover': {
                bgcolor: state === period ? '#E7AE1A' : 'inherit', // Couleur de fond par défaut
                color: state === period ? '#111111' : 'inherit', // Couleur du texte par défaut
              },
              columnGap: '5px',
              bgcolor: state === period ? '#E7AE1A' : 'inherit', // Couleur de fond par défaut
              color: state === period ? '#111111' : 'inherit', // Couleur du texte par défaut
            }}
            onClick={() => {
              setState(period);
            }}
          >
            {period}
          </MenuItem>
        );

        // Conditionnellement ajouter un Divider sauf pour le dernier élément
        if (index !== periodMenu.length - 1) {
          const divider = (
            <Divider
              key={`divider-${index}`}
              sx={{ borderColor: '#4c4c4c', margin: '0 !important' }}
            />
          );
          return [menuItem, divider];
        }

        return menuItem;
      });
    }
  };

  // Récupère les noms des pays selon leurs continents et codes ISO
  const getCountries = () => {
    // Récupération des codes ISO selon le continent choisi
    const isoCountriesCodesFromContinent =
      continents.find(continent => continent.name === continentChosen)?.code ||
      [];

    // Récupération des pays selon les codes ISO
    const countriesFromContinent = isoCountriesCodesFromContinent.reduce(
      (acc, continentCode) => [
        ...acc,
        ...countriesList.filter(
          country => continentCode === country.iso_3166_1,
        ),
      ],
      [],
    );

    return countriesFromContinent.map(country => (
      <MenuItem
        key={country.iso_3166_1}
        sx={{
          padding: '6px 10px',
          '&:hover': {
            bgcolor: state.code === country.iso_3166_1 ? '#E7AE1A' : 'primary',
            color: state.code === country.iso_3166_1 ? '#101010' : '#bdbdbd',
          },
          bgcolor: state.code === country.iso_3166_1 ? '#E7AE1A' : 'primary',
          color: state.code === country.iso_3166_1 ? '#101010' : '#bdbdbd',
        }}
        onClick={() => {
          setState({ name: country.native_name, code: country.iso_3166_1 });
          setFilter({ anchor: null, continents: filter.continents });
          setMenuAnchor(null);
        }}
      >
        {country.iso_3166_1 !== 'AFRICA' &&
        country.iso_3166_1 !== 'AMERICA' &&
        country.iso_3166_1 !== 'ASIA' &&
        country.iso_3166_1 !== 'EUROPE' &&
        country.iso_3166_1 !== 'OCEANIA' ? (
          <img
            src={`https://flagsapi.com/${country.iso_3166_1}/flat/16.png`}
            alt={`${country.native_name} flag`}
            style={{ height: '16px', width: '16px', marginRight: '10px' }}
          />
        ) : (
          <LanguageIcon
            fontSize="small"
            sx={{
              marginRight: '6px',
            }}
          />
        )}
        {country.native_name}
      </MenuItem>
    ));
  };

  return (
    <>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() =>
          filterName === 'continent'
            ? setFilter({ anchor: null, continents: filter.continents })
            : setFilter(null)
        }
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiMenu-paper': {
            maxHeight: '45vh',
            bgcolor: '#111111',
            color: '#bfbfbf',
            borderRadius: '0',
          },
          '& .MuiMenu-list': {
            padding: '0',
          },
        }}
      >
        {displaySubFilters()}
      </Menu>
      {filterName === 'continent' && menuAnchor && (
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={menuAnchor}
          open={openMenu}
          onClose={() => setMenuAnchor(null)}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiMenu-paper': {
              maxWidth: '35vw',
              maxHeight: '45vh',
              bgcolor: '#232323',
              color: '#bdbdbd',
              borderRadius: '0',
            },
            '& .MuiMenu-list': {
              padding: '0',
            },
          }}
        >
          {getCountries()}
        </Menu>
      )}
    </>
  );
};

FilterMenu.propTypes = {
  filterName: PropTypes.string.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  openMenu: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  setFilter: PropTypes.func.isRequired,
  state: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setState: PropTypes.func.isRequired,
  continentChosen: PropTypes.string,
  setContinentChosen: PropTypes.func,
};

export default FilterMenu;
