// Import des libs externes
import { Menu, MenuItem, Fade, Divider } from '@mui/material';
import PropTypes from 'prop-types';

// Import des composants internes
import ColoredRating from '@utils/components/ColoredRating';

// Import de la liste de tous les pays
import { countriesList } from '@utils/data/countries';

// Import des genres raccourcis
import { shortGenresMovieList } from '@utils/data/shortGenres';

// Import des choix de notations
import { ratings } from '@utils/data/ratings';

// Import des périodes de sorties
import { periodMenu } from '@utils/data/periods';

const typeMenu = [{ id: 0 , name: 'Tous' }, { id: 1 , name: 'Films' }, { id: 2, name: 'Séries' }];

const FilterMenu = ({
  filterName,
  anchorEl,
  openMenu,
  // filter,
  setFilter,
  state,
  setState,
}) => {

  // Fonction utilitaire pour générer des MenuItems avec un Divider optionnel
  const generateMenuItems = (items, isSelected, onClick, keyExtractor = item => item.name, textExtractor = item => item.name) => {    
    
    return items.flatMap((item, index) => {
      const menuItem = (
        <MenuItem
          key={keyExtractor(item)}
          sx={{
            '&:hover': {
              bgcolor: isSelected(item) ? '#E7AE1A' : 'inherit',
              color: isSelected(item) ? '#111111' : 'inherit',
            },
            bgcolor: isSelected(item) ? '#E7AE1A' : 'inherit',
            color: isSelected(item) ? '#111111' : 'inherit',
          }}
          onClick={() => onClick(item)}
        >
          {textExtractor(item)}
        </MenuItem>
      );

      // Ajouter un Divider sauf pour le dernier élément
      if (index !== items.length - 1) {
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
  };

  const displaySubFilters = () => {
    console.log('nom du filtre =>', filterName);
    
    console.log('state =>', state);
    
    if (filterName === 'type') {
      return generateMenuItems(
        typeMenu,
        type => (state === 'movie' && type.name === 'Films') || (state === 'tv' && type.name === 'Séries'),
        type => {
          setState(type.name === 'Films' ? 'movie' : type.name === 'Séries' ? 'tv' : 'all');
          setFilter(null);
        }
      );
    } else if (filterName === 'country') {
      const allCountriesList = [
        { name: 'Tous', iso_3166_1: null },  // Ajoute l'option "Tous" en début de liste
        ...countriesList 
      ];
      
      return generateMenuItems(
        allCountriesList,
        country => state.name === country.name,
        country => {
          setState({ name: country.name, code: country.iso_3166_1 });
          setFilter(null);
        },
        country => country.name
      );
      
    } else if (filterName === 'genre') {
      return generateMenuItems(
        shortGenresMovieList,
        genre => state.name === genre.name,
        genre => {
          setState({ name: genre.name, id: genre.id });
          setFilter(null);
        },
        genre => genre.id
      );
    } else if (filterName === 'rating') {
      return generateMenuItems(
        ratings,
        rating => state.number === rating.number,
        rating => setState({ number: rating.number, value: rating.value }),
        rating => rating.number,
        rating => (
          <>
            { rating.number !== null &&
              <ColoredRating
                color={state.number === rating.number ? '#111111' : 'secondary'}
                emptyColor={state.number === rating.number ? '#fff' : '#bababa'}
                value={rating.number}
                readOnly={true}
                precision={0.5}
              />
            }
            {rating.value}
          </>
        )
      );
    } else if (filterName === 'period') {
      return generateMenuItems(
        periodMenu,
        period => state.name === period.name,
        period => setState(period)
      );
    }
  };

  return (
    <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorEl}
      open={openMenu}
      onClose={() =>
        setFilter(null)
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
          maxWidth: '50vw',
          bgcolor: '#111111',
          color: '#bfbfbf',
          borderRadius: '0',
        },
        '& .MuiMenu-list': {
          padding: '0',
        },
      }}
    >
      {openMenu && displaySubFilters()}
    </Menu>
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
