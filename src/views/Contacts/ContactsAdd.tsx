import { Box, Stack, Typography } from '@mui/material';
import SearchBar2 from '@utils/components/SearchBar2';
import { searchUserRequest } from '@utils/request/search/searchUserRequest';
import ContactsShare from './ContactsShare';
import ContactsCard from './ContactsCard';

const ContactsAdd = ({ searchResults, setSearchResults, onUpdate }) => {
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
    <Box bgcolor="#021E1E" flexGrow={1}>
      <Stack spacing={3} padding="30px 5vw 40px 5vw">
        <Stack width="fit-content">
          <Typography
            component="h2"
            color="text.primary"
            fontSize="1.15em"
            fontWeight="400"
            textTransform="uppercase"
          >
            {'Rechercher un utilisateur'}
          </Typography>
        </Stack>
        <Stack>
          <SearchBar2
            placeHolder={'Prénom et nom'}
            onSearch={handleUserSearch}
            boxMargin={'0'}
          />
        </Stack>
        <Stack spacing={3}>
          {searchResults.map((user, index) => {
            return (
              <ContactsCard
                key={user.id}
                user={user}
                isLastCard={index === searchResults.length - 1}
                onUpdate={onUpdate}
              />
            );
          })}
        </Stack>
      </Stack>
      <ContactsShare />
    </Box>
  );
};

export default ContactsAdd;
