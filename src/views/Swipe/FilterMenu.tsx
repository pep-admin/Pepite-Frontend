import { Menu, MenuItem, Fade, Divider, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { useData } from '@hooks/DataContext';

// Import de la liste de tous les pays
import {
  // americanCountryCodes,
  continents, countriesList,
  // countriesList,
} from '@utils/data/countries';

const typeMenu = ['Tous', 'Films', 'Séries'];

const FilterMenu = ({
  filterName, 
  anchorEl, 
  openMenu, 
  filter, 
  setFilter, 
  countryChosen, 
  setCountryChosen, 
}) => {

  const { displayType } = useData();

  const [menuAnchor, setMenuAnchor] = useState(null); // Ancre du menu des continents
  const [continentChosen, setContinentChosen] = useState('Amérique'); // Continent choisi par l'utilisateur

  // Affichage des sous-filtres (Type, Pays, Genre, Note)
  const displaySubFilters = () => {
    
    // Filtre des types (tous, films, ou séries)
    if(filterName === 'type') {
      return typeMenu.map((type, index) => {
        const menuItem = (
          <MenuItem 
            key={type}
            sx={{ 
              bgcolor: 
                (displayType === 'movie' && type === 'Films')
                || (displayType === 'tv' && type === 'Séries') ?
                  '#E7AE1A'
                : 'inherit',
              color: 
                (displayType === 'movie' && type === 'Films')
                || (displayType === 'tv' && type === 'Séries') ?
                  '#111111'
                : 'inherit'
            }}
          >
            {type}
          </MenuItem>
        );
      
        // Conditionnellement ajouter un Divider sauf pour le dernier élément
        if (index !== typeMenu.length - 1) {
          const divider = <Divider key={`divider-${index}`} sx={{ borderColor: '#4c4c4c', margin: '0 !important' }} />;
          return [menuItem, divider];
        }
      
        return menuItem; 
      });

    // Menu des continents
    } else if(filterName === 'continent' && filter.anchor) {

      return continents.flatMap((continent, index) => {

        const menuItem = (
          <MenuItem 
            key={continent.name}
            sx={{
              '&:hover': {
                bgcolor: continentChosen === continent.name ? '#d2d2d2' : 'inherit', // Couleur de fond par défaut
                color: continentChosen === continent.name ? '#111111' : 'inherit', // Couleur du texte par défaut
              },
              bgcolor: continentChosen === continent.name ? '#d2d2d2' : 'inherit', // Couleur de fond par défaut
              color: continentChosen === continent.name ? '#111111' : 'inherit', // Couleur du texte par défaut
            }}
            onClick={(e) => {
              setMenuAnchor(e.currentTarget);
              setContinentChosen(continent.name);
            }}
          >
            {continent.name}
          </MenuItem>
        );
      
        // Conditionnellement ajouter un Divider sauf pour le dernier élément
        if (index !== continents.length - 1) {
          const divider = <Divider key={`divider-${index}`} sx={{ borderColor: '#4c4c4c', margin: '0 !important' }} />;
          return [menuItem, divider]; // Retourner un tableau contenant MenuItem suivi d'un Divider
        }
      
        return menuItem; // Pour le dernier élément, retourner seulement le MenuItem
      });
    }
  }

  useEffect(() => {
    console.log('continent', continentChosen);
    
  }, [continentChosen])

  // Récupère les noms des pays selon leurs continents et codes ISO
  const getCountries = () => {

    // Récupération des codes ISO selon le continent choisi
    const isoCountriesCodesFromContinent = continents.find(continent => continent.name === continentChosen)?.code || [];

    // Récupération des pays selon les codes ISO
    const countriesFromContinent = isoCountriesCodesFromContinent.reduce((acc, continentCode) => [
      ...acc,
      ...countriesList.filter(country => continentCode === country.iso_3166_1)
    ], []);

    // Trie dans l'ordre alphabétique
    const sortedCountries = countriesFromContinent.sort((a, b) => a.native_name.localeCompare(b.native_name));
  
    return sortedCountries.map((country) => (
      <MenuItem
        key={country.iso_3166_1}
        sx={{
          padding: '6px 10px',
          '&:hover': {
            bgcolor: countryChosen.code === country.iso_3166_1 ? '#E7AE1A' : 'primary',
            color: countryChosen.code === country.iso_3166_1 ? '#101010' : '#bdbdbd',
          },
          bgcolor: countryChosen.code === country.iso_3166_1 ? '#E7AE1A' : 'primary',
          color: countryChosen.code === country.iso_3166_1 ? '#101010' : '#bdbdbd',
        }}
        onClick={() => setCountryChosen({name: country.native_name, code: country.iso_3166_1})}
      >
        <img
          src={`https://flagsapi.com/${country.iso_3166_1}/flat/16.png`}
          alt={`${country.native_name} flag`}
          style={{ height: '16px', width: '16px', marginRight: '10px' }}
        />
        {country.native_name}
      </MenuItem>
    ));
  }
  
  return (
    <>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => filterName === 'continent' ? setFilter({anchor: null, continents: filter.continents}) : setFilter(null)}
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
            bgcolor: '#111111',
            color: '#bfbfbf',
            borderRadius: '0'
          },
          '& .MuiMenu-list': {
            padding: '0'
          },
        }}
      >
        { displaySubFilters() } 
      </Menu>
      {filterName === 'continent' && menuAnchor &&
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
            padding: '0'
          },
        }}
      >
        { getCountries() }
      </Menu>
      }
    </>
    
  );
};

export default FilterMenu;