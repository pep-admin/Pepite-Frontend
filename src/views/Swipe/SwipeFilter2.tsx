// Import des libs externes
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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

const SwipeFilter2 = ({ 
  countryChosen, 
  setCountryChosen, 
  genreChosen
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

  const openTypeFilter = Boolean(typeFilter);
  const openContinentFilter = Boolean(continentFilter.anchor);

  const handleTypeClick = (event, filterType) => {
    if (typeFilter || continentFilter.anchor ) {
      return;
    }
    
    switch(filterType) {
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
    
  }, [continentFilter])

  console.log('le genre', genreChosen);
  

  return (
    <Stack>
      <Stack 
        direction='row' 
        height='12vh'
        color='#bababa' 
        columnGap='15px' 
        alignItems='center'
        padding='0 3vw'
        onClick={(e) => handleTypeClick(e, 'type')}
      >
        <LocalMoviesIcon fontSize='medium' />
        <Stack>
          <Typography component='h3'>
            {'Type'}
          </Typography>
          <Typography variant='body2' color='secondary'>
            {displayType === 'movie' ? 
              'Films' 
              : displayType === 'tv' ?
              'Séries'
              :
              'Films et séries'
            }
          </Typography>
        </Stack>
        <FilterMenu 
          filterName={'type'} 
          anchorEl={typeFilter} 
          openMenu={openTypeFilter} 
          filter={null}
          setFilter={setTypeFilter} 
          countryChosen={null}
          setCountryChosen={null}
        />
      </Stack>
      <Divider sx={{ borderColor: '#404040'}} />
      <Stack 
        direction='row' 
        height='12vh'
        color='#bababa' 
        columnGap='15px' 
        alignItems='center'
        padding='0 5vw 0 3vw'
        onClick={(e) => handleTypeClick(e, 'continent')}
      >
        <FlagIcon fontSize='medium' />
        <Stack>
          <Typography component='h3'>
            {'Pays'}
          </Typography>
          <Typography variant='body2' color='secondary' whiteSpace='nowrap'>
            {countryChosen.name}
          </Typography>
        </Stack>
        <FilterMenu 
          filterName={'continent'} 
          anchorEl={continentFilter.anchor} 
          openMenu={openContinentFilter} 
          filter={continentFilter}
          setFilter={setContinentFilter} 
          countryChosen={countryChosen}
          setCountryChosen={setCountryChosen}
        />
      </Stack>
      <Divider sx={{ borderColor: '#404040'}} />
      <Stack 
        direction='row' 
        height='12vh'
        color='#bababa' 
        columnGap='15px' 
        alignItems='center'
        padding='0 5vw 0 3vw'
      >
        <MovieFilterIcon fontSize='medium' />
        <Stack>
          <Typography component='h3'>
            {'Genre'}
          </Typography>
          <Typography variant='body2' color={genreChosen.name ? 'secondary' : '#7b7b7b'}>
            {genreChosen.name ? genreChosen.name : 'Tous'}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: '#404040'}} />
      <Stack 
        direction='row' 
        height='12vh'
        color='#bababa' 
        columnGap='15px' 
        alignItems='center'
        padding='0 5vw 0 3vw'
      >
        <StarIcon fontSize='medium' />
        <Stack>
          <Typography component='h3'>
            {'Note'}
          </Typography>
          <Typography variant='body2' color='#7b7b7b'>
            {'toutes'}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: '#404040'}} />
      <Stack marginTop='20px'>
        <Button>
          {'Valider'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default SwipeFilter2;