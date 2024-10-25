import { Divider, Grid, Stack, Typography } from '@mui/material';
import MovieMainCard from '@utils/components/Cards/MovieMainCard';
import MovieSearchCard from '@utils/components/Cards/MovieSearchCard';
import SearchBar2 from '@utils/components/SearchBar2';
import { searchMovieRequest } from '@utils/request/search/searchMovieRequest';
import { useState } from 'react';

const RatingSearch = () => {

  const [searchResults, setSearchResults] = useState([]);

  const handleMovieSearch = async (query: string) => {
    try {
      const movies = await searchMovieRequest(query, 'all');
      
      setSearchResults(movies);
      console.log('Résultats de recherche:', movies);
    } catch (error) {
      console.error('Erreur lors de la recherche des utilisateurs:', error);
    }
  };

  return (
    <Stack
      spacing={3}
      padding='30px 0 40px 0'
    >
      <Typography
        component='h2'
        color='text.primary'
        fontSize='1.15em'
        fontWeight='400'
        textTransform='uppercase'
      >
        {`RECHERCHER UN FILM / UNE SÉRIE`}
      </Typography>
      <SearchBar2 placeHolder={'Le titre du film / série'} onSearch={handleMovieSearch} />
      <Stack 
        // ref={scrollContainerRef}
        direction='row'
        spacing={4}
        overflow='auto'
        marginTop='25px !important'
      >
        {
          searchResults.map((movie) => {
            return(
              <MovieSearchCard key={movie.id} movie={movie} />
            )
          })
        }
      </Stack>
      {
        searchResults.length !== 0 &&
        <Divider sx={{ borderColor: '#282828' }} />
      }
    </Stack>
  );
};

export default RatingSearch;