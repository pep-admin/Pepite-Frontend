import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import SearchBar2 from '@utils/components/SearchBar2';
import UserAvatar from '@utils/components/UserAvatar';
import { searchUserRequest } from '@utils/request/search/searchUserRequest';
import { useState } from 'react';
import ContactsShare from './ContactsShare';

const ContactsAdd = () => {

  const [searchResults, setSearchResults] = useState([]);

  const handleUserSearch = async (query: string) => {
    try {
      const users = await searchUserRequest(query);
      
      setSearchResults(users);
      console.log('Résultats de recherche:', users);
    } catch (error) {
      console.error('Erreur lors de la recherche des utilisateurs:', error);
    }
  };

  return (
    <Box
      bgcolor='#021818'
      flexGrow={1}
    >
      <Stack
        spacing={3}
        padding='30px 5vw 40px 5vw'
      >
        <Stack width='fit-content'>
          <Typography
            component='h2'
            color='text.primary'
            fontSize='1.15em'
            fontWeight='400'
            textTransform='uppercase'
          >
            {'Rechercher un utilisateur'}
          </Typography>
        </Stack>
        <Stack>
          <SearchBar2 onSearch={handleUserSearch} />
        </Stack>
        <Stack>
          <Grid 
            container
            spacing={3}  
          >
            {searchResults.map((user) => {
              return (
                <Grid
                  key={user.id}
                  item
                  xs={4}
                  sx={{
                    flexBasis: '33.333%',
                  }}
                >
                  <Stack 
                    spacing={1}
                    alignItems='center'  
                  >
                    <UserAvatar
                      userInfos={user}
                      picHeight={70}
                      picWidth={70}
                    />
                    <Typography
                      align='center'
                      fontFamily='Pragati Narrow, sans-serif'
                      fontSize='0.9em'
                    >
                      {`${user.first_name} ${user.last_name}`}
                    </Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
      <Divider 
        sx={{
          margin: '0 5vw', 
          borderColor: '#173333' 
        }}
      />
      <ContactsShare />
    </Box>
  );
};

export default ContactsAdd;