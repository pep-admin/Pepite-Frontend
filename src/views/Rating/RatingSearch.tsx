import { Divider, Stack, Typography } from '@mui/material';
import MovieSearchCard from '@utils/components/Cards/MovieSearchCard';
import UserMainCard from '@utils/components/Cards/UserMainCard';
import SearchBar2 from '@utils/components/SearchBar2';
import { getFriendsListRequest } from '@utils/request/friendship/getFriendsListRequest';
import { searchFriendsRequest } from '@utils/request/search/searchFriendsRequest';
import { searchMovieRequest } from '@utils/request/search/searchMovieRequest';
import { useEffect, useState } from 'react';

const RatingSearch = ({ searchType, setMovieSelected, friendSelected, setFriendSelected }) => {

  // Infos de l'utilisateur connecté
  const loggedUserId = JSON.parse(localStorage.getItem('user_infos')).id;

  const [searchResults, setSearchResults] = useState([]);

  // Si pas de recherche, récupération de la liste de tous les amis
  const getFriendList = async() => {
    try {
      const friends = await getFriendsListRequest(loggedUserId);
      console.log('tous les amis =>', friends);
      setSearchResults(friends);
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleMovieSearch = async(query: string | null) => {
    try {      
      console.log('search type', searchType);
      
      // Supprime tous les films si l'utilisateur efface tout le champ de saisie
      if(!query && searchType === 'movie') {
        setSearchResults([]);
        return;
      };

      // Récupère tous les amis si l'utilisateur efface tout le champ de saisie
      if(!query && searchType === 'friend' && !friendSelected) {
        console.log('amis !');
        
        getFriendList();
        return;
      }

      let results = [];
      let sortedResults = [];

      if(searchType === 'movie') {
        results = await searchMovieRequest(query, 'all');

        // Affiche les plus populaires en premiers
        sortedResults = results.sort((a, b) => b.vote_count - a.vote_count);
        
      } else {
        results = await searchFriendsRequest(query);

        sortedResults = results;
        console.log('les amis =>', sortedResults);
        
      }

      setSearchResults(sortedResults)
      
    } catch (error) {
      console.error('Erreur lors de la recherche des utilisateurs:', error);
    }
  };

  useEffect(() => {
    if(searchType === 'movie' || friendSelected) return;
    
    getFriendList();
  }, []);

  return (
    <Stack
      // spacing={3}
      padding={ searchType === 'movie' ? '30px 0' : '30px 0 0 0' }
    >
      <Typography
        component='h2'
        color='text.primary'
        fontSize='1.15em'
        fontWeight='400'
        textTransform='uppercase'
      >
        { searchType === 'movie'
          ? `RECHERCHER UN FILM / UNE SÉRIE`
          : 'POUR QUI ?'
        }
      </Typography>
      <SearchBar2 
        placeHolder={ searchType === 'movie'
          ? 'Le titre du film / série'
          : 'Un nom et prénom'
        } 
        onSearch={handleMovieSearch} 
        boxMargin={'19px 0 0 0'}
      />
      {
        searchResults.length !== 0 &&
        <>
          <Stack 
            // ref={scrollContainerRef}
            direction='row'
            spacing={5}
            overflow='auto'
            marginTop='30px !important'
          >
            {
              searchResults.map((result) => {                
                return(
                  searchType === 'movie' ?
                  <MovieSearchCard 
                    key={result.id} 
                    movie={result} 
                    setSearchResults={setSearchResults}
                    setMovieSelected={setMovieSelected}  
                  />
                  :
                  <UserMainCard 
                    key={result.id}
                    userInfos={result}
                    direction={'column'}
                    avatarSize={'75px'}
                    setSearchResults={setSearchResults}
                    setFriendSelected={setFriendSelected}
                  />
                )
              })
            }
          </Stack>
          <Divider sx={{ borderColor: '#282828', marginTop: '25px' }} />
        </>
      }
    </Stack>
  );
};

export default RatingSearch;